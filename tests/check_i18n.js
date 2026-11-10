'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const dictionaryContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/translations.js'), 'utf8'), dictionaryContext);
const dictionary = dictionaryContext.window.portfolioTranslations;
assert.equal(Object.keys(dictionary).length, 616);
for (const [source, values] of Object.entries(dictionary)) {
  for (const lang of ['zh-Hans', 'ms']) {
    assert.ok(values[lang]?.trim(), `${source}: missing ${lang}`);
    assert.deepEqual([...values[lang].matchAll(/\{\w+\}/g)].map(x => x[0]).sort(),
      [...source.matchAll(/\{\w+\}/g)].map(x => x[0]).sort(), `${source}: placeholders`);
  }
}

function fixture({ query = '', saved = null, blocked = false } = {}) {
  const nodes = ['  Curious mind.\n', 'Language'].map(data => ({ data, parentElement: { closest: () => null } }));
  const attributes = { alt: 'Hoong Wei Jun smiling in front of the Shanghai skyline' };
  const image = { getAttribute: key => attributes[key], setAttribute: (key, value) => { attributes[key] = value; } };
  const label = { hidden: true };
  const listeners = {};
  const select = { value: 'en', closest: () => label, addEventListener: (event, fn) => { listeners[event] = fn; } };
  const location = new URL('https://example.com/index.html' + query + '#work');
  const link = { origin: location.origin, pathname: '/projects/designs.html', href: 'projects/designs.html#examples',
    getAttribute() { return this.href; }, setAttribute(key, value) { this[key] = value; } };
  const anchor = { origin: location.origin, pathname: '/index.html', href: '#work',
    getAttribute() { return this.href; }, setAttribute(key, value) { this[key] = value; } };
  let index = -1, stored = saved, events = 0;
  const document = {
    documentElement: { lang: 'en' },
    getElementById: () => select,
    createTreeWalker: () => ({ nextNode() { return ++index < nodes.length; }, get currentNode() { return nodes[index]; } }),
    querySelectorAll: selector => selector === '*' ? [image] : selector === 'a[href]' ? [link, anchor] : []
  };
  const context = { document, location, URL, Event, NodeFilter: { SHOW_TEXT: 4 },
    localStorage: { getItem() { if (blocked) throw Error('Storage disabled'); return stored; }, setItem(key,value) { if (blocked) throw Error('Storage disabled'); stored = value; } },
    history: { replaceState(a,b,url) { location.href = url.href; } },
    window: { portfolioTranslations: dictionary, dispatchEvent() { events++; } }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/i18n.js'), 'utf8'), context);
  return { nodes, attributes, label, select, document, link, anchor, location, context,
    stored: () => stored, events: () => events,
    choose(value) { select.value = value; listeners.change(); } };
}
const f = fixture();
assert.equal(f.document.documentElement.lang, 'en');
assert.equal(f.label.hidden, false);
f.choose('zh-Hans');
assert.equal(f.nodes[0].data, '  保持好奇。\n');
assert.equal(f.attributes.alt, dictionary['Hoong Wei Jun smiling in front of the Shanghai skyline']['zh-Hans']);
assert.equal(f.stored(), 'zh-Hans');
assert.equal(f.location.hash, '#work');
assert.equal(f.location.searchParams.get('lang'), 'zh-Hans');
assert.equal(f.link.href, '/projects/designs.html?lang=zh-Hans#examples');
assert.equal(f.anchor.href, '#work');
assert.equal(f.context.window.portfolioI18n.t('{alt} ({current} of {total})', { alt: '花园', current: 2, total: 5 }), '花园（第2张，共5张）');
f.choose('ms');
assert.equal(f.nodes[0].data, '  Minda ingin tahu.\n');
f.choose('en');
assert.equal(f.nodes[0].data, '  Curious mind.\n');
assert.equal(f.events(), 4);
assert.equal(fixture({ saved: 'ms' }).document.documentElement.lang, 'ms');
assert.equal(fixture({ query: '?lang=zh-Hans', saved: 'ms' }).document.documentElement.lang, 'zh-Hans');
assert.equal(fixture({ query: '?lang=invalid', saved: 'ms' }).document.documentElement.lang, 'en');
assert.equal(fixture({ saved: 'invalid' }).document.documentElement.lang, 'en');
const noStorage = fixture({ blocked: true });
noStorage.choose('ms');
assert.equal(noStorage.document.documentElement.lang, 'ms');
assert.equal(noStorage.link.href, '/projects/designs.html?lang=ms#examples');

for (const [route, section] of [['earth-fest-penang.html','penang'], ['lijiang-earth-fest.html','lijiang']]) {
  let redirected;
  const canonical = `https://example.com/projects/hanwang-forum.html#${section}`;
  const script = fs.readFileSync(path.join(root, 'assets/redirect.js'), 'utf8');
  vm.runInNewContext(script, { URL, document: { querySelector: () => ({ href: canonical }) },
    location: { href: `https://example.com/projects/${route}?lang=zh-Hans`, replace: url => { redirected = url; } } });
  assert.equal(redirected, canonical.replace('#', '?lang=zh-Hans#'));
}
console.log('PASS: 616 complete translation pairs; switching, persistence, URL precedence, fallback, blocked storage, attributes, anchors, interpolation and event redirects.');
