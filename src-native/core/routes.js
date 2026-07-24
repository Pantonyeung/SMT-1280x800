export const ROUTES = Object.freeze({
  dashboard: Object.freeze({ id: 'dashboard', label: '工作台', profiles: ['mobile', 'wide'] }),
  order: Object.freeze({ id: 'order', label: '點單', profiles: ['smt', 'mobile', 'wide', 'qa'] }),
  checkout: Object.freeze({ id: 'checkout', label: '結帳', profiles: ['smt', 'mobile', 'wide', 'qa'] }),
  orders: Object.freeze({ id: 'orders', label: '訂單', profiles: ['smt', 'mobile', 'wide', 'qa'] }),
  dine: Object.freeze({ id: 'dine', label: '堂食', profiles: ['smt', 'mobile', 'wide', 'qa'] }),
  soldout: Object.freeze({ id: 'soldout', label: '售罄', profiles: ['smt', 'mobile', 'wide', 'qa'] }),
  more: Object.freeze({ id: 'more', label: '更多', profiles: ['smt', 'mobile', 'wide', 'qa'] }),
});

export function getRoute(id) {
  const route = ROUTES[id];
  if (!route) throw new Error(`Unknown route: ${id}`);
  return route;
}

export function getRoutesForProfile(profile) {
  return Object.values(ROUTES).filter((route) => route.profiles.includes(profile));
}
