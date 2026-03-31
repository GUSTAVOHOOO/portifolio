# Feature Research

**Domain:** Web development agency portfolio / lead generation site
**Researched:** 2026-03-30
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features entrepreneurs expect when evaluating any agency. Missing these = the visitor dismisses the agency as unprofessional or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with clear value proposition | First impression — visitor decides in ~3s whether to stay; unclear proposition causes bounce | LOW | "What we do, for whom, to what end" in one sentence. GMStudio: presenca digital para empresas locais. |
| Portfolio / work samples | Primary reason visitors come — "can they do what I need?" | MEDIUM | Without this the site is marketing claims with zero proof. Especially critical for a new agency. |
| Services list | Visitor needs to confirm the agency does the specific thing they want (loja, cardapio, landing page) | LOW | Brief, categorical. Not long prose — entrepreneur scans for match. |
| Contact method — WhatsApp | In Brazil, WhatsApp is the dominant business communication channel; absence raises a credibility red flag | LOW | Floating button or prominent CTA. wa.me link with pre-filled message reduces friction. |
| Mobile-responsive layout | ~70-80% of Brazilian small business owners browse on mobile (MEDIUM income, smartphone-first); non-responsive = broken | MEDIUM | Must be designed mobile-first, not desktop-adapted. |
| About / who we are section | Entrepreneurs hire people they trust; faceless agencies lose to local word-of-mouth unless they humanize | LOW | Names, faces, short bios. "Small team you can actually talk to" is a positioning strength for local agencies. |
| Client testimonials | Social proof; "if others like me hired them, it probably worked" — 1st-time buyers depend heavily on peer validation | LOW | Real names, ideally photos or logos of the client business. Fake-looking testimonials hurt more than none. |
| Fast loading speed | Slow site signals poor technical craft — exactly the thing you're selling; also critical for mobile on 4G | MEDIUM | Images must be optimized, static generation preferred. Core Web Vitals matter for SEO too. |
| Basic SEO (meta tags, Open Graph) | Organic discovery via Google; Open Graph needed for WhatsApp/social share previews to look professional | LOW | Title, description, OG image per page minimum. |
| Clear call-to-action (CTA) | Every section should push the visitor toward contact; without it, interested visitors leave without acting | LOW | Multiple touchpoints: hero, after portfolio, after testimonials, footer. |

### Differentiators (Competitive Advantage)

Features that set GMStudio apart from generic agencies and template-shop competitors. Aligned with the core value: "convince the visitor GMStudio is the right choice."

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Filterable portfolio by project type | Entrepreneurs self-identify by category (restaurante, loja, profissional liberal); showing "my exact situation" projects instantly increases relevance and trust | MEDIUM | Filter by: loja online, cardapio digital, landing page, site institucional. Client-side JS filter — no server needed. |
| Project case studies (problem + solution + result) | Proves strategic thinking, not just visual execution; converts skeptical visitors by showing real business outcomes | HIGH | Even 2-3 deep case studies beat 10 thumbnail galleries. "Client had no online presence, now receives 40+ orders/week online" is far more persuasive than a screenshot. |
| Process / how we work section | Reduces anxiety about the unknown for first-time buyers; explains steps from first contact to delivery, reducing objections | LOW | 4-5 steps. "You talk to us → we propose → we build → you approve → we launch." Demystifies the engagement. |
| Niche service pages (one per service type) | SEO long-tail capture ("cardapio digital para restaurante Sao Paulo") + deeper persuasion for visitors who already know what they want | MEDIUM | Separate landing page per service type, each with its own CTA and specific social proof from that niche. |
| WhatsApp CTA with pre-filled context message | Reduces friction at the moment of contact; visitor arriving on WhatsApp with context ("Vim do site, quero um cardapio digital") = better first impression | LOW | Pre-fill message template per service: "Oi, vi o site da GMStudio e tenho interesse em [servico]". |
| Visual brand identity (custom, not template) | In a sea of agencies using the same templates, a distinctive brand signals craft and intentionality — exactly what clients pay for | HIGH | Brand design is in scope per PROJECT.md. Logo, color palette, typography system. This is foundational, not optional. |
| Pricing transparency (package/range signal) | Brazilians research price before contacting; showing "a partir de R$X" reduces no-budget leads and builds trust with qualified prospects | MEDIUM | Full itemized pricing is not recommended — but a "starting at" anchor or tiered packages (basic / intermediario / avancado) manages expectations without locking in negotiation. |
| Visible team faces and personalities | Humanizes the agency; small business owners prefer to know who will actually build their site before picking up the phone | LOW | Photos with short personality-driven bios. Not just "Web Developer, 5 years experience" — something that builds rapport. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Blog / editorial content | "Content marketing helps SEO" — true in theory | For a greenfield site with no audience, a blog requires consistent investment (writing, editing, publishing) that almost never happens; an empty or stale blog actively signals neglect | Defer to v2. If SEO content is needed, individual service pages (one per service type) deliver targeted SEO value with one-time effort. |
| Client login / project portal | "Clients want to track their project" | Adds auth, backend, session management, security surface — vastly exceeds the complexity budget for a portfolio/lead-gen site | Handle client communication via WhatsApp and email; dedicated project management tools (Notion, Trello) serve this purpose better. |
| CMS / admin panel (v1) | "We'll want to update content without a developer" | Valid long-term need, but adds infrastructure complexity (auth, DB, hosting) that conflicts with the static site decision; premature optimization for a site whose content will be stable for months | Ship static v1; add a headless CMS (e.g., Sanity, Contentlayer) when content velocity demands it. Flag for v2. |
| Chatbot / live chat widget | "Instant response increases conversions" | Generic chatbots reduce trust with local Brazilian SMBs who want to talk to a real person; adds JS weight; WhatsApp already solves this | A prominent WhatsApp floating button does the same job with less friction and more trust. |
| Portfolio with 20+ projects | "More work = more impressive" | Quantity dilutes quality; visitors scan and disengage; no-context thumbnails don't persuade | Curate 6-10 best projects. Add 2-3 deep case studies. Quality + context beats volume. |
| Animations / heavy motion UI | "Makes the site look premium and modern" | Hurts performance on 4G mobile (primary access mode for target audience); increases bounce rate; distracts from the conversion goal | Subtle transitions only. Reserve motion for micro-interactions, not page-level spectacle. |
| Pricing calculator | "Interactive tool gives personalized quotes" | Complex to build, hard to maintain, creates price expectations that don't account for project specifics, leads to misaligned prospects | Show package tiers or "a partir de" anchors instead. Contact form/WhatsApp handles the real scoping conversation. |

## Feature Dependencies

```
[Visual Brand Identity]
    └──required-by──> [Hero Section]
    └──required-by──> [Portfolio]
    └──required-by──> [All Pages / Site]

[Portfolio (curated projects)]
    └──enhances──> [Case Studies]
    └──required-by──> [Portfolio Filter]

[Services List]
    └──enhances──> [Niche Service Pages]
    └──required-by──> [Filterable Portfolio]  (filter labels = service categories)

[Testimonials]
    └──enhances──> [Case Studies]  (quotes embedded in case study pages)
    └──enhances──> [Niche Service Pages]  (niche-specific testimonials per page)

[Contact CTA (WhatsApp + Form)]
    └──required-by──> [WhatsApp pre-filled message]
    └──placed-after──> [Hero, Portfolio, Testimonials, Footer]

[Niche Service Pages]
    └──requires──> [Services List]  (services defined before expanded)
    └──requires──> [Portfolio (filtered)]  (each service page needs relevant portfolio items)
```

### Dependency Notes

- **Visual Brand Identity required-by everything:** Logo, palette, and typography must exist before any UI is built. Brand decisions are the true first milestone.
- **Portfolio required-by Case Studies:** Case studies are expanded portfolio entries. Can't have deep case studies without first curating the portfolio.
- **Services List required-by Portfolio Filter:** The filter categories are derived from service types. Define services first, then label filter tabs accordingly.
- **Testimonials enhance Case Studies:** A case study without a client quote is weaker. Collecting testimonials during content gathering unblocks deeper case studies.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to convert a visiting entrepreneur into a WhatsApp/email inquiry.

- [ ] Visual brand identity (logo, palette, typography) — nothing else can be built coherently without this
- [ ] Hero section with clear value proposition and primary CTA — captures attention and communicates purpose in 3 seconds
- [ ] Services section — confirms the agency does what the visitor needs
- [ ] Portfolio with 6-10 curated projects, filterable by service type — proof of capability, relevant to visitor's business type
- [ ] Testimonials (3-5 real clients) — social proof that removes doubt before contact
- [ ] About / team section with photos — humanizes; critical for trust with local SMBs
- [ ] Contact section: WhatsApp link, email, social links, optional short form — the conversion goal
- [ ] Mobile-first responsive design — majority of target audience is on mobile
- [ ] Basic SEO (meta tags, Open Graph) — discoverability and professional share previews

### Add After Validation (v1.x)

Features to add once the site is live and generating inquiries.

- [ ] 2-3 deep case studies with problem/solution/result narrative — add after identifying which service types get the most leads; write case studies for those niches first
- [ ] How we work / process section — add when sales calls reveal recurring "what happens after I contact you?" questions
- [ ] Pricing transparency (package tiers or "a partir de") — add after first 5-10 inquiries to gauge budget alignment issues
- [ ] Pre-filled WhatsApp messages per service type — add when service pages exist

### Future Consideration (v2+)

Features to defer until the site has traction and content needs evolve.

- [ ] Niche service pages (one per service type) — high SEO value but high content effort; defer until team has capacity to write and maintain them
- [ ] CMS / admin panel — add when content change frequency justifies the infrastructure investment
- [ ] Blog / editorial content — add only if agency wants to invest in content marketing seriously; not a v1 or v1.x concern
- [ ] Client portal / project tracking — add only if post-sale process management becomes a bottleneck

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Visual brand identity | HIGH | HIGH | P1 — blocks everything |
| Hero + value proposition | HIGH | LOW | P1 |
| Services section | HIGH | LOW | P1 |
| Filterable portfolio | HIGH | MEDIUM | P1 |
| Testimonials | HIGH | LOW | P1 |
| WhatsApp CTA (floating + section) | HIGH | LOW | P1 |
| Mobile-responsive layout | HIGH | MEDIUM | P1 |
| About / team section | MEDIUM | LOW | P1 |
| Basic SEO (meta + OG) | MEDIUM | LOW | P1 |
| Case studies (2-3 deep) | HIGH | HIGH | P2 |
| How we work / process section | MEDIUM | LOW | P2 |
| Pricing signal (tiers / a partir de) | MEDIUM | LOW | P2 |
| Pre-filled WhatsApp messages per service | MEDIUM | LOW | P2 |
| Niche service pages | MEDIUM | HIGH | P3 |
| CMS integration | LOW | HIGH | P3 |
| Blog | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch — site is broken or untrustworthy without it
- P2: Should have — adds conversion value, low risk to defer briefly
- P3: Nice to have — future consideration, high cost or low urgency

## Competitor Feature Analysis

Based on analysis of Brazilian web agency portfolios (Clutch BR, DesignRush BR listings) and global agency portfolio patterns.

| Feature | Common Agency Approach | What Often Goes Wrong | GMStudio Approach |
|---------|------------------------|----------------------|-------------------|
| Portfolio | Grid of thumbnails, 10-30 projects | No context, all look the same, visitor can't tell why to hire this agency | Curated 6-10, filterable by service type, 2-3 with full case study treatment |
| Testimonials | 1-2 generic quotes, no photo, no full name | Looks fabricated; builds zero trust | 3-5 with full name, role/business type, and optional photo; linked to related project |
| Services | Long prose descriptions | Dense, unscanned; visitor doesn't confirm fit quickly | Short, categorical, with icon/illustration per service type |
| Contact | Contact form only | Missing WhatsApp = missed conversions in Brazil; form-only feels cold | WhatsApp floating button + form + email; multiple entry points |
| About | Founder bio, formal tone | Feels corporate; creates distance from "small local partner" positioning | Real photos, first-person tone, signal that client talks to the people who build |
| CTA | One CTA in header only | Visitor scrolls past without seeing a second nudge | CTA after hero, after portfolio, after testimonials, in footer |
| Pricing | No mention | Creates anxiety and unqualified leads | At minimum "a partir de" or package tiers; manages expectations |

## Sources

- [Agency Portfolio Sites in 2026 — Unicorn Platform](https://unicornplatform.com/blog/agency-portfolio-sites-in-2026/)
- [How to write the perfect web design case study — Webflow Blog](https://webflow.com/blog/write-the-perfect-case-study)
- [Social proof website examples — Wishpond](https://wishpond.com/blog/social-proof-website-examples/)
- [Six Portfolio Mistakes That Are Losing You Clients — Fstoppers](https://fstoppers.com/education/six-portfolio-mistakes-are-losing-clients-683029)
- [Top Web Development Companies in Brazil — Clutch.co](https://clutch.co/br/web-developers)
- [Top 30 Web Design Companies in Brazil — DesignRush](https://www.designrush.com/agency/website-design-development/br)
- [Filter UI Design: Best UX Practices — Insaim Design](https://www.insaim.design/blog/filter-ui-design-best-ux-practices-and-examples)

---
*Feature research for: GMStudio — Web agency portfolio / lead generation site*
*Researched: 2026-03-30*
