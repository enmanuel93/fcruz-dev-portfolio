# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Single-page personal portfolio: React 19 + TypeScript + Vite + Tailwind CSS v4, contact form via EmailJS. No backend; react-router only maps each section to a URL.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type errors fail the build)
- `npm run typecheck` — `tsc -b` only
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- Single test file: `npx vitest run tests/unit/lib/cn.test.ts`
- Single test by name: `npx vitest run -t "has unique project titles"`

## Architecture

**Content is separate from UI, and split by language.** Typed by interfaces in `src/types/content.ts`; to change what the site says, edit content files, not components. Each piece of information exists exactly once:
- `src/data/*.ts` — what reads the same in every language: skills, socials, icons, URLs, images, technologies, contact values, the name/brand/photo (`profileBase`), and the section routes (`NAV_HREFS`).
- `src/locales/<locale>/*.ts` — the text of one language. Each file spreads the shared part from `src/data` and adds the text (e.g. `{ ...projectAssets.portfolio, title, description }`); `locales/<locale>/index.ts` must `satisfies LocaleContent` (`src/locales/types.ts`), so a missing translation fails the build. `src/locales/index.ts` lists the locales and `DEFAULT_LOCALE`. `locales/<locale>/ui.ts` (`UiText`) holds the interface text (headings, buttons, labels, `aria-label`s); phrases with a value in them are functions, e.g. `liveDemoLabel(title)`. Components never hard-code visible or accessible text — `tests/unit/i18n/localizedUi.test.tsx` renders each section with every UI string wrapped in `«»` to catch leftovers.
- Components read the current language's content with `useLocale().content` (`src/i18n/`); `LocaleProvider` wraps the app in `App`. Without a provider (single-component tests) it falls back to `DEFAULT_LOCALE`.
- The starting language is the visitor's earlier choice (`localStorage`, key `locale`), else their first supported browser language, else `DEFAULT_LOCALE` (`src/i18n/detectLocale.ts`; storage access is wrapped in try/catch). `LocaleProvider` keeps `<html lang>` in sync. The switcher (`components/layout/LanguageSwitcher.tsx`) is a menu next to "Download CV" on desktop and a button group in the mobile menu; language names come from `localeNames` and are written in their own language.
- **Region** is a second axis: the profile for working in Europe (Italy, default) or in the Americas (Dominican Republic). It changes the CV (`src/data/cv.ts`, `cvUrls[region][locale]`; the Americas only has an English CV, under `public/documents/cvLatam/`), the phone (`phones` in `src/data/contact.ts`), and per locale the `contactInfo` and `experiences` (each a `Record<Region, …>`). `resolveContent(locale, region)` (`src/i18n/`) turns a `LocaleContent` into the `SiteContent` that `useLocale().content` returns, so components never see regions. `src/regions/index.ts` (no imports — the Netlify edge function uses it too) has the regions and `regionForCountry`. The region is decided once on load (`src/i18n/detectRegion.ts`): `?region=` in the URL, else the `region` cookie set from the visitor's country, else an American time zone, else `europe`. There is no region selector and nothing is stored. Each region also has its own languages (`LOCALES_BY_REGION` in `src/locales/index.ts`; the Americas only get English, `DEFAULT_LOCALE` must be in every list): `getInitialLocale(available)` skips a stored or browser language the region doesn't offer (without deleting the stored one), `useLocale().availableLocales` feeds the switcher, and the switcher renders nothing when there is only one language.

**Layering rules** (from `NUEVA-ESTRUCTURA.md`):
- `src/components/ui/` — generic primitives; must **not** import from `data/` or `sections/`.
- `src/components/layout/` — Navbar, Footer.
- `src/sections/<name>/` — one folder per page section; may import from `components/`, `data/`, `hooks/`, `i18n/`, `lib/`. Section-specific subcomponents and hooks live alongside (e.g. `sections/contact/useContactForm.ts`).
- `src/config/env.ts` is the **only** place that reads `import.meta.env` (types declared in `src/vite-env.d.ts`).
- Optional content fields are typed optional (e.g. `Project.demoUrl?`) and the UI handles their absence (project cards show the "Live demo"/"Code" buttons disabled) — don't use `"#"` placeholders.
- `src/app/App.tsx` composes the sections in order, all on one page. Nav links are routes named after a section `id` (`/about` → `#about`, listed in `NAV_HREFS`; a test enforces `^/[a-z]+$`), and `ScrollToSection` scrolls to that section whenever the URL changes.

Import via the `@/` alias → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Use `cn()` from `@/lib/cn` (clsx + tailwind-merge) for conditional classes.

**Scroll-reveal animations:** any element with class `animate-fade-in` stays hidden (`opacity: 0`, no animation) until `useRevealOnScroll` (called once in `App`) adds `is-visible` via IntersectionObserver; it removes it again on exit so the animation replays. A MutationObserver picks up elements rendered later. Stagger list items with `getAnimationDelay(index, stepMs)` from `@/lib/animation` as an inline `animationDelay`, or the `animation-delay-*` utility classes. Theme tokens, keyframes and `prefers-reduced-motion` handling are in `src/styles/index.css` (Tailwind v4 `@theme`, no tailwind.config file).

**Visual style:** keep it restrained, so the site doesn't read as a template. One accent color (violet); surfaces are `.panel` (flat fill + 1px border). No glows or blurred blobs, floating particles, gradient borders, pulsing dots, coloured shadows or hover lift/zoom; hover only changes border or background color. Motion is limited to the short scroll-reveal fade and the skills marquee (`sections/skills/SkillsMarquee.tsx`, Swiper), which stays on purpose. Secondary actions use `Button` with `variant="outline"`. Section headings are `SectionHeader` (title, description, optional action; no icon).

**Contact form:** React Hook Form + Zod. `sections/contact/contactFormSchema.ts` is the single source of the rules, length limits and the `ContactFormValues` type (fields are trimmed; each field reports one error at a time). It reports error **codes** (`"nameTooShort"`…), not sentences; `ContactForm` turns them into the current language's message at render time with `getContactErrorMessage` (wording in `ui.contact.validation`), so errors on screen follow a language switch. Send results work the same way (`ui.contact.status`); only EmailJS's own error `text` is shown as is. `useContactForm` owns the `useForm` instance (uncontrolled inputs via `register`, `mode: "onTouched"`) and returns `onSubmit` already wrapped in `handleSubmit`; `ContactForm` uses `noValidate` and only renders. It sends via `@emailjs/browser`; template variable names (`from_name`, `from_email`, `message`) must match the EmailJS template. Requires `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` in `.env.local`; when missing, the form shows an error instead of crashing.

Static assets (profile photo, project images, CV under `public/documents/cv/`) are in `public/` and referenced by absolute path from `src/data/`. Images are WebP, resized to about twice their on-screen size (profile photo 896px wide, project screenshots 1200px, flags 80px), so each stays well under 100 KB. A new root-level image type also needs adding to the edge function's `excludedPath`.

**Deploy (Netlify):** `netlify.toml` builds to `dist/` and serves `index.html` for every route. `netlify/edge-functions/region.ts` runs before the page on each visit and sets the `region` cookie from Netlify's geolocation (`context.geo.country.code` → `regionForCountry`), so a VPN changes the profile shown; it skips static files. It is type-checked through `tsconfig.test.json` and tested in `tests/unit/netlify/`. Locally there is no cookie: use `?region=americas`, or `netlify dev --country=DO`. EmailJS's `VITE_EMAILJS_*` variables must also be set in Netlify's site settings.

## Tests

- Live in `tests/unit/`, mirroring the `src/` layout; only `tests/unit/**/*.test.{ts,tsx}` is picked up. jsdom environment, Testing Library + jest-dom matchers, `restoreMocks: true`.
- `tests/setup.ts` stubs `IntersectionObserver` globally (jsdom lacks it); tests that assert on observer behavior install their own stub.
- `tests/unit/data/content.test.ts` runs for every locale: fields used as React keys are unique (project titles, testimonial authors, etc. — keys use content fields, not array indices), and each locale lists the same items as the default one.
- Tests are type-checked through `tsconfig.test.json` (adds `node` types).

## Conventions

- Components are arrow functions with explicit `ReactElement` return types; use `import type` (`verbatimModuleSyntax` is on). `erasableSyntaxOnly` forbids enums/namespaces/parameter properties.
- `NUEVA-ESTRUCTURA.md` (Spanish) is the restructuring plan/roadmap with remaining TODO checkboxes (SEO/Open Graph, real README, `.env.example`, package metadata).

## Git workflow (always on)

Every coding task (feature, bug fix, refactor, tests, docs, config change) ends with a verified **local commit**, without the user having to ask — follow the `/ship` skill (`.claude/skills/ship/SKILL.md`) for the full procedure. Exceptions: pure questions/explanations, or when the user says not to commit.

- **Inspect first:** `git status` before editing; everything already modified/untracked is the user's work — never stage, revert, stash, reset or overwrite it. If the task must touch a file with pre-existing uncommitted changes, stop and ask.
- **Branches:** never commit on `main`/`master`. Use the current branch if it fits the task, otherwise `git switch -c` a new one: `manudev/feature/<name>`, `fix/<name>`, `refactor/<name>`, `docs/<name>`, `test/<name>`, `chore/<name>`.
- **Validate:** `npm run verify` (lint + tests + build) must pass before committing. On failure, don't commit; fix it or report the output and ask.
- **Stage explicitly:** `git add -- <paths>` only (never `.`, `-A`, `--all`, `commit -a`), then `npm run check:staged` (blocks protected branch, `.env`/key files, secret patterns, conflict markers; lists what's left out).
- **Commit:** Conventional Commits — `type(scope?): imperative summary` with types `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `perf`, `chore`, `build`, `ci`. One logical change per commit.
- **Never:** push, open/merge PRs, merge, rebase, amend, `--no-verify`, `git init` without authorization.
- **Report:** branch, short hash, message, files committed, lint/test/build results, files left uncommitted.

`.claude/hooks/git-guard.mjs` (registered in `.claude/settings.json` as a `PreToolUse` hook on Bash/PowerShell) blocks the forbidden git commands above; if it blocks something, change approach instead of working around it. It only blocks — it never commits.
