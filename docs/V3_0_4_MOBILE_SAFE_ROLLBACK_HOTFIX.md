# FEG Stage PRO 3.0.4 — Mobile Safe Rollback Hotfix

Цель hotfix: вернуть стабильную работу приложения после агрессивного мобильного слоя 3.0.3.

## Исправлено

- Удалён проблемный слой `StandaloneMobileUsabilityFix.js` из сборки.
- Мобильная полировка переведена в безопасный CSS-only режим.
- Убраны `MutationObserver`, принудительные DOM-перестройки и авто-сканирование, которые могли подвешивать интерфейс на iPhone/Safari/Chrome.
- Сохранены тёмная тема, Safari dark hotfix и правка табуретки на U012.

## Не изменялось

- Расчёты Stage / Truss / LED.
- BOM и quick ideal catalog.
- PDF-экспорт.
- Стартовый экран PRO 3.0.
- Логика конструкторов.
