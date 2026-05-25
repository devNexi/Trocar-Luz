# TrocarLuz — visual redesign brief
**For:** Replit
**Status:** The current build is structurally correct but visually wrong. This brief overrides all current visual decisions. Read it fully before changing anything.

---

## What is wrong right now and why

The current site looks like a generic SaaS product. The hero illustration is too dark and muted. The layout is standard top-to-bottom template drivel. There is no visual confidence, no Brazilian identity, and no GoCompare-style instant utility.

The two reference sites show exactly what is needed:

**Pest Stop Boys** — the illustration IS the hero. Full saturation, full colour, no dark overlay killing it. The brand name sits directly on top of the illustration in massive white bold type. The nav is a solid brand colour, not white. It feels alive, confident, and unmistakably designed.

**GoCompare** — the comparison categories are visible immediately below the hero WITHOUT scrolling. The user knows exactly what they can do on this site within 2 seconds. Category tiles are large, clear, and immediately clickable.

TrocarLuz must combine both. Bold illustrated Brazilian visual identity from PSB. Instant functional clarity from GoCompare.

---

## Hero section — rebuild completely

### What to change

**Navigation:**
- Background: `#0A1628` solid navy — not white
- Logo: "TrocarLuz" in Sora 800, "Trocar" in `#6ABF4B` lime green, "Luz" in `#FFD000` yellow
- Nav links: white, Inter 500 16px
- Remove the current white nav entirely

**Hero:**
- The illustration image must be at `opacity: 1` — not 0.30, not dimmed. Full saturation, full colour, exactly as the Midjourney asset looks
- The hero section has NO background colour underneath — the illustration IS the background, edge to edge, full bleed
- Minimum height: 85vh on desktop
- The headline sits directly on top of the illustration in the left third of the screen
- Headline: Sora 800, 72px desktop / 48px mobile, pure white `#FFFFFF`, with a subtle text shadow `text-shadow: 0 2px 20px rgba(0,0,0,0.4)` so it reads against the illustration
- Subheadline: Inter 400, 20px, white at 90% opacity, max-width 480px
- Two CTAs side by side below the headline:
  - Primary: "Quero economizar em casa" — `#00B86B` green, white text, Sora 600, 16px, padding 16px 32px, border-radius 8px
  - Secondary: "Para minha empresa" — white border 2px, white text, same sizing, transparent background
- Trust badge below CTAs: small green shield icon + "Mais de 12 mil comparações feitas" in white Inter 400 14px

**What the hero must NOT have:**
- No dark overlay on the illustration
- No gradient
- No semi-transparent colour wash
- No centred layout — everything left-aligned
- No grey or muted anything in this section

---

## Immediately below the hero — the 2028 banner stays

Keep the yellow `#FFD000` banner exactly as it is. It works. The lightning bolt icon, the bold text, the "Prepare-se agora" link. This is correct.

---

## Below the banner — GD lead capture form (the money section)

This section needs to feel like the most important thing on the page after the hero. It is the conversion engine.

**Layout:** Two columns, 55/45 split
- Left column: strong headline + 3 bullet benefits + social proof
- Right column: the lead form in a card

**Left column:**
- Background: `#F7F7F5`
- Headline: Sora 700 40px `#1A1F36` — "Sua conta de luz está alta demais?"
- Subheadline: Inter 400 18px `#6B7080` — one line explaining GD simply
- Three benefit rows — each with a `#FFD000` yellow lightning bolt icon (not a green tick — make it on brand):
  - "Zero investimento ou obras"
  - "A energia continua chegando pela mesma rede"  
  - "Economia garantida todos os meses"
- Below the bullets: a savings example pill — yellow background `#FFD000`, navy text `#1A1F36`, Sora 700, border-radius 999px, padding 8px 20px — "Clientes economizam em média 18% na conta"

**Right column form card:**
- White background, border-radius 16px, box-shadow `0 4px 24px rgba(0,0,0,0.08)`
- Form title: Sora 700 22px `#1A1F36` — "Veja quanto você pode economizar"
- Fields: Nome, WhatsApp, Estado (dropdown), Consumo médio (dropdown)
- Submit button: full width, `#00B86B` green, white Sora 600 18px, padding 18px, border-radius 8px — "Descobrir minha economia"
- Below button: Inter 400 13px `#9EA3B0` — "Seus dados estão seguros. Sem spam."

---

## How it works — redesign this section completely

The current three cards with yellow number circles is generic. Replace with:

**Background:** `#0A1628` navy — make this section feel bold and designed not grey and boring

**Layout:** Three steps in a horizontal row, but styled as a bold statement not a timid card grid

Each step:
- Large step number in Sora 800, 80px, `#FFD000` yellow — displayed huge and proud, not in a little circle
- Step title: Sora 700 24px white
- Step description: Inter 400 16px white at 70% opacity
- A thin `#FFD000` yellow horizontal line connecting the three steps

Steps: **Informe** → **Compare** → **Troque**

No cards, no borders, no boxes. Just three bold typographic statements on a dark background with the yellow connecting line.

---

## Category tiles section — make it GoCompare functional

This section does not exist properly yet. Build it.

**Background:** `#F7F7F5`

**Section headline:** Sora 700 36px `#1A1F36` — "O que você quer comparar?"

**Tile grid:** 2 columns on desktop, 1 column mobile

**Tile design:**
- White background
- Border: 1px solid `#E2E1DC`
- Border-radius: 16px
- Padding: 32px
- Left border accent: 4px solid `[category colour]` on the left edge only
- On hover: border-colour changes to category colour, box-shadow `0 4px 16px rgba(0,0,0,0.08)`

**Each tile contains:**
- Category colour icon (Phosphor icon, 32px) in the category colour
- Category name: Sora 700 22px `#1A1F36`
- One-line description: Inter 400 15px `#6B7080`
- Status badge: "Comparar agora →" in category colour for live, pill badge "Em breve" in `#EEEDE8` grey for coming soon

**Tiles for TrocarLuz:**
- Geração Distribuída — `#FFD000` yellow — live — "Economia solar sem instalação"
- Mercado Livre ACL — `#00B86B` green — live — "Energia livre para empresas"

---

## Trust section — keep but redesign

**Background:** white

**Layout:** 4 columns, each a simple stat or trust statement

Each column:
- Large number or icon in `#00B86B` green, Sora 800 48px
- Label in Inter 500 16px `#1A1F36`
- Description in Inter 400 14px `#6B7080`

Content:
- "12k+" — "Comparações feitas"
- "18%" — "Economia média por cliente"  
- "27" — "Estados cobertos"
- "✓" — "Parceiros verificados"

---

## Final CTA section

**Background:** `#00B86B` green — bold, full width, confident

**Headline:** Sora 800 48px white — "Pronto para pagar menos?"

**CTA button:** white background, `#00B86B` green text, Sora 700 — "Comparar agora"

**No dark navy here** — the green CTA section is the energetic close, not a sombre ending.

---

## Typography — confirm these are loading and applied

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

h1, h2, h3 { font-family: 'Sora', sans-serif; }
body, p, label, input, button { font-family: 'Inter', sans-serif; }
```

Check that Sora is actually rendering — if the hero headline looks like a system sans-serif it is not loading. Fix this before anything else.

---

## The one rule governing every decision in this brief

The illustration is the hero. Not a background. Not a tinted wash. The actual illustration at full colour and full saturation, with bold white type sitting confidently on top of it. Everything below the hero should alternate between `#F7F7F5` light and `#0A1628` navy sections with one `#00B86B` green CTA section at the end. No section should be plain white with grey text and a box. Every section should feel designed.

