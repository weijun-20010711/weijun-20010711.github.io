# Hoong Wei Jun portfolio

A light, colorful clay-style portfolio built with static HTML, CSS and JavaScript. Open index.html or serve this folder with any static web server. No installation or build step is required.

## Editing

- index.html: static personal introduction, real portrait, background, work and contact links.
- projects/*.html: case studies, visual communication and preserved event redirects.
- assets/site.css: shared layout and native component structure.
- assets/clay.css: canonical light palette, Nunito/DM Sans type, soft surfaces and responsive styling.
- assets/site.js: menu, project stages, evidence viewer, active navigation and email copying.
- assets/i18n.js: language selection, saved preference and language-preserving page links.
- assets/translations.js: English source strings with Simplified Chinese and Bahasa Malaysia translations.
- assets/redirect.js: preserves language parameters on the two older event routes.
- assets/previews/: optimized WebP previews with source provenance.
- assets/images/: original photographs, designs and evidence documents, preserved.
- DESIGN.md and .impeccable/design.json: current design system.

The site stays light, including when the visitor's system uses dark mode. The landing page has no video, typing effect, drifting backgrounds or spatial hover/focus movement. Color and pressed-state feedback remain. The hero uses an existing real portrait.

The evidence viewer supports Previous/Next, arrow keys, Close and Escape and restores focus to its image link. Original image links work without JavaScript. Project-stage buttons update associated content. Email copying has status feedback and a visible email-link fallback.

Nunito and DM Sans are self-hosted with their licenses. Professional claims, CV, contact links and route names are preserved.

## Verification

Run python tests/check_site.py to check local files, anchor targets, IDs, image metadata, button types, shared styling, required light theme and absence of removed landing video controls. Browser checks cover desktop/mobile layouts across five content pages. Lighthouse scores were not measured.

Run node tests/check_i18n.js to check translation completeness, language switching, saved preferences, URL precedence, invalid-language fallback, unavailable storage, text/attribute restoration, placeholders and old event redirects. The site check also verifies that every English text/description in all five content pages has a dictionary entry.

## Languages

The header selector offers English, 中文 (Simplified Chinese) and Bahasa Malaysia. English is the default. The selection is stored locally when available and carried in page links, such as index.html?lang=zh-Hans#work or projects/jiazi-village.html?lang=ms. Switching keeps the current section, project stage and image. An explicit URL language overrides the saved preference; an unsupported URL language falls back to English. If JavaScript is disabled, the original English pages and links remain available.

To change copy, update both the English HTML and its corresponding English-keyed entry in assets/translations.js. Include translated image descriptions, metadata and data-* strings used by interactive controls. The tests catch missing entries. All translations are bundled with the site; there are no translation API calls, keys, packages or build steps.

Original evidence images, embedded artwork text, linked documents and the CV retain their original languages. Language URLs use client-side translation; this change does not create separately indexed, server-rendered language pages.

## Publishing

Extract the changes archive over a checkout of weijun-20010711/weijun-20010711.github.io, review and commit on a review branch. Keep existing original assets. This local delivery does not change the live site.

Earlier motion files were archived recoverably in this chat's work/previous-delivery folder and do not ship.
