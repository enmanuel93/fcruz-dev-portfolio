# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Single-page personal portfolio: React 19 + TypeScript + Vite + Tailwind CSS v4, contact form via EmailJS. No router, no backend.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type errors fail the build)
- `npm run typecheck` — `tsc -b` only
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- Single test file: `npx vitest run tests/unit/lib/cn.test.ts`
- Single test by name: `npx vitest run -t "has unique project titles"`

## Architecture

**Content is separate from UI.** All personal content (profile, projects, experience, testimonials, skills, socials, nav links, contact info) lives in `src/data/*.ts`, typed by interfaces in `src/types/content.ts`. To change what the site says, edit `src/data/`, not components. Each piece of information exists exactly once (e.g. one socials array shared by Hero/Footer, one nav array shared by Navbar/Footer).

**Layering rules** (from `NUEVA-ESTRUCTURA.md`):
- `src/components/ui/` — generic primitives; must **not** import from `data/` or `sections/`.
- `src/components/layout/` — Navbar, Footer.
- `src/sections/<name>/` — one folder per page section; may import from `components/`, `data/`, `hooks/`, `lib/`. Section-specific subcomponents and hooks live alongside (e.g. `sections/contact/useContactForm.ts`).
- `src/config/env.ts` is the **only** place that reads `import.meta.env` (types declared in `src/vite-env.d.ts`).
- Optional content fields are typed optional (e.g. `Project.demoUrl?`) and the UI hides the control when absent — don't use `"#"` placeholders.
- `src/app/App.tsx` composes the sections in order; section `id`s are the targets of the `#anchor` nav links (a test enforces nav hrefs match `^#[a-z]+$`).

Import via the `@/` alias → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Use `cn()` from `@/lib/cn` (clsx + tailwind-merge) for conditional classes.

**Scroll-reveal animations:** any element with class `animate-fade-in` stays hidden (`opacity: 0`, no animation) until `useRevealOnScroll` (called once in `App`) adds `is-visible` via IntersectionObserver; it removes it again on exit so the animation replays. A MutationObserver picks up elements rendered later. Stagger list items with `getAnimationDelay(index, stepMs)` from `@/lib/animation` as an inline `animationDelay`, or the `animation-delay-*` utility classes. Theme tokens, keyframes and `prefers-reduced-motion` handling are in `src/styles/index.css` (Tailwind v4 `@theme`, no tailwind.config file).

**Contact form:** `useContactForm` sends via `@emailjs/browser`; template variable names (`from_name`, `from_email`, `message`) must match the EmailJS template. Requires `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` in `.env.local`; when missing, the form shows an error instead of crashing.

Static assets (profile photo, project images, CV under `public/documents/cv/`) are in `public/` and referenced by absolute path from `src/data/`.

## Tests

- Live in `tests/unit/`, mirroring the `src/` layout; only `tests/unit/**/*.test.{ts,tsx}` is picked up. jsdom environment, Testing Library + jest-dom matchers, `restoreMocks: true`.
- `tests/setup.ts` stubs `IntersectionObserver` globally (jsdom lacks it); tests that assert on observer behavior install their own stub.
- `tests/unit/data/content.test.ts` checks that fields used as React keys are unique (project titles, testimonial authors, etc.) — keys use content fields, not array indices.
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
