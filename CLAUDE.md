# watch-store — "רגע" curated watch shop (demo)

Portfolio project for Roy. Hebrew, RTL, light retail-style e-commerce demo of a (fictional) curated retailer: Casio, Tissot, Hamilton, Seiko, Citizen, Orient, Mido, Bulova, Timex, Certina, plus own-label straps. Goal (Roy, 2026-10-13): eventually make it a real store, only watches Roy finds worthy and cool. His taste refs: Tissot PRX, Emboss dress watches, Ted Martin chronographs, Hamilton Khaki Field on NATO. NOT a real store: no real payments, no card fields, checkout is a mock that creates a fake order number.

Trademark rules (decided 2026-10-13): store name is "רגע", never brand logos in site chrome; add a model only when the photo is identifiable (photographer description names it); footer states no affiliation with any maker. Emboss/Ted Martin not added: no licensed photos. Selling Tissot/Hamilton new with warranty needs authorized-dealer status with the Israeli importer. Avoid unverifiable factual claims in copy.

## Stack
- Next.js 15 App Router, TypeScript, Tailwind v4 (tokens in `src/app/globals.css` `@theme`).
- Fonts via `next/font/google` (Hebrew subset where available).
- Node is at `~/.local/node/bin` and is NOT on PATH: prefix commands with `export PATH=$HOME/.local/node/bin:$PATH`.
- Deploy target: Vercel. Repo: GitHub account RoyKriesler.

## Data
- Catalog: `src/data/products.ts` (static), 30 watches + 3 straps, `brand` per product, collections sport/field/dress/vintage(digital)/gshock/straps. Shop filters: `c` collection, `b` brand, `p` price band, `s` sort.
- Prices in ILS. `priceSource: "market"` = seen on zap.co.il 2026-10-13 (sources in `research/prices-2026-10-13.md`); others are estimates and the product page says "מחיר משוער". Never present an estimate as a market price.
- Images: hotlinked from `images.unsplash.com` (Unsplash License, free), real Casio photos. Photographer credit per photo, listed on `/credits`. Never use photos showing a non-Casio brand.
- Hero: `src/components/LcdClock.tsx`, live seven-segment SVG clock showing the visitor's real time.
- Variants: `Product.variants` (color + photo); cart lines keyed by `slug::variant`.
- Cart: React context + localStorage (wrapped in try/catch), `src/lib/cart.tsx`.

## Conventions
- `<html lang="he" dir="rtl">`. Use logical Tailwind utilities (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`), never `pl-/pr-/left-/right-` for layout.
- Look (2026-10-13, Roy asked "light and less AI"): flat retail style. Paper `#f6f5f2`, ink `#151515`, thin `line` rules, square corners, black CTA with white text, red `#c8102e` only for "new"/"sale" labels. No glows, gradients, pulsing badges, icon circles, hover zoom or giant black-weight headlines.
- Fonts: Rubik 400-700 (headings at semibold), Assistant body, IBM Plex Mono for model numbers.
- No emoji as icons; inline SVG only.
- Respect `prefers-reduced-motion`.

## Verify before "done"
- `npm run build` clean, `npm run lint` clean. Stop the dev server before `npm run build` (they share `.next`).
- Screenshot home, shop, product, cart, checkout at 375px and 1440px in the browser pane.

## Deploy
- Live: https://rega-casio-store.vercel.app (Vercel team `roys-projects-91d17c62`, project `rega-casio-store`).
- Repo: https://github.com/RoyKriesler/rega-casio-store (public).
- Pushes to `main` auto-deploy. Manual fallback: `vercel deploy --prod --yes` (CLI at `~/.local/npm-global/bin`, logged in as roykriesler). Vercel MCP returns 403 on project create; use the CLI.

## Open tasks
- [x] First deploy to Vercel (2026-10-13)
- [x] GitHub repo push (2026-10-13)
- [x] Auto-deploy on push (2026-10-13): repo connected from Vercel project Settings > Git; every push to `main` deploys to production
