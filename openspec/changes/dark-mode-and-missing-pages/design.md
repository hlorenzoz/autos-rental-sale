# Design: dark-mode-and-missing-pages

## Architecture Decisions

### AD-001 — Dark mode via CSS variable override (not `dark:` utility classes)

**Decision**: Override CSS variables under `.dark {}` in `@layer base`, not via `dark:` utility classes on individual components.

**Rationale**: All 100+ class usages across `.astro` and `.tsx` files use design tokens (`bg-surface`, `text-on-surface-variant`, etc.). Switching to `dark:` variants would require modifying every component. CSS variable override is a single change in one file — all components automatically respond.

**Tailwind v4 mechanism**:
```css
/* 1. Enable class-based dark mode in Tailwind v4 */
@variant dark (&:where(.dark, .dark *));

/* 2. Override variables under .dark in @layer base */
@layer base {
  .dark {
    --color-surface: #0d1422;
    --color-on-surface: #e1ecff;
    /* ...all tokens... */
  }
}
```

**Dark mode token derivation**: MD3 dark theme derived from Atmospheric Precision primary seed (#0043c8):
- Surfaces → deep navy (`#0d1422` → `#252f40`)
- Primary → `#b6c4ff` (inverse-primary, readable on dark)
- On-primary → `#001550`
- Text → `#e1ecff` / `#c3c5d9`
- Borders → `#43455a`

### AD-002 — VehicleFilterPanel as controlled React island

**Decision**: `VehicleFilterPanel.tsx` is a self-contained React island (`client:load`) that receives the full vehicle array as a serialized prop from Astro, manages filter state internally, and renders a `VehicleGrid`-compatible output.

**Rationale**: Astro can't do client-side filtering without JS. URL params would require page reload (bad UX). Zustand would add complexity for a single-page filter concern. Local `useState` is sufficient — filter state doesn't need to leave the component.

**Data flow**:
```
Astro page (SSG) → serializes vehicles[] as prop → VehicleFilterPanel (client:load)
                                                    ├── useState(filters)
                                                    ├── filterVehicles(vehicles, filters)
                                                    └── renders filtered VehicleCard grid
```

**Props interface**:
```ts
interface VehicleFilterPanelProps {
  vehicles: Vehicle[];
  locale: Locale;
  mode: 'sale' | 'rent';
  labels: { /* all i18n strings */ };
}
```

### AD-003 — Vehicle detail as static Astro page with `getStaticPaths`

**Decision**: `src/pages/[lang]/vehicles/[slug].astro` uses `getStaticPaths()` to pre-render all 12 vehicle slugs × 2 locales = 24 pages at build time.

**Rationale**: All vehicle data is static JSON. No need for SSR or client-side data fetching. Full static generation maximizes performance and SEO.

### AD-004 — Contact form: client-side Zod validation, no backend

**Decision**: `ContactForm.tsx` validates with Zod client-side. On "success", replaces form with a success message. No network request.

**Rationale**: Project has no API/backend infrastructure. Astro Actions would require server adapter. For the scope of this change, client-side validation + graceful success state is sufficient and non-breaking.

### AD-005 — ContactForm Zod schema in `src/schemas/contact.ts`

Consistent with existing `src/schemas/vehicle.ts` and `src/schemas/env.ts` patterns.

## File Map

```
Modified:
  tailwind.css                                 — dark mode @variant + .dark {} overrides
  src/i18n/en.ts                               — contact.* and vehicle.detail.* keys
  src/i18n/es.ts                               — same in Spanish

New (schemas):
  src/schemas/contact.ts                        — Zod schema + ContactFormData type
  src/schemas/contact.test.ts                   — schema unit tests

New (components):
  src/components/ui/VehicleFilterPanel.tsx      — React island, filter state
  src/components/ui/VehicleFilterPanel.test.tsx — unit tests
  src/components/ui/ContactForm.tsx             — React island, form validation
  src/components/ui/ContactForm.test.tsx        — unit tests

New (pages):
  src/pages/[lang]/vehicles/[slug].astro        — vehicle detail
  src/pages/[lang]/vehicles/sell/index.astro    — for sale page
  src/pages/[lang]/vehicles/rent/index.astro    — for rent page
  src/pages/[lang]/contact/index.astro          — contact page
```
