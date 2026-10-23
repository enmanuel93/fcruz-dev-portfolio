---
name: FCruz-Dev Portfolio
description: A dark, violet-lit developer portfolio where projects, roles and stack carry the page.
colors:
  background: "#0a0a12"
  foreground: "#ecebf7"
  surface: "#12111d"
  surface-raised: "#191826"
  border: "#262438"
  border-strong: "#3b3563"
  primary: "#6d4aff"
  primary-hover: "#7d5eff"
  primary-foreground: "#ffffff"
  accent: "#a493ff"
  muted-foreground: "#9a98b0"
  success: "#3ddc84"
  danger: "#ff6467"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.6rem / 3.75rem (sm) / 4.5rem (xl)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem / 2.25rem (md)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  section-title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem / 1.875rem (md)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
  quote:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem / 1.5rem (md)"
    fontWeight: 500
    lineHeight: 1.625
  body-lead:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.25
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  portrait: "28px"
  full: "9999px"
spacing:
  gutter: "24px"
  section: "80px"
  section-md: "112px"
  header-gap: "40px"
  grid-gap: "24px"
  tile-gap: "12px"
  card-pad: "20px"
  card-pad-md: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.surface}"
  button-animated-border:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "10px 16px"
  button-animated-border-hover:
    backgroundColor: "{colors.surface}"
  tag-default:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  tag-accent:
    backgroundColor: "rgba(109, 74, 255, 0.15)"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  input:
    backgroundColor: "rgba(10, 10, 18, 0.7)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  nav-link-active:
    textColor: "{colors.foreground}"
  card-project:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "12px"
  card-timeline:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-pad}"
  skill-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.xl}"
    padding: "20px 8px"
  skill-tile-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
  icon-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    rounded: "{rounded.xl}"
    size: "44px"
  social-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.xl}"
    size: "40px"
  role-badge:
    backgroundColor: "rgba(109, 74, 255, 0.10)"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

# Design System: FCruz-Dev Portfolio

## Overview

**Creative North Star: "Evidence Under Violet Light"**

A near-black room with a blue-violet cast, where the work sits on stacked ink panels and a single violet light picks out what matters: the action, the last phrase of a headline, the node on a timeline, the edge of the portrait. Everything else stays quiet so a recruiter can read role, stack and seniority in the first viewport and then scan projects, career and skills as plain evidence.

The world is dark-only and built from three materials: the ground, panels one tonal step above it with 1px violet-tinted hairlines, and violet light. The light comes in two strengths: the solid action violet for filled buttons, and a softer violet for text, icons and focus that stays legible on the dark ground. Soft violet glows sit only behind the portrait, in the hero's upper corner, and inside the contact panel; they are atmosphere, never a surface. One typeface, Geist, does all the work through weight, size and tight tracking.

The system refuses the look it replaced: teal glass over every surface, uppercase eyebrows above headings, and serif-italic slogans. Section headings carry an icon tile instead of a kicker.

**Key Characteristics:**
- Dark-only ground (`color-scheme: dark`) with a blue-violet cast, no theme toggle.
- Tonal layering (ground, surface, surface-raised) plus 1px hairlines carries depth; shadows are violet-tinted and sparse.
- One action violet; a lighter violet for text-level accents and the focus ring.
- One family (Geist Variable), bold display with tight negative tracking.
- Rounded-xl corners on controls, rounded-2xl on cards; the portrait frame is the largest curve.
- Third-party logos keep their own brand colours, always on dark tiles.
- Content fades up out of a light blur as it scrolls in, and replays on re-entry; all motion stops under `prefers-reduced-motion`.

## Colors

A near-black violet ground, two ink surface steps, violet hairlines, and one violet light in two strengths.

### Primary
- **Action Violet** (`primary`): the fill of every primary button (View Projects, Download CV, Send Message), the source of the violet glows and tinted shadows, the tint behind accent tags, the role badge and About icon tiles, and the selection highlight (55% mix). It never sets body text: it does not reach 4.5:1 on the ground.
- **Action Violet, Lit** (`primary-hover`): the primary button on hover, paired with a stronger violet shadow.
- **Text Violet** (`accent`): violet that reads as text on the dark ground. The closing phrase of the hero and contact headlines, the brand suffix "-Dev", company names, section icons, timeline nodes and rail, the active nav underline, testimonial active dot, the focus outline, the caret, the dot fields and floating dots, and the travelling light of the animated border.

### Neutral
- **Violet Night** (`background`): the page ground and the base of the scrolled navbar glass; also the inner fill of form fields (at 70%).
- **Ink Panel** (`surface`): every card and panel (`.panel`): project cards, timeline cards, skill tiles, the About list, floating hero badges, icon tiles, social buttons.
- **Raised Ink** (`surface-raised`): one step up: default tags, the project image well, and the hover fill of skill tiles and project links.
- **Hairline** (`border`): the default 1px edge of panels, inputs, footer rule and dividers.
- **Lit Hairline** (`border-strong`): the hover edge of cards, the outline button border, the contact panel edge, the scrollbar thumb and the resting animated border.
- **Lavender White** (`foreground`): headings and primary text.
- **Dusk Grey** (`muted-foreground`): body copy, descriptions, captions, inactive nav links and default tag text.
- **Primary Foreground** (`primary-foreground`): text on Action Violet.

### Status
- **Signal Green** (`success`): the pulsing "Available for work" dot in the hero and the contact panel.
- **Error Coral** (`danger`): invalid field borders, field error messages and the failed-send notice. In code this is Tailwind's `red-400` utility, not a theme token; the sent-success notice likewise uses Tailwind `green-400/500` rather than `success`.

### Named Rules
**The One Violet Rule.** Action Violet is the only filled action colour on the page. Anything violet that is read as text or an icon uses Text Violet instead.

**The Light Behind Rule.** Violet glows (large blurred circles at 15 to 45% violet) sit only behind the portrait, in the hero's top corner, and inside the contact panel. Never put a glow behind body text or a card grid.

**The Own Colours Rule.** Technology logos in the skills grid take their brand colour from `src/data/skills.ts` and appear only on Ink Panel tiles. Brand colours are content, never palette.

## Typography

**Display Font:** Geist Variable (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Geist Variable (same stack)

**Character:** a single geometric grotesk, self-hosted through `@fontsource-variable/geist`. Hierarchy comes from weight (400 to 700), size, and tracking that tightens as size grows; headings use `text-wrap: balance`.

### Hierarchy
- **Display** (700, 2.6rem rising to 3.75rem at sm and 4.5rem at xl, line-height 1.05, tracking -0.035em): the hero headline only, three lines at desktop, last phrase in Text Violet.
- **Headline** (700, 1.875rem to 2.25rem at md, line-height 1.25, tracking -0.025em): the contact panel's call to action, same last-phrase treatment.
- **Section Title** (600, 1.5rem to 1.875rem at md, tracking -0.025em): every section `h2`, beside its icon tile, with an optional one-line description below in Dusk Grey (max ~36rem).
- **Title** (600, 1.125rem, line-height 1.375): project names, job roles, About item titles (1rem there).
- **Quote** (500, 1.25rem to 1.5rem at md, line-height 1.625): the testimonial blockquote; the About pull quote is 1.125rem 500 with a 1px Text Violet left rule.
- **Body Lead** (400, 1.125rem, line-height 1.625): the hero bio, max ~36rem.
- **Body** (400, 0.875rem to 1rem, line-height 1.625): card descriptions and About paragraphs (capped at 68ch).
- **Label** (500, 0.75rem): tags, skill names, badge captions, contact item labels. Sentence case, no extra tracking.

### Named Rules
**The Last Phrase Rule.** In a display or headline, only the closing phrase turns Text Violet ("with precision.", "something great."). One coloured phrase per heading, never a single word mid-sentence.

**The One Family Rule.** Geist carries every role. Don't add a serif, a script, or a mono face for emphasis; use weight and size.

**The No Eyebrow Rule.** Section headings are never preceded by uppercase kickers. Context comes from the icon tile and the description line.

## Layout

A single scrolling page: Hero, About, Projects, Experience, Skills, Testimonials, Contact, then Footer, under a fixed navbar. Each section is a centred Tailwind `container` with a 24px side gutter and 80px vertical padding (112px from md). Section headers sit 40px above their content and put the icon tile, title and description on the left with an optional action on the right; the action stacks below on mobile.

- **Hero:** two columns from lg at 1.1fr / 0.9fr (text, portrait), 64px gap stacked and 48px side by side; 128px top padding (160px at lg) clears the navbar.
- **Projects:** two-column card grid from md, 24px gap.
- **Experience:** an 11rem date column and a card column from md, joined by a 1px vertical rail fading from Text Violet to transparent; on mobile the date sits above its card.
- **Skills:** a dense equal-height tile grid stepping 3, 4, 5, 7, 10 columns at base, sm, md, lg, xl, 12px gap.
- **About:** 1.15fr / 1fr from lg (paragraphs, divided list panel).
- **Contact:** one rounded panel split 1fr / 1.1fr from lg, divided by a hairline (top hairline when stacked).
- **Navbar:** links and the Download CV button show from lg; below that a menu button opens a full-width sheet with large tap rows and a full-width CV button.

Breakpoints are Tailwind's defaults (640, 768, 1024, 1280px). `scroll-padding-top: 5rem` keeps anchored sections clear of the fixed navbar.

## Elevation & Depth

Depth is tonal first: ground, Ink Panel, Raised Ink, each edged by a 1px hairline that brightens to Lit Hairline on hover. Shadows are rare, soft, and negatively spread so they read as light beneath an object rather than a drop. Where they carry colour, it is violet.

### Shadow Vocabulary
- **Action glow** (`0 8px 24px -10px` at 70% Action Violet, 90% on hover): primary buttons only.
- **Card lift** (`0 24px 48px -24px` at 40% Action Violet, with a 4px rise): project cards on hover.
- **Portrait halo** (`0 40px 80px -40px` at 70% Action Violet): the portrait frame, over a blurred violet plate.
- **Floating badge** (`0 16px 40px -16px rgb(0 0 0 / 0.8)`): the two badges overlapping the portrait.
- **Open menu** (`0 24px 48px -12px rgb(0 0 0 / 0.6)`): the mobile navbar sheet.

### Named Rules
**The Hairline First Rule.** A surface at rest is defined by its tone and a 1px hairline. Shadows belong to the primary action, the portrait and its badges, and hover states.

**The Glass Is For Navigation Rule.** Backdrop blur (16px over 80% Violet Night) is used only by the navbar once the page scrolls. Content panels are opaque ink.

## Shapes

Softly rounded rectangles throughout, scaled to the object: 6px on tags, 8px on nav links and project links, 12px on buttons, inputs, icon tiles, social buttons and skill tiles, 16px on cards, panels and floating badges, 24px on the contact panel, and 28px on the portrait frame (the largest curve on the page, with a 22px inner radius on the photo). Fully round shapes are reserved for the role badge, status dots, timeline nodes and carousel indicators. Dot fields (1.2px violet dots on an 18px grid, faded out by a gradient mask) appear beside the portrait and in the contact panel's corner.

## Components

### Buttons
Confident and quiet at once: one filled violet, everything else outlined.
- **Shape:** gently rounded (12px), icon plus label with 8px gap, weight 500.
- **Primary:** Action Violet fill, white text, action glow. Sizes: sm (8px 16px, 14px text) in the navbar; default (12px 24px) and lg (14px 24px) elsewhere.
- **Hover / Active:** fill lightens to Action Violet, Lit and the glow strengthens over 200ms; pressing nudges the button down 1px. Disabled drops to 60% opacity.
- **Outline:** transparent with a Lit Hairline border and Lavender White text; hover tints the border Text Violet (60%) and fills Ink Panel. Used for "Contact Me", the hero's secondary action.
- **Animated border:** a 1px Lit Hairline edge on Violet Night; on hover the fill becomes Ink Panel and a Text Violet light runs around the border (conic gradient, 2.5s loop). Reserved for the "View All Projects" header action.

### Tags
- **Default:** Raised Ink fill, Hairline border, Dusk Grey label text, 6px radius, 2px 8px padding. Technology lists on projects and roles.
- **Accent:** 15% Action Violet fill, 40% violet border, Text Violet text. Only the main technology of a project, set beside its title.

### Cards / Containers
- **Panel base:** Ink Panel with a 1px Hairline; 16px radius.
- **Project card:** 12px inset frame around a 16:9 screenshot in a Raised Ink well (12px radius), then title, accent tag, description, other tags and right-aligned link buttons. Hover: rise 4px, Lit Hairline, card-lift shadow, the image scales to 103% over 500ms. When a demo or repo URL is absent the link renders as a disabled button so the layout stays fixed.
- **Timeline card:** 20px padding (24px at md); hover brightens the border only. The current role's node pulses.
- **Skill tile:** logo (32px, brand colour) over a label; hover rises 2px, fills Raised Ink, scales the logo to 110%, brightens the label.
- **Contact panel:** 24px radius, Lit Hairline edge, a diagonal gradient from 20% violet into Ink Panel, a violet glow at top-left and a faded dot field at top-right.

### Inputs / Fields
- **Style:** 70% Violet Night fill, Hairline border, 12px radius, 12px 16px padding, Dusk Grey placeholder; labels sit 8px above in 14px medium.
- **Focus:** border shifts to 70% Text Violet with a 2px 40% violet ring.
- **Error:** border and ring turn Error Coral; a 14px message with an alert icon appears 8px below, linked by `aria-describedby`.

### Navigation
- **Navbar:** transparent with 20px vertical padding at the top of the page; after 50px of scroll it becomes navbar glass with 12px padding. Brand mark (code-brackets icon in Text Violet, "FCruz" plus "-Dev" in Text Violet) on the left.
- **Links:** 14px Dusk Grey; hover and the active section turn Lavender White and grow a 2px Text Violet underline from the left (300ms). The active section is tracked from scroll position.
- **Mobile:** a 40px icon button toggles an opaque sheet of 16px rows; the active row gets an Ink Panel fill; every row closes the sheet.

### Role Badge
A sentence-case pill (full radius, 10% Action Violet fill, 40% violet border, Text Violet 14px medium) holding the profile headline above the hero display. Hero only.

### Section Header (signature)
A 44px Ink Panel tile with a Lit Hairline edge holding a 20px Text Violet icon, beside the section title and an optional description. This replaces eyebrows throughout.

### Framed Portrait (signature)
The profile photo in a 4:5 frame with a 28px radius, an 8px inner mat that fades from 30% violet into Ink Panel, a 35% Text Violet edge, and the portrait halo. It opens from the bottom up while sharpening from a blur (1.4s). Two floating Ink Panel badges overlap its edges ("+7 years", "Available for work" with a pulsing Signal Green dot) and bob 8px on a 5s loop.

### Motion
- **Reveal:** elements fade up 16px out of a 6px blur (0.7s, `cubic-bezier(0.16, 1, 0.3, 1)`) when they enter the viewport, and hide again on exit so the reveal replays. List items stagger by a fixed step per index: 100ms for cards and About items, 120ms for timeline entries, 40ms for the dense skills grid.
- **Ambient:** floating violet dots drift slowly (15 to 35s loops) at 40% opacity behind the hero.
- **State:** colour and border transitions at 200 to 300ms.
- **Reduced motion:** every animation and transition collapses to near-zero and smooth scrolling turns off.

## Do's and Don'ts

### Do:
- **Do** use Action Violet (`primary`) only as a fill: primary buttons, tinted badges, glows and shadows.
- **Do** use Text Violet (`accent`) for any violet text, icon, node or focus ring on the dark ground.
- **Do** build surfaces from tone plus a 1px hairline (Ink Panel, Hairline) and brighten to Lit Hairline on hover.
- **Do** colour only the last phrase of a display or headline in Text Violet.
- **Do** open each section with the icon tile header (44px tile, 12px radius, Text Violet icon).
- **Do** keep logo brand colours in `src/data/skills.ts` and show them only on dark tiles.
- **Do** mark scroll-revealed elements with `animate-fade-in` and stagger lists with `getAnimationDelay`.
- **Do** keep the 2px Text Violet focus outline with a 3px offset on every interactive element.

### Don't:
- **Don't** set body or small text in Action Violet; it fails contrast on the ground.
- **Don't** add a light theme or light surfaces; the world is dark-only.
- **Don't** put uppercase eyebrows or kickers above headings, or use serif-italic slogans.
- **Don't** use backdrop-blur glass for content panels; glass belongs to the scrolled navbar.
- **Don't** add a second accent hue; status green and error coral are signals, not decoration.
- **Don't** place violet glows behind text blocks or card grids; keep them behind the portrait, the hero corner and the contact panel.
- **Don't** use hard offset shadows; grid cards are flat at rest and lift with a violet, negatively spread shadow only on hover.
- **Don't** repeat the hero role badge above other headings; it states the role once, in the first viewport.
