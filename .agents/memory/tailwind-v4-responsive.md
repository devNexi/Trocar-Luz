---
name: Tailwind v4 responsive classes on fixed elements
description: In this project's Tailwind v4 setup (@import "tailwindcss"), responsive utilities like lg:hidden and hidden lg:flex do not reliably apply to position:fixed elements in the floating nav.
---

## Rule
For fixed-position elements (e.g. floating nav), use named CSS classes with explicit `@media` breakpoints instead of Tailwind responsive utilities.

**Why:** Tailwind v4 with `@import "tailwindcss"` compiles responsive classes fine for normal flow elements, but they fail silently for `position: fixed` elements (the hamburger/desktop nav simultaneously showed at 1280px despite `lg:hidden`). Root cause unclear — possibly specificity or scan order.

**How to apply:** In `index.css`, define:
```css
.nav-desktop  { display: none !important; }
.nav-cta      { display: none !important; }
.nav-hamburger { display: flex !important; }
@media (min-width: 1024px) {
  .nav-desktop  { display: flex !important; }
  .nav-cta      { display: inline-flex !important; }
  .nav-hamburger { display: none !important; }
}
```
Use these class names in JSX instead of `hidden lg:flex` etc.
