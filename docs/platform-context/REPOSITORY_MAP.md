# More Fun Platform｜Repository Map

更新日期：2026-07-24

## 1. Customer Ordering Web

- Repository: `Pantonyeung/morefun-ordering-web`
- Default branch: `main`
- Visibility: private
- Current inspected entry: `index.html`
- Current inspected UI build marker: `20260718-menu-model-scroll-v1`
- Current inspected front-end baseline references: V42DY assets plus later customer live-state and viewport layers
- Current status: active customer PWA and backend integration source

Responsibilities:

- customer menu and product browsing
- cart and order submission
- member-facing experience
- published business state and availability display
- customer PWA and iPhone safe-area behaviour

Notes:

- `main` is confirmed as the default branch, but not automatically declared the final accepted production commit.
- The repository contains Firebase, Apps Script and Worker-related integration history.
- Customer remains independently deployed and must not expose staff or Admin controls.

## 2. Admin

- Repository: `Pantonyeung/morefunos-admin`
- Default branch: `main`
- Visibility: private
- Current inspected commit: `75fe0710f236f679c2725ed6e890b9218e7a93b1`
- Current status: repository initialized; complete feature implementation not yet evidenced

Responsibilities locked by README:

- products
- categories
- options
- combos
- customer-facing content
- prices
- print rules
- publication
- synchronization

Locked development rules:

- Admin, SMT, SMM and Customer stay in independent repositories and deploy independently.
- Formal changes use branch, PR and CI.
- Production Firebase writes remain disabled before staging acceptance.
- Permanent configuration uses draft, validation, preview, publish and rollback.
- Live sold-out and business status are separate from permanent product data.

## 3. SMT Native Rebuild

- Repository: `Pantonyeung/SMT-1280x800`
- Active branch: `native-unified-1280x800-v1`
- Codex reference branch: `agent/upload-smt-1280x800-source`
- Target: native Sunmi T2S 1280×800

## 4. Earlier SMT Operational Reference

- Repository: `Pantonyeung/morefunos-smt`
- Reference branch: `feat/smt-order-page-v1`
- Use: non-order page format, feature order and operating rhythm
- Restriction: legacy 1920px canvas and scaling implementation must not be copied

## 5. SMM

- Repository: `Pantonyeung/morefunos-smm`
- Reference branch: `feat/smm-mobile-v1`
- Package: `morefunos-smm-feat-smm-mobile-v1.zip`
- Target: native iPhone / Android staff operation

## 6. Platform Rule

The repositories remain independently deployed applications, but they must share one platform contract for:

- domain rules
- menu and pricing calculation
- product and option schema
- order identity and state
- payment semantics
- availability and sold-out semantics
- members and promotions
- permissions
- print jobs
- API and sync contracts

Independent repository does not mean duplicated business logic.
