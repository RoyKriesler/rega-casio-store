# watch-store — "רגע" demo Casio shop

Portfolio project for Roy. Hebrew, RTL, dark sporty e-commerce demo of a (fictional) retailer selling real Casio models (F-91W, A168WA, GA-2100, GMW-B5000...). NOT a real store: no real payments, no card fields, checkout is a mock that creates a fake order number.

Trademark rules (decided 2026-10-13): store name is "רגע", never Casio branding/logo in site chrome; real model names only where confidently identified from the photo; footer states no affiliation with Casio and fictional prices. Avoid unverifiable factual claims in copy.

## Stack
- Next.js 15 App Router, TypeScript, Tailwind v4 (tokens in `src/app/globals.css` `@theme`).
- Fonts: Rubik (display, 500-900) + Assistant (body), both via `next/font/google` with the `hebrew` subset.
- Node is at `~/.local/node/bin` and is NOT on PATH: prefix commands with `export PATH=$HOME/.local/node/bin:$PATH`.
- Deploy target: Vercel. Repo: GitHub account RoyKriesler.

## Data
- Catalog: `src/data/products.ts` (static). Prices in ILS.
- Images: hotlinked from `images.unsplash.com` (Unsplash License, free), real Casio photos. Photographer credit per photo, listed on `/credits`. Never use photos showing a non-Casio brand.
- Hero: `src/components/LcdClock.tsx`, live seven-segment SVG clock showing the visitor's real time.
- Variants: `Product.variants` (color + photo); cart lines keyed by `slug::variant`.
- Cart: React context + localStorage (wrapped in try/catch), `src/lib/cart.tsx`.

## Conventions
- `<html lang="he" dir="rtl">`. Use logical Tailwind utilities (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`), never `pl-/pr-/left-/right-` for layout.
- Palette (dark): paper `#0a0a0b`, card `#141417`, accent/CTA `#ff5a1f` with black text on CTA. Tokens in globals.css; `ink` is the light text color.
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
