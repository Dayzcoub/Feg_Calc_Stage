# v3.1.86 — FEG TECH RUN: встроенная Supabase-база и общий TOP-20

## Что изменено

Мини-игра `FEG TECH RUN` больше не показывает пользователю поля настройки Supabase.

В клиент жёстко зашиты:

- Supabase Project URL;
- publishable key;
- workspace key `feg-main`.

Пользователь просто скачивает один и тот же клиент, запускает игру и вводит только имя игрока. Все результаты уходят в один общий рейтинг.

## Важное ограничение по ключам

В standalone/frontend-приложении publishable/anon key технически остаётся публичным: его можно увидеть в исходниках или сетевых запросах. Поэтому защита строится не на сокрытии publishable key, а на схеме БД:

- таблица `runner_scores` закрыта RLS;
- прямой доступ к таблице не нужен;
- запись и чтение идут через RPC-функции;
- функции ограничивают workspace только значением `feg-main`;
- после каждой записи база сама чистит всё ниже TOP-20.

`service_role`, secret key, JWT secret и пароль базы в приложение не кладутся.

## Клиентская логика

1. После проигрыша результат создаётся локально с `client_score_id`.
2. Результат попадает в локальную очередь `localStorage`.
3. Клиент вызывает RPC `submit_runner_score`.
4. Supabase вставляет/обновляет результат через `client_score_id`.
5. База удаляет все записи ниже 20 лучших для `feg-main`.
6. Клиент вызывает RPC `get_runner_scores` и показывает общий TOP-20.
7. Если интернет/RPC недоступны, результат остаётся в очереди и повторно выгружается при следующем обновлении базы.

## SQL для Supabase

Выполнить в Supabase SQL Editor один раз.

```sql
create extension if not exists pgcrypto;

grant usage on schema public to anon, authenticated;

create table if not exists public.runner_scores (
  id uuid primary key default gen_random_uuid(),
  workspace_key text not null,
  client_score_id text not null,
  player_name text not null,
  score integer not null default 0 check (score >= 0 and score <= 10000000),
  distance integer not null default 0 check (distance >= 0 and distance <= 10000000),
  source text not null default 'mini_runner',
  app_version text,
  client_created_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint runner_scores_workspace_client_unique unique (workspace_key, client_score_id)
);

alter table public.runner_scores enable row level security;

revoke all on public.runner_scores from anon;
revoke all on public.runner_scores from authenticated;

drop policy if exists runner_scores_select_all on public.runner_scores;
drop policy if exists runner_scores_insert_all on public.runner_scores;
drop policy if exists runner_scores_update_all on public.runner_scores;

create or replace function public.submit_runner_score(
  p_workspace_key text,
  p_player_name text,
  p_score integer,
  p_distance integer,
  p_source text default 'mini_runner',
  p_app_version text default null,
  p_client_score_id text default null,
  p_client_created_at timestamptz default null
)
returns table (
  id uuid,
  client_score_id text,
  player_name text,
  score integer,
  distance integer,
  created_at timestamptz,
  client_created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_workspace text := trim(coalesce(p_workspace_key, ''));
  v_client_score_id text := trim(coalesce(p_client_score_id, ''));
  v_player_name text := left(nullif(regexp_replace(coalesce(p_player_name, ''), '\s+', ' ', 'g'), ''), 32);
  v_score integer := greatest(0, least(10000000, coalesce(p_score, 0)));
  v_distance integer := greatest(0, least(10000000, coalesce(p_distance, 0)));
  v_source text := left(coalesce(nullif(trim(p_source), ''), 'mini_runner'), 48);
begin
  if v_workspace <> 'feg-main' then
    raise exception 'Invalid workspace';
  end if;

  if v_client_score_id = '' then
    v_client_score_id := gen_random_uuid()::text;
  end if;

  if v_player_name is null or v_player_name = '' then
    v_player_name := 'Техник';
  end if;

  insert into public.runner_scores (
    workspace_key,
    client_score_id,
    player_name,
    score,
    distance,
    source,
    app_version,
    client_created_at,
    updated_at
  ) values (
    v_workspace,
    v_client_score_id,
    v_player_name,
    v_score,
    v_distance,
    v_source,
    left(coalesce(p_app_version, ''), 32),
    coalesce(p_client_created_at, now()),
    now()
  )
  on conflict (workspace_key, client_score_id) do update set
    player_name = excluded.player_name,
    score = excluded.score,
    distance = excluded.distance,
    source = excluded.source,
    app_version = excluded.app_version,
    client_created_at = excluded.client_created_at,
    updated_at = now();

  with ranked as (
    select
      rs.id,
      row_number() over (
        partition by rs.workspace_key
        order by rs.score desc, rs.created_at asc, rs.id asc
      ) as rn
    from public.runner_scores rs
    where rs.workspace_key = 'feg-main'
  )
  delete from public.runner_scores rs
  using ranked r
  where rs.id = r.id
    and r.rn > 20;

  return query
  select
    rs.id,
    rs.client_score_id,
    rs.player_name,
    rs.score,
    rs.distance,
    rs.created_at,
    rs.client_created_at
  from public.runner_scores rs
  where rs.workspace_key = 'feg-main'
    and rs.client_score_id = v_client_score_id
  limit 1;
end;
$$;

create or replace function public.get_runner_scores(
  p_workspace_key text,
  p_limit integer default 20
)
returns table (
  id uuid,
  client_score_id text,
  player_name text,
  score integer,
  distance integer,
  created_at timestamptz,
  client_created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_workspace text := trim(coalesce(p_workspace_key, ''));
  v_limit integer := greatest(1, least(20, coalesce(p_limit, 20)));
begin
  if v_workspace <> 'feg-main' then
    raise exception 'Invalid workspace';
  end if;

  return query
  select
    rs.id,
    rs.client_score_id,
    rs.player_name,
    rs.score,
    rs.distance,
    rs.created_at,
    rs.client_created_at
  from public.runner_scores rs
  where rs.workspace_key = 'feg-main'
  order by rs.score desc, rs.created_at asc, rs.id asc
  limit v_limit;
end;
$$;

revoke all on function public.submit_runner_score(text, text, integer, integer, text, text, text, timestamptz) from public;
revoke all on function public.get_runner_scores(text, integer) from public;

grant execute on function public.submit_runner_score(text, text, integer, integer, text, text, text, timestamptz) to anon, authenticated;
grant execute on function public.get_runner_scores(text, integer) to anon, authenticated;
```

## Проверка после SQL

1. Открыть приложение.
2. Нажать на hero-картинку.
3. Сыграть один раз.
4. После проигрыша статус должен перейти в `Supabase online`.
5. В таблице `runner_scores` должна появиться запись с `workspace_key = 'feg-main'`.
6. После накопления более 20 результатов база должна оставить только 20 лучших.

## Что не менялось

- Расчёты Stage / Truss / LED.
- BOM.
- Склад и резервы.
- PDF export logic.
- Legacy/v3.
- Backend quote writes.
- Бизнес-логика конструкторов.
- Dark fallback.
- Responsive contract конструкторов.
