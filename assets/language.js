(() => {
  const toggle = document.querySelector('.language-toggle');
  const control = document.querySelector('.language-control');
  const menu = document.getElementById('language-menu');
  const options = [...menu.querySelectorAll('[data-language]')];
  const labels = [...document.querySelectorAll('[data-en-label]')].map(element => ({
    element,
    chinese: element.getAttribute('aria-label'),
    english: element.dataset.enLabel
  }));
  const description = document.querySelector('meta[name="description"]');
  const chineseDescription = description.content;
  let language = document.documentElement.lang;

  function render() {
    const english = language === 'en';
    document.documentElement.lang = language;
    for (const label of labels) {
      label.element.setAttribute('aria-label', english ? label.english : label.chinese);
    }
    description.content = english
      ? 'Portcloud is a Developer Service Cloud: ready-to-use services for developers and startup teams. Need a port. Not a server.'
      : chineseDescription;
    toggle.setAttribute('aria-label', english ? 'Language: English' : '语言：中文');
    toggle.title = toggle.getAttribute('aria-label');
    for (const option of options) {
      option.setAttribute('aria-pressed', String(option.dataset.language === language));
    }
  }

  function setMenuOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => setMenuOpen(menu.hidden));
  for (const option of options) {
    option.addEventListener('click', () => {
      language = option.dataset.language;
      render();
      try {
        localStorage.setItem('portcloud-language', language);
      } catch {
        // Persistence is optional; do not block language selection.
      }
      setMenuOpen(false);
      toggle.focus();
    });
  }
  document.addEventListener('click', (event) => {
    if (!control.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  render();
})();
