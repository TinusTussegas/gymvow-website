# Going live at gymvow.com

The site is a pure static bundle — `index.html` + `css/` + `js/` + `assets/` + `robots.txt`, `sitemap.xml`, `llms.txt`. No build step, no server code. Any static host serves it as-is, and every absolute URL in the code already points at `https://gymvow.com`, so nothing needs to be edited at go-live.

## 1. Own the domain

Register **gymvow.com** at a registrar if you haven't yet — Cloudflare Registrar (at-cost pricing), Porkbun, or Namecheap are all fine. Nothing else about this guide depends on which one you pick.

## 2. Pick a host (recommendation: Cloudflare Pages)

All of these are free for a site like this:

| Host | Why / why not |
|------|---------------|
| **Cloudflare Pages** ← recommended | Free, unlimited bandwidth, global CDN, automatic HTTPS, easy headers/redirects via `_headers`/`_redirects` files |
| Netlify | Equally easy; free tier has a 100 GB/month bandwidth cap |
| Vercel | Same idea; slightly more app-oriented |
| GitHub Pages | Free and fine, but custom headers are not configurable |

## 3. Deploy

**Easiest (no git):** Cloudflare Pages → "Upload assets" → drag the `Website` folder in. Done.

**Better (repeatable):** put the folder in a git repo (GitHub), then connect the repo in the host's dashboard:

```bash
cd /Users/Tijn/Desktop/Gymvow/Website
git init && git add -A && git commit -m "GymVow landing page"
# create a repo on github.com, then:
git remote add origin https://github.com/<you>/gymvow-website.git
git push -u origin main
```

In Cloudflare Pages: **Create project → Connect to Git → select repo**. Build command: *none*. Output directory: `/`. Every future `git push` auto-deploys.

## 4. Connect the domain

In the host's dashboard: **Custom domains → add `gymvow.com`** (and `www.gymvow.com`).

- If DNS is on Cloudflare: it configures the records for you automatically.
- Otherwise, at your registrar create the records the host shows you — typically a `CNAME` for `www` and an `A`/`ALIAS` record for the apex (`gymvow.com`).
- Set a redirect so `www.gymvow.com` → `gymvow.com` (matches the canonical URL in the HTML). On Cloudflare Pages this is a Bulk Redirect / `_redirects` rule; Netlify does it in Domain settings.

## 5. HTTPS

Automatic on all hosts above (Let's Encrypt / managed certs). Just make sure **"Always use HTTPS" / "Force HTTPS"** is switched on.

## 6. Headers (optional but recommended)

Create a `_headers` file at the site root (Cloudflare Pages / Netlify syntax):

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=604800

/js/*
  Cache-Control: public, max-age=604800
```

## 7. Post-launch checklist (first week)

1. **Google Search Console** — verify the domain (DNS TXT record), submit `https://gymvow.com/sitemap.xml`.
2. **Bing Webmaster Tools** — import from Search Console (one click), covers Bing + Copilot.
3. **Social preview check** — paste `https://gymvow.com` into [opengraph.xyz](https://www.opengraph.xyz) or the LinkedIn Post Inspector; you should see the "Motivation fades. Money doesn't." card (`assets/og-image.jpg`).
4. **Rich results test** — [search.google.com/test/rich-results](https://search.google.com/test/rich-results) on the homepage; the FAQPage + Organization schema should validate.
5. **Lighthouse** — run PageSpeed Insights once live; expect high scores (static, no heavy JS).
6. Confirm `https://gymvow.com/robots.txt` and `/llms.txt` resolve.

## Not needed / later

- **404 page** — single-page site; add a `404.html` whenever you add more pages.
- **Analytics** — Plausible or Cloudflare Web Analytics are cookieless one-liners if you want traffic numbers.
- **App store links** — when the app ships, replace the "Coming soon" `<span class="store-btn">` badges with real `<a>` links, and add `MobileApplication` schema to the JSON-LD.
