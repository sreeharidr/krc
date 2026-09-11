# CONTENT.md — KRC site structure, content & flow

> **Purpose:** a design-agnostic record of *what this site says* and *how it is organised*.
> `CLAUDE.md` covers **how to work in this repo**. This file covers **what the site contains**.
>
> The point of this file is to make redesign safe: the entire presentation layer (CSS, HTML,
> layout, typography) can be thrown away and rebuilt from scratch with **zero content loss**,
> because everything meaningful is recorded here. Update this file whenever content changes.

---

## 1. Site map

Nine public pages plus a 404. Flat hierarchy, no sub-folders.

| Page | File | Role |
|---|---|---|
| Home | `index.html` | Orientation + routing to everything else |
| About & visit | `about.html` | Address, hours, map, contact form |
| Our doctor | `team.html` | Credentials and approach — the trust page |
| Conditions | `conditions.html` | What we treat, explained plainly |
| Services | `services.html` | What we do clinically |
| First visit | `first-visit.html` | Onboarding for anxious new patients |
| FAQ | `faq.html` | Objection handling |
| Resources | `resources.html` | Patient education (tests, meds, lifestyle) |
| Patient stories | `testimonials.html` | Social proof |
| Not found | `404.html` | Recovery |

**Current nav order:** Home · About · Our Doctor · Conditions · Services · First Visit · FAQ · Resources
(Testimonials is reachable from Home and footer only — not in the top nav.)

**Proposed regrouping** (discussed, not yet built) — 8 flat items is heavy for older patients:
- **Care** → Conditions · Services · First visit
- **The clinic** → About · Our doctor
- **Learn** → FAQ · Resources · Patient stories
- Always-visible primary action → Call / WhatsApp

---

## 2. Content principles

These govern tone across every page. Preserve them through any redesign.

1. **Reassurance-first.** Patients arrive anxious and often mid-flare. Almost every condition
   block ends on a hopeful, factual note ("highly treatable when caught early", "far more can be
   done than most people think"). Never alarmist, never over-promising.
2. **Plain language over jargon.** Medical terms are introduced then immediately explained.
3. **Unhurried.** Copy repeatedly signals that consultations are not rushed — this is a core
   differentiator versus busy local practices.
4. **Bilingual as respect, not decoration.** Telugu is the patient's language, not a translation
   afterthought. Quality must match the English.
5. **No false claims.** No insurance promises, no cure claims, testimonials clearly placeholder
   until real consented ones exist.
6. **British spellings** in copy (centre, optimised, specialise).

---

## 3. Page-by-page structure

### 3.1 Home — `index.html`

1. **Hero**
   - Headline: "Expert care for joints, bones & autoimmune conditions."
   - Lead: from joint pain/arthritis to lupus/spondyloarthritis — diagnose, then walk with you through treatment.
   - CTAs: *Book by phone* (tel:) · *WhatsApp us*
   - Portrait/photo slot
2. **Stat strip** — `9+` years in practice · `15,000+` patients treated · `Mon–Sat 9 AM–8 PM`
3. **"What would you like to explore?"** — 6 routing cards:
   First time here? · Conditions we treat · Our services · Meet our doctor · Visit the clinic · Patient resources
4. **"Why Kurnool Rheumatology Centre"** — 6 value cards:
   Specialist expertise · Time you can trust · Everything in one place · Bilingual care ·
   Reachable when you need us · Long-term partnership
5. **"In their words"** — 3 testimonial previews + link to full page
6. **CTA band** — "Ready to take the next step?" + phone + WhatsApp

### 3.2 About & visit — `about.html`

1. **Intro** — "A focused clinic for rheumatology care in Kurnool"
2. **Contact & visit** — five rows: Address · Phone · WhatsApp · Email · Hours
3. **Map** — Google Maps embed + "Get directions" button → `maps.app.goo.gl/mRYekLuWnqAVZDu87`
4. **Contact form** — Name (req) · Phone (req) · Email (optional) · Message (req) → Formspree `mzdwdnvz`.
   Footnote: urgent concerns should call instead.

### 3.3 Our doctor — `team.html`

1. **Profile** — photo, name, credential pills (`MD (Medicine)`, `MRCP (UK)`, `SCE Rheumatology`),
   lead bio (9+ yrs, 15,000+ patients), CTAs: *Book consultation* · *First visit guide*
2. **Four detail cards**
   - Training & qualifications — MD, MRCP (UK), SCE Rheumatology (RCP UK)
   - Clinical interests — RA, AS, SLE, psoriatic arthritis, gout, osteoporosis, vasculitis, undiagnosed inflammatory joint pain
   - Procedures performed — intra-articular & soft-tissue injections, joint aspiration, image-guided procedures
   - Approach to care — patient-first, evidence-based, unhurried, explained in English or Telugu

### 3.4 Conditions — `conditions.html`

Eight conditions. Each follows the same three-part template:
**intro paragraph → "Common signs & symptoms" (3 bullets) → "What you should know" (reassurance).**

| # | Condition | Telugu | Reassurance angle |
|---|---|---|---|
| 1 | Rheumatoid Arthritis (RA) | రుమటాయిడ్ ఆర్థరైటిస్ | Highly treatable today; early DMARDs/biologics prevent joint damage |
| 2 | Osteoarthritis (OA) | ఆస్టియో ఆర్థరైటిస్ | Not "just old age" — lifestyle, physio, meds, injections help a lot |
| 3 | Systemic Lupus (SLE) | సిస్టెమిక్ లూపస్ | Lifelong but most patients live full lives; monitoring is key |
| 4 | Ankylosing Spondylitis / Spondyloarthritis | ఆంకిలోజింగ్ స్పాండిలైటిస్ | Inflammatory ≠ mechanical back pain; biologics transformed outcomes |
| 5 | Gout | గౌట్ | Fully manageable; recurrent attacks mean treatment needs adjusting |
| 6 | Psoriatic Arthritis | సోరియాటిక్ ఆర్థరైటిస్ | Early treatment prevents damage; skin + joints often improve together |
| 7 | Vasculitis | వాస్క్యులైటిస్ | Serious but highly treatable early; diagnosis can be organ-saving |
| 8 | Osteoporosis & bone health | ఎముకల పూర్ణాన్నత తగ్గుదల | DEXA detects risk before fracture *(no symptoms list — silent disease)* |

**Closing callout:** "Don't see your condition listed?" — we treat all rheumatologic conditions
including fibromyalgia, Sjögren's, scleroderma, polymyalgia rheumatica.

### 3.5 Services — `services.html`

Eight services, each a short card:

1. Specialist consultation — 30–45 min first visits, unhurried
2. Intra-articular injections — knees, shoulders, hands
3. On-site laboratory — ESR, CRP, RF, Anti-CCP, ANA
4. Imaging access — X-ray, ultrasound, DEXA via local partners
5. On-site pharmacy — including specialty drugs hard to find locally
6. Follow-up & monitoring — disease activity tracking, side-effect watch
7. Phone & WhatsApp support — urgent queries during clinic hours
8. Coordinated multi-specialty care — kidney, eye, lung, skin referrals

**Insurance callout:** not processed directly; detailed receipts provided for reimbursement.

### 3.6 First visit — `first-visit.html`  ⭐ *user's favourite — preserve this flow*

1. **Intro** — "Your first visit, made simple." Acknowledges the journey feels overwhelming.
2. **Six numbered steps**
   1. Book your appointment — prior booking only; phone or WhatsApp
   2. Prepare what to bring — old reports, current meds/packets, recent tests, symptom list with dates
   3. Initial consultation — detailed history, joint exam, review, explained in your language
   4. Tests, if needed — why each one, arranged same-visit via on-site lab
   5. Treatment plan — likely diagnosis, what we're starting, what to watch, when to return
   6. Follow-up — ongoing monitoring, reachable between visits
3. **Reassurance callout** — "Don't have a clear diagnosis yet? That's completely fine." A big
   part of the job is figuring out what other doctors could not.
4. **CTAs** — Read FAQ · Browse conditions · Book now

### 3.7 FAQ — `faq.html`

Eleven Q&As, accordion, full English **and** full Telugu sets. Also powers `FAQPage` JSON-LD.

1. What is a rheumatologist? Do I need one?
2. Do I need a referral to book an appointment?
3. How do I book an appointment?
4. What should I bring to my first appointment?
5. How long will the first consultation take?
6. Do you accept insurance?
7. Will I need many tests?
8. Are rheumatic diseases curable?
9. Are the medications safe long-term?
10. Can I reach the doctor between visits?
11. What if I'm scared or anxious about my visit?

### 3.8 Resources — `resources.html`

Three sections of patient education.

**A. Understanding common rheumatology blood tests** (7 explainers)
ESR · CRP · RF · Anti-CCP · ANA · Uric acid · HLA-B27
→ closing warning callout: lab values without clinical context mislead; discuss reports with your doctor.

**B. Medication safety basics** (4 cards)
Take as prescribed · Don't skip monitoring tests · Tell us about other medicines · Vaccines & immune-suppressing drugs

**C. Lifestyle & everyday habits** (6 cards)
Stay active · Healthy weight · Sleep & stress · A balanced diet · Quit smoking · Sun & vitamin D

### 3.9 Patient stories — `testimonials.html`

Eight stories, each: quote + attributor initial-avatar + name + context label.
⚠️ **All placeholders** pending real consented testimonials. Home page shows 3 of them.
Closing callout invites patients to share via Google Reviews or WhatsApp.

### 3.10 Not found — `404.html`

404 numeral · "We couldn't find that page" · CTAs (Back to home, phone) ·
three recovery cards (Visit us · Conditions · FAQ).

---

## 4. User flows

The four journeys the site must serve. Any redesign should be tested against these.

| Visitor | Path | What must be effortless |
|---|---|---|
| **Anxious new patient** | Home → First visit → FAQ → Call | Reassurance early; "what to bring"; one-tap call |
| **Symptom researcher** | Search/Google → Conditions → Services → Call | Finding their condition fast; plain explanation |
| **Checking legitimacy** | Home → Our doctor → Patient stories → About (map) | Credentials visible immediately; real address + map |
| **Existing patient** | Home → Resources, or straight to Call | Understanding a test result; reaching the clinic between visits |

**Universal:** phone number reachable within one tap from anywhere, on any page, at any scroll position.

---

## 5. Bilingual content inventory

Every page carries a complete Telugu twin. Approximate paired-block counts:

| Page | EN/TE blocks | Page | EN/TE blocks |
|---|---|---|---|
| index | 46 | first-visit | 21 |
| conditions | 64 | about | 19 |
| resources | 41 | services | 19 |
| testimonials | 20 | team | 13 |
| 404 | 9 | faq | full dual Q&A sets |

**The Telugu copy is the most expensive asset in this repo.** It is hand-written, not machine
translated. Any redesign must carry it across verbatim — never regenerate it from scratch.

---

## 6. Design decisions log

What has been tried and what was concluded. Read before proposing a direction.

| # | Approach | Verdict |
|---|---|---|
| 1 | **Twine interactive-fiction site** (original) | ✗ Replaced. No persistent nav, poor SEO, wiki-style linking confused patients. |
| 2 | **Language splash page** (choose EN/TE before entering) | ✗ Removed. A gate before content; patients bounce. |
| 3 | **v1 "Apple HIG / Material" card-grid** (current live site) | ✗ Judged **too generic** — centred hero + 3 stats + blue gradient + emoji icons + symmetric card grids is the default template look. |
| 4 | **Editorial + inline same-line EN/TE pairing** (`mockup-editorial.html`) | ✗ Judged **still generic**, and stacking Telugu directly under each English line reads **awkward**. Do not revisit line-level pairing. |

### Bilingual presentation — open problem

- Edge-of-nav toggle → ignored by patients (the reason we moved away from it).
- Line-by-line stacked pairing → awkward, doubles page length. **Rejected.**
- **Still unexplored:** side-by-side columns at section level; a large persistent segmented
  switcher; per-section inline expander; separate `/te/` routes.

### Accessibility commitments (agreed, carry into any redesign)

- Body text 17–18px minimum; WCAG AA+ contrast.
- An A / A+ text-size control — genuinely useful for older, low-vision patients.
- 48px tap targets; full keyboard navigation; visible focus rings.
- `prefers-reduced-motion` honoured.
- No scroll-jacking, 3D, or motion gimmicks — they hurt the actual patient base.

---

## 7. Must-preserve list

Whatever the visual direction, these do not change:

1. **All Telugu copy** — carried across verbatim.
2. **The first-visit six-step flow** — user's favourite; the single best piece of the site.
3. **Reassurance-first tone** across conditions and FAQ.
4. **Phone reachable in one tap** from any page and scroll position.
5. **Clinic facts** exactly as recorded in `CLAUDE.md` (name, address, hours, credentials).
6. **Structured data** — `MedicalClinic` + `Physician` on home, `FAQPage` on FAQ.
7. **Testimonials flagged as placeholders** until real consented ones arrive.
