# TrocarLuz.com.br — Replit build plan
**Stack:** Next.js 14 (App Router) + PostgreSQL + Resend + Vercel
**Purpose:** Energy comparison and switching authority site. GD lead capture live from day one. SEO/GEO content engine. TrocarTudo's future energy category.
**Read first:** TrocarTudo Brand & Design System doc. All visual decisions — colours, fonts, components, spacing — are defined there. Do not make design choices in this build that are not covered by that document.

---

## Design system — implement this before writing any UI code

### Fonts — load in layout.tsx or _document.tsx
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Icons
```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```

### CSS variables — add to globals.css
```css
:root {
  --tt-green: #00B86B;
  --tt-green-dark: #009E5C;
  --tt-yellow: #FFD000;
  --tt-coral: #F05A28;
  --tt-navy: #1A1F36;
  --cat-energia: #FFD000;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F5;
  --bg-tertiary: #EEEDE8;
  --text-primary: #1A1F36;
  --text-secondary: #6B7080;
  --text-tertiary: #9EA3B0;
  --border: #E2E1DC;
  --font-display: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;
  --shadow-raised: 0 1px 3px rgba(26,31,54,0.08);
  --shadow-floating: 0 4px 16px rgba(26,31,54,0.12);
}
```

### TrocarLuz-specific note
TrocarLuz uses the full TrocarTudo brand system with one adaptation: `--cat-energia` (Amarelo Solar `#FFD000`) is used as the primary accent colour throughout — in category badges, section highlights, and illustration accents. Verde TT (`#00B86B`) remains the exclusive CTA and button colour. No other modifications to the brand system.

---

## What you are building

A fast, crawlable, content-rich website that:
- Ranks for Brazilian energy queries (residential and business)
- Captures GD leads via a simple form and emails them to the Ótima team
- Builds domain authority for the TrocarLuz brand from day one
- Is structured so an AI content agent can publish to it daily via API
- Will eventually fold into TrocarTudo as the energy category

---

## Replit instructions

### Step 1 — Create the project

In Replit:
- Create new Repl
- Select **Next.js** template
- Name it `trocarluz`
- Enable **Always On**

### Step 2 — Install dependencies

```bash
npm install @vercel/postgres resend @next/font lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3 — Environment variables

Add these in Replit Secrets (not in code):

```
RESEND_API_KEY=your_resend_api_key
POSTGRES_URL=your_postgres_connection_string
LEAD_NOTIFICATION_EMAIL=alexandre@otimaenergia.com.br
NEXT_PUBLIC_SITE_URL=https://trocarluz.com.br
```

---

## Project structure

```
trocarluz/
├── app/
│   ├── layout.tsx                    # Root layout, metadata, fonts
│   ├── page.tsx                      # Homepage
│   ├── para-sua-casa/
│   │   └── page.tsx                  # Residential hub
│   ├── para-sua-empresa/
│   │   └── page.tsx                  # Business hub
│   ├── geracao-distribuida/
│   │   └── page.tsx                  # GD hub page
│   ├── mercado-livre-energia/
│   │   └── page.tsx                  # ACL/free market hub
│   ├── energia-2028/
│   │   └── page.tsx                  # 2028 market opening hub
│   ├── estados/
│   │   ├── page.tsx                  # States index
│   │   └── [estado]/
│   │       └── page.tsx              # Dynamic state pages (27 states)
│   ├── guias/
│   │   ├── page.tsx                  # Guides index
│   │   └── [slug]/
│   │       └── page.tsx              # Dynamic guide/article pages
│   ├── perguntas-frequentes/
│   │   └── page.tsx                  # FAQ page
│   ├── sobre/
│   │   └── page.tsx                  # About / O que é TrocarLuz
│   ├── api/
│   │   ├── leads/
│   │   │   └── route.ts              # GD lead capture endpoint
│   │   └── content/
│   │       └── route.ts              # AI agent content publishing endpoint
│   └── sitemap.ts                    # Dynamic sitemap generation
├── components/
│   ├── GDLeadForm.tsx                # GD lead capture widget
│   ├── GDLeadFormBusiness.tsx        # Business version of lead form
│   ├── Navigation.tsx                # Site navigation
│   ├── Footer.tsx                    # Footer with schema markup
│   ├── StickyLeadCTA.tsx             # Sticky bottom CTA on content pages
│   └── SchemaMarkup.tsx              # Reusable JSON-LD schema component
├── lib/
│   ├── db.ts                         # PostgreSQL connection
│   ├── resend.ts                     # Email client
│   └── states.ts                     # Brazilian states data
└── public/
    ├── robots.txt
    └── images/
```

---

## Core pages — build each of these

### Homepage (app/page.tsx)

Content sections in order:
1. Hero — "Compare e economize na sua conta de energia" — dual CTA: residential and business
2. 2028 banner — "Em 2028, 88 milhões de lares poderão escolher seu fornecedor de energia. Prepare-se agora."
3. GD lead capture widget (residential version)
4. How it works — 3 steps, simple icons
5. For your home section with link to Para sua casa
6. For your business section with link to Para sua empresa
7. Trust signals — Powered by Ótima Energia, X customers helped, X saved
8. Latest guides (3 most recent from database)
9. FAQ preview (5 most common questions)
10. Business GD lead capture widget

Metadata:
```typescript
export const metadata = {
  title: 'TrocarLuz — Compare e Economize na Conta de Energia',
  description: 'Compare opções de energia elétrica para sua casa e empresa. Geração distribuída disponível agora. Mercado livre abrindo para residências em 2028.',
  openGraph: { ... },
}
```

### Dynamic state pages (app/estados/[estado]/page.tsx)

Generate statically for all 27 states using `generateStaticParams`. Each page includes:
- State name and distributor(s)
- Average residential tariff for that state
- GD availability in that state
- What 2028 means for residents of that state specifically
- Local GD lead capture widget
- Links to related guides

```typescript
export async function generateStaticParams() {
  return brazilianStates.map((state) => ({
    estado: state.slug,
  }))
}
```

### Dynamic content pages (app/guias/[slug]/page.tsx)

Fetches content from PostgreSQL by slug. Renders with:
- Full article schema markup
- Author/reviewer attribution
- Published and updated dates
- Table of contents
- Related articles
- Sticky GD lead capture CTA on scroll

---

## GD lead capture form — build this first

### Component (components/GDLeadForm.tsx)

Two versions — residential and business — controlled by a `type` prop.

**Residential fields:**
- Nome completo (required)
- WhatsApp (required)
- Estado — dropdown of all 27 states (required)
- Consumo médio mensal — options: Até 300 kWh / 300–500 kWh / 500–1000 kWh / Acima de 1000 kWh (required)
- Distribuidora — populated dynamically based on state selected (optional)

**Business fields:**
- Nome (required)
- WhatsApp (required)
- Nome da empresa (required)
- Estado (required)
- Valor médio da conta de luz — options: R$500–2k / R$2k–5k / R$5k–15k / R$15k–50k / Acima de R$50k (required)
- Segmento — dropdown: Comércio / Indústria / Serviços / Condomínio / Outro (optional)

**On submission:** POST to `/api/leads`

### API route (app/api/leads/route.ts)

```typescript
import { Resend } from 'resend'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  
  // 1. Validate required fields
  // 2. Save to PostgreSQL leads table
  // 3. Send email notification via Resend
  // 4. Return success response
  
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'leads@trocarluz.com.br',
    to: process.env.LEAD_NOTIFICATION_EMAIL,
    subject: `Novo lead GD ${body.type === 'business' ? 'Empresarial' : 'Residencial'} — ${body.estado}`,
    html: `
      <h2>Novo lead TrocarLuz</h2>
      <p><strong>Tipo:</strong> ${body.type}</p>
      <p><strong>Nome:</strong> ${body.nome}</p>
      <p><strong>WhatsApp:</strong> ${body.whatsapp}</p>
      <p><strong>Estado:</strong> ${body.estado}</p>
      ${body.type === 'residential' 
        ? `<p><strong>Consumo:</strong> ${body.consumo}</p>`
        : `<p><strong>Empresa:</strong> ${body.empresa}</p>
           <p><strong>Conta mensal:</strong> ${body.valor_conta}</p>`
      }
      <p><strong>Fonte:</strong> TrocarLuz — ${body.page_source}</p>
      <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
    `
  })
  
  return Response.json({ success: true })
}
```

### PostgreSQL leads table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL, -- 'residential' or 'business'
  nome VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  distribuidora VARCHAR(100),
  consumo_band VARCHAR(50),
  empresa VARCHAR(255),
  valor_conta_band VARCHAR(50),
  segmento VARCHAR(50),
  page_source VARCHAR(255),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new'
);
```

UTM fields are important — capture them from URL parameters on every submission so you know exactly which content piece, state page, or external source drove each lead.

---

## Content database — for AI agent publishing

### PostgreSQL content tables

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  meta_description VARCHAR(300),
  content TEXT NOT NULL,          -- Full HTML content
  excerpt VARCHAR(500),
  category VARCHAR(100),          -- 'gd', 'acl', '2028', 'residential', 'business', 'state'
  estado VARCHAR(2),              -- Set for state-specific content
  keywords TEXT[],                -- Array of target keywords
  author VARCHAR(100) DEFAULT 'Equipe TrocarLuz',
  reviewer VARCHAR(100),
  schema_type VARCHAR(50),        -- 'Article', 'FAQPage', 'HowTo'
  faq_items JSONB,                -- FAQ schema data if schema_type = FAQPage
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### AI agent publishing endpoint (app/api/content/route.ts)

Secured with an API key in headers. The AI content agent calls this endpoint to publish new articles and FAQ entries without anyone manually copying content into a CMS.

```typescript
export async function POST(request: Request) {
  // Verify API key from Authorization header
  const authHeader = request.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.CONTENT_API_KEY}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  // Insert article or FAQ into PostgreSQL
  // Trigger Next.js revalidation for the new page
  // Return the published URL
}
```

---

## Schema markup — implement on every page type

### Organization schema (homepage and footer)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TrocarLuz",
  "url": "https://trocarluz.com.br",
  "description": "Plataforma de comparação de energia elétrica no Brasil",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Ótima Energia"
  }
}
```

### Article schema (all content pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Person", "name": "..." },
  "publisher": { "@type": "Organization", "name": "TrocarLuz" }
}
```

### FAQPage schema (FAQ page and any page with Q&A)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

---

## robots.txt and sitemap

### public/robots.txt
```
User-agent: *
Allow: /
Sitemap: https://trocarluz.com.br/sitemap.xml
```

### app/sitemap.ts
Dynamic sitemap that auto-includes every published article, every state page, and all static pages. Regenerates on every deployment and on-demand revalidation.

---

## Deployment

1. Connect Replit project to GitHub
2. Import GitHub repo to Vercel
3. Set all environment variables in Vercel dashboard
4. Set custom domain: trocarluz.com.br → Vercel
5. Enable Vercel Analytics (free tier) from day one — you want data immediately
6. Submit sitemap to Google Search Console on day one

---

## Launch checklist

- [ ] All environment variables set in Replit and Vercel
- [ ] PostgreSQL database provisioned and tables created
- [ ] Resend account set up, domain verified (trocarluz.com.br)
- [ ] GD lead form tested — submission sends email and saves to DB
- [ ] Homepage live with both lead forms
- [ ] Para sua casa and Para sua empresa pages live
- [ ] At least 5 state pages live at launch (SP, MG, RJ, BA, RS)
- [ ] FAQ page live with minimum 20 questions
- [ ] robots.txt accessible
- [ ] Sitemap live and valid
- [ ] Google Search Console set up and sitemap submitted
- [ ] Schema markup validated via Google's Rich Results Test
- [ ] Content API endpoint tested — AI agent can publish successfully
- [ ] UTM parameters captured on all lead submissions

