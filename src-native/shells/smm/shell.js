import { createNavigation, setNavigationRoute } from '../../components/navigation.js';
import { startStatusClock } from '../../components/status-clock.js';

const MOBILE_ROUTES = Object.freeze(['dashboard', 'order', 'orders', 'dine', 'more']);
const navigationSlot = document.getElementById('navigation-slot');
const featureSlot = document.getElementById('feature-slot');
const clock = document.querySelector('[data-role="clock"]');

let activeRoute = 'dashboard';
let navigation;

function selectRoute(routeId) {
  if (!MOBILE_ROUTES.includes(routeId) || !featureSlot || !navigation) return;

  activeRoute = routeId;
  featureSlot.dataset.route = routeId;
  featureSlot.setAttribute('aria-label', `${routeId} 功能區`);
  setNavigationRoute(navigation, routeId);

  if (routeId !== 'dashboard') {
    featureSlot.querySelector('h1')?.replaceChildren(
      document.createTextNode(navigation.querySelector(`[data-route="${routeId}"] .mf-navigation__label`)?.textContent ?? routeId),
    );
  }

  featureSlot.focus({ preventScroll: true });
}

if (navigationSlot) {
  navigation = createNavigation({
    routes: MOBILE_ROUTES,
    activeRoute,
    className: 'smm-navigation',
    onSelect: selectRoute,
  });
  navigationSlot.append(navigation);
}

document.querySelectorAll('[data-route-shortcut]').forEach((button) => {
  button.addEventListener('click', () => selectRoute(button.dataset.routeShortcut));
});

if (clock instanceof HTMLElement) startStatusClock(clock);
selectRoute(activeRoute);
