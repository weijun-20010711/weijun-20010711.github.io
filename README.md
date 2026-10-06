# Hoong Wei Jun portfolio

A light, colorful clay-style portfolio built with static HTML, CSS and JavaScript. Open index.html or serve this folder with any static web server. No installation or build step is required.

## Editing

- index.html: static personal introduction, real portrait, background, work and contact links.
- projects/*.html: case studies, visual communication and preserved event redirects.
- assets/site.css: shared layout and native component structure.
- assets/clay.css: canonical light palette, Nunito/DM Sans type, soft surfaces and responsive styling.
- assets/site.js: menu, project stages, evidence viewer, active navigation and email copying.
- assets/previews/: optimized WebP previews with source provenance.
- assets/images/: original photographs, designs and evidence documents, preserved.
- DESIGN.md and .impeccable/design.json: current design system.

The site stays light, including when the visitor's system uses dark mode. The landing page has no video, typing effect, drifting backgrounds or spatial hover/focus movement. Color and pressed-state feedback remain. The hero uses an existing real portrait.

The evidence viewer supports Previous/Next, arrow keys, Close and Escape and restores focus to its image link. Original image links work without JavaScript. Project-stage buttons update associated content. Email copying has status feedback and a visible email-link fallback.

Nunito and DM Sans are self-hosted with their licenses. Professional claims, CV, contact links and route names are preserved.

## Verification

Run python tests/check_site.py to check local files, anchor targets, IDs, image metadata, button types, shared styling, required light theme and absence of removed landing video controls. Browser checks cover desktop/mobile layouts across five content pages. Lighthouse scores were not measured.

## Publishing

Extract the changes archive over a checkout of weijun-20010711/weijun-20010711.github.io, review and commit on a review branch. Keep existing original assets. This local delivery does not change the live site.

Earlier motion files were archived recoverably in this chat's work/previous-delivery folder and do not ship.
