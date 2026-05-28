# v3.1.93 — PKC stage systems

## Scope

This pass adds a stage system selector to the standalone quick stage constructor and keeps the old stage logic as `Imlight Copy`.

## Systems

- `Imlight Copy`: existing 1.2×1.2 m calculation, unchanged geometry rules.
- `PKC / ШИП-ПАЗ`: PKC SS-PS modules, common corner-grid leg count, no Imlight crossbars, no T/X/clamps.
- `PKC / ПАЗ-ПАЗ`: PKC SS-PP modules, 4 legs per module, SD-LM-T per internal joint, SD-LM-X in four-module nodes, SD-LM-SS clamps by joint length.

## Added parts

- SS-PS-2000/1000-F-C, SS-PS-1500/1000-F-C, SS-PS-1000/1000-F-C.
- SS-PP-2000/1000-F-C, SS-PP-1500/1000-F-C, SS-PP-1000/1000-F-C.
- SO-1-VM / SO-1-TV for ШИП-ПАЗ.
- SO-2-VM / SO-2-TV for ПАЗ-ПАЗ.
- SD-LM-T, SD-LM-X, SD-LM-SS, SD-VS-1.

## Protected areas

No changes were made to truss calculations, LED formulas, warehouse movements, reservations, backend quote writes, legacy/v3 fallback, or quick pricing logic beyond stage summary labeling.
