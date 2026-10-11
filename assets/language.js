(() => {
  const toggle = document.querySelector('.language-toggle');
  const texts = [...document.querySelectorAll('[data-en]')].map(element => ({
    element,
    chinese: [...element.childNodes].map(node => node.cloneNode(true)),
    english: element.dataset.en
  }));
  const labels = [...document.querySelectorAll('[data-en-label]')].map(element => ({
    element,
    chinese: element.getAttribute('aria-label'),
    english: element.dataset.enLabel
  }));
  const description = document.querySelector('meta[name="description"]');
  const chineseDescription = description.content;
  let language = 'zh-CN';
  try {
    if (localStorage.getItem('portcloud-language') === 'en') language = 'en';
  } catch {
    // The switch still works when browser storage is unavailable.
  }

  function render() {
    const english = language === 'en';
    document.documentElement.lang = language;
    for (const text of texts) {
      if (english) text.element.textContent = text.english;
      else text.element.replaceChildren(...text.chinese.map(node => node.cloneNode(true)));
    }
    for (const label of labels) {
      label.element.setAttribute('aria-label', english ? label.english : label.chinese);
    }
    description.content = english
      ? 'Portcloud offers ready-to-use services for independent developers and startup teams. Configure the service you need and leave the infrastructure to Portcloud. Need a port. Not a server.'
      : chineseDescription;
    toggle.textContent = english ? '中文' : 'EN';
    toggle.lang = english ? 'zh-CN' : 'en';
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
  toggle.hidden = false;
})();
