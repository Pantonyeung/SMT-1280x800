# Native Unified Rebuild｜Source of Truth

## 1. Active implementation branch

- Repository: `Pantonyeung/SMT-1280x800`
- Branch: `native-unified-1280x800-v1`
- This branch is a clean native rebuild. Legacy UI code is reference-only.

## 2. Reference hierarchy

### 2.1 Order page

Use the latest Codex / product-modified order page as the functional and interaction reference.

Reference source:

- Repository: `Pantonyeung/SMT-1280x800`
- Branch: `agent/upload-smt-1280x800-source`
- Relevant scope: order workflow, cart behaviour, product selection, completion flow, drinks, modifiers, source selection, payment handoff and current locked business rules.

Do not copy:

- inline styles
- `!important`
- T2S restore or override files
- MutationObserver layout repairs
- fixed-position snapshots
- page-specific z-index repairs

### 2.2 All non-order SMT pages and overall operational format

Use the earlier complete SMT format as the visual, information-order and workflow reference.

Reference source:

- Repository: `Pantonyeung/morefunos-smt`
- Branch: `feat/smt-order-page-v1`
- Relevant pages: checkout, orders, dine, soldout, more, global status bar, bottom navigation and cross-page operating rhythm.

This source still uses a 1920px logical canvas and runtime scaling. Therefore it is reference-only and must not be copied as layout implementation.

### 2.3 SMM mobile application

Use the approved SMM mobile repository and uploaded package as the functional, route and mobile interaction reference.

Reference source:

- Repository: `Pantonyeung/morefunos-smm`
- Branch: `feat/smm-mobile-v1`
- Package: `morefunos-smm-feat-smm-mobile-v1.zip`
- Locked documents:
  - `SMM_PROJECT_BASELINE.md`
  - `docs/SMM_COMBINATION_ARCHITECTURE_V1.md`
  - `docs/SMM_UI_LOCK_V1.md`
  - `docs/SMM_IMPLEMENTATION_PLAN.md`

Relevant scope:

- mobile-first operational flow
- iPhone and Android safe-area behaviour
- SMM route map
- dashboard structure
- bottom navigation: `工作台｜點單｜訂單｜堂食｜更多`
- mobile menu, product, cart, checkout and order-success flow
- mobile cards, sheets and fixed bottom actions
- complete operational access to orders, dine-in, soldout, reports, reconciliation, print jobs and system status
- print handoff boundary between SMM and SMT

Do not copy:

- separate duplicated domain logic
- old `styles.css` / `styles-v2.css` layering
- old `app.js` / `app-v2.js` parallel runtime structure
- page-specific visual fixes
- any code that diverges from the new shared-core architecture

SMM is not a scaled-down SMT canvas. It is a native mobile shell that consumes the same feature state, actions, validation and contracts as SMT.

## 3. Required visual language

The rebuilt system must retain the current More Fun visual language while being rebuilt natively:

- Primary orange: `#ef5218`
- Soft orange surface: `#fff2e9`
- Warm background: `#f8f6f2`
- Main text: `#251f1b`
- Muted text: `#756b64`
- Divider: `#e7dfd8`
- Success: `#39835a`
- Danger: `#cf4338`

These values are design references only. Their final use must be defined once in the new design-token layer.

## 4. Device products

One shared product core supports three presentation profiles:

1. SMT — Sunmi T2S cashier, native 1280×800 landscape.
2. Large-screen operational profile — desktop or large tablet operational layout.
3. SMM — iPhone / ordinary mobile application layout.

All profiles share:

- domain rules
- data models
- cart and order state
- API and sync
- payment workflow
- print-job contract
- permissions
- component behaviour
- design tokens

Only shell composition, navigation arrangement and information density may differ.

## 5. SMM product contract

### 5.1 Locked main navigation

```text
工作台｜點單｜訂單｜堂食｜更多
```

Cart is part of the ordering flow and is not a sixth main-navigation item.

### 5.2 Locked mobile route map

```text
/login
/dashboard
/menu
/product/:id
/cart
/checkout
/order-success
/orders
/orders/:id
/dine
/dine/:tableId
/soldout
/reservations
/reports
/reconciliation
/print-jobs
/system-status
/more
```

### 5.3 Shared-core boundary

SMT and SMM must consume the same:

- product and pricing rules
- cart state
- checkout validation
- order identity
- order operations
- dine-in state
- soldout state
- reports and reconciliation contracts
- offline and idempotency rules
- print-job state

SMM must not contain a second independent copy of these rules.

### 5.4 Printing boundary

SMM may:

- create print jobs
- inspect status
- retry
- cancel jobs not yet executed
- reroute
- request reprint
- select copies

SMM must not open direct TCP, USB or Bluetooth printer connections.

SMT remains the physical print execution authority and must report the actual result back to the shared system.

## 6. Hard prohibitions

The native rebuild must not introduce:

- `!important`
- inline style patches
- restore / enhancement / override CSS layers
- whole-page `transform: scale()` for the production SMT layout
- 1920×1080 legacy canvas
- JavaScript layout repair
- MutationObserver used to restore visual structure
- page-specific emergency z-index values
- cross-page CSS borrowing
- duplicated business logic between SMT and SMM
- parallel `app.js` and `app-v2.js` product runtimes
- parallel `styles.css` and `styles-v2.css` override chains

## 7. Acceptance target

### SMT

- Native 1280×800 landscape
- no clipping of global header, workspace or bottom navigation
- no browser-scale dependency
- minimum 44px primary touch target unless a documented compact secondary control is approved

### SMM

- native mobile composition
- iPhone safe-area support
- portrait-first operation with intentional landscape support where required
- not a scaled-down SMT canvas
- approved five-item bottom navigation
- fixed primary action must remain above the device safe area and keyboard
- no permanent side cart

### iPhone SMT QA viewer

A separate QA-only viewer may scale and pan the complete 1280×800 SMT canvas. It must not be part of the production SMT or SMM shell.

## 8. Build order

1. Native tokens and reset
2. Shared application shell contract
3. SMT 1280×800 shell
4. SMM mobile shell
5. QA viewer
6. Shared navigation and status components
7. Shared route and capability registry
8. Order page reconstruction
9. Mobile product and cart presentation
10. Checkout
11. Orders
12. Dine
13. Soldout
14. More and dashboard
15. Reports, reconciliation and system status
16. API, print and device integration verification
17. Sunmi T2S and iPhone acceptance
