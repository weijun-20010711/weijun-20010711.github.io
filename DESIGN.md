---
name: Hoong Wei Jun Portfolio
description: A light, lively clay portfolio presenting the person and real project evidence.
colors:
  ink: "#332f3a"
  muted: "#635f69"
  paper: "#f4f1fa"
  card: "#efebf5"
  violet: "#7c3aed"
  pink: "#db2777"
  sky: "#0ea5e9"
  mint: "#10b981"
  line: "#dcd4e8"
  surface: "rgb(255 255 255 / .78)"
  white: "#ffffff"
  button-start: "#8751df"
  button-end: "#6d28d9"
  portrait-pink: "#ffe2ee"
  portrait-blue: "#d9efff"
  operating-blue: "#e6edff"
  operating-pink: "#ffe7f0"
  operating-amber: "#fff1cc"
  story-blue: "#e6f3ff"
  story-pink: "#ffe9f2"
  story-mint: "#e4f5e9"
  work-pink: "#ffeaf2"
  work-blue: "#e7f4ff"
  contact-pink: "#ffe5ef"
  contact-blue: "#e1f2ff"
  viewer-backdrop: "rgb(8 22 14 / .85)"
typography:
  display:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(2.6rem, 4.6vw, 4.3rem)"
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-.025em"
  title:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(1.35rem, 2.4vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontWeight: 500
    lineHeight: 1.65
  hero-introduction:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 500
    lineHeight: 1.65
  action:
    fontFamily: "DM Sans, sans-serif"
    fontSize: ".85rem"
    fontWeight: 700
rounded:
  control: "20px"
  inner: "24px"
  proof: "26px"
  image: "28px"
  card: "32px"
  hero-mobile: "36px"
  frame: "40px"
  portrait-frame: "48px"
  hero-frame: "56px"
spacing:
  action-gap: "14px"
  common-grid-gap: "24px"
  work-gap: "36px"
  content-gap: "40px"
  hero-gap: "42px"
  section-block: "88px"
  mobile-section-block: "60px"
components:
  button-primary:
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  hero-action:
    textColor: "{colors.ink}"
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "12px 17px"
  work-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.frame}"
    padding: "28px"
  process-step:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inner}"
    padding: "20px"
  process-step-selected:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
  contact-path:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "22px 28px"
---

# Design System: Hoong Wei Jun Portfolio

## Overview

The user-pinned clay system makes the portfolio light, vibrant and lively through soft volumes, violet/pink/blue accents, pastel groups and the real person. The homepage is static: the statement “Curious mind. Creative energy. Ideas in action.” appears beside the existing portrait. Professional title, factual projects, original evidence, CV and routes remain the content foundation.

**Key Characteristics:**
- Light lavender ground with charcoal text and violet, pink, blue, mint and amber accents.
- Nunito headings, DM Sans body and large rounded clay surfaces.
- Static homepage personality with useful native menu, evidence and project controls.

The active source is `assets/site.css` for base layout, `assets/clay.css` loaded last for canonical material and theme, and `assets/site.js` for interactions. Content HTML forces `data-theme="light"`. Legacy green/dark/Manrope declarations in the base stylesheet are superseded; they are not current design tokens. Motion assets are archived outside the shipping site. This document records observed implementation and the user's static, light constraints, rather than the earlier video direction.

## Colors

The frontmatter records the active light palette and actual pastel surfaces. The page uses paper, ink and muted for its primary reading layer, translucent white surface for lifted panels and card for inset areas. The inherited CSS name `--green` now means violet; `--lime` aliases violet and `--orange` aliases pink. Pink, sky and mint are declared accents. The landing page varies operating stages, journey/value groups, projects and contact destinations with the recorded blue, pink, mint and amber fills.

Primary actions use `linear-gradient(135deg, #8751df, #6d28d9)` with white text. These are the implemented darker endpoints chosen for readable white contrast. The portrait frame uses `linear-gradient(140deg, #ffe2ee, #d9efff)`. On desktop the second homepage heading line uses an ink/violet/pink text gradient; mobile uses solid violet. Static atmosphere uses violet, pink and sky glows at .11 opacity with 64px blur. The native image viewer keeps its translucent dark backdrop for image inspection; page surfaces remain light.

All content pages are light regardless of system preference. There is no theme-switch control or theme-switch behavior in the active script.

## Typography

Nunito and DM Sans are self-hosted variable fonts with `font-display: swap`; `assets/fonts/nunito-OFL.txt` and `assets/fonts/dmsans-OFL.txt` accompany the files. Nunito declares weights 200–1000; DM Sans declares 100–1000. Both use sans-serif fallbacks.

Headings, section titles, prominent metrics and brand use Nunito with -.025em tracking. H1, h2, h4 and display/metric treatments use weight 900; h3 uses 800 except work headings, which use 900. Body uses DM Sans 500, line-height 1.65 and paragraph max-width 72ch. General h1 retains `clamp(3rem, 6.8vw, 6rem)` at line-height 1.1; case-study h1 retains `clamp(2.8rem, 5.4vw, 4.5rem)`.

The frontmatter display role is the current homepage heading. It becomes `clamp(2.4rem, 4.4vw, 3.7rem)` at 1000px and `clamp(2.25rem, 9.3vw, 3.8rem)` at 720px. Its full text is present immediately, with no typewriter. Homepage introduction uses 1.1rem, changing to 1rem at 1000px, and line-height 1.65. Navigation text uses DM Sans 700; brand is Nunito 900 at 1.6rem, reducing to 1.3rem on mobile. Supporting labels commonly use .75rem–.95rem.

## Layout

The main wrapper remains `min(1200px, calc(100% - 80px))`; section padding is now 88px vertically. At 1000px wrapper side gutters become 24px; at 720px they become 20px and section padding becomes 60px. Existing paired case-study layouts, two-/three-column evidence grids, project sequence controls and galleries retain their responsive content architecture.

The homepage hero is a 1.15fr/.85fr grid with 42px gap, 40px padding, no minimum-height floor and a maximum 1200px width. Its frame has 56px radius. At 1000px gap is 28px and padding 32px. At 720px the layout stacks with 24px gap, 28px/24px padding and 36px frame radius. The real portrait uses 4:5 cover cropping on desktop; mobile uses 5:4 with object-position 50% 65%. Its frame padding changes from 16px to 12px and radius from 40px to 32px.

Navigation floats in a sticky shell with top/margin offset 18px, width `min(1240px, calc(100% - 40px))` and 32px radius. Its inner wrapper has 24px gutters and 76px minimum height. Mobile uses a 12px offset, 12px outer gutters, 28px radius, 16px inner gutters and 64px minimum height. The homepage native details menu remains the small-screen navigation.

Work keeps an asymmetric two-column arrangement with its first project spanning both columns; cards now have 36px grid gaps, 28px padding and 40px corners, reducing to 20px/32px on mobile. Case evidence, metadata, metrics and stages are grouped into clay panels rather than replacing their original routes or source imagery. The visual gallery retains 12-track full/eight/six/four-span arrangements and responsive image grids. Preserve contain cropping for document evidence and cover cropping for photographs.

## Elevation & Depth

The pinned material deliberately uses multi-layer shadows, soft glows, gradients and nested rounded surfaces. Four-layer card, button and deep-frame shadows combine an offset darker lower-right shadow, lighter upper-left shadow and two inset highlights. Pressed surfaces use an inset pair. These are static visual materials on the homepage.

- Card: `16px 16px 32px rgb(160 150 180 / .2), -10px -10px 24px rgb(255 255 255 / .9), inset 6px 6px 12px rgb(139 92 246 / .035), inset -6px -6px 12px rgb(255 255 255 / .95)`.
- Button: `10px 12px 24px rgb(139 92 246 / .25), -6px -6px 16px rgb(255 255 255 / .55), inset 3px 3px 6px rgb(255 255 255 / .4), inset -4px -4px 8px rgb(39 16 62 / .18)`.
- Pressed: `inset 8px 8px 16px #d9d4e3, inset -8px -8px 16px #ffffff`.
- Deep frame: `24px 24px 48px #d7d0e4, -24px -24px 48px #ffffff, inset 8px 8px 18px rgb(139 92 246 / .05), inset -8px -8px 18px rgb(255 255 255 / .8)`.
- Primary pressed: `inset 6px 6px 12px rgb(35 10 70 / .45), inset -6px -6px 12px rgb(238 220 255 / .15)`.

Navigation uses translucent surface and 16px backdrop blur; selected content groups use 12px blur. Atmosphere is fixed behind content and ignores pointer input. The native image dialog occupies the browser top layer. No dark page theme is provided.

## Shapes

Controls use 20px radius. Process and image-stage selectors use 24px; common cards and evidence images use 32px. Frames range from 40px content panels to 48px portrait/closing panels and 56px desktop hero. Smaller nested proof/image shapes use 24px–28px. Mobile reduces large panels to 32px and the hero to 36px. These are rounded clay volumes, superseding the previous 14px uniform system and 999px video-control pills.

## Components

### Actions and contact paths

Shared action links use a 52px minimum height, 14px/22px padding, no border, 20px radius and button shadow. Primary actions use the violet gradient and white text; secondary actions use surface fill and ink text. Homepage hero actions use 48px minimum height, 12px/17px padding and .8rem weight-700 text; their first action is primary. Email copying is available when JavaScript runs and writes accessible feedback; the mailto link remains available if copying fails or JavaScript is absent. Contact paths use 22px/28px padding, surface/pastel fill, card shadow and 20px corners.

All focus-visible controls use a 3px violet outline with 5px offset. Keep actual anchors for routes, original evidence, CV and contact destinations. The skip link appears on keyboard focus.

### Navigation

The rounded floating shell uses ink links, violet hover/current-location text and the card shadow. IntersectionObserver updates homepage current-section state. Choosing a native mobile-menu link closes the details element. There is no theme control and no video header mode switch.

### Work and evidence cards

Work cards and primary content panels use translucent surface, card shadow and generous rounded padding. Homepage projects two and three have pink and blue fills. Evidence, challenge, story, pipeline and metric cards use 32px corners with 28px padding. Images remain the original documentary assets. Artwork galleries use contain and captions rather than invented project visuals. Tags remain unboxed supporting text.

### Project selectors

Process/flow buttons use surface fill, button shadow and 24px corners. Selected steps use card fill and inset pressed shadow. Selection updates active classes, aria-pressed and the associated title/copy/proof text. Image-stage buttons use the primary gradient and white text when selected/hovered, and update the evidence image, alt text and original-image link.

### Image viewer

Original-file links work without JavaScript. With dialog support, ordinary image-link activation opens a native modal with caption, loading/error status, Previous/Next/Close buttons and an original-image link. Modified clicks retain browser behavior. Arrow keys step through images; native Escape closes the dialog and closing restores focus. The viewer uses paper fill, 32px corners and deep-frame shadow; controls use surface fill, button shadow, 20px corners and 44px minimum height. Width remains `min(1100px, 94vw)`, maximum height 94dvh, padding 20px and image maximum height 70dvh.

### Motion constraints

The homepage disables all animation and transition on elements and pseudo-elements. Its work/action/contact hover and button active states have no spatial transform, and work-image hover/focus scaling is disabled. There is no landing video, autoplay, mouse seeking, typewriter or animated glow. Color and pressed-shadow state changes remain immediate, while useful navigation, selectors, dialog controls and email copying remain interactive.

Case pages retain limited CSS interaction feedback: action hover translateY(-4px), work-card hover/focus translateY(-8px), selected control pressed shadows and active scale(.92), plus inherited image hover scaling. Standard button transitions take .2s and work-card transitions .4s using the inherited easing `cubic-bezier(.16, 1, .3, 1)`. Reduced motion disables animations and transitions and suppresses the work-card/button/hero-action transform selectors explicitly listed in the stylesheet. The static homepage rule applies irrespective of motion preference.

## Do's and Don'ts

### Do:
- Do keep all pages light and use the canonical clay stylesheet after the base layout stylesheet.
- Do express the homepage's creative personality with the real portrait, typography, color and static clay material.
- Do retain visible violet focus, native controls, working evidence links and factual project content.
- Do use the documented control, card and frame radii with the actual multi-layer shadows.

### Don't:
- Don't reintroduce video, typewriter, animations, transitions or spatial hover movement on the landing page.
- Don't restore a dark theme or theme-switch control.
- Don't promote legacy green, Manrope or pill tokens back into the active clay system.
- Don't invent professional claims, credentials, testimonials or project evidence.

The Content Engine case-study opening uses a text-only hero with a 900px maximum width. Its former hero image is omitted. The Jiazi Village process buttons retain their meaningful 01–07 sequence labels; these must not be removed as decorative numbering.
