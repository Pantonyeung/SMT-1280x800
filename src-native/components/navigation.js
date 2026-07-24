import { getRoute } from '../core/routes.js';

const ROUTE_MARKS = Object.freeze({
  dashboard: '工',
  order: '點',
  orders: '單',
  dine: '桌',
  soldout: '售',
  more: '多',
});

export function createNavigation({ routes, activeRoute, className = '', onSelect }) {
  const nav = document.createElement('nav');
  nav.className = ['mf-navigation', className].filter(Boolean).join(' ');
  nav.setAttribute('aria-label', '主要功能');

  routes.forEach((routeId) => {
    const route = getRoute(routeId);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mf-navigation__item';
    button.dataset.route = route.id;
    button.setAttribute('aria-label', route.label);

    const mark = document.createElement('span');
    mark.className = 'mf-navigation__mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = ROUTE_MARKS[route.id] ?? route.label.slice(0, 1);

    const label = document.createElement('strong');
    label.className = 'mf-navigation__label';
    label.textContent = route.label;

    button.append(mark, label);
    button.addEventListener('click', () => onSelect?.(route.id));
    nav.append(button);
  });

  setNavigationRoute(nav, activeRoute);
  return nav;
}

export function setNavigationRoute(nav, routeId) {
  nav.querySelectorAll('[data-route]').forEach((button) => {
    const isActive = button.dataset.route === routeId;
    button.classList.toggle('is-active', isActive);
    if (isActive) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}
