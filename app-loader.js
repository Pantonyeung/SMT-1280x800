const stage=document.getElementById('stage');
const frame=document.getElementById('page');
const hud=document.getElementById('device-hud');
const hudDetail=document.getElementById('device-hud-detail');
const routes={order:'pages/order/index.html',checkout:'pages/checkout/index.html',orders:'pages/orders/index.html',dine:'pages/dine/index.html',soldout:'pages/soldout/index.html',more:'pages/more/index.html'};
const BUILD='smt-t2s-1280x800-native.41';
const TARGET_WIDTH=1280;
const TARGET_HEIGHT=800;
let current='';
let childReady=false;
let loadTimer=0;
let watchdogTimer=0;
let loadSeq=0;

function viewportSize(){const viewport=window.visualViewport;return{width:Math.round(viewport?.width||window.innerWidth),height:Math.round(viewport?.height||window.innerHeight)};}
function applyT2SViewport(){const size=viewportSize();const orientation=size.width>=size.height?'橫屏':'直屏';const exact=size.width===TARGET_WIDTH&&size.height===TARGET_HEIGHT;document.documentElement.dataset.orientation=orientation==='橫屏'?'landscape':'portrait';document.documentElement.dataset.previewMode='native';stage.dataset.profile=exact?'sunmi-t2s-native':'responsive-landscape';stage.dataset.viewportWidth=String(size.width);stage.dataset.viewportHeight=String(size.height);stage.dataset.scale='1';if(hud&&hudDetail){hud.hidden=exact;hudDetail.textContent='裝置 '+size.width+'×'+size.height+'（'+orientation+'）｜原生響應式版面，沒有整頁縮放｜基準 '+TARGET_WIDTH+'×'+TARGET_HEIGHT+'｜版本 '+BUILD;}}
function route(){const key=(location.hash.replace(/^#\/?/,'')||'order').split('?')[0];return routes[key]?key:'order';}
function showLoaderError(message){frame.srcdoc='<!doctype html><html lang="zh-HK"><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0;display:grid;place-items:center;height:100vh;font-family:-apple-system,BlinkMacSystemFont,"PingFang HK",sans-serif;background:#fff8f3;color:#382b24}.card{max-width:520px;padding:28px;border:1px solid #ead9ce;border-radius:16px;background:#fff;text-align:center}.card strong{display:block;font-size:24px;color:#e84b12;margin-bottom:10px}.card button{min-height:48px;margin-top:12px;padding:0 20px;border:0;border-radius:10px;background:#ef5b23;color:#fff;font-weight:800}</style><body><section class="card"><strong>頁面未能載入</strong><p>'+String(message||'請重新整理後再試')+'</p><button onclick="location.reload()">重新載入</button></section></body></html>';}
function load({force=false}={}){const key=route();if(!force&&key===current&&childReady)return;current=key;childReady=false;const seq=++loadSeq;clearTimeout(loadTimer);clearTimeout(watchdogTimer);frame.removeAttribute('srcdoc');frame.style.visibility='visible';frame.style.opacity='1';frame.src='about:blank';const stamp=Date.now();loadTimer=setTimeout(()=>{if(seq!==loadSeq)return;frame.src=routes[key]+'?build='+encodeURIComponent(BUILD)+'&t='+stamp;watchdogTimer=setTimeout(()=>{if(seq===loadSeq&&!childReady){frame.src=routes[key]+'?build='+encodeURIComponent(BUILD)+'&retry='+Date.now();}},1600);},20);}

frame.addEventListener('error',()=>showLoaderError('子頁載入失敗，資料仍保存在本機。'));
frame.addEventListener('load',applyT2SViewport);
addEventListener('hashchange',()=>load({force:true}));
addEventListener('pageshow',()=>{applyT2SViewport();if(!childReady)load({force:true});});
addEventListener('resize',applyT2SViewport,{passive:true});
addEventListener('orientationchange',()=>setTimeout(applyT2SViewport,120),{passive:true});
addEventListener('message',event=>{if(event.source!==frame.contentWindow)return;if(event.data?.type==='morefun:page-ready'){childReady=true;clearTimeout(watchdogTimer);}if(event.data?.type==='morefun:navigate'){const next=String(event.data.route||'order');if(location.hash==='#/'+next)load({force:true});else location.hash='#/'+next;}if(event.data?.type==='morefun:exit-fullscreen'&&document.fullscreenElement)document.exitFullscreen?.();if(event.data?.type==='morefun:set-ui-scale')frame.contentWindow?.postMessage({type:'morefun:ui-scale-disabled',reason:'1280×800 採用原生 layout tokens；請使用瀏覽器裝置縮放檢查細節。'},'*');if(event.data?.type==='morefun:reload-current-page')load({force:true});});
applyT2SViewport();
load({force:true});
