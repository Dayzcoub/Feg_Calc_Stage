# v3.1.87 — Runner Supabase SQL doc fix

Дата: 2026-05-17

## Что исправлено

После тестового запуска SQL в Supabase обнаружена неоднозначность имени `client_score_id` внутри PL/pgSQL-функции `submit_runner_score`: имя выходной колонки `RETURNS TABLE` конфликтовало с колонкой таблицы в выражении `ON CONFLICT (workspace_key, client_score_id)`.

В документации SQL заменено на безопасный вариант с явным обращением к constraint:

```sql
on conflict on constraint runner_scores_workspace_client_unique do update set
```

## Статус

- Приложение и логика игры не менялись.
- Supabase-конфигурация остаётся hardwired.
- Запись рекордов через RPC остаётся прежней.
- Локальная очередь offline-buffer остаётся прежней.
- Общий TOP-20 остаётся прежним.

## Проверочный SQL

```sql
select * from public.submit_runner_score(
  'feg-main',
  'Тест',
  100,
  25,
  'mini_runner',
  '3.1.87',
  'manual-test-001',
  now()
);

select * from public.get_runner_scores('feg-main', 20);
```

Если во втором запросе есть строка с тестовым результатом, база готова для работы мини-игры из клиента.
