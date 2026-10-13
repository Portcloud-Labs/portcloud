(() => {
  const toggle = document.querySelector('.language-toggle');
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
      ? 'Portcloud offers ready-to-use services for independent developers and startup teams. Configure the service you need and leave the infrastructure to Portcloud. Need a port. Not a server.'
      : chineseDescription;
    toggle.setAttribute('aria-label', english ? '切换到中文' : 'Switch to English');
  }

  toggle.addEventListener('click', () => {
    language = language === 'en' ? 'zh-CN' : 'en';
    render();
    try {
      localStorage.setItem('portcloud-language', language);
    } catch {
      // Persistence is optional; do not block language selection.
    }
  });
  render();
})();
