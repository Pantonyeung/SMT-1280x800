import { createNavigation, setNavigationRoute } from '../../components/navigation.js';
import { startStatusClock } from '../../components/status-clock.js';

const SMT_ROUTES = Object.freeze(['order', 'orders', 'dine', 'soldout', 'more']);
const navigationSlot = document.getElementById('navigation-slot');
const featureSlot = document.getElementById('feature-slot');
const clock = document.querySelector('[data-role="clock"]');

let activeRoute = 'order';
let navigation;

function selectRoute(routeId) {
  if (!SMT_ROUTES.includes(routeId) || !featureSlot || !navigation) return;

  activeRoute = routeId;
  featureSlot.dataset.route = routeId;
  featureSlot.setAttribute('aria-label', `${routeId} 功能區`);
  setNavigationRoute(navigation, routeId);
  featureSlot.focus({ preventScroll: true });
}

if (navigationSlot) {
  navigation = createNavigation({
    routes: SMT_ROUTES,
    activeRoute,
    className: 'smt-navigation',
    onSelect: selectRoute,
  });
  navigationSlot.append(navigation);
}

if (clock instanceof HTMLElement) startStatusClock(clock);
selectRoute(activeRoute);
