import { createNavigation, setNavigationRoute } from '../../components/navigation.js';
import { startStatusClock } from '../../components/status-clock.js';
import { DEMO_CATEGORIES, productsForCategory } from '../../core/demo-catalog.js';
import { createCartStore } from '../../core/cart-store.js';

const SMT_ROUTES = Object.freeze(['order','orders','dine','soldout','more']);
const navigationSlot = document.getElementById('navigation-slot');
const featureSlot = document.getElementById('feature-slot');
const categoryList = document.getElementById('category-list');
const productGrid = document.getElementById('product-grid');
const productHeading = document.getElementById('product-heading');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const cart = createCartStore();
let activeRoute = 'order';
let activeCategory = 'popular';
let navigation;

function renderCategories(){
  categoryList.replaceChildren(...DEMO_CATEGORIES.map((category)=>{
    const button=document.createElement('button');button.type='button';button.className='smt-category';button.textContent=category.label;button.classList.toggle('is-active',category.id===activeCategory);button.addEventListener('click',()=>{activeCategory=category.id;renderCategories();renderProducts();});return button;
  }));
}
function renderProducts(){
  const category=DEMO_CATEGORIES.find((item)=>item.id===activeCategory);productHeading.textContent=category?.label??'產品';
  productGrid.replaceChildren(...productsForCategory(activeCategory).map((product)=>{
    const button=document.createElement('button');button.type='button';button.className='smt-product-card';button.innerHTML=`${product.badge?`<span class="badge">${product.badge}</span>`:''}<strong>${product.name}</strong><small>${product.subtitle}</small><b>$${product.price}</b>`;button.addEventListener('click',()=>cart.add(product.id));return button;
  }));
}
function renderCart(state){
  cartCount.textContent=String(state.count);cartTotal.textContent=`$${state.total}`;checkoutButton.disabled=state.count===0;
  if(!state.items.length){cartItems.innerHTML='<p class="smt-empty">尚未加入餐點</p>';return;}
  cartItems.replaceChildren(...state.items.map((item)=>{
    const row=document.createElement('article');row.className='smt-cart-row';row.innerHTML=`<div><strong>${item.name}</strong><small>$${item.lineTotal}</small></div><div class="smt-qty"><button type="button" aria-label="減少">−</button><b>${item.quantity}</b><button type="button" aria-label="增加">＋</button></div>`;
    const [minus,plus]=row.querySelectorAll('button');minus.addEventListener('click',()=>cart.setQuantity(item.id,item.quantity-1));plus.addEventListener('click',()=>cart.setQuantity(item.id,item.quantity+1));return row;
  }));
}
function selectRoute(routeId){if(!SMT_ROUTES.includes(routeId)||!navigation)return;activeRoute=routeId;setNavigationRoute(navigation,routeId);featureSlot.dataset.route=routeId;featureSlot.focus({preventScroll:true});}
if(navigationSlot){navigation=createNavigation({routes:SMT_ROUTES,activeRoute,className:'smt-navigation',onSelect:selectRoute});navigationSlot.append(navigation);}
document.getElementById('clear-cart')?.addEventListener('click',()=>cart.clear());
cart.subscribe(renderCart);renderCategories();renderProducts();
const clock=document.querySelector('[data-role="clock"]');if(clock instanceof HTMLElement)startStatusClock(clock);selectRoute(activeRoute);
