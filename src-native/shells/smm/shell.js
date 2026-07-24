import { createNavigation, setNavigationRoute } from '../../components/navigation.js';
import { startStatusClock } from '../../components/status-clock.js';
import { DEMO_CATEGORIES, productsForCategory } from '../../core/demo-catalog.js';
import { createCartStore } from '../../core/cart-store.js';

const MOBILE_ROUTES=Object.freeze(['dashboard','order','orders','dine','more']);
const navigationSlot=document.getElementById('navigation-slot');
const featureSlot=document.getElementById('feature-slot');
const dashboardView=document.getElementById('dashboard-view');
const orderView=document.getElementById('order-view');
const categoryList=document.getElementById('mobile-category-list');
const productList=document.getElementById('mobile-product-list');
const cartBar=document.getElementById('mobile-cart-bar');
const cartItems=document.getElementById('mobile-cart-items');
const cartCount=document.getElementById('mobile-cart-count');
const cartTotal=document.getElementById('mobile-cart-total');
const cartToggle=document.getElementById('mobile-cart-toggle');
const cart=createCartStore();
let activeRoute='dashboard';let activeCategory='popular';let navigation;let cartExpanded=false;

function renderCategories(){categoryList.replaceChildren(...DEMO_CATEGORIES.map((category)=>{const button=document.createElement('button');button.type='button';button.className='smm-category';button.textContent=category.label;button.classList.toggle('is-active',category.id===activeCategory);button.addEventListener('click',()=>{activeCategory=category.id;renderCategories();renderProducts();});return button;}));}
function renderProducts(){productList.replaceChildren(...productsForCategory(activeCategory).map((product)=>{const button=document.createElement('button');button.type='button';button.className='smm-product-card';button.innerHTML=`<div>${product.badge?`<span class="badge">${product.badge}</span>`:''}<strong>${product.name}</strong><small>${product.subtitle}</small></div><b>$${product.price}</b>`;button.addEventListener('click',()=>cart.add(product.id));return button;}));}
function renderCart(state){cartBar.hidden=state.count===0||activeRoute!=='order';cartCount.textContent=`${state.count} 件餐點`;cartTotal.textContent=`$${state.total}`;cartItems.hidden=!cartExpanded||state.count===0;if(!state.items.length){cartItems.replaceChildren();return;}cartItems.replaceChildren(...state.items.map((item)=>{const row=document.createElement('article');row.className='smm-cart-row';row.innerHTML=`<div><strong>${item.name}</strong><small>$${item.lineTotal}</small></div><div class="smm-qty"><button type="button">−</button><b>${item.quantity}</b><button type="button">＋</button></div>`;const[minus,plus]=row.querySelectorAll('button');minus.addEventListener('click',()=>cart.setQuantity(item.id,item.quantity-1));plus.addEventListener('click',()=>cart.setQuantity(item.id,item.quantity+1));return row;}));}
function selectRoute(routeId){if(!MOBILE_ROUTES.includes(routeId)||!navigation)return;activeRoute=routeId;dashboardView.hidden=routeId!=='dashboard';orderView.hidden=routeId!=='order';setNavigationRoute(navigation,routeId);featureSlot.dataset.route=routeId;renderCart(cart.getState());featureSlot.scrollTop=0;featureSlot.focus({preventScroll:true});}
if(navigationSlot){navigation=createNavigation({routes:MOBILE_ROUTES,activeRoute,className:'smm-navigation',onSelect:selectRoute});navigationSlot.append(navigation);}
document.querySelectorAll('[data-route-shortcut]').forEach((button)=>button.addEventListener('click',()=>selectRoute(button.dataset.routeShortcut)));
cartToggle?.addEventListener('click',()=>{cartExpanded=!cartExpanded;cartToggle.textContent=cartExpanded?'收起購物車':'查看購物車';renderCart(cart.getState());});
cart.subscribe(renderCart);renderCategories();renderProducts();const clock=document.querySelector('[data-role="clock"]');if(clock instanceof HTMLElement)startStatusClock(clock);selectRoute(activeRoute);
