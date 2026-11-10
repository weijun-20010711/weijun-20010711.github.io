from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import re
import json

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids, self.refs, self.images, self.buttons = [], [], [], []
        self.headings = 0
        self.copy = []
        self.skip = 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style', 'option'):
            self.skip += 1
        for name, value in attrs.items():
            if name in ('alt', 'aria-label', 'data-title', 'data-copy', 'data-stage', 'data-proof1', 'data-proof2', 'data-proof3', 'data-alt'):
                self.copy.append(value)
            if tag == 'meta' and name == 'content' and (attrs.get('name') in ('description', 'twitter:title', 'twitter:description') or attrs.get('property') in ('og:title', 'og:description')):
                self.copy.append(value)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.headings += 1
        for name in ('src', 'href', 'data-img', 'poster'):
            if name in attrs:
                self.refs.append(attrs[name])
        if tag == 'img':
            self.images.append(attrs)
        if tag == 'button':
            self.buttons.append(attrs)

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'option'):
            self.skip -= 1

    def handle_data(self, text):
        if not self.skip:
            self.copy.append(text)

def check():
    files = [ROOT / 'index.html', *ROOT.glob('projects/*.html')]
    pages = {path.resolve(): Page(path.read_text(encoding='utf-8')) for path in files}
    errors = []
    dictionary = json.loads((ROOT / 'assets/translations.js').read_text(encoding='utf-8').split('window.portfolioTranslations = ', 1)[1].rstrip(';\n'))
    for path, page in pages.items():
        text = path.read_text(encoding='utf-8')
        if 'http-equiv="refresh"' in text:
            continue
        if page.ids.count('site-language') != 1:
            errors.append(f'{path.name}: expected one language selector')
        for source in page.copy:
            source = re.sub(r'\s+', ' ', source).strip()
            if re.search('[A-Za-z]', source) and source not in dictionary:
                errors.append(f'{path.name}: missing translation: {source}')
        script_order = [text.find(f'assets/{name}.js') for name in ('translations', 'site', 'i18n')]
        if any(position < 0 for position in script_order) or script_order != sorted(script_order):
            errors.append(f'{path.name}: incorrect language script order')
        if page.headings != 1:
            errors.append(f'{path.name}: expected one h1')
        if len(page.ids) != len(set(page.ids)):
            errors.append(f'{path.name}: duplicate IDs')
        for image in page.images:
            if not image.get('alt') or not image.get('width') or not image.get('height'):
                errors.append(f'{path.name}: missing image description or dimensions')
        for button in page.buttons:
            if button.get('type') != 'button':
                errors.append(f'{path.name}: button missing explicit type')
        for ref in page.refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc:
                continue
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            if not target.exists():
                errors.append(f'{path.name}: missing {ref}')
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                errors.append(f'{path.name}: missing anchor {ref}')
        if '<style>' in text:
            errors.append(f'{path.name}: inline stylesheet remains')
        if 'data-theme="light"' not in text:
            errors.append(f'{path.name}: portfolio must use the requested light theme')
        if path.name == 'index.html' and any(marker in text for marker in ('<video', 'film-controls', 'assets/hero.js', 'theme-toggle')):
            errors.append('index.html: removed motion or theme controls returned')
        if path.name == 'jiazi-village.html':
            steps = re.findall(r'<button\b[^>]*class="process-step(?: active)?"[^>]*>(.*?)</button>', text, re.S)
            numbers = [re.search(r'<b>(\d{2})</b>', step) for step in steps]
            if [match.group(1) if match else None for match in numbers] != ['01','02','03','04','05','06','07']:
                errors.append('jiazi-village.html: workflow must display steps 01 through 07 in order')
    assert not errors, '\n'.join(errors)
    print(f'PASS: {len(files)} HTML routes; local links, anchors, image metadata, native controls and shared stylesheet.')

if __name__ == '__main__':
    check()

