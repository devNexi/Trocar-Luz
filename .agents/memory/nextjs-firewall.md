---
name: Next.js package firewall block
description: Replit package firewall (package-firewall.replit.local) returns 403 for next@15.x tarballs — Next.js cannot be installed via pnpm in this workspace.
---

## Rule
Do NOT attempt a Next.js migration for this project. The Replit package firewall blocks all `next@15.x` (and likely all `next@*`) downloads with HTTP 403.

**Why:** Tested next@15.3.4 and next@15.3.3 — both returned `ERR_PNPM_FETCH_403`. The firewall blocks the tarball download, not the metadata lookup (pnpm view works, but fetch fails).

**How to apply:** If the user asks to migrate to Next.js or SSR, explain that Next.js cannot be installed in this Replit workspace and suggest alternatives (Vite SSR, server-side rendering via Express, or deploying to an environment that supports it).

**Recovery note:** If trocarluz src files are accidentally deleted during an attempted migration, use `git show HEAD:<path> > <path>` in a bash loop over `git status --short | grep '^ D'` to restore all deleted tracked files. This is safe and non-destructive.
