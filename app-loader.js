const stage=document.getElementById('stage');
const floor=document.getElementById('preview-floor');
const toolbar=document.getElementById('preview-toolbar');
const frame=document.getElementById('page');
const hud=document.getElementById('device-hud');
const hudDetail=document.getElementById('device-hud-detail');
const routes={order:'pages/order/index.html',checkout:'pages/checkout/index.html',orders:'pages/orders/index.html',dine:'pages/dine/index.html',soldout:'pages/soldout/index.html',more:'pages/more/index.html'};
const BUILD='smt-t2s-1280x800-iphone-qa.01';
const TARGET_WIDTH=1280;
const TARGET_HEIGHT=800;
let current='';
let childReady=false;
let loadTimer=0;
let watchdogTimer=0;
let loadSeq=0;
let previewScale=1;
let previewMode='fit';

function viewportSize(){const viewport=window.visualViewport;return{width:Math.round(viewport?.width||window.innerWidth),height:Math.round(viewport?.height||window.innerHeight)};}
function clamp(value,min,max){return Math.min(max,Math.max(min,value));}
function isNativeT2S(size){return size.width===TARGET_WIDTH&&size.height===TARGET_HEIGHT;}
function isPhoneLike(size){return Math.min(size.width,size.height)<700;}
function toolbarHeight(){return toolbar?.getBoundingClientRect().height||64;}
function fitScale(){const size=viewportSize();const top=toolbarHeight();const availableWidth=Math.max(220,size.width-36);const availableHeight=Math.max(220,size.height-top-36);return clamp(Math.min(availableWidth/TARGET_WIDTH,availableHeight/TARGET_HEIGHT),0.18,1);}
function setPreviewScale(nextScale,{keepScroll=false}={}){if(document.documentElement.dataset.previewMode!=='iphone')return;const previous=previewScale||1;const previousLeft=floor.scrollLeft;const previousTop=floor.scrollTop;previewScale=clamp(nextScale,0.18,1.35);stage.style.transform=`scale(${previewScale})`;stage.style.width=TARGET_WIDTH+'px';stage.style.height=TARGET_HEIGHT+'px';const renderedWidth=TARGET_WIDTH*previewScale;const renderedHeight=TARGET_HEIGHT*previewScale;const spareX=Math.max(0,Math.round((floor.clientWidth-renderedWidth-36)/2));const spareY=Math.max(0,Math.round((floor.clientHeight-renderedHeight-36)/2));stage.style.marginLeft=spareX+'px';stage.style.marginRight=spareX+'px';stage.style.marginTop=spareY+'px';stage.style.marginBottom=spareY+'px';floor.style.setProperty('--scaled-width',Math.round(renderedWidth)+'px');floor.style.setProperty('--scaled-height',Math.round(renderedHeight)+'px');if(keepScroll&&previous){floor.scrollLeft=Math.round(previousLeft*(previewScale/previous));floor.scrollTop=Math.round(previousTop*(previewScale/previous));}updateHud();}
function applyViewportMode(){const size=viewportSize();const orientation=size.width>=size.height?'橫屏':'直屏';const native=isNativeT2S(size);const phone=isPhoneLike(size);document.documentElement.dataset.orientation=orientation==='橫屏'?'landscape':'portrait';if(native||!phone){document.documentElement.dataset.previewMode='native';stage.dataset.profile=native?'sunmi-t2s-native':'responsive-landscape';stage.dataset.scale='1';stage.style.transform='none';stage.style.width='100%';stage.style.height='100%';stage.style.margin='0';floor.scrollTo?.(0,0);if(hud)hud.hidden=native;}
else{document.documentElement.dataset.previewMode='iphone';document.documentElement.style.setProperty('--preview-toolbar-height',toolbarHeight()+'px');stage.dataset.profile='iphone-visual-qa';if(previewMode==='fit')setPreviewScale(fitScale());else setPreviewScale(previewScale);if(hud)hud.hidden=false;}
stage.dataset.viewportWidth=String(size.width);stage.dataset.viewportHeight=String(size.height);updateHud();}
function updateHud(){const size=viewportSize();const orientation=size.width>=size.height?'橫屏':'直屏';const mode=document.documentElement.dataset.previewMode;if(hudDetail){hudDetail.textContent=mode==='iphone'?`iPhone ${size.width}×${size.height}｜${orientation}｜顯示 ${Math.round(TARGET_WIDTH*previewScale)}×${Math.round(TARGET_HEIGHT*previewScale)}｜縮放 ${Math.round(previewScale*100)}%｜${BUILD}`:`裝置 ${size.width}×${size.height}（${orientation}）｜原生版面｜基準 ${TARGET_WIDTH}×${TARGET_HEIGHT}｜${BUILD}`;}}
function route(){const key=(location.hash.replace(/^#\/?/,'')||'order').split('?')[0];return routes[key]?key:'order';}
function showLoaderError(message){frame.srcdoc='<!doctype html><html lang="zh-HK"><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0;display:grid;place-items:center;height:100vh;font-family:-apple-system,BlinkMacSystemFont,"PingFang HK",sans-serif;background:#fff8f3;color:#382b24}.card{max-width:520px;padding:28px;border:1px solid #ead9ce;border-radius:16px;background:#fff;text-align:center}.card strong{display:block;font-size:24px;color:#e84b12;margin-bottom:10px}.card button{min-height:48px;margin-top:12px;padding:0 20px;border:0;border-radius:10px;background:#ef5b23;color:#fff;font-weight:800}</style><body><section class="card"><strong>頁面未能載入</strong><p>'+String(message||'請重新整理後再試')+'</p><button onclick="location.reload()">重新載入</button></section></body></html>';}
function load({force=false}={}){const key=route();if(!force&&key===current&&childReady)return;current=key;childReady=false;const seq=++loadSeq;clearTimeout(loadTimer);clearTimeout(watchdogTimer);frame.removeAttribute('srcdoc');frame.style.visibility='visible';frame.style.opacity='1';frame.src='about:blank';const stamp=Date.now();loadTimer=setTimeout(()=>{if(seq!==loadSeq)return;frame.src=routes[key]+'?build='+encodeURIComponent(BUILD)+'&t='+stamp;watchdogTimer=setTimeout(()=>{if(seq===loadSeq&&!childReady){frame.src=routes[key]+'?build='+encodeURIComponent(BUILD)+'&retry='+Date.now();}},1600);},20);}

document.addEventListener('click',event=>{const button=event.target.closest('[data-preview-action]');if(!button)return;const action=button.dataset.previewAction;if(action==='fit'){previewMode='fit';setPreviewScale(fitScale());}else if(action==='native'){previewMode='manual';setPreviewScale(1,{keepScroll:true});}else if(action==='in'){previewMode='manual';setPreviewScale(previewScale+0.08,{keepScroll:true});}else if(action==='out'){previewMode='manual';setPreviewScale(previewScale-0.08,{keepScroll:true});}else if(action==='hud'&&hud){hud.hidden=!hud.hidden;}});
frame.addEventListener('error',()=>showLoaderError('子頁載入失敗，資料仍保存在本機。'));
frame.addEventListener('load',applyViewportMode);
addEventListener('hashchange',()=>load({force:true}));
addEventListener('pageshow',()=>{applyViewportMode();if(!childReady)load({force:true});});
addEventListener('resize',()=>{if(previewMode==='fit')applyViewportMode();else updateHud();},{passive:true});
addEventListener('orientationchange',()=>setTimeout(applyViewportMode,180),{passive:true});
window.visualViewport?.addEventListener('resize',()=>{if(previewMode==='fit')applyViewportMode();else updateHud();},{passive:true});
addEventListener('message',event=>{if(event.source!==frame.contentWindow)return;if(event.data?.type==='morefun:page-ready'){childReady=true;clearTimeout(watchdogTimer);}if(event.data?.type==='morefun:navigate'){const next=String(event.data.route||'order');if(location.hash==='#/'+next)load({force:true});else location.hash='#/'+next;}if(event.data?.type==='morefun:exit-fullscreen'&&document.fullscreenElement)document.exitFullscreen?.();if(event.data?.type==='morefun:set-ui-scale')frame.contentWindow?.postMessage({type:'morefun:ui-scale-disabled',reason:'1280×800 採用原生 layout tokens；iPhone 驗收由外層等比例顯示。'},'*');if(event.data?.type==='morefun:reload-current-page')load({force:true});});
applyViewportMode();
load({force:true});
