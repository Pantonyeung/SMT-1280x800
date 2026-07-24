const page = document.querySelector('.qa-page');
const frame = document.getElementById('qa-frame');
const interactionToggle = document.getElementById('interaction-toggle');
const targetButtons = [...document.querySelectorAll('[data-target]')];

function setTarget(target) {
  if (!(frame instanceof HTMLIFrameElement)) return;
  if (!target.startsWith('/') || target.includes('native-qa-viewer.html')) return;

  frame.src = target;
  targetButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.target === target);
  });

  const url = new URL(window.location.href);
  url.searchParams.set('target', target);
  window.history.replaceState(null, '', url);
}

function setInteraction(enabled) {
  page?.classList.toggle('is-interactive', enabled);
  if (!(interactionToggle instanceof HTMLButtonElement)) return;

  interactionToggle.setAttribute('aria-pressed', String(enabled));
  interactionToggle.textContent = enabled ? '操作模式' : '檢查模式';
}

targetButtons.forEach((button) => {
  button.addEventListener('click', () => setTarget(button.dataset.target ?? '/index.html'));
});

interactionToggle?.addEventListener('click', () => {
  const enabled = interactionToggle.getAttribute('aria-pressed') !== 'true';
  setInteraction(enabled);
});

const requestedTarget = new URL(window.location.href).searchParams.get('target');
setTarget(requestedTarget?.startsWith('/') ? requestedTarget : '/index.html');
setInteraction(false);
