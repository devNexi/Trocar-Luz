---
name: GD Engine build
description: Switch-request flow, API patterns, DB tables, and gotchas for TrocarLuz Phase 1.
---

## Critical: never import "zod/v4" in api-server routes
esbuild cannot resolve the "zod/v4" subpath export. Always use schemas from `@workspace/api-zod` (generated via Orval codegen). Pattern: `import { CreateSwitchRequestBody } from "@workspace/api-zod"`.

**Why:** The api-server build uses esbuild which bundles everything. `zod/v4` is a package.json subpath export not supported by esbuild's resolver. Existing routes (leads, articles, faqs) all use `@workspace/api-zod` — match that pattern.

**How to apply:** Any new route that needs request validation: run codegen first, then import the generated Body schema.

## DB tables added in Phase 1
- `switch_requests` — the core lead table for GD engine (publicId, status, consents, bill file URL)
- `switch_request_events` — audit log for status transitions (eventType, eventPayload jsonb)
- `partners` — GD partner routing (states[], distributors[] arrays; empty array = covers all)

## Default partner seeded
A catch-all partner (`states={}`, `distributors={}`) is seeded in DB so switch requests don't all land in WAITLIST. States UF matching uses `states.length === 0` for catch-all.

## Object storage
- Bucket provisioned; `artifacts/api-server/src/lib/objectStorage.ts` copied from skill template
- `lib/object-storage-web` lib exists but NOT wired into trocarluz — bill upload uses a simple custom hook `artifacts/trocarluz/src/hooks/use-bill-upload.ts` (presigned URL → fetch PUT) to avoid Uppy peer dep complexity
- `objectStorage.ts` line ~265: `response.json()` must be typed as `{ signed_url: string }` — TS strict mode doesn't allow destructuring unknown

## GD Engine pages
- `/comparar-desconto` — calculator, calls POST /api/savings-estimate, stores estimate in URL params for next step
- `/enviar-conta` — bill upload + LGPD consents + WhatsApp, calls POST /api/switch-requests, shows publicId on success
- `/status/:publicId` — calls GET /api/switch-requests/:publicId/status
- `/politica-de-privacidade` — LGPD privacy policy (linked from enviar-conta consent)
- `/carro-eletrico` — EV landing page with FAQ schema.org
- `/parceiros/veiculos-eletricos` — B2B partner enquiry form (posts to /api/leads)

## WhatsApp / integration
Both are stubs. `lib/whatsapp.ts` logs a warning when `WHATSAPP_PHONE_NUMBER_ID`/`WHATSAPP_ACCESS_TOKEN` absent. `lib/integration-hook.ts` logs info only. Real implementation needs env vars set.

## Articles seeded
9 articles total (3 original + 6 new Phase 1 seeds). New slugs: geracao-distribuida-vs-painel-solar, mercado-livre-energia-residencial-2027, carro-eletrico-conta-de-luz-como-economizar, geracao-distribuida-por-estado, lgpd-energia-seus-direitos, passo-a-passo-adesao-gd.

## Savings estimate bands
Hardcoded in `artifacts/api-server/src/lib/savings-estimate.ts` — state-keyed discount bands (discountMin/discountMax). Eligible threshold: bill >= R$100.

## Sitemap / robots
Served by `artifacts/api-server/src/routes/sitemap.ts` at `/api/sitemap.xml` and `/api/robots.txt`. Static routes list must be kept in sync when new pages are added.
