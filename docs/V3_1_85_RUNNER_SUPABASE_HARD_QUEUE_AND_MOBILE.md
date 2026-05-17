# v3.1.85 — FEG TECH RUN: обязательная очередь выгрузки в Supabase и мобильный fullscreen

## Что изменено

Мини-игра FEG TECH RUN переведена из режима «локальный fallback» в режим **обязательной выгрузки в Supabase**:

1. После каждого проигрыша результат получает стабильный `client_score_id`.
2. Результат сразу попадает в локальную очередь выгрузки `fegStagePro.runnerScoreQueue.v1`.
3. Если Supabase настроена и доступна, запись отправляется в таблицу `runner_scores`.
4. Если Supabase временно недоступна или ещё не настроена, результат остаётся в очереди и повторно отправляется при обновлении базы.
5. Для защиты от дублей используется upsert по `workspace_key + client_score_id`.

`localStorage` теперь используется не как финальная база, а как офлайн-буфер и локальный top-20 для отображения, пока общая база недоступна.

## Что нужно, чтобы жёстко прикрепить результаты к Supabase

Нужно подготовить Supabase-проект и один раз указать в игре:

- `Supabase URL` проекта;
- публичный `anon key`;
- общий `workspace key`, одинаковый на всех устройствах, например `feg-main`.

Важно: `service_role` ключ нельзя хранить во фронте. В standalone/PWA используется только `anon key`, поэтому для таблицы нужны RLS-политики на `select`, `insert` и `update/upsert`.

## SQL для Supabase

```sql
create table if not exists public.runner_scores (
  id uuid primary key default gen_random_uuid(),
  workspace_key text not null,
  player_name text not null,
  score integer not null default 0 check (score >= 0),
  distance integer not null default 0 check (distance >= 0),
  source text not null default 'mini_runner',
  app_version text,
  client_score_id text not null,
  client_created_at timestamptz,
  created_at timestamptz not null default now(),
  constraint runner_scores_workspace_client_score_key unique (workspace_key, client_score_id)
);

create index if not exists runner_scores_workspace_score_idx
  on public.runner_scores (workspace_key, score desc, created_at asc);

alter table public.runner_scores enable row level security;

drop policy if exists "runner_scores_select_by_anon" on public.runner_scores;
drop policy if exists "runner_scores_insert_by_anon" on public.runner_scores;
drop policy if exists "runner_scores_update_by_anon" on public.runner_scores;

create policy "runner_scores_select_by_anon"
  on public.runner_scores
  for select
  to anon
  using (true);

create policy "runner_scores_insert_by_anon"
  on public.runner_scores
  for insert
  to anon
  with check (true);

create policy "runner_scores_update_by_anon"
  on public.runner_scores
  for update
  to anon
  using (true)
  with check (true);
```

Если таблица уже была создана по v3.1.84 и `client_score_id` был nullable/частичным индексом, лучше привести её к финальной схеме вручную:

```sql
update public.runner_scores
set client_score_id = coalesce(client_score_id, id::text)
where client_score_id is null;

alter table public.runner_scores
alter column client_score_id set not null;

drop index if exists runner_scores_workspace_client_score_uidx;

alter table public.runner_scores
drop constraint if exists runner_scores_workspace_client_score_key;

alter table public.runner_scores
add constraint runner_scores_workspace_client_score_key unique (workspace_key, client_score_id);
```

## Запись результата

Запрос записи теперь идёт как upsert:

```txt
POST /rest/v1/runner_scores?on_conflict=workspace_key,client_score_id
Prefer: resolution=merge-duplicates,return=representation
```

Payload:

```json
{
  "workspace_key": "feg-main",
  "player_name": "Техник",
  "score": 1234,
  "distance": 456,
  "source": "mini_runner",
  "app_version": "3.1.85",
  "client_score_id": "runner-uuid",
  "client_created_at": "2026-05-17T18:00:00.000Z"
}
```

## Логика очереди

Ключи `localStorage`:

```txt
fegStagePro.runnerScores.v1       // локальный top-20 для быстрого отображения
fegStagePro.runnerScoreQueue.v1   // очередь обязательной Supabase-выгрузки
fegStagePro.runnerPlayerName.v1
cloudSettings
cloudWorkspaceKey
```

Статусы записи:

- `pending` — ждёт выгрузки;
- `failed` — последняя попытка не прошла, будет повторена;
- `synced` — Supabase приняла запись.

## Игровой баланс

- Прыжок техника стал длиннее.
- Гравитация снижена, добавлено короткое удержание подъёма.
- Препятствия уменьшены.
- Интервал появления препятствий увеличен.
- Коллизия сделана чуть мягче, чтобы препятствие можно было перепрыгнуть при своевременном нажатии.

## Мобильная версия игры

На экранах `<=767px` только для мини-игры:

- модалка запрашивает fullscreen;
- браузеру отправляется запрос `screen.orientation.lock('landscape')`;
- тап по игровому экрану работает как прыжок;
- крестик закрытия остаётся доступен;
- если браузер не разрешит программный поворот, игра всё равно откроется во fullscreen, но ориентацию нужно будет повернуть вручную.

## Границы изменений

Не менялись:

- расчёты конструкторов;
- BOM;
- склад;
- резервы;
- PDF export logic;
- legacy/v3;
- backend quote writes;
- бизнес-логика сцены/ферм/LED;
- LED-логика;
- dark fallback;
- responsive contract конструкторов;
- desktop scroll logic.
