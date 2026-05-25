# TrocarTudo — Brand & design system
**Status:** Pre-build reference document
**Applies to:** TrocarTudo.com.br, TrocarLuz.com.br, MT Agent Portal, all future category sites
**Use alongside:** TrocarLuz Replit Build Plan, TrocarTudo Replit Build Plan

---

## What this document is

This is the design constitution. Every visual and UX decision made in the Replit builds, by AI content agents, by future designers, and by dev teams must be consistent with what is defined here. It does not need to be revisited every sprint — it needs to be read once, properly, before anything is built.

---

## 1. Brand positioning

**One line:**
TrocarTudo helps Brazil compare better, switch smarter, and waste less money.

**Functional promise:**
We help users see the real options available to them and move to a better one with less friction.

**Emotional promise:**
You are no longer in the dark, no longer getting rinsed, and no longer stuck with the default.

**Trust promise:**
We make the market easier to understand, show the options clearly, and explain exactly how we work.

---

## 2. Brand personality

TrocarTudo feels like a confident local guide — not a flashy salesman. Someone who knows how the system works and helps you win inside it.

**Is:** bold, Brazilian, clear, energetic, street-smart, modern, helpful, trustworthy, anti-bullshit

**Is not:** stiff, banker-ish, overly polished, childish, too ironic, too loud to use, too "tech startup cool" to trust

The closest single-phrase reference: **the smartest friend who knows the market and tells you straight.**

---

## 3. Tone of voice

### Character
Direct. Clear. Warm. Intelligent. Conversational. Confident. Practical.

### Rules
- Keep sentences short
- Avoid jargon — if you use a technical term, explain it immediately after
- Never sound vague — specificity builds trust
- Avoid fake hype and superlatives
- Avoid corporate filler
- CTAs should feel active and natural, not pushy

### Good examples
> "Veja se dá pra pagar menos."
> "Compare opções reais em poucos passos."
> "Entenda o que faz sentido pro seu caso."
> "Sem complicação. Sem empurroterapia."
> "Você pode estar pagando mais do que precisa."
> "Em 2028, você poderá escolher quem fornece sua energia. Comece a se preparar agora."

### Never write
> "soluções inovadoras para maximizar eficiência"
> "ecossistema disruptivo de comparação"
> "jornada omnichannel"
> anything that sounds like it was written by an agency in São Paulo in 2019

---

## 4. Colour system

### Design principle
Bold, unmistakably Brazilian — but used with discipline. Art can be expressive. UI must stay clear. Colour guides action, not just decoration.

### Primary palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Brand primary | Verde TT | `#00B86B` | Primary buttons, active states, key CTAs, logo mark |
| Brand accent | Amarelo Solar | `#FFD000` | Hero accents, category highlights, energy category marker |
| Brand warmth | Coral Vivo | `#F05A28` | Secondary CTAs, warnings, energy/heat category motifs |
| Brand depth | Azul Noite | `#1A1F36` | Primary text, dark backgrounds, nav |

### Secondary palette (category colours — one per category)

| Category | Name | Hex | Usage |
|---|---|---|---|
| Energia | Amarelo Solar | `#FFD000` | Energy category tiles, TrocarLuz accent |
| Internet | Azul Elétrico | `#0066FF` | Internet category tiles |
| Seguros | Verde Esmeralda | `#00A878` | Insurance category tiles |
| Maquininhas | Roxo Negócio | `#7B2FBE` | Payments category tiles |
| Gás | Laranja Chama | `#FF6B35` | Gas category tiles |

### Neutral system (UI surfaces)

| Role | Hex | Usage |
|---|---|---|
| Background primary | `#FFFFFF` | Content surfaces, cards, forms |
| Background secondary | `#F7F7F5` | Page backgrounds, alternating rows |
| Background tertiary | `#EEEDE8` | Subtle dividers, inactive states |
| Text primary | `#1A1F36` | Headlines, body copy |
| Text secondary | `#6B7080` | Supporting copy, labels, captions |
| Text tertiary | `#9EA3B0` | Placeholder text, hints |
| Border | `#E2E1DC` | Card borders, dividers |

### Colour rules
1. Verde TT is the one true action colour. All primary buttons are Verde TT. Nothing else competes with it for "click me now."
2. Amarelo Solar is decorative and categorical. It does not appear on buttons.
3. Coral Vivo is the secondary action and the alert colour. Use sparingly.
4. Azul Noite is for text and dark surfaces only — not for buttons or highlights.
5. Comparison cards must use white or Background secondary as their surface — never a strong brand colour. Brand colour appears only in accents within the card (category badge, saving figure, CTA button).
6. Never use more than 2 brand colours on a single screen section.

---

## 5. Typography system

### Typefaces

**Display / brand headlines:** `Sora` (Google Fonts, free)
— Bold and geometric with Brazilian warmth. Used for hero headlines, section headings, and brand moments. Never used for body copy or form labels.

**Interface / body:** `Inter` (Google Fonts, free)
— Neutral, extremely legible at small sizes. Used for everything functional: body copy, form labels, comparison card data, navigation, legal copy, result tables.

Both are available via Google Fonts CDN. Load both in the Replit build from day one.

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type scale

| Name | Font | Size | Weight | Line height | Usage |
|---|---|---|---|---|---|
| Display XL | Sora | 64px | 800 | 1.1 | Hero headline (desktop) |
| Display L | Sora | 48px | 700 | 1.15 | Hero headline (mobile), major section heads |
| Display M | Sora | 36px | 700 | 1.2 | Section headlines |
| Display S | Sora | 24px | 600 | 1.3 | Card titles, sub-section heads |
| Body L | Inter | 18px | 400 | 1.7 | Lead paragraph, featured copy |
| Body M | Inter | 16px | 400 | 1.7 | Standard body copy |
| Body S | Inter | 14px | 400 | 1.6 | Supporting copy, captions, card data |
| Label | Inter | 13px | 500 | 1.4 | Form labels, tags, badges, nav items |
| Caption | Inter | 12px | 400 | 1.4 | Legal copy, footnotes, timestamps |

### Type rules
1. Sora for expression. Inter for function. Never swap them.
2. Maximum 2 type sizes on any single card or component.
3. Line length maximum 70 characters for body copy — never let text span full width on desktop.
4. Headings always in Azul Noite (`#1A1F36`) on light backgrounds.
5. Never use font-weight below 400 or above 800.
6. No decorative or novelty fonts — brand character comes from layout, colour, and illustration, not from typography trying too hard.

---

## 6. Illustration and art direction

### The principle
Illustration is where TrocarTudo earns its Brazilian identity and emotional warmth. It must be ownable, memorable, and distinctly not-generic. But it must never appear inside a conversion flow. Illustration decorates. Function converts.

### Style definition
**Modular flat collage** — bold flat colour shapes, organic forms, layered without gradients, inspired by Brazilian modernist graphic design (think Burle Marx meets contemporary digital illustration). Not cartoons. Not 3D blobs. Not stock photography. Not gradient mesh.

**Character:** Energetic, warm, slightly abstract, unapologetically colourful. The visual language of a market stall, a carnival banner, and a modern app combined.

### Where illustration appears
| Zone | Illustration type | Example |
|---|---|---|
| Hero background | Large abstract shapes, category motifs | Energy = sun/lightning bolt forms in Amarelo Solar |
| Category tiles | Category-specific icon illustration | Bolt for energy, signal bars for internet |
| Empty states | Friendly character or abstract form | "Nenhum resultado" with a quirky shape |
| Success screens | Celebratory abstract burst | "Você economizou R$X" with colour explosion |
| 404 / error pages | Humorous illustrated character | Lost character or confused shape |
| Blog/content headers | Abstract decorative forms | Colour blocks behind article titles |
| Loading states | Animated abstract shapes | Simple morphing forms during comparison load |

### Where illustration never appears
- Inside comparison result cards
- On form fields or input steps
- In navigation
- On primary CTAs
- In comparison tables
- On trust/legal copy sections

### Illustration rules
1. Maximum 3 colours from the brand palette per illustration
2. No gradients — flat fills only
3. Shapes should feel organic and Brazilian, not Swiss/geometric
4. Never use illustration to fill empty space — only use it where it adds warmth or memorability
5. All category illustrations must be visually consistent — same style, same weight, same level of abstraction
6. Illustrations must work at multiple sizes (tile = 80px, hero = full width)

---

## 7. Iconography

Use **Phosphor Icons** (phosphoricons.com — free, available via CDN). The `Regular` weight.

Phosphor has excellent coverage, a slightly warm character that fits TrocarTudo better than Material or Feather, and good fill variants for active states.

```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```

Icon usage rules:
- Icons are always accompanied by a text label in functional UI (nav, buttons, form steps)
- Icons may stand alone in illustration zones (category tiles) but only with the illustrated style
- Icon size: 16px inline, 20px standalone, 24px featured
- Icon colour follows text colour in functional contexts — never a brand colour on functional icons
- Active/selected state: use fill variant of the same icon in Verde TT

---

## 8. Spacing and layout system

### Grid
- Desktop: 12-column grid, 80px margins, 24px gutters
- Tablet: 8-column grid, 40px margins, 20px gutters
- Mobile: 4-column grid, 16px margins, 16px gutters

### Spacing scale (use only these values)
`4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px / 96px / 128px`

### Border radius
| Component | Radius |
|---|---|
| Buttons | 8px |
| Input fields | 8px |
| Cards | 12px |
| Category tiles | 16px |
| Modals | 16px |
| Badges / chips | 999px (pill) |
| Full-bleed sections | 0px |

### Elevation (shadows — use sparingly)
| Level | CSS | Usage |
|---|---|---|
| Flat | none | Default card state |
| Raised | `0 1px 3px rgba(26,31,54,0.08)` | Hover state on interactive cards |
| Floating | `0 4px 16px rgba(26,31,54,0.12)` | Modals, dropdowns, popovers |

---

## 9. Component system

### Primary button
```css
background: #00B86B;
color: #FFFFFF;
font: 500 16px/1 Inter;
padding: 14px 28px;
border-radius: 8px;
border: none;
cursor: pointer;

/* Hover */
background: #009E5C;

/* Active */
background: #008A50;
transform: scale(0.98);

/* Disabled */
background: #EEEDE8;
color: #9EA3B0;
cursor: not-allowed;
```

### Secondary button
```css
background: transparent;
color: #00B86B;
border: 1.5px solid #00B86B;
font: 500 16px/1 Inter;
padding: 13px 27px;
border-radius: 8px;
```

### Input field
```css
background: #FFFFFF;
border: 1.5px solid #E2E1DC;
border-radius: 8px;
padding: 12px 16px;
font: 400 16px/1.4 Inter;
color: #1A1F36;

/* Focus */
border-color: #00B86B;
outline: none;
box-shadow: 0 0 0 3px rgba(0,184,107,0.12);

/* Error */
border-color: #F05A28;
```

### Comparison card
```css
background: #FFFFFF;
border: 1px solid #E2E1DC;
border-radius: 12px;
padding: 20px 24px;
/* Top accent bar = category colour, 3px height */
border-top: 3px solid [category-colour];
```

Card anatomy (top to bottom):
1. Provider logo (max 120px wide, 32px tall)
2. Product name — Inter 500 16px
3. Primary saving/price figure — Sora 700 28px Verde TT
4. 3–4 key feature chips — Inter 500 12px, pill shape, Background secondary fill
5. Switching difficulty indicator — simple 3-step bar
6. Notable conditions — Inter 400 13px Text secondary
7. CTA button — full width, Verde TT

Card rules:
- Must be scannable in 3 seconds
- Most important figure (saving or price) always largest element
- Never more than 4 feature chips
- Always show at minimum: price/saving, provider, CTA
- "Best for X" badge: Amarelo Solar background, Azul Noite text, pill shape, top-right of card

### Category tile
```css
background: #FFFFFF;
border: 1px solid #E2E1DC;
border-radius: 16px;
padding: 24px;
/* hover */
border-color: [category-colour];
box-shadow: 0 4px 16px rgba(26,31,54,0.08);
```

Tile anatomy:
1. Category illustration (80×80px, top of tile)
2. Category name — Sora 600 18px
3. One-line description — Inter 400 14px Text secondary
4. "Em breve" badge or "Comparar agora" link

### Trust badge
Small pill component: icon + text, Background secondary fill, Border, Border-radius 999px, Inter 500 12px.
Examples: "✓ Comparação imparcial" / "✓ Sem custo pro usuário" / "✓ Parceiros verificados"

---

## 10. UX principles — the seven rules

Every screen built under the TrocarTudo brand must pass all seven:

**1 — Clarity first:** Every screen answers: where am I, what is this, what do I do next, what do I gain.

**2 — Action always visible:** No dead-end brochure sections. Every major screen has a visible next step.

**3 — Trust early, not late:** Explain how it works, why to trust it, how TrocarTudo makes money, and what happens after comparison — before the user has to ask.

**4 — Mobile first:** Design for a 390px screen first. Scale up, never down.

**5 — Guided, not overwhelming:** Users should feel led through a decision, not confronted with one.

**6 — Comparison must feel easy:** Reduce cognitive load at every step. One question at a time in forms. Three-second scannable cards.

**7 — Brand expressive, flows functional:** Illustration and colour live in brand zones. They never fight the conversion flow.

---

## 11. Homepage structure

This structure applies to both TrocarTudo.com.br (multi-category) and TrocarLuz.com.br (energy only, adapted version).

**Section 1 — Hero**
Full-bleed. Illustration background in brand colours. Sora Display XL headline. One-line subhead in Inter Body L. Single primary CTA. One trust signal line (e.g. "Mais de X mil comparações feitas").

**Section 2 — How it works**
3 steps only: Informe → Compare → Troque. Icon + label + one-sentence description each. No more. White background.

**Section 3 — Categories**
Grid of category tiles. Energy live, others "em breve". White background or Background secondary.

**Section 4 — Why trust TrocarTudo**
4 trust pillars in a grid: transparency, how money is made, partner quality, comparison clarity. Trust badges. Optional "Como ganhamos dinheiro" expandable.

**Section 5 — Featured saving example**
One real (anonymised) saving story. Provider before/after. Monthly saving highlighted in Verde TT. One-line quote.

**Section 6 — FAQ**
5–7 highest-friction questions. Expandable. FAQPage schema markup.

**Section 7 — Final CTA**
Repeat the hero CTA. Background in Azul Noite or Verde TT. White text.

---

## 12. Brand architecture and sub-brand rules

**Parent:** TrocarTudo

**Sub-brands / category sites:** TrocarLuz (energy), future sites for other categories

**Rules for sub-brands:**
1. TrocarLuz uses the full TrocarTudo brand system with one modification: Amarelo Solar is elevated to primary accent (energy = solar = yellow). Verde TT remains the action colour.
2. Every sub-brand uses the same Sora + Inter type system.
3. Every sub-brand uses the same component system (buttons, cards, inputs).
4. Category colour differentiates the tile and category badge only — it never replaces Verde TT as the CTA colour.
5. The system is built to add a new category without a redesign — only a new category colour, a new category illustration, and a new category tile. Everything else is inherited.

---

## 13. What to produce before building

In order:

1. **Colour palette swatch file** — hex values above, exported as a reference image and CSS variables file
2. **Type specimen** — Sora + Inter at all scale values, showing headlines, body, labels
3. **UI moodboard** — 6–8 reference images combining PSB-style illustration energy with GoCompare-level functional clarity
4. **Component library** — buttons, inputs, cards, tiles, badges, trust blocks designed at 1× in Figma or equivalent
5. **Homepage wireframe** — 7 sections above, mobile and desktop
6. **Comparison card designs** — 3 variants: best pick, standard, "em breve"
7. **Category tile set** — all planned categories, live and coming soon states

Items 1–3 can be produced by an AI agent or design tool. Items 4–7 ideally need a designer for one sprint, or can be scaffolded in Replit using the component specs above and refined afterward.

---

## 14. CSS variables — drop these into the Replit build immediately

```css
:root {
  /* Brand */
  --tt-green: #00B86B;
  --tt-green-dark: #009E5C;
  --tt-green-darker: #008A50;
  --tt-yellow: #FFD000;
  --tt-coral: #F05A28;
  --tt-navy: #1A1F36;

  /* Category colours */
  --cat-energia: #FFD000;
  --cat-internet: #0066FF;
  --cat-seguros: #00A878;
  --cat-maquininhas: #7B2FBE;
  --cat-gas: #FF6B35;

  /* Neutrals */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F5;
  --bg-tertiary: #EEEDE8;
  --text-primary: #1A1F36;
  --text-secondary: #6B7080;
  --text-tertiary: #9EA3B0;
  --border: #E2E1DC;

  /* Typography */
  --font-display: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-raised: 0 1px 3px rgba(26,31,54,0.08);
  --shadow-floating: 0 4px 16px rgba(26,31,54,0.12);
}
```

---

## 15. One-line design doctrine

TrocarTudo should feel like the easiest smart decision in a confusing market — with the visual confidence of a real Brazilian brand and the clarity of a best-in-class comparison engine.

