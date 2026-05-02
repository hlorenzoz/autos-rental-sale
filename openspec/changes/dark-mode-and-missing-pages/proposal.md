# Proposal: dark-mode-and-missing-pages

**Status**: approved  
**Date**: 2026-05-01  
**Author**: SDD Orchestrator

## Problem

Four engineering gaps block a production-ready AeroDrive experience:

1. **Dark mode is silently broken** — `ThemeToggle.tsx` correctly toggles `.dark` on `<html>` and persists to `localStorage`, but `tailwind.css` never overrides CSS variables under `.dark {}`. All color tokens (`bg-surface`, `text-on-surface`, etc.) are fixed light values. The visual result: clicking the toggle does nothing visible.

2. **Four pages are missing** — VehicleCard links to `/[lang]/vehicles/[slug]` (404). Footer and nav link to `/[lang]/vehicles/sell`, `/[lang]/vehicles/rent`, and an implied `/[lang]/contact` — all 404.

3. **No vehicle filtering UX** — `filterVehicles()` exists in `lib/vehicles.ts` but no UI invokes it. Users cannot filter by brand, category, or price.

4. **No contact channel** — no contact page or form exists.

## Proposed Solution

### 1. Dark mode fix
Add `@variant dark` declaration to `tailwind.css` (Tailwind v4 class-based dark mode) and a `@layer base { .dark { ... } }` block overriding all CSS variables with derived MD3 dark theme values. Zero component changes needed — all `bg-surface`, `text-on-surface` etc. classes automatically respond.

### 2. Missing pages
Create 4 Astro pages:
- `/[lang]/vehicles/[slug].astro` — dynamic vehicle detail with full specs, price, CTA
- `/[lang]/vehicles/sell/index.astro` — for-sale inventory with `VehicleFilterPanel` island
- `/[lang]/vehicles/rent/index.astro` — for-rent inventory with `VehicleFilterPanel` island
- `/[lang]/contact/index.astro` — contact page with `ContactForm` island

### 3. Filter panel
`VehicleFilterPanel.tsx` — React island (client:load) receiving the full vehicle list, managing filter state internally, rendering filtered `VehicleGrid`. Filters: type toggle, brand multi-select, category multi-select, price range slider.

### 4. Contact form
`ContactForm.tsx` — React island with Zod-validated fields: name, email (required), phone (optional), message. Client-side only (no backend). Success state inline.

## Out of scope
- Authentication / user accounts
- Actual form submission backend
- Dark mode on design images (hero car photo stays as-is)
- PWA dark mode icon variants
