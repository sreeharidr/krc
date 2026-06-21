# CLAUDE.md — Kurnool Rheumatology Centre website

> Context for any future Claude session in this repo. Read this first before editing anything.

## What this is

Static, bilingual (English + Telugu) website for **Kurnool Rheumatology Centre** — a specialist rheumatology clinic in Kurnool, Andhra Pradesh, India. Replaced an earlier Twine-built site that lived at the same domain.

The site is **live at https://rheumatology.center**, deployed on Cloudflare Workers with Static Assets, with auto-deploy from GitHub on every push to `main`.

## Clinic & owner facts

These are the source of truth. Don't paraphrase or invent variations.

- **Name:** Kurnool Rheumatology Centre (UK spelling, "Centre" not "Center"). "KRC" is the accepted abbreviation.
- **Doctor:** Dr. Sree Hari Reddy Gadekallu — MD (Medicine), MRCP (UK), SCE Rheumatology (RCP UK). 9+ years' experience, 15,000+ patients treated.
- **Address:** Near Amma Hospital, Madhava Nagar, Nandyal Road, Kurnool, Andhra Pradesh 518002, India.
- **Phone:** +91 8333 837 666 (`tel:+918333837666` in markup).
- **WhatsApp:** Same number → `https://wa.me/918333837666`.
- **Email:** kurnool.rheumatology@gmail.com.
- **Hours:** Mon–Sat 9:00 AM – 8:00 PM. Sunday closed.
- **Map pin:** `https://maps.app.goo.gl/mRYekLuWnqAVZDu87` (coordinates 15.801256684840101, 78.04446977438009).
- **Brand color:** `#38b6ff` (sky blue). Used in `--color-brand` throughout `css/styles.css`. Do not introduce a competing accent color without discussion.

## Tech stack

- **Pure HTML/CSS/JS.** No framework, no build step. Edit files directly.
- **Fonts:** Inter (English) + Noto Sans Telugu (Telugu), both via Google Fonts.
- **Deploy host:** Cloudflare Workers + Static Assets (NOT Cloudflare Pages — we migrated off direct-upload Pages to git-based Workers).
- **Source of truth:** GitHub repo `sreeharidr/krc` (public). User is `sreeharidr` on GitHub; `gh` CLI is authenticated.
- **Auto-deploy:** every `git push` to `main` triggers a Cloudflare deploy in ~30 sec via `npx wrangler deploy`.

## File map

```
/
├── index.html              Home
├── about.html              Address, hours, map, contact form
├── team.html               Dr. Gadekallu's profile
├── conditions.html         8 conditions explained bilingually
├── services.html           8 clinical services
├── first-visit.html        6-step patient onboarding guide
├── faq.html                11 FAQs (accordion) + FAQPage schema
├── resources.html          Blood tests, medications, lifestyle
├── testimonials.html       8 patient stories
├── 404.html                Friendly bilingual not-found
├── robots.txt              Welcomes search engines + AI crawlers (GPTBot, ClaudeBot, etc.)
├── sitemap.xml             9 URLs with hreflang alternates
├── llms.txt                Markdown digest for LLMs (emerging standard)
├── wrangler.jsonc          Cloudflare deploy config — DO NOT change html_handling without reading "Gotchas" below
├── src/index.js            5-line Worker that maps / → /index.html
├── css/styles.css          Whole design system; see below
├── js/main.js              Lang toggle, mobile nav, scroll animations, form validation
└── img/
    ├── hero-clinic.jpg     Home hero photo (1200×1500)
    ├── dr-gadekallu.jpg    Team page headshot
    └── favicon.svg         KRC mark in brand gradient
```

## Design system

All tokens live as CSS custom properties at the top of `css/styles.css`.

- **Colors:** `--color-brand` (#38b6ff), `--color-brand-deep` (#0e6fa8), `--color-brand-tint` (#e6f4ff), `--color-ink` (near-black), `--color-muted`. Monochromatic blue — no warm accent.
- **Type scale:** fluid (`clamp()` based). `--fs-display`, `--fs-h1`, etc. Always use these, don't hardcode `font-size`.
- **Spacing:** 8px-based scale `--s-1` through `--s-8`.
- **Radius:** `--r-sm` (8px), `--r-md` (12px), `--r-lg` (16px), `--r-xl` (24px), `--r-pill` (9999px). Buttons are pills, cards are `--r-lg`.
- **Shadows:** layered, soft, Apple-style. `--shadow-1` through `--shadow-4`.
- **Motion:** `--ease` is the custom curve; `--t-fast/--t-base/--t-slow` for durations.
- **Layout:** content max-width is `--max-w` (1140px). Sticky nav with frosted-glass `backdrop-filter`.

Component classes follow BEM-ish naming: `.nav__inner`, `.card__title`, `.feature-card__head`. Stick with existing patterns when adding components — don't introduce a new convention.

## Bilingual pattern (CRITICAL)

Every translatable piece of content appears **twice** in the HTML, once per language, controlled by `data-lang` attribute and CSS `hidden` on the inactive one. JS in `js/main.js` toggles which set is visible based on `localStorage['krc.lang']`.

Example:
```html
<h1 data-lang="en">Welcome</h1>
<h1 data-lang="te" class="telugu" hidden>స్వాగతం</h1>
```

Rules when editing or adding content:
1. **Every visible English string needs a Telugu twin.** No exceptions.
2. Add `class="telugu"` on the Telugu element so the right font kicks in.
3. The Telugu version starts with `hidden` — JS un-hides it when language is `te`.
4. **Default language is English.** First-time visitors see English; preference is remembered in localStorage.
5. There's no separate URL for Telugu — it's a JS toggle. Therefore: don't add hreflang stuff for separate Telugu pages; we already declare locale alternates in OG and sitemap.

The lang-toggle buttons in the nav use `data-lang` too but `js/main.js` skips them in the toggle loop (they're the trigger, not the content).

## Editing conventions

### Nav and footer are duplicated across all 10 HTML files
This is intentional — no templating, no build step. If you change the nav or footer, you must update all 10 files identically. Use a Python script for bulk edits (see `git log` for past examples).

### Canonical URLs include `.html`
Every page has `<link rel="canonical" href="https://rheumatology.center/<page>.html" />`. All internal nav `href`s also include `.html`. The `wrangler.jsonc` is configured (`html_handling: "none"`) so that `.html` URLs serve directly — no redirect strips the extension. Keep this consistent everywhere: canonicals, sitemap, internal nav, footer links.

### Phone number is in TWO places per page
- Pill button in navbar (desktop): `.nav__phone`
- Floating action button (mobile): `.fab-call`
Don't remove either; they're complementary.

### Open Graph + structured data
Every page has Open Graph and Twitter Card meta in `<head>`. They're per-page (title + description differ). `index.html` additionally has a comprehensive JSON-LD with `MedicalClinic` + `Physician` + `WebSite` graph. `faq.html` has `FAQPage` JSON-LD with all 11 Q&As. Don't break these — they drive Google rich results.

## Deploy workflow

```bash
cd /Users/sreehari/Documents/KRC/Website
# edit files
git add .
git commit -m "describe the change"
git push
# Cloudflare auto-deploys in ~30 seconds — check https://rheumatology.center/
```

No build step. No manual upload. Never use Cloudflare's "Direct Upload" interface — the project has been migrated to git-based deploys and direct upload is no longer the path.

## External services

| Service | Purpose | Key/URL |
|---|---|---|
| **GoatCounter** | Analytics (no cookies, privacy-friendly) | dashboard: https://krc.goatcounter.com — beacon URL in every HTML page |
| **Formspree** | Contact form on `/about.html` | form ID: `mzdwdnvz` (action URL hardcoded in about.html) |
| **GitHub** | Source of truth | https://github.com/sreeharidr/krc |
| **Cloudflare** | Hosting + DNS | Project name: `krc` (Workers project) |
| **Google Search Console** | SEO | User is setting this up; verification via DNS TXT |

We do **NOT** use:
- Google Analytics (replaced with GoatCounter)
- Cloudflare Web Analytics (removed in favor of GoatCounter)
- Bing Webmaster Tools (user opted out — India market share too low to bother)
- Any backend or database (forms go through Formspree)

## Decisions & gotchas

These are non-obvious things that took us time to figure out. Don't undo them without understanding why.

1. **`wrangler.jsonc` has `html_handling: "none"` AND a Worker entry AND `run_worker_first: true`.** Together these keep `.html` URLs intact (matching canonicals + internal links), serve `/index.html` at the bare root `/`, AND make the www→non-www redirect fire for every path (not just asset misses). If you change `html_handling` to anything else, Cloudflare will start 307-redirecting `/about.html` → `/about`, breaking the canonical match. If you remove `run_worker_first`, the redirect will only fire for paths with no matching static asset.

2. **www.rheumatology.center 301-redirects to rheumatology.center.** Handled inside `src/index.js`. Canonical hostname is the non-www variant. This eliminates duplicate-content concerns and aligns the served URL with every `<link rel="canonical">` on the site. Don't add `www.` to canonicals, sitemap, or OG URLs.

3. **The site replaced a Twine-built version.** The old site at `rheumatology.center` was authored in Twine (interactive-fiction tool) with wiki-style `[[Page]]` linking. We migrated to a conventional multi-page site for better UX, SEO, and patient navigation. Don't suggest going back to a single-page or narrative format.

4. **No frameworks.** User declined Hugo, Astro, Eleventy after explicit comparison. Static HTML is the agreed answer until a blog/news section becomes a priority. **If a blog is requested in future, Hugo is the agreed migration target.**

5. **Bilingual via JS toggle, not separate URLs.** We chose this for simplicity and because the patient base often code-switches between English and Telugu in one session. Don't migrate to `/en/` and `/te/` subpaths without strong reason.

6. **Placeholder testimonials.** The 8 testimonials in `testimonials.html` are stylistically realistic but are placeholders awaiting real patient-consent content. The 3 on the homepage are likewise placeholders. Treat them as such — don't claim they're real in copy, schema, or external content.

7. **`html_handling: "none"` does NOT auto-serve `/index.html` for `/`** despite Cloudflare's docs claiming otherwise — we verified this empirically and added `src/index.js` to handle it. If `/` ever 404s after a config change, this is the first place to look.

8. **DO NOT add a `README.md` to the repo.** User has explicitly said don't create docs files unless asked. This CLAUDE.md is the one exception (they asked for it).

9. **Insurance is NOT accepted.** Mention this in copy as: "We don't process insurance directly at this time; we provide detailed receipts for reimbursement." Don't promise insurance support.

## What's intentionally left for later

These were discussed and deferred — don't preemptively build them:

- **Real clinic photos** in `img/` (user adds these incrementally; just match the existing filenames)
- **Individual condition pages** (e.g., `conditions/rheumatoid-arthritis.html`) — better SEO but more content work
- **Blog / news section** (triggers Hugo migration)
- **Appointment scheduling** (deferred indefinitely; phone + WhatsApp is fine for now)
- **Patient portal** (long-term future)
- **A proper 1200×630 Open Graph image** (currently using `hero-clinic.jpg` which is 4:5)

## User preferences (style of working)

Quick notes from past sessions so you don't repeat the discovery:

- **Pragmatic, dislikes over-engineering.** Will push back on Bing analytics, frameworks, or anything that doesn't earn its weight.
- **Comfortable editing HTML/CSS/JS directly.** Don't over-explain syntax.
- **Wants honest opinions, not deferral.** If something's a bad idea, say so. We removed the language splash page on these grounds.
- **Prefers tight, actionable instructions over long preambles.** Cut the throat-clearing.
- **Doesn't want excessive `AskUserQuestion` calls.** Make a recommendation, explain trade-offs in prose, only ask when truly ambiguous.
- **British spellings (centre, optimised) where they appear in copy.**
- **No emojis in commit messages, no emojis in code/docs unless the user explicitly uses them in copy first.**

## When in doubt

- Mirror existing patterns in the codebase rather than introducing new ones.
- Always update the Telugu twin when you touch English copy.
- Test the live site after a push: `curl -s -o /dev/null -w '%{http_code}' https://rheumatology.center/`
- The auto-memory at `/Users/sreehari/.claude/projects/-Users-sreehari-Documents-KRC-Website/memory/` may have additional user context.
