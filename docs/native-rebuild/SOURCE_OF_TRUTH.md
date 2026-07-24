# Native Unified Rebuild｜Source of Truth

## 1. Active implementation branch

- Repository: `Pantonyeung/SMT-1280x800`
- Branch: `native-unified-1280x800-v1`
- This branch is a clean native rebuild. Legacy UI code is reference-only.

## 2. Reference hierarchy

### Order page

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

### All non-order pages and overall operational format

Use the earlier complete SMT format as the visual, information-order and workflow reference.

Reference source:

- Repository: `Pantonyeung/morefunos-smt`
- Branch: `feat/smt-order-page-v1`
- Relevant pages: checkout, orders, dine, soldout, more, global status bar, bottom navigation and cross-page operating rhythm.

This source still uses a 1920px logical canvas and runtime scaling. Therefore it is reference-only and must not be copied as layout implementation.

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
- payment and print workflow
- permissions
- component behaviour
- design tokens

Only shell composition and information density may differ.

## 5. Hard prohibitions

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

## 6. Acceptance target

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

### iPhone SMT QA viewer

A separate QA-only viewer may scale and pan the complete 1280×800 SMT canvas. It must not be part of the production SMT or SMM shell.

## 7. Build order

1. Native tokens and reset
2. Shared application shell contract
3. SMT 1280×800 shell
4. SMM mobile shell
5. QA viewer
6. Shared navigation and status components
7. Order page reconstruction
8. Checkout
9. Orders
10. Dine
11. Soldout
12. More
13. API, print and device integration verification
14. Sunmi T2S and iPhone acceptance
