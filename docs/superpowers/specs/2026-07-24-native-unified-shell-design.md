# More Fun Native Unified Shell｜設計規格

日期：2026-07-24  
分支：`native-unified-1280x800-v1`

## 1. 目標

建立一套全新、原生、無補丁的 More Fun 營運介面核心。系統同時支援：

- SMT：Sunmi T2S 收銀機版，唯一主尺寸 1280×800 橫屏。
- SMM：iPhone／Android 普通手機應用版，以手機原生排列呈現。
- 大屏營運版：沿用同一核心及元件，使用較寬工作區排列。
- iPhone QA Viewer：只作完整檢查 SMT 1280×800 畫布，不進入正式 SMT 或 SMM runtime。

## 2. 來源優先次序

### 點單頁

功能、流程及商業規則參考 `Pantonyeung/SMT-1280x800` 的 Codex 基準 `agent/upload-smt-1280x800-source`，並保留產品負責人之後對點單頁所作的功能順序修訂。

### 其他頁面

結帳、訂單、堂食、售罄、更多、全域頂欄、底部導航及主要操作節奏，參考 `Pantonyeung/morefunos-smt` 的 `feat/smt-order-page-v1`。

### 只可引用

- 功能範圍
- 商業規則
- 狀態流
- 操作順序
- 資訊層級
- API／資料／打印契約

### 不得引用

- 1920×1080 畫布
- `transform: scale()` 正式版縮放
- 舊 HTML 結構
- 舊 CSS selector 架構
- inline style
- `!important`
- restore／enhancement／override CSS
- JavaScript 版面修正
- MutationObserver UI workaround

## 3. 架構方案

採用「單一核心＋裝置 Shell」：

```text
src/
  core/                 # 商業邏輯、狀態、資料契約
  design-system/        # tokens、reset、primitive、component
  features/             # order、checkout、orders、dine、soldout、more
  shells/
    smt/                 # 1280×800 原生 Shell
    mobile/              # SMM 手機 Shell
    wide/                # 大屏營運 Shell
    qa-viewer/           # iPhone 檢查 SMT 畫布
```

Feature 不得知道自己正被 SMT 或 SMM 使用；Shell 只負責排列、導航及裝置能力。

## 4. 第一實作切片：Native Shell Foundation

本切片只建立骨架，不搬功能頁內容：

1. Design Tokens
   - 品牌色、狀態色、字體、間距、圓角、陰影、motion、touch target。
2. Reset
   - 全域 box sizing、字體、按鈕、輸入、focus、reduced motion。
3. SMT Shell
   - 1280×800 固定設計參考，但使用 CSS layout 原生排列。
   - 56px global header。
   - 64px bottom navigation。
   - 中間 workspace 自動填滿剩餘高度。
4. Mobile Shell
   - Safe Area。
   - 手機頂欄及底部導航。
   - 不縮小 SMT 三欄畫面。
5. QA Viewer
   - 可在 iPhone 顯示完整 1280×800 SMT 畫布。
   - Viewer 可縮放；被檢查的 SMT runtime 不縮放。
6. Route Contract
   - order、checkout、orders、dine、soldout、more。
7. Architecture Guard
   - 檢查 `!important`、inline style、1920px canvas、正式 runtime transform scale、restore／override 檔名。

## 5. SMT 1280×800 Layout Contract

```text
1280 × 800
┌──────────────────────────────────┐
│ Global Header                  56│
├──────────────────────────────────┤
│                                  │
│ Workspace                     680│
│                                  │
├──────────────────────────────────┤
│ Bottom Navigation              64│
└──────────────────────────────────┘
```

Workspace 內頁自行使用 Grid／Flex 分配，不可由 JavaScript量度後寫入 left、top、width 或 height。

## 6. SMM Contract

SMM 與 SMT 共用：

- feature state
- data models
- actions
- validation
- cart／order／payment／print contracts
- design tokens
- reusable components

SMM 只改變：

- navigation arrangement
- column count
- information density
- drawer／sheet presentation
- touch and safe-area behavior

## 7. CSS 規則

- 一個元件只有一個正式樣式來源。
- Page CSS 只描述頁面 layout，不重寫 primitive。
- 不允許跨頁直接引用另一頁 Page CSS。
- 不允許 inline `<style>` 或 `style="..."`。
- 不允許 `!important`。
- 不允許 `restore.css`、`override.css`、`enhancement.css`、`fix.css`、`patch.css`。
- 不允許以 z-index 數字競賽處理 modal；使用 design token layer scale。
- 不允許低於 44px 的主要觸控目標。

## 8. 狀態及 Overlay 規則

- 同一時間只可有一張主卡／主 modal。
- Popover、sheet、dialog 由單一 Overlay Manager 控制。
- Feature 只發出 open／close intent，不直接手動複製 DOM。
- 關閉方式、focus return、scroll lock 由共用元件處理。

## 9. 驗證

第一切片完成時必須通過：

- SMT viewport 1280×800：Header 56、Workspace 680、Nav 64。
- 無水平或垂直溢出。
- iPhone portrait／landscape 可進入 SMM。
- iPhone QA Viewer 可看到完整 SMT 畫布。
- repo guard 對禁用模式零命中。
- keyboard focus 可見。
- reduced-motion 生效。

## 10. 非本切片範圍

- 真實產品資料
- 購物車功能
- 結帳付款
- 訂單狀態
- 打印橋接
- Firebase／Worker／Sheet 整合
- 舊頁面視覺復刻

以上功能會在 Shell Foundation 驗收後，按 Order → Checkout → Orders → Dine → Soldout → More 順序逐頁重建。

## 11. 完成定義

本切片完成不是指畫面與舊版一樣，而是：

- 新架構可以乾淨承載所有頁面。
- SMT、SMM、Wide、QA Viewer 邊界清楚。
- 1280×800 成為真正 layout contract。
- 沒有任何舊補丁或縮放架構進入新核心。
