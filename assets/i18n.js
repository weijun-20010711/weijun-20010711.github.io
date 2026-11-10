'use strict';

(() => {
  const dictionary = window.portfolioTranslations;
  const select = document.getElementById('site-language');
  if (!dictionary || !select) return;
  const languages = ['en', 'zh-Hans', 'ms'];
  const storageKey = 'portfolio-language';
  let language = 'en';
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const supported = value => languages.includes(value);

  function t(source, variables = {}) {
    const translated = dictionary[normalize(source)]?.[language] ?? source;
    return translated.replace(/\{(\w+)\}/g, (match, key) => variables[key] ?? match);
  }

  // Keep the original nodes and attributes: switching never rebuilds links or controls.
  const textNodes = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement.closest('script, style, option, [translate="no"]') && dictionary[normalize(node.data)]) {
      textNodes.push([node, node.data]);
    }
  }
  const attributes = [];
  const names = ['alt', 'aria-label', 'data-title', 'data-copy', 'data-stage', 'data-proof1', 'data-proof2', 'data-proof3', 'data-alt'];
  document.querySelectorAll('*').forEach(element => {
    names.forEach(name => {
      const source = element.getAttribute(name);
      if (source && dictionary[normalize(source)]) attributes.push([element, name, source]);
    });
  });
  document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]').forEach(element => {
    attributes.push([element, 'content', element.content]);
  });
  const pageLinks = [...document.querySelectorAll('a[href]')].filter(link =>
    !link.getAttribute('href').startsWith('#') &&
    link.origin === location.origin && /\.html$/.test(link.pathname)
  ).map(link => [link, link.getAttribute('href')]);

  function apply(value, remember = false) {
    language = supported(value) ? value : 'en';
    document.documentElement.lang = language;
    textNodes.forEach(([node, source]) => {
      node.data = source.match(/^\s*/)[0] + t(normalize(source)) + source.match(/\s*$/)[0];
    });
    attributes.forEach(([element, name, source]) => element.setAttribute(name, t(source)));
    pageLinks.forEach(([link, source]) => {
      const url = new URL(source, location.href);
      url.searchParams.set('lang', language);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
    select.value = language;
    if (remember) {
      try { localStorage.setItem(storageKey, language); } catch { /* URL still preserves the choice. */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      try { history.replaceState(null, '', url); } catch { /* Local-file previews may restrict history. */ }
    }
    window.dispatchEvent(new Event('portfolio-languagechange'));
  }

  window.portfolioI18n = { t };
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch { /* English remains the fallback. */ }
  const requested = new URL(location.href).searchParams.get('lang');
  const initial = requested === null ? saved : requested;
  apply(supported(initial) ? initial : 'en');
  select.closest('label').hidden = false;
  select.addEventListener('change', () => apply(select.value, true));
})();
