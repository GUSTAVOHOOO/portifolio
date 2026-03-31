# Pitfalls Research

**Domain:** Web agency portfolio site — small Brazilian agency targeting local SMBs
**Researched:** 2026-03-30
**Confidence:** HIGH (most pitfalls verified across multiple sources)

---

## Critical Pitfalls

### Pitfall 1: Portfolio Without Business Context

**What goes wrong:**
The portfolio section shows finished screenshots and project names but no explanation of what the client needed, what problem was solved, or what measurable result was achieved. Prospects see visually polished work but cannot evaluate whether the agency understands their kind of business.

**Why it happens:**
Designers think the work speaks for itself. The visual output is the pride; the client story feels like marketing fluff. Agencies build cases the way they'd add to a personal Dribbble — aesthetics first, narrative never.

**How to avoid:**
For every portfolio case, include: (1) client type and sector, (2) the core problem or goal, (3) what was built and why, (4) one concrete outcome if available (e.g., "restaurante passou a receber pedidos direto pelo WhatsApp"). Even two sentences per case changes the conversion signal entirely.

**Warning signs:**
- Portfolio cards show only a project image and a title
- No client industry or context label
- Filter categories exist but clicking them reveals only images
- Copy says "Veja nossos projetos" with no further explanation

**Phase to address:**
Content planning phase — before any component is built, define the case card data structure to enforce context fields as required, not optional.

---

### Pitfall 2: WhatsApp CTA With No Pre-Filled Message

**What goes wrong:**
The WhatsApp button opens a blank chat. The prospect stares at an empty text field with no idea what to write. Friction is high enough that many close the app without sending anything.

**Why it happens:**
The implementation is done in 30 seconds: hardcode `https://wa.me/55XXXXXXXXXXX`. It works. It links. Nobody tests the user experience of actually sending a message cold.

**How to avoid:**
Always include a `text` parameter with a pre-filled message that identifies the prospect's intent and the agency's name. Example:

```
https://wa.me/55XXXXXXXXXXX?text=Ol%C3%A1%2C+vim+pelo+site+da+GMStudio+e+gostaria+de+um+or%C3%A7amento.
```

The message must be URL-encoded. Test on both mobile (opens WhatsApp app) and desktop (opens WhatsApp Web). Vary the message per section: the CTA in the Hero should say something different from the CTA at the bottom of a specific service description.

**Warning signs:**
- WhatsApp link has no `?text=` parameter
- Phone number includes `+`, spaces, or parentheses (breaks the URL)
- CTA text is generic "Fale conosco" with no pre-filling
- Button is only tested on desktop, never on an actual mobile device

**Phase to address:**
Contact section implementation. Define the URL pattern as a constant in a single place — if the number changes, it must change everywhere at once. Verify URL encoding with an online encoder before finalizing.

---

### Pitfall 3: LCP Destruction by Unoptimized Hero and Portfolio Images

**What goes wrong:**
The site ships a full-resolution hero background, project screenshots at original capture size (often 1920x1080 PNG), and no `width`/`height` attributes on `<img>` tags. LCP on mobile exceeds 4 seconds. Google penalizes the page in rankings. Visitors on slower 4G connections (common in Brazil outside major cities) abandon before the hero fully loads.

**Why it happens:**
Images are added with `<img src="projeto-1.png">` during development on a fast local machine. It looks fine. Nobody measures on a throttled mobile connection before shipping.

**How to avoid:**
- Serve all images in WebP (fallback JPEG for legacy browsers)
- Hero image: max 120KB at 1200px wide; use `srcset` for 2x screens
- Portfolio screenshots: max 80KB per thumbnail; lazy-load all below the fold
- Preload the hero image with `<link rel="preload" as="image" fetchpriority="high">`
- Always specify `width` and `height` attributes on every `<img>` to prevent CLS
- Never apply `loading="lazy"` to the above-the-fold hero image

**Warning signs:**
- Lighthouse mobile score below 70
- LCP > 2.5s in PageSpeed Insights
- Portfolio images are PNG files > 500KB
- CLS score above 0.1 (layout shifts visible when images load)
- No `width`/`height` on `<img>` tags in the codebase

**Phase to address:**
Asset pipeline setup — before any images are added to the site. Establish image optimization as a build step or manual workflow, not a post-launch cleanup task.

---

### Pitfall 4: Company-Centric Copy That Ignores the Prospect

**What goes wrong:**
The Hero says "Somos a GMStudio, uma agência apaixonada por tecnologia e design." The Services section describes what the agency does technically. The About section is a company biography. The prospect reads everything and still doesn't know: "Will these people solve my specific problem?"

**Why it happens:**
The natural instinct when building your own site is to talk about yourself — your story, your skills, your passion. It feels authentic. It is the wrong frame for conversion.

**How to avoid:**
Rewrite every headline through the prospect's lens. Instead of "Criamos presença digital," write "Seu restaurante na internet em 7 dias, com cardápio online e WhatsApp integrado." The service descriptions should lead with the client's problem, not the agency's solution. Test copy by asking: "Can my client recognize their own situation in this sentence?"

**Warning signs:**
- Hero headline starts with "Somos" or "Nós"
- More than 50% of above-the-fold copy uses "nós/nossa/nosso"
- Services are described as a list of deliverables, not client outcomes
- No industry-specific language (restaurante, loja, profissional liberal)

**Phase to address:**
Copywriting phase, before UI implementation. Copy should be locked before components are built around it — retrofitting copy into a finished layout always compromises one or the other.

---

### Pitfall 5: Single CTA Buried Below the Fold

**What goes wrong:**
The Contact section is at the very bottom of a long page. The Hero and Services sections have no actionable button. Prospects who are convinced halfway down the page have no way to act on that conviction — they must scroll all the way to the end or give up.

**Why it happens:**
The site is laid out as a narrative: introduce → show work → explain services → then contact. The logic is linear. Conversion behavior is not linear.

**How to avoid:**
Place a primary CTA (WhatsApp button) in the Hero section, above the fold, visible without any scrolling. Repeat it at the bottom of the Services section, at the end of the Portfolio section, and in the final Contact section. On mobile, consider a sticky floating WhatsApp button that persists throughout scrolling. CTAs above the fold outperform below-the-fold CTAs by 304%; a single above-fold CTA increases clicks by 73%.

**Warning signs:**
- First CTA appears only after the portfolio section
- No sticky or floating contact button on mobile
- Hero section is purely informational with no action affordance
- CTA only says "Entre em contato" without specifying the channel (WhatsApp)

**Phase to address:**
Layout and component design phase. Treat CTA placement as a structural decision, not a styling decision. It should appear in wireframes, not be added later.

---

### Pitfall 6: Vague or Generic Testimonials

**What goes wrong:**
The testimonials section shows quotes like "Ótimo trabalho, recomendo!" with a first name and no photo, company, or industry context. These carry zero persuasive weight because they cannot be verified and say nothing specific.

**Why it happens:**
Getting testimonials is awkward. Agencies ask for "a quick review," clients write something polite and short. Nobody follows up to get a specific, contextual quote. The agency takes what it gets and publishes it.

**How to avoid:**
Ask clients three specific questions: (1) What was your business situation before working with GMStudio? (2) What was delivered and what did it change? (3) What would you tell a business owner who is considering hiring them? Use the answer to the third question as the testimonial — it's already addressed to the prospect. Include the client's full name, business name, and sector. A photo or business logo adds significant credibility. Ratings peaking at 4.2–4.5 (not 5.0) appear more authentic and actually convert better.

**Warning signs:**
- Testimonials are fewer than 3 sentences each
- No business name or sector mentioned
- No photo or logo associated
- All testimonials are uniformly positive without any nuance
- Testimonials reference the agency by generic terms ("eles", "a equipe") rather than by name

**Phase to address:**
Content gathering, before or during development. This is a dependency: testimonials must be collected from real clients before the site can launch with this section populated. Build the section with placeholder states to avoid launching with empty boxes.

---

### Pitfall 7: Mobile Interaction Failures on Touch Targets and Navigation

**What goes wrong:**
Navigation items are too close together for a thumb to tap accurately. The WhatsApp button overlaps important page content on small screens. Hover-state interactions designed for desktop have no equivalent on touch screens. The site looks correct on a desktop browser in mobile emulation mode but breaks on a real device.

**Why it happens:**
Development happens on a desktop. Mobile is tested in Chrome DevTools device emulation, which does not replicate actual touch behavior, viewport quirks, or the browser chrome eating into the visible area.

**How to avoid:**
- Minimum tap target: 44x44px (Apple) or 48x48dp (Google Material)
- Test on a real Android device at low-to-mid tier (the typical Brazilian SMB owner's phone)
- Fixed floating WhatsApp button: position it bottom-right, 80px from the bottom edge to avoid overlapping the browser navigation bar
- Navigation hamburger menu must open fully and be dismissible with a tap outside
- Use `min-height: 44px` for all interactive elements

**Warning signs:**
- Navigation links have less than 8px spacing on mobile
- WhatsApp button is cut off or hidden behind the browser address bar
- Hover effects on portfolio cards have no touch equivalent (cards appear static on mobile)
- Testing is only done in Chrome DevTools, never on a physical device

**Phase to address:**
Mobile-first development phase. All layout decisions should start at 375px viewport width and scale up, not be adapted down from desktop.

---

### Pitfall 8: Portfolio Section That Cannot Be Updated Without Touching Code

**What goes wrong:**
Portfolio cases are hardcoded as HTML/JSX. When a new project is completed, the developer must edit component files, push a new build, and redeploy. For a small agency that may not always have a developer available, this creates a bottleneck that causes the portfolio to go stale. An outdated portfolio (cases from 2+ years ago) signals stagnation to prospects.

**Why it happens:**
v1 is built for speed: hardcode the data, ship the site. There is no plan for who updates the portfolio after launch, or how often. The "CMS can come later" decision is never revisited.

**How to avoid:**
Even without a full CMS, separate content from structure from day one. Store portfolio case data in a JSON or Markdown file — not inline in component files. This way, adding a new case requires only editing a data file, not touching component logic. If the project uses a static site generator, this is the natural pattern. If it's pure HTML/CSS/JS, a `projects.js` data array that the page reads from achieves the same goal.

**Warning signs:**
- Portfolio case data (title, description, image path, category) is hardcoded inside JSX or HTML components
- No data layer separating content from layout
- Non-developer team members have no path to add a new project without asking a developer

**Phase to address:**
Architecture phase, before portfolio component development. Decide on the data structure before writing any component. This is a 30-minute architectural decision that prevents weeks of future pain.

---

### Pitfall 9: Open Graph and Meta Tags as an Afterthought

**What goes wrong:**
The site launches without `og:title`, `og:description`, `og:image`, or `twitter:card` tags. When someone shares the site on WhatsApp (the primary sharing channel for the target market), the preview shows a blank card or a garbled URL. This is not a minor SEO issue — it directly hurts the viral loop of word-of-mouth referral that local agencies depend on.

**Why it happens:**
Open Graph tags are not visible in the browser. They don't affect how the page looks. They are easy to forget and their absence is only discovered when someone actually tries to share a link.

**How to avoid:**
Add all Open Graph and Twitter Card meta tags before launch: `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type`, `og:locale` (set to `pt_BR`). Test previews using the WhatsApp link preview before sharing (send the URL to yourself in WhatsApp and check the card). Also test with the Facebook Sharing Debugger.

**Warning signs:**
- No Open Graph tags in `<head>`
- `og:image` not defined or pointing to a non-absolute URL
- WhatsApp link preview shows only the URL with no card
- `og:locale` is missing or set to `en_US` instead of `pt_BR`

**Phase to address:**
SEO/meta setup phase — must be done before launch, not after. Treat it as a launch gate criterion, not a nice-to-have.

---

### Pitfall 10: Brand Identity Built During Development, Not Before It

**What goes wrong:**
Development starts with placeholder colors and fonts. The logo is "coming soon." Components are built with `#3B82F6` as the primary color. When the brand identity is finally decided, every color token, every gradient, every illustration must be reworked. The result is visual inconsistency — components built at different times follow different style conventions.

**Why it happens:**
Brand work and development are treated as sequential but often run in parallel under schedule pressure. "We'll figure out the brand as we go" is a common compromise that turns into a complete visual rebuild.

**How to avoid:**
Block development of any UI component until the following brand decisions are locked: primary and secondary color, neutral/background colors, heading font, body font, and logo in SVG format. These decisions feed the CSS custom properties (`--color-primary`, `--font-heading`, etc.) that all components consume. If brand decisions are not available, build the brand first; do not build UI in parallel with open brand variables.

**Warning signs:**
- Development starts with "temporary" Bootstrap blue or Tailwind blue as the brand color
- Logo is a text placeholder in development
- Typography is system-sans because the "real font hasn't been chosen yet"
- Color decisions are scattered in component files rather than in a single design token file

**Phase to address:**
Phase 0 / Pre-development brand phase. This must be complete and signed off before any HTML/CSS work begins. If brand and development must overlap, establish a design token file on day one that all components reference — tokens can be updated globally when the final brand is locked.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded portfolio cases in JSX/HTML | Faster initial build | Adding new cases requires developer + deployment | Never — separate data from structure from day one |
| Single WhatsApp number with no pre-filled text | 5-minute implementation | High friction for prospects, lower conversion | Never — takes 5 minutes to add `?text=` |
| PNG images at original resolution | No conversion pipeline needed | LCP failure, slow mobile loads, poor SEO | Never — WebP conversion is a one-time cost |
| No `width`/`height` on images | Slightly faster HTML authoring | CLS issues, layout shifts, Lighthouse penalty | Never — always specify dimensions |
| Inline color values instead of CSS tokens | Faster initial coding | Complete rework when brand changes | Only for truly throwaway prototypes |
| No Open Graph tags at launch | Save 30 minutes | WhatsApp shares show blank cards | Never — 30-minute setup, permanent benefit |
| Generic testimonials ("great work!") | Easier to collect | Zero trust signal, hurts conversion | Never — 3 specific questions yield specific answers |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| WhatsApp click-to-chat | Phone number with `+`, spaces, or dashes in URL | Use digits only with country code: `5511999999999` |
| WhatsApp pre-filled text | Unencoded special characters (ã, ç, ?, &) | URL-encode the `text` parameter; test in a real device |
| Google Fonts | Loading 4+ font weights | Load maximum 2 weights per family; use `display=swap` |
| Contact form (if used) | Mailto: action exposes email to scrapers | Use a serverless form handler (Formspree, Netlify Forms) or omit in favor of WhatsApp-only |
| Social media links | Opening in same tab | All external links open in `_blank` with `rel="noopener noreferrer"` |
| Google Analytics / Tag Manager | Script blocking LCP | Load analytics deferred, never in `<head>` blocking position |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Uncompressed portfolio screenshots | LCP > 3s on mobile, Lighthouse score < 50 | WebP, max 80KB per thumbnail | Immediately on first real-device test |
| `loading="lazy"` on hero image | LCP score worsens even after other optimizations | Only lazy-load below-the-fold images | Immediately measurable in PageSpeed Insights |
| Google Fonts blocking render | Flash of invisible text (FOIT) on slow connections | `font-display: swap` + preconnect to fonts.googleapis.com | On connections slower than 10 Mbps |
| No image dimensions (width/height) | Layout shifts as images load (visible reflow) | Always set explicit dimensions | Every page load on every device |
| CSS/JS not minified | Larger payload than necessary | Build step: minify all assets before deploy | Measurable from day one; worsens with scale |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Contact form with action pointing to a PHP script | Spam target, server-side dependency | Use Formspree, Netlify Forms, or WhatsApp-only contact |
| Phone number exposed as plain text in HTML | Scrapers harvest and sell the number | Acceptable for a public business; no mitigation needed for this use case |
| External scripts loaded from CDN without SRI hash | Supply-chain script injection | Use Subresource Integrity (SRI) on third-party scripts, or self-host |
| No HTTPS | Browser "Not Secure" warning destroys trust; no WhatsApp link preview | Host on Vercel, Netlify, or GitHub Pages — all provide free HTTPS automatically |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Portfolio filter with no visible active state | User clicks "E-commerce" and isn't sure if the filter applied | Show active filter with a distinct visual state (filled button, underline, color change) |
| WhatsApp button that overlaps page content on small phones | User cannot tap buttons beneath the floating CTA | Position `bottom: 80px` on mobile to clear browser navigation bar; use `z-index` carefully |
| Hero with autoplaying video background | High data usage; kills performance on mobile; distracting | Use a static image or subtle CSS animation; never autoplay video |
| Services section with only technical jargon | SMB owner does not understand "landing page responsiva com integração de API" | Lead with outcomes: "Página de captação que transforma visitantes em clientes" |
| Portfolio cards that open a modal with no back gesture | Mobile users get trapped; back button may close the overlay unpredictably | Either link to a full project page or design the modal with explicit close affordance and test on touch |
| No loading state on filter interactions | User clicks portfolio category, nothing appears to happen for 200ms | Add a brief opacity transition on filter so the user sees the interaction acknowledged |

---

## "Looks Done But Isn't" Checklist

- [ ] **WhatsApp CTA:** Button works on mobile AND desktop — verify both; pre-filled message is URL-encoded and readable
- [ ] **Open Graph:** Share the URL in WhatsApp on a real phone — a card preview with image must appear, not a plain URL
- [ ] **Portfolio filter:** Test with JavaScript disabled — at minimum, all projects should be visible; ideally, filter degrades gracefully
- [ ] **Contact form (if present):** Actually submit the form and verify the submission reaches the inbox — test with a real email address
- [ ] **Responsive breakpoints:** Test on a real Android device (not emulator) at 360px width — not just Chrome DevTools
- [ ] **Images:** Run PageSpeed Insights on mobile — LCP must be under 2.5s; CLS must be under 0.1
- [ ] **Meta tags:** `<title>` and `<meta name="description">` present and include a location keyword (city or "Brasil")
- [ ] **Social links:** All footer social links open correct profiles, in new tabs
- [ ] **Brand consistency:** All colors match the approved brand palette — no leftover Bootstrap blues or Tailwind defaults
- [ ] **Testimonials:** Every testimonial has a real name, business/sector, and is not a generic one-liner
- [ ] **Portfolio data:** Every portfolio case has a title, sector label, brief description, and project image — no empty or placeholder cases at launch

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Hardcoded portfolio requiring developer per update | MEDIUM | Refactor case data to a JSON/data file; update all component references; retest |
| Unoptimized images causing LCP failure | LOW | Batch-convert to WebP; replace in assets folder; update `<img>` src paths |
| Missing Open Graph tags | LOW | Add 6 meta tags to `<head>`; test with WhatsApp and Facebook Debugger |
| Wrong WhatsApp number or broken URL | LOW | Update constant in one place if properly abstracted; otherwise find-replace all occurrences |
| Brand redesign after components are built | HIGH | Requires updating every color reference; mitigated if CSS tokens were used from the start |
| Generic testimonials hurting credibility | MEDIUM | Re-contact clients with 3 specific questions; collect new quotes; update section |
| Company-centric copy killing conversion | MEDIUM | Rewrite Hero, Services descriptions, and About intro; regression-test on mobile layouts |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Brand built during development | Phase 0: Brand identity (must complete before dev starts) | Brand token file committed; logo SVG available; no placeholder colors in components |
| Company-centric copy | Phase 1: Content/copy planning (before UI build) | Every headline reviewed against "does this speak to the prospect's problem?" |
| Portfolio without business context | Phase 1: Content structure definition | Case card data model requires problem + outcome fields as non-optional |
| Portfolio hardcoded in components | Phase 2: Architecture — data layer design | Portfolio data lives in a separate JSON/data file; no case content in component logic |
| Unoptimized images destroying LCP | Phase 2: Asset pipeline setup | Build process converts to WebP; PageSpeed Insights mobile score ≥ 80 |
| Single CTA buried at page bottom | Phase 3: Layout and component design | Wireframe shows CTA in Hero, post-Services, post-Portfolio, and Contact |
| WhatsApp CTA with no pre-filled message | Phase 3: Contact component implementation | URL tested on real mobile device; pre-filled message is readable |
| Mobile touch target failures | Phase 3: Mobile-first development | Test checklist includes real-device verification at 360px |
| Vague testimonials | Phase 3: Content gathering (concurrent) | Testimonial section has minimum 3 specific quotes with business context |
| Open Graph tags missing at launch | Phase 4: Pre-launch SEO checklist | WhatsApp link share produces visible card preview on real device |
| No meta description / local SEO signals | Phase 4: SEO meta implementation | `<title>` and `<meta description>` include city or "Brasil" and service keywords |

---

## Sources

- [Agency Portfolio Sites in 2026: Conversion System](https://unicornplatform.com/blog/agency-portfolio-sites-in-2026/) — portfolio storytelling and conversion pitfalls
- [Mistakes Killing Your Portfolio Conversion Rate](https://techiets.com/blog/mistakes-killing-your-portfolio-conversion-rate-and-fixes) — specific portfolio CRO failures
- [11 Website Conversion Best Practices for Agencies](https://www.manyrequests.com/blog/website-conversion-best-practices) — agency-specific conversion guidance
- [WhatsApp Business Best Practices 2025](https://www.zoko.io/post/whatsapp-business-best-practices-success) — CTA and message design
- [WhatsApp CTA Button Best Practices](https://business.whatsapp.com/resources/resource-library/whatsapp-business-app-resources/ads-that-click-to-whatsapp-best-practices) — official WhatsApp guidance
- [WhatsApp Button Implementation Guide](https://www.w3tutorials.net/blog/mobile-website-whatsapp-button-to-send-message-to-a-specific-number/) — URL encoding and phone number format
- [Lazy Loading — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) — correct lazy loading implementation
- [Image Optimization Complete Guide 2026](https://requestmetrics.com/web-performance/high-performance-images/) — WebP, srcset, and portfolio image strategy
- [Core Web Vitals 2025 Complete Guide](https://mobileproxy.space/en/pages/core-web-vitals-2025-the-complete-guide-to-lcp-cls--inp-for-mobile-and-desktop.html) — LCP, CLS thresholds and fixes
- [CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages) — above-fold vs below-fold conversion data
- [25 CTA Statistics 2026](https://wisernotify.com/blog/call-to-action-stats/) — 304% above-fold advantage, 73% visibility rate
- [Social Proof Testimonials Credibility](https://www.wisecoda.com/blog/social-proof-testimonials-credibility-conversion-optimization) — authenticity over perfection
- [Erros Comuns em Sites de Pequenas Empresas](https://hospedagemdesites.webdas.net/erros-mais-comuns-em-sites-de-pequenas-empresas-e-como-corrigi-los/) — Brazilian market context
- [Por que seu site não vende — 7 erros invisíveis](https://w2websites.com/blog/por-que-meu-site-nao-vende-erros-invisiveis/) — Brazilian SMB conversion failures
- [SEO Local para Pequenas Empresas 2026](https://agenciakaizen.com.br/melhores-praticas-em-seo-para-pequenas-empresas-em-2026/) — local SEO in Brazil
- [Top 10 SEO Mistakes 2025](https://eternitymarketing.com/blog/the-top-10-seo-mistakes-in-2025-and-how-to-fix-them) — meta tags and technical SEO

---
*Pitfalls research for: Web agency portfolio site (GMStudio — Brazilian agency targeting local SMBs)*
*Researched: 2026-03-30*
