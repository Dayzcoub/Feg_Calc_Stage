# v3.1.84 — FEG TECH RUN: общая онлайн-база рекордов

## Что изменено

Мини-игра FEG TECH RUN теперь умеет сохранять рекорды в два слоя:

1. **Локальный fallback** — `localStorage`, как в v3.1.83.
2. **Общая онлайн-база Supabase** — таблица `runner_scores`, если в игре указаны `Supabase URL`, `anon key` и общий `workspace key`.

Если Supabase не настроена или временно недоступна, результат не теряется: он остаётся в локальной таблице рекордов текущего браузера.

## Где настраивается

Открыть мини-игру можно кликом по заглавной hero-картинке. В правом блоке игры появилась секция **Синхронизация**:

- **Обновить базу** — перечитать онлайн-рекорды из Supabase.
- **Настройки общей базы** — раскрывающийся блок для подключения Supabase:
  - `Supabase URL` — адрес проекта, например `https://xxxx.supabase.co`;
  - `Anon key` — публичный anon key проекта;
  - `Workspace key` — общий ключ рабочего пространства.

Чтобы несколько компьютеров видели одну и ту же таблицу рекордов, у них должен быть одинаковый `workspace key`.

## Логика сохранения результата

После столкновения игра вызывает общий commit результата:

1. Нормализует имя игрока до 32 символов.
2. Сохраняет результат в локальный `localStorage`.
3. Проверяет настройки Supabase.
4. Если Supabase подключена — отправляет результат в `runner_scores` через REST API Supabase/PostgREST.
5. После успешной записи перечитывает top-20 онлайн-рекордов.
6. Если онлайн-запись не прошла — показывает статус `Локальный fallback`, а локальный результат остаётся сохранённым.

## LocalStorage ключи

```txt
fegStagePro.runnerScores.v1
fegStagePro.runnerPlayerName.v1
cloudSettings
cloudWorkspaceKey
```

## Таблица Supabase

Рекомендуемый SQL для Supabase SQL Editor:

```sql
create table if not exists public.runner_scores (
  id uuid primary key default gen_random_uuid(),
  workspace_key text not null,
  player_name text not null,
  score integer not null default 0 check (score >= 0),
  distance integer not null default 0 check (distance >= 0),
  source text not null default 'mini_runner',
  app_version text,
  client_score_id text,
  client_created_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists runner_scores_workspace_score_idx
  on public.runner_scores (workspace_key, score desc, created_at asc);

create unique index if not exists runner_scores_workspace_client_score_uidx
  on public.runner_scores (workspace_key, client_score_id)
  where client_score_id is not null;

alter table public.runner_scores enable row level security;

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
```

## API-запросы

Чтение top-20:

```txt
GET /rest/v1/runner_scores
  ?select=id,player_name,score,distance,created_at,client_created_at
  &workspace_key=eq.<workspaceKey>
  &order=score.desc,created_at.asc
  &limit=20
```

Запись результата:

```txt
POST /rest/v1/runner_scores
```

Payload:

```json
{
  "workspace_key": "feg-main",
  "player_name": "Техник",
  "score": 1234,
  "distance": 456,
  "source": "mini_runner",
  "app_version": "3.1.84",
  "client_score_id": "local-uuid",
  "client_created_at": "2026-05-17T18:00:00.000Z"
}
```

## Границы изменений

Изменения касаются только мини-игры и её таблицы рекордов. Не менялись:

- расчёты конструкторов;
- BOM;
- склад;
- резервы;
- PDF export logic;
- legacy/v3;
- backend quote writes;
- бизнес-логика сцены/ферм/LED;
- dark fallback;
- responsive contract;
- scroll logic.
