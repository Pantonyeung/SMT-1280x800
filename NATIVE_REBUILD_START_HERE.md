# More Fun SMT／SMM Native Rebuild｜START HERE

## Active implementation

- Repository: `Pantonyeung/SMT-1280x800`
- Branch: `native-smt-smm-rebuild-v1`
- Parent specification branch: `native-unified-1280x800-v1`
- Status: active clean implementation branch

## Purpose

This branch is the only active code workspace for the new SMT and SMM rebuild.

- SMT: native Sunmi T2S 1280×800 landscape application.
- SMM: native iPhone／Android mobile operational application.
- Both consume one shared domain core and one set of contracts.
- UI composition differs by device shell; business rules must not be duplicated.

## Reference-only sources

1. SMT order workflow:
   - `Pantonyeung/SMT-1280x800`
   - `agent/upload-smt-1280x800-source`
2. SMT non-order operational format:
   - `Pantonyeung/morefunos-smt`
   - `feat/smt-order-page-v1`
3. SMM mobile flow:
   - `Pantonyeung/morefunos-smm`
   - `feat/smm-mobile-v1`
4. Customer current baseline:
   - `Pantonyeung/morefun-ordering-web`
   - `main`
5. Admin initialization baseline:
   - `Pantonyeung/morefunos-admin`
   - `main`

Reference sources provide requirements, information order, interaction flow and contracts only. Their legacy layout implementation is not copied.

## Hard boundary

Do not add:

- `!important`
- inline style patches
- restore, override, enhancement, fix or patch CSS layers
- 1920×1080 logical canvas
- production whole-page `transform: scale()`
- JavaScript layout repair
- MutationObserver visual repair
- page-specific emergency z-index values
- copied business logic between SMT and SMM
- legacy runtime files inside the new production entry

## New runtime boundary

All new implementation lives under:

```text
src-native/
```

The old root runtime and old `pages/` directory remain reference-only until a controlled replacement milestone is approved.

## Build order

1. Architecture guard and shared contracts
2. Design tokens and reset
3. Shared shell primitives
4. SMT 1280×800 shell
5. SMM mobile shell
6. Shared navigation and status components
7. iPhone SMT QA viewer
8. Order feature reconstruction
9. Checkout
10. Orders
11. Dine
12. Soldout
13. More／Dashboard
14. Reports and reconciliation
15. API, sync and print integration
16. T2S and iPhone acceptance

## Current slice

`Slice 01 — Native Shell Foundation`

Acceptance requires:

- SMT header 56px, workspace 680px, navigation 64px at 1280×800.
- SMM safe-area-aware portrait layout.
- no production scaling.
- no legacy CSS or runtime imports.
- architecture guard reports zero forbidden patterns inside `src-native/`.
