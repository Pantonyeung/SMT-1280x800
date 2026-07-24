# More Fun Platform｜Implementation Status

日期：2026-07-24

## 已確認來源

| 產品 | Repository | 基準 | 狀態 |
|---|---|---|---|
| Customer Ordering Web | `Pantonyeung/morefun-ordering-web` | `main` | 現行運行基準；暫不重寫 UI |
| Admin | `Pantonyeung/morefunos-admin` | `main` | 初始化基準；正式功能尚未完成 |
| SMT Native Rebuild | `Pantonyeung/SMT-1280x800` | `native-unified-1280x800-v1` | 現行實作分支 |
| SMT Codex Reference | `Pantonyeung/SMT-1280x800` | `agent/upload-smt-1280x800-source` | 點單功能與流程參考 |
| SMT Legacy Format Reference | `Pantonyeung/morefunos-smt` | `feat/smt-order-page-v1` | 非點單頁格式與操作節奏參考 |
| SMM Reference | `Pantonyeung/morefunos-smm` | `feat/smm-mobile-v1` | 手機流程、路由與操作參考 |

## 平台決定

- 四個產品維持獨立網站／PWA／APK 與獨立部署。
- 共用同一套 Domain Rules、Data Contracts、API、Pricing、Order Identity、Permissions、Print Job Contract。
- Customer `main` 記為現行基準。
- Admin `main` 記為初始化基準。
- 現階段立即開始 SMT 與 SMM Native Foundation。
- Customer 與 Admin 只納入平台 Context Pack，不在本切片改動其 UI。

## 當前切片

`Native Shell Foundation V1`

範圍：

1. Design tokens
2. Reset
3. Shared route/capability contract
4. SMT 1280×800 shell
5. SMM mobile shell
6. iPhone SMT QA viewer
7. Architecture guard
8. Foundation tests

## 未開始

- SMT 點單頁重建
- SMM 手機點單頁重建
- Checkout／Orders／Dine／Soldout／More
- Firebase／Worker／Sheet 正式接入
- Printer bridge
- Customer Shared Core migration
- Admin 功能實作
