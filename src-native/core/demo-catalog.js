export const DEMO_CATEGORIES = Object.freeze([
  { id: 'popular', label: '人氣' },
  { id: 'riceball', label: '飯團' },
  { id: 'combo', label: '套餐' },
  { id: 'bento', label: '便當' },
  { id: 'snack', label: '小食' },
  { id: 'drink', label: '飲品' },
]);

export const DEMO_PRODUCTS = Object.freeze([
  { id: 'f4', category: 'popular', name: 'F4 招牌紫米飯團', subtitle: '人氣固定配搭', price: 45, badge: '熱賣' },
  { id: 'a-set', category: 'popular', name: '紫米 A 餐', subtitle: '飯團＋小食＋熱飲', price: 58, badge: '套餐' },
  { id: 'bento-12', category: 'popular', name: '肉燥便當', subtitle: '飯底碼 12', price: 52, badge: '便當' },
  { id: 'f1', category: 'riceball', name: 'F1 紫米飯團', subtitle: '固定配搭', price: 41 },
  { id: 'f2', category: 'riceball', name: 'F2 紫米飯團', subtitle: '固定配搭', price: 43 },
  { id: 'f5', category: 'riceball', name: 'F5 紫米飯團', subtitle: '固定配搭', price: 47 },
  { id: 'custom-set', category: 'combo', name: '自選紫米套餐', subtitle: '自由選飯團、小食及飲品', price: 56 },
  { id: 'curry-12', category: 'bento', name: '咖喱便當', subtitle: '飯底碼 C12', price: 54 },
  { id: 'veg-12', category: 'bento', name: '菜飯便當', subtitle: '飯底碼 V12', price: 50 },
  { id: 'wedges', category: 'snack', name: '脆薯角', subtitle: '蜜糖芥末醬', price: 24 },
  { id: 'tea', category: 'drink', name: '台式奶茶', subtitle: '可選甜度及冰量', price: 18 },
  { id: 'lemon-tea', category: 'drink', name: '手打檸檬茶', subtitle: '即叫即製', price: 24 },
]);

export function productsForCategory(categoryId) {
  if (categoryId === 'popular') return DEMO_PRODUCTS.filter((product) => product.badge);
  return DEMO_PRODUCTS.filter((product) => product.category === categoryId);
}

export function getDemoProduct(productId) {
  return DEMO_PRODUCTS.find((product) => product.id === productId) ?? null;
}
