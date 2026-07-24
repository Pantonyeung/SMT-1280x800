# 1280×800 Native Layout Refactor

## Project structure

- `app-loader.js` owns shell routing and frame lifecycle.
- `shared/page-base.css` owns shared tokens, status bar, navigation, touch targets, dialogs and motion.
- `pages/order/` owns the ordering workspace, cart, product catalogue, drawer and anchored cards.
- `pages/checkout/`, `pages/orders/`, `pages/dine/`, `pages/soldout/` and `pages/more/` own their respective operational screens.

## Removed core legacy dependencies

- The loader no longer applies `transform: scale()` or centres a scaled 1280×800 canvas.
- The loader no longer injects checkout, order, or more-page CSS with `!important` after page render.
- Shared shell no longer declares a 1920px root canvas; it uses 100% of the actual viewport.

## Native layout tokens

| Token | Value | Purpose |
| --- | ---: | --- |
| `--app-width` | 1280px | T2S design reference |
| `--app-height` | 800px | T2S design reference |
| `--shell-header-height` | 56px | Permanent global status bar |
| `--shell-nav-height` | 64px | Permanent five-item bottom navigation |
| `--shell-gutter` | 12px | Shared shell horizontal inset |
| `--panel-gap` | 10px | Major two-panel separation |
| `--touch-target` | 44px | Minimum primary touch target |

## Verification

- `node scripts/validate-ai-context.mjs`: passed.
- `node --check app-loader.js`, `pages/order/page.js`, `pages/checkout/page.js`: passed.
- The project contains no `package.json`, so no build command is available in this supplied ZIP.
- Existing focused layout tests still assert the retired 1920×1080 dimensions and pre-refactor CSS selectors. They require an intentional baseline update before they can represent this 1280×800 acceptance target.

## Remaining acceptance work

The supplied archive includes page-level inline and T2S override styles. They must be consolidated page-by-page and re-baselined with screenshots on a real Sunmi T2S before final device acceptance can be claimed. No business, API, order, payment, print, or storage logic was changed in this refactor slice.
