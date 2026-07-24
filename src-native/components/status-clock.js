export function startStatusClock(element, { locale = 'zh-HK', intervalMs = 30_000 } = {}) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Status clock requires an HTMLElement');
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const render = () => {
    element.textContent = formatter.format(new Date());
  };

  render();
  const timer = window.setInterval(render, intervalMs);
  return () => window.clearInterval(timer);
}
