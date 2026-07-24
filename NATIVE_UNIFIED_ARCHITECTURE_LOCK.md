# More Fun SMT／SMM Native Unified Architecture Lock V1

## 1. Branch purpose

This branch is a clean native rebuild.

Codex output is reference-only. The new implementation may reuse verified business rules, data contracts, routes, state transitions, printing requirements and accepted interaction flows, but must not copy the old layout architecture or its corrective layers.

Primary branch:

`native-unified-1280x800-v1`

Reference branch:

`agent/upload-smt-1280x800-source`

## 2. Product family

SMT and SMM must be built from one shared product core.

- SMT: Sunmi T2S cashier/POS presentation, native 1280×800 landscape.
- Desktop/tablet presentation: operational large-screen presentation using the same core and components.
- SMM: ordinary phone application/PWA presentation using the same core, data, state and business rules.
- iPhone visual QA: must be able to open and inspect the SMT 1280×800 presentation without changing the SMT layout contract.

These are not separate products and must not fork business logic.

## 3. Shared-core rule

The following must have one source of truth:

- business rules
- menu and product models
- cart state
- order state
- payment state
- staff and permission state
- printing jobs
- API and sync contracts
- validation and recalculation
- shared components
- design tokens
- navigation model
- accessibility and touch feedback

Only the presentation shell, density and navigation arrangement may vary by device profile.

## 4. Device profiles

### 4.1 SMT native profile

- Exact design viewport: 1280×800 landscape.
- No page-level scale transform.
- No 1920×1080 base canvas.
- Header, workspace and bottom navigation are part of one layout contract.
- Product, cart and operational panels use native CSS grid/flex layout.

### 4.2 Phone/SMM profile

- Uses responsive phone layout, not a scaled-down SMT screen.
- Uses the same components and state, with phone-specific composition.
- Must support iPhone safe areas, Safari visual viewport and PWA installation.
- Touch targets remain operationally usable.

### 4.3 iPhone SMT visual-QA profile

- Displays the exact 1280×800 SMT canvas inside a separate QA viewer.
- The QA viewer may scale the whole canvas for inspection.
- The SMT application itself must remain unscaled and unchanged.
- QA code must not be included in the formal POS runtime or APK entry.

## 5. Zero-patch rule

Forbidden in the new implementation:

- `!important`
- page-level inline style blocks
- restore CSS
- enhancement CSS used as an override layer
- T2S override files placed after a page stylesheet
- JavaScript layout repair
- MutationObserver used to restore visual position
- hardcoded z-index escalation for individual bugs
- fixed coordinates used to pin dialogs to broken parents
- duplicated page-specific copies of shared components
- cross-page CSS imports
- scaling a 1920×1080 implementation to 1280×800

Any exception requires an explicit architecture decision and user approval before implementation.

## 6. Target architecture

```text
src/
  core/
    business/
    data/
    state/
    services/
  design-system/
    tokens/
    components/
    patterns/
  shells/
    smt/
    mobile/
    qa-viewer/
  features/
    order/
    checkout/
    orders/
    dine/
    soldout/
    more/
```

The exact technology may follow the existing runnable baseline, but ownership boundaries must match this architecture.

## 7. Rebuild order

1. Foundation and validation guardrails.
2. Shared design tokens.
3. Shared application shell contract.
4. SMT 1280×800 shell.
5. Mobile/SMM shell.
6. iPhone SMT visual-QA viewer.
7. Shared primitive components.
8. Order feature.
9. Checkout feature.
10. Orders feature.
11. Dine feature.
12. Sold-out feature.
13. More/operations feature.
14. API, print and hardware integration verification.

Each feature is accepted independently before the next feature begins.

## 8. Acceptance gates

A step is not complete until:

- no forbidden patch patterns are introduced;
- the 1280×800 SMT view has no horizontal or vertical overflow;
- top and bottom shell regions remain stable;
- touch targets and modal interactions are usable;
- the same business state works in SMT and SMM presentations;
- iPhone can inspect the SMT canvas through the QA viewer;
- automated structure checks pass;
- visual acceptance is recorded.

## 9. Current phase

Current phase: **Foundation only**.

No old page CSS, inline overrides, restore files or enhancement layers are to be moved into the new architecture. The next implementation step is to create the clean source boundary and automated zero-patch validation before building the first shell.
