# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers and tech leads, mostly in Europe, evaluating Francisco Cruz Mejía for .NET / Full Stack developer roles. They skim quickly, often between other candidates, and want to judge experience, stack fit and seniority in under a minute.

## Product Purpose

A single-page personal portfolio that turns a CV into evidence: real projects, a career timeline and the stack, ending in a way to act. Success is a recruiter downloading the CV or sending a message through the contact form.

## Positioning

A .NET-first full stack developer with 7+ years of production work, including microservices for the Dominican Republic Judiciary's online real-estate registry used by more than 10,000 people, now based in Milan.

## Operating Context

Visitors arrive from a CV, LinkedIn or a job application, usually on desktop during work hours, sometimes on a phone. The CV PDF (`public/documents/cv/`) and the contact form (EmailJS) are the two conversion points.

## Capabilities and Constraints

- React 19 + TypeScript + Vite + Tailwind CSS v4 SPA, no router, no backend; content lives in `src/data/`.
- Sections: Hero, About, Projects, Experience, Testimonials, Contact, plus Navbar and Footer.
- Contact form validated with React Hook Form + Zod and sent through EmailJS.
- Content language: English.
- No light theme exists yet; the site is dark-only.

## Brand Commitments

- Visible brand name: **FCruz-Dev** (never "ManuDev").
- The profile photo (`public/profile-photo.jpg`) stays as it is; only its framing may change.
- Visual direction pinned by the user: their reference design (dark background, violet accents, framed portrait, project cards with tech badges, timeline, skills grid with logos, contact call-to-action panel).

## Evidence on Hand

- Real: profile, about text, 4 projects with screenshots (`public/projects/`), 4 experience entries, skills list, email/phone/location, GitHub and LinkedIn, CV PDF.
- Placeholder: project demo/repo URLs are `"#"`; testimonials are template content (fake names and stock avatars) kept until real ones exist.
- Absent, never to be invented: GitHub stars/forks, client logos, metrics beyond those in the data files.

## Product Principles

- Evidence over adjectives: projects and roles carry the weight, not slogans.
- Scannable in under a minute: role, stack and seniority readable at a glance.
- Every path ends at the CV or the contact form.
- One source of truth: content changes happen in `src/data/`, never in components.

## Accessibility & Inclusion

WCAG 2.1 AA: keyboard reachable controls, visible focus, sufficient contrast on the dark ground, and `prefers-reduced-motion` respected.
