# TrocarLuz

Brazilian energy comparison and lead capture website. Helps residential and business users compare energy options, understand geração distribuída (GD), Mercado Livre de Energia, and solar — and captures leads via WhatsApp contact forms.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at `/api`)
- `pnpm --filter @workspace/trocarluz run dev` — run the frontend (Vite, proxied at `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Optional env: `RESEND_API_KEY` — Resend email API key (lead notifications skipped if absent)
- Optional env: `LEAD_NOTIFICATION_EMAIL` — where to send lead notifications (defaults to leads@trocarluz.com.br)
- Optional env: `CONTENT_API_KEY` — Bearer token for POST /articles and POST /faqs (CMS write endpoints)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite 7, wouter routing, TanStack Query, shadcn/ui + Radix, Phosphor Icons
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Email: Resend (lazy-initialized — no crash if key absent)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/trocarluz/` — React+Vite frontend
  - `src/pages/` — all route pages (home, para-sua-casa, para-sua-empresa, geracao-distribuida, mercado-livre-energia, energia-2028, estados, guias, perguntas-frequentes, sobre)
  - `src/components/` — shared UI (nav, footer, lead forms, etc.)
  - `src/index.css` — full brand system CSS variables and utility classes
- `artifacts/api-server/src/routes/` — Express route handlers (leads, articles, faqs, states)
- `artifacts/api-server/src/lib/` — server utilities (email.ts, states.ts, logger.ts)
- `lib/api-spec/openapi.yaml` — source-of-truth OpenAPI contract
- `lib/api-zod/` — generated Zod schemas (from codegen)
- `lib/db/src/schema/` — Drizzle schema: leads, articles, faqs tables

## Architecture decisions

- Contract-first: OpenAPI spec drives Zod validation on server and React Query hooks on client. Run codegen after any spec changes.
- States data is static (27 BR states hardcoded in `states.ts`), not in DB — avoids migrations for reference data.
- Resend is lazy-initialized at send time so the server doesn't crash when `RESEND_API_KEY` is absent in dev.
- All lead forms store to DB first, then fire email notification asynchronously — losing email never loses a lead.
- `CONTENT_API_KEY` Bearer token guards POST /articles and POST /faqs to prevent public writes.

## Product

- Homepage with hero, how-it-works, social proof, and dual CTA (residential/business)
- `/para-sua-casa` — residential GD explainer + lead capture form
- `/para-sua-empresa` — business energy lead capture form
- `/geracao-distribuida` — GD education page
- `/mercado-livre-energia` — Mercado Livre de Energia education
- `/energia-2028` — 2028 energy market reform explainer
- `/estados` + `/estados/:estado` — per-state energy info and distributors
- `/guias` + `/guias/:slug` — article/guide CMS (seeded with 3 articles)
- `/perguntas-frequentes` — FAQ accordion (seeded with 20 FAQs)
- `/sobre` — about page

## User preferences

- Brand: Verde TT #00B86B = only CTA colour. Sora = display/headings only. Inter = all UI/body. No gradients. Max 2 brand colours per section.
- Language: all user-facing copy in Brazilian Portuguese.

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`.
- Run `pnpm --filter @workspace/db run push` after changing DB schema files.
- Do not run `pnpm dev` at workspace root — start individual artifact workflows instead.
- API server build uses `PORT` env var injected by the workflow; running `pnpm build` from shell may fail — use `pnpm typecheck` instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
