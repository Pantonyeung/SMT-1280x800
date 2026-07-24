const clock = document.querySelector('[data-role="clock"]');
const navigation = document.querySelector('.smt-navigation');
const featureSlot = document.getElementById('feature-slot');

const routeLabels = Object.freeze({
  order: '點單',
  orders: '訂單',
  dine: '堂食',
  soldout: '售罄',
  more: '更多'
});

function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('zh-HK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());
}

function selectRoute(route) {
  if (!routeLabels[route] || !navigation || !featureSlot) return;

  navigation.querySelectorAll('[data-route]').forEach((button) => {
    const isActive = button.dataset.route === route;
    button.classList.toggle('is-active', isActive);
    if (isActive) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });

  featureSlot.dataset.route = route;
  featureSlot.setAttribute('aria-label', `${routeLabels[route]}功能區`);
}

navigation?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-route]');
  if (!(button instanceof HTMLButtonElement)) return;
  selectRoute(button.dataset.route);
});

updateClock();
setInterval(updateClock, 30_000);
selectRoute('order');
