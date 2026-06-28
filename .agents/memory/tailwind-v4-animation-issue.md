---
name: CSS animations fail in Tailwind v4
description: CSS @keyframes applied via className to img/div elements are silently suppressed in this Tailwind v4 + Vite project. Use framer-motion instead.
---

## Rule
Never use CSS `@keyframes` + `className` to animate elements in this project. Use framer-motion's `animate` prop directly.

**Why:** Tailwind v4's base/preflight layer resets or overrides CSS `animation` on img and other elements in ways that are hard to debug. Three attempts using `.obj-float-a { animation: obj-float-a 5.4s ... }` all silently produced static images despite correct CSS syntax and class application.

**How to apply:** For any looping motion (float, pulse, bounce), use:
```tsx
<motion.img
  animate={{ y: [0, -10, 0], rotate: [-1, 2, -1] }}
  transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity, delay: 0.3 }}
/>
```
Gate with `useReducedMotion()` from framer-motion — pass empty objects `{}` for both `animate` and `transition` when reduced motion is preferred.
