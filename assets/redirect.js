'use strict';

// Preserve explicit language links when visiting the older event routes.
const destination = new URL(document.querySelector('link[rel="canonical"]').href);
const requestedLanguage = new URL(location.href).searchParams.get('lang');
if (['en', 'zh-Hans', 'ms'].includes(requestedLanguage)) {
  destination.searchParams.set('lang', requestedLanguage);
}
location.replace(destination.href);
