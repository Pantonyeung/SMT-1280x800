# Native Shell Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立零補丁、原生 1280×800 SMT Shell、原生 SMM 手機 Shell、QA Viewer、共用路由能力契約與架構守門測試。

**Architecture:** 新增獨立 `src-native/`，與舊 runtime 完全隔離。Feature 將來只透過 shared contracts 與 shell slots 掛載；SMT、SMM、QA Viewer 只負責裝置排列及能力邊界。第一切片只建立可運行骨架與自動驗證，不搬舊頁面內容。

**Tech Stack:** HTML5、CSS Custom Properties、ES Modules、Node.js built-in test runner／validation scripts，無新增第三方 runtime dependency。

## Global Constraints

- SMT 正式主尺寸為原生 `1280×800` 橫屏。
- SMM 必須係手機原生排列，唔係縮細 SMT。
- QA Viewer 可以縮放 SMT 畫布，但正式 SMT runtime 不可整頁縮放。
- 禁止 `!important`、inline style、restore／override／patch／fix／enhancement CSS。
- 禁止 1920×1080 legacy canvas。
- 禁止 JavaScript 寫入版面 left、top、width、height 作修正。
- 禁止 MutationObserver 修復 UI。
- 主要觸控目標不得低於 44px。
- Customer `main` 為現行基準；Admin `main` 為初始化基準，本切片不改動兩者。

---

## File Structure

```text
src-native/
  index.html                    # profile selector / development entry
  core/
    routes.js                   # shared route registry
    capabilities.js             # device capability profiles
  design-system/
    tokens.css                  # brand/layout/layer/motion tokens
    reset.css                   # global reset and accessibility defaults
    primitives.css              # reusable shell primitives
  shells/
    smt/
      index.html
      shell.css
      shell.js
    mobile/
      index.html
      shell.css
      shell.js
    qa-viewer/
      index.html
      viewer.css
      viewer.js
  shared/
    navigation.js               # shared navigation metadata/render helper
    placeholder-view.js         # temporary feature slot renderer
scripts/
  validate-native-architecture.mjs
  validate-native-layout.mjs
tests/
  native-routes.test.mjs
  native-capabilities.test.mjs
  native-architecture.test.mjs
  native-layout-contract.test.mjs
```

### Task 1: Architecture Guard

**Files:**
- Create: `scripts/validate-native-architecture.mjs`
- Create: `tests/native-architecture.test.mjs`

**Interfaces:**
- Produces: `validateNativeArchitecture(rootDir): { violations: Array<{file:string, rule:string}> }`

- [ ] Write a failing test using a temporary fixture containing `!important`, inline `style=`, `1920px`, `transform: scale(` and forbidden filenames.
- [ ] Run `node --test tests/native-architecture.test.mjs`; expect failure because validator does not exist.
- [ ] Implement recursive UTF-8 scan limited to `src-native/` with rules `no-important`, `no-inline-style`, `no-legacy-canvas`, `no-production-scale`, `no-forbidden-filename`, `no-mutation-observer`.
- [ ] Run the test and confirm PASS.
- [ ] Commit with `test: add native architecture guard`.

### Task 2: Shared Tokens and Reset

**Files:**
- Create: `src-native/design-system/tokens.css`
- Create: `src-native/design-system/reset.css`
- Create: `src-native/design-system/primitives.css`
- Create: `tests/native-layout-contract.test.mjs`

**Interfaces:**
- Produces CSS tokens: `--mf-color-brand`, `--mf-color-brand-soft`, `--mf-color-bg`, `--mf-color-surface`, `--mf-color-text`, `--mf-color-muted`, `--mf-color-line`, `--mf-color-success`, `--mf-color-danger`, `--mf-smt-width`, `--mf-smt-height`, `--mf-smt-header-height`, `--mf-smt-nav-height`, `--mf-touch-target`, and semantic layer tokens.

- [ ] Write tests asserting exact brand values, `1280px`, `800px`, `56px`, `64px`, `44px`, focus-visible styles and reduced-motion query.
- [ ] Run test and confirm FAIL.
- [ ] Implement tokens, reset and primitives without forbidden constructs.
- [ ] Run layout-contract and architecture tests; expect PASS.
- [ ] Commit with `feat: add native design system foundation`.

### Task 3: Route and Capability Contracts

**Files:**
- Create: `src-native/core/routes.js`
- Create: `src-native/core/capabilities.js`
- Create: `src-native/shared/navigation.js`
- Create: `tests/native-routes.test.mjs`
- Create: `tests/native-capabilities.test.mjs`

**Interfaces:**
- Produces `ROUTES`, `getRoute(id)`, `getNavigation(profile)`.
- Produces `CAPABILITY_PROFILES`, `getCapabilities(profile)`.
- Profiles: `smt`, `mobile`, `wide`, `qa`.

- [ ] Test SMT routes `order, checkout, orders, dine, soldout, more` and SMM navigation `dashboard, order, orders, dine, more`.
- [ ] Test capability boundary: SMT `physicalPrint=true`; mobile `physicalPrint=false`, `createPrintJob=true`; qa `production=false`.
- [ ] Run tests and confirm FAIL.
- [ ] Implement immutable registries and defensive errors for unknown ids.
- [ ] Run tests and confirm PASS.
- [ ] Commit with `feat: add shared route and capability contracts`.

### Task 4: SMT Native 1280×800 Shell

**Files:**
- Create: `src-native/shells/smt/index.html`
- Create: `src-native/shells/smt/shell.css`
- Create: `src-native/shells/smt/shell.js`
- Create: `src-native/shared/placeholder-view.js`
- Modify: `scripts/validate-native-layout.mjs`

**Interfaces:**
- Shell regions: `[data-region="header"]`, `[data-region="workspace"]`, `[data-region="navigation"]`.
- `mountPlaceholderView(container, route)` renders temporary route title only.

- [ ] Add static layout validation asserting one grid with rows `56px minmax(0,1fr) 64px`, root reference width/height tokens and no overflow-producing fixed child canvas.
- [ ] Run validator and confirm FAIL.
- [ ] Implement semantic header, workspace and six-route navigation using CSS Grid; no iframe and no page scaling.
- [ ] Implement hash navigation through shared `ROUTES`.
- [ ] Run architecture/layout/tests and confirm PASS.
- [ ] Commit with `feat: add native SMT 1280x800 shell`.

### Task 5: SMM Mobile Shell

**Files:**
- Create: `src-native/shells/mobile/index.html`
- Create: `src-native/shells/mobile/shell.css`
- Create: `src-native/shells/mobile/shell.js`

**Interfaces:**
- Uses `getNavigation('mobile')` and `getCapabilities('mobile')`.
- Regions: mobile header, scrollable main, five-item safe-area navigation.

- [ ] Add layout tests requiring `viewport-fit=cover`, safe-area inset usage, five navigation items, portrait-first flexible width and no SMT width token on production mobile container.
- [ ] Run tests and confirm FAIL.
- [ ] Implement mobile shell with safe-area header/nav, keyboard-safe scrolling, 44px targets and no permanent side cart.
- [ ] Run all tests and confirm PASS.
- [ ] Commit with `feat: add native SMM mobile shell`.

### Task 6: iPhone SMT QA Viewer

**Files:**
- Create: `src-native/shells/qa-viewer/index.html`
- Create: `src-native/shells/qa-viewer/viewer.css`
- Create: `src-native/shells/qa-viewer/viewer.js`

**Interfaces:**
- Loads only `../smt/index.html` in QA context.
- Viewer owns fit scale and pan; SMT child remains 1280×800 native.

- [ ] Add tests requiring QA marker, iframe title, viewer-only transform and prohibition of viewer assets from SMT/mobile entries.
- [ ] Run tests and confirm FAIL.
- [ ] Implement fit-to-screen controls, reset and safe-area HUD using CSS variables scoped to viewer.
- [ ] Run all tests and confirm PASS.
- [ ] Commit with `feat: add iPhone SMT QA viewer`.

### Task 7: Development Entry and Verification

**Files:**
- Create: `src-native/index.html`
- Create: `scripts/validate-native-layout.mjs`
- Modify: `docs/platform-context/IMPLEMENTATION_STATUS.md`

**Interfaces:**
- Development links: SMT, SMM, QA Viewer.
- Validation command: `node scripts/validate-native-architecture.mjs && node scripts/validate-native-layout.mjs && node --test tests/native-*.test.mjs`.

- [ ] Add validator tests for required files and shell contracts.
- [ ] Implement profile entry without automatic device guessing.
- [ ] Run the complete validation command; expect zero violations and all tests PASS.
- [ ] Update status with exact commit and pending browser/device acceptance.
- [ ] Commit with `chore: complete native shell foundation`.

## Acceptance Gate

- SMT shell contract exactly 1280×800 with 56/680/64 vertical allocation.
- SMM works as native portrait mobile shell with safe areas.
- QA Viewer displays complete SMT canvas on iPhone without changing SMT runtime.
- No old UI files imported into `src-native/`.
- Architecture guard reports zero violations.
- All Node tests pass.
- Browser-rendered and physical Sunmi T2S acceptance remain explicit separate gates.
