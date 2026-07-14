# GEO / AI-Search Analysis — GymVow

**Audited URL:** `localhost:3000/` (source: `index.html`, single-page static site)
**Date:** 2026-07-05
**Framing:** Per Google's position, this is still SEO — fundamentals applied to AI-search surfaces (AI Overviews, AI Mode, ChatGPT, Perplexity). Findings below are ranked by impact on AI citability.

---

## 1. GEO Readiness Score: 61 / 100

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Citability | 25% | 78 | 19.5 |
| Structural readability | 20% | 72 | 14.4 |
| Multi-modal content | 15% | 35 | 5.3 |
| Authority & brand signals | 20% | 45 | 9.0 |
| Technical accessibility | 20% | 65 | 13.0 |
| **Total** | | | **≈ 61** |

**Verdict:** Solid content foundation, hampered by missing machine-readable layers (schema, robots/llms directives) and thin authority signals. Most of the gap can be closed with low-effort, high-leverage additions — the writing itself is already citable.

---

## 2. Platform Breakdown

| Platform | Est. readiness | Why |
|----------|---------------|-----|
| **Google AI Overviews** | Moderate | Strongly ranking-correlated. Content is extractable and cites primary sources, but zero external ranking signals yet (new domain, no backlinks/mentions). |
| **Google AI Mode** (Gemini 3.5 Flash) | Moderate | Rewards freshness + entity authority. No dates or Organization entity defined — add these. |
| **ChatGPT** | Low–Moderate | Leans on Wikipedia (47.9%) / Reddit (11.3%). No brand entity presence yet. Strong academic citations help topical answers ("does staking money help gym attendance?") more than brand answers. |
| **Perplexity** | Low–Moderate | Reddit-heavy (46.7%). No community footprint. |

Only ~11% of domains are cited by both ChatGPT and Google AIO for the same query — treat these as separate surfaces.

---

## 3. AI Crawler Access Status

**No `robots.txt` found.** By default this means all crawlers are *allowed* (fail-open) — so nothing is currently blocked, which is fine for visibility, but there's no explicit policy. Recommended: add an explicit allowlist so intent is unambiguous and training crawlers can be controlled.

| Crawler | Current | Recommended |
|---------|---------|-------------|
| GPTBot, OAI-SearchBot, ChatGPT-User | allowed (implicit) | **allow** |
| ClaudeBot | allowed (implicit) | **allow** |
| PerplexityBot | allowed (implicit) | **allow** |
| CCBot / anthropic-ai (training) | allowed (implicit) | your call (block if you don't want training use) |

Ready-to-use `robots.txt` in §9.

---

## 4. llms.txt Status

**Missing.** Note: primary-source evidence (Mueller, SE Ranking 300k-domain study) shows `/llms.txt` is **not currently a citation lever** for major AI search — no scoring weight is assigned to it here. It's cheap to add and harmless, but do the schema and content work first. Template in §9.

---

## 5. Brand Mention Analysis

Brand mentions correlate ~3× more strongly with AI visibility than backlinks (Ahrefs, 75k brands). GymVow is pre-launch, so this is understandably empty:

| Signal | Status |
|--------|--------|
| Wikipedia / Wikidata | none |
| Reddit | none |
| YouTube (~0.737 corr., strongest) | none |
| LinkedIn | unknown |

This is the single biggest long-term lever but out of scope for on-page work. Post-launch: a founder LinkedIn presence, a Reddit/YouTube explainer of the commitment-contract mechanic, and a Wikidata entry for the app.

---

## 6. Passage-Level Citability (optimal 134–167 words, front-loaded)

**Already strong / near-citable blocks:**
- **The science lead** (§science) — names Kahneman & Tversky, "twice as much," Nobel Prize. Highly quotable and self-contained. ✅
- **Citation cards** — each is a clean, attributed, self-contained fact (author, year, journal, finding). These are ideal AI-extraction units. ✅
- **FAQ answers** — self-contained Q&A, direct answers in the first sentence. ✅

**Weaknesses:**
- **No "What is GymVow?" definition sentence.** AI models love `X is …` patterns. The hero opens with a slogan ("Motivation fades. Money doesn't.") rather than a definition. Add one plain sentence early (see §10).
- Most passages are *shorter* than the 134–167 word citation sweet spot. The content is punchy (good for humans) but occasionally too terse to stand alone as an extracted answer. The mechanics and charity sections could each carry one denser, fully self-contained paragraph.

---

## 7. Server-Side Rendering Check ✅

**Pass — this is a strength.** All content ships as static HTML in `index.html`. `js/main.js` (31 lines) only handles scroll-reveal animations and nav state; the `.reveal` hidden state is *gated behind JS running*, so with JS disabled (i.e. how AI crawlers see it) the page is fully visible. Semantic HTML, `lang="en"`, skip link, and ARIA labels are all present. AI crawlers get 100% of the content.

---

## 8. Top 5 Highest-Impact Changes

1. **Add JSON-LD structured data** (Organization + FAQPage + WebSite). Biggest machine-readability win — gives AI engines an explicit entity and Q&A graph. (§9)
2. **Add a plain "What is GymVow?" definition** in the first ~60 words of the page. Directly targets the `X is…` extraction pattern. (§10)
3. **Add `robots.txt` with an explicit AI-crawler allowlist** + a **`sitemap.xml`**. Removes ambiguity, signals crawlability. (§9)
4. **Add authority signals to `<head>`**: canonical URL, Open Graph + Twitter Card tags, and a machine-readable date (`article:published_time` / a visible "Last updated"). Feeds AI Mode's freshness + entity logic. (§9)
5. **Convert the two "modes" into an HTML comparison table** (Gradual vs Winner-Takes-All: trigger, cost per miss, failure point). Tables are preferred AI-extraction structures; right now the comparison lives in styled cards. (§10)

---

## 9. Ready-to-Use Snippets

### 9a. `robots.txt` (create at web root)
```
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://YOURDOMAIN.com/sitemap.xml
```
> To exclude training use, add `User-agent: CCBot` / `User-agent: anthropic-ai` blocks with `Disallow: /`.

### 9b. `sitemap.xml` (create at web root)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOURDOMAIN.com/</loc>
    <lastmod>2026-07-05</lastmod>
  </url>
</urlset>
```

### 9c. JSON-LD — paste into `<head>`
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://YOURDOMAIN.com/#org",
      "name": "GymVow",
      "url": "https://YOURDOMAIN.com/",
      "description": "GymVow is a commitment-contract app that lets you stake real money on your weekly gym goal; forfeits are donated to the Good Sports charity.",
      "logo": "https://YOURDOMAIN.com/assets/favicon.svg"
    },
    {
      "@type": "WebSite",
      "@id": "https://YOURDOMAIN.com/#website",
      "url": "https://YOURDOMAIN.com/",
      "name": "GymVow",
      "publisher": { "@id": "https://YOURDOMAIN.com/#org" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens if I complete my vow?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nothing. Your card is never charged — GymVow doesn't hold your stake up front, so completing a vow costs $0. Money only moves when you miss." }
        },
        {
          "@type": "Question",
          "name": "What does one missed session cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "It depends on your mode. Gradual: every miss forfeits 10% of your original stake. Winner Takes All: the first miss forfeits everything, instantly." }
        },
        {
          "@type": "Question",
          "name": "When is my card actually charged?",
          "acceptedAnswer": { "@type": "Answer", "text": "When a week of your vow closes with fewer check-ins than your goal. GymVow settles every elapsed week at 00:05 each night, automatically." }
        },
        {
          "@type": "Question",
          "name": "Who gets my money if I miss?",
          "acceptedAnswer": { "@type": "Answer", "text": "Good Sports, a U.S. 501(c)(3) nonprofit. 100% of forfeits are donated; GymVow keeps nothing from your losses." }
        }
      ]
    }
  ]
}
</script>
```

### 9d. Head authority tags — add to `<head>`
```html
<link rel="canonical" href="https://YOURDOMAIN.com/">
<meta property="og:type" content="website">
<meta property="og:title" content="GymVow — Stake real money on your gym goal">
<meta property="og:description" content="A commitment contract for the gym: stake real money on your weekly goal. Miss, and it's donated to Good Sports.">
<meta property="og:url" content="https://YOURDOMAIN.com/">
<meta property="og:image" content="https://YOURDOMAIN.com/assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

### 9e. `llms.txt` (create at web root — low priority)
```
# GymVow
> A commitment-contract app for the gym. Stake real money on your weekly gym goal; keep it if you show up, forfeit to charity if you miss.

## Key pages
- [GymVow home](https://YOURDOMAIN.com/): How commitment contracts work, the behavioral-economics evidence, the charity, and FAQ.

## Key facts
- GymVow is a commitment device, not a bank, betting product, or investment.
- The card is only charged when you miss a vowed session.
- 100% of forfeits are donated to Good Sports, a U.S. 501(c)(3).
- Based on prospect theory (Kahneman & Tversky, 1979; loss-aversion coefficient λ ≈ 2.25, 1992).
```

---

## 10. Content Reformatting Suggestions

**A. Add a definition sentence** — e.g. as the first line of the hero sub, or a new line right after the H1:
> *"GymVow is a commitment-contract app for the gym: you stake your own money on a weekly workout goal, keep every cent if you show up, and forfeit to charity if you miss."*
This one sentence is the most likely block to be quoted verbatim by an AI answer to "what is GymVow?".

**B. Turn the two modes into a table** (in addition to or instead of the cards):

| Mode | Trigger | Cost per miss | Fails when |
|------|---------|---------------|-----------|
| Gradual | Each missed session | 10% of original stake | Stake hits $0 (10 misses) |
| Winner Takes All | First missed session | Entire stake, instantly | On the first miss |

**C. Add a visible date.** A small "Last updated: July 2026" in the footer feeds AI Mode's freshness signal (content <3 months old is ~3× more likely to be cited). Pair it with `dateModified` in schema.

**D. One denser passage per section.** The mechanics and charity sections would benefit from a single 130–160 word self-contained paragraph that answers "how does GymVow work?" / "where does the money go?" without needing surrounding context — sized for the AI-citation sweet spot.

---

## Summary

The **content and technical rendering are already good** — real primary-source citations, clean semantics, full SSR, a proper FAQ. The **missing layer is machine-readable structure and authority metadata**: schema, an explicit definition, dates, canonical/OG tags, and robots/sitemap. Ship the §8 top-5 and the score moves from ~61 toward the low 80s. The remaining ceiling (brand mentions on Reddit/YouTube/Wikipedia) is a post-launch marketing effort, not an on-page task.
