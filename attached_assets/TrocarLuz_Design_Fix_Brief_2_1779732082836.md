# TrocarLuz — design fix brief 2
**For:** Replit
**Context:** The site is structurally correct but visually generic. This brief fixes the header, makes every section visually distinct, and adds missing conversion points. Read every instruction fully before changing anything.

---

## Fix 1 — Header (do this first)

The header is the most broken element. Three specific fixes:

**1a — Logo:**
- Remove the current text-only logo
- Upload and display the TrocarLuz logo PNG from Canva at 40px height
- If rendering as text fallback instead: "TROCAR" must be `#6ABF4B` lime green, "LUZ" must be `#FFD000` yellow, font Poppins ExtraBold, font-size 22px
- The lightning bolt mark must appear to the left of the wordmark at the same height as the caps

**1b — Nav background:**
- Remove the solid `#0A1628` background from the nav
- Make nav background `transparent` so the hero illustration bleeds through it
- Nav link colour: white, Inter 500 15px
- On scroll past the hero: nav background transitions to `#0A1628` solid — use a scroll listener with `transition: background 0.2s`

**1c — Nav links:**
- Add `/estados` as "Por Estado" to the main nav
- Add `/perguntas-frequentes` as "Dúvidas" to the main nav
- These are currently footer-only and need to be in the header

---

## Fix 2 — Section contrast — the core visual problem

Every section currently looks the same. Implement this exact alternating pattern top to bottom:

| Section | Background | Text |
|---|---|---|
| Hero | Illustration full bleed | White |
| 2028 banner | `#FFD000` yellow | `#0A1628` navy |
| Quick action cards | `#0A1628` navy | White |
| GD lead capture | `#F7F7F5` light | `#1A1F36` dark |
| How it works | `#0A1628` navy | White |
| Category tiles | White | `#1A1F36` dark |
| Trust stats | `#6ABF4B` lime green | White |
| Final CTA | `#00B86B` green | White |

No two adjacent sections should share the same background. This single change will make the page feel designed rather than generic.

---

## Fix 3 — How it works section — rebuild completely

Current: three small cards with yellow number circles on a grey background.

Replace with:

```
Background: #0A1628 navy, full width
Layout: three columns, no card borders, no boxes

Each step:
- Step number: Sora 800, 96px, #FFD000 yellow — displayed huge, no circle
- Step title: Sora 700, 28px, white — below the number
- Step description: Inter 400, 16px, white at 70% opacity — below title
- Thin #FFD000 horizontal line connecting all three steps at number baseline

Steps: 01 Informe / 02 Compare / 03 Troque
```

The numbers ARE the design. They should be so large they feel editorial, not like UI step indicators. No cards, no borders, no boxes around anything.

---

## Fix 4 — Category tiles — make them GoCompare functional

Current: two small identical white cards.

Replace with:

```
Background: white
Section headline: Sora 700, 36px, #1A1F36 — "O que você quer comparar?"

Two large tiles, full width split 50/50:

Tile 1 — Geração Distribuída
- Left border: 4px solid #FFD000
- Top section background: #FFD000 at 8% opacity
- Large saving figure: Sora 800, 48px, #FFD000 — "até 20% off"
- Title: Sora 700, 22px, #1A1F36 — "Geração Distribuída"
- Description: Inter 400, 15px, #6B7080 — "Energia solar sem instalação. Para casa e empresa."
- CTA: full width button, #FFD000 background, #0A1628 text — "Quero economizar →"
- Badge: "Disponível agora" in #FFD000 pill

Tile 2 — Mercado Livre ACL
- Left border: 4px solid #00B86B
- Large saving figure: Sora 800, 48px, #00B86B — "até 30% off"
- Title: Sora 700, 22px, #1A1F36 — "Mercado Livre de Energia"
- Description: Inter 400, 15px, #6B7080 — "Para empresas com CNPJ. Migre do mercado cativo."
- CTA: full width button, #00B86B background, white text — "Analisar minha empresa →"
- Badge: "Para empresas" in #00B86B pill
```

These tiles should be at minimum 280px tall. The saving percentage is the hero element inside each tile — make it the biggest thing in the card.

---

## Fix 5 — Trust stats section — make numbers the design

Current: small text labels.

Replace with:

```
Background: #6ABF4B lime green — bold, unexpected, energetic
Layout: 4 columns

Each stat:
- Number: Sora 800, 72px, white — "12k+" / "18%" / "27" / "100%"
- Label: Inter 500, 16px, white at 80% opacity — below the number
- No cards, no borders, no boxes — numbers float on the green background
```

---

## Fix 6 — Final CTA section

Current: dark navy, same as hero — page starts and ends identically.

Replace with:

```
Background: #00B86B solid green — confident, energetic close
Headline: Sora 800, 56px, white — "Pronto para pagar menos?"
Subheadline: Inter 400, 20px, white at 80% opacity — "Compare suas opções agora. Sem custo, sem compromisso."
CTA button: white background, #00B86B text, Sora 700 — "Comparar agora"
```

---

## Fix 7 — Typography — enforce throughout

Check every section headline below the hero. Every major section headline must be:
- Font: Sora 700 or 800
- Size: minimum 36px desktop, minimum 28px mobile
- If any section headline is in Inter or below 36px it is wrong — fix it

Body copy: Inter 400, 16-18px, line-height 1.7. Never use Inter for headlines.

---

## Fix 8 — Missing lead forms (conversion)

Add a lead form to each of these pages — they are high-intent and currently have no capture:

**`/mercado-livre-energia`:**
Add at the bottom of the page:
- Heading: Sora 700 28px — "Sua empresa pode migrar agora"
- Form: Nome + WhatsApp + Estado + submit
- Button: "Quero uma análise gratuita"
- Source tag: `mercado-livre-cta`

**`/energia-2028`:**
Add after the market opening schedule section:
- Heading: Sora 700 28px — "Avise-me quando o mercado abrir na minha região"
- Form: Nome + WhatsApp + Estado + submit
- Button: "Me avisar em 2028"
- Source tag: `energia-2028-waitlist`

**`/guias/:slug`:**
Replace the aside CTA link with an embedded mini form:
- Heading: "Ficou com dúvida?"
- Fields: Nome + WhatsApp only
- Button: "Falar com especialista"
- Source tag: `guia-aside-cta`

**`/sobre`:**
Add at the bottom:
- WhatsApp contact button linking to the team
- Link to `/para-sua-casa`
- Text: "Quer saber mais? Entre em contato."

---

## Fix 9 — Form success state

Currently unclear what happens after form submission. Add:

After successful submission replace the form with:
```
Large #00B86B checkmark icon (48px)
Headline: Sora 700 24px — "Recebemos sua solicitação!"
Subtext: Inter 400 16px — "Um especialista da Ótima entrará em contato em até 24 horas pelo WhatsApp."
```

---

## The one rule

No two adjacent sections share the same background. Every section must feel visually distinct from the one above it. If you scroll the page and it all blurs into one grey-white wash, the fix is not done.

