# Tasks: dark-mode-and-missing-pages

## Batch 1 — Foundation (no dependencies)

- [ ] T01: Add `@variant dark` + `.dark {}` CSS variable overrides to `tailwind.css`
- [ ] T02: Add `contact.*` and `vehicle.detail.*` i18n keys to `en.ts` and `es.ts`
- [ ] T03: Write `src/schemas/contact.test.ts` (Red) — valid/invalid contact form data
- [ ] T04: Implement `src/schemas/contact.ts` — Zod schema + `ContactFormData` type (Green)

## Batch 2 — React islands (depends on T02, T04)

- [ ] T05: Write `VehicleFilterPanel.test.tsx` (Red) — filter by brand/category/price, clear, empty state
- [ ] T06: Implement `VehicleFilterPanel.tsx` (Green) — React island, uses `filterVehicles()`
- [ ] T07: Write `ContactForm.test.tsx` (Red) — validation errors per field, success state on valid submit
- [ ] T08: Implement `ContactForm.tsx` (Green) — Zod validation, success state

## Batch 3 — Pages (depends on T05, T06, T07, T08)

- [ ] T09: Create `src/pages/[lang]/vehicles/[slug].astro` — `getStaticPaths()` over all vehicles
- [ ] T10: Create `src/pages/[lang]/vehicles/sell/index.astro` — uses `VehicleFilterPanel` with `mode='sale'`
- [ ] T11: Create `src/pages/[lang]/vehicles/rent/index.astro` — uses `VehicleFilterPanel` with `mode='rent'`
- [ ] T12: Create `src/pages/[lang]/contact/index.astro` — uses `ContactForm` island

## Batch 4 — Verification

- [ ] T13: Run `bun run test -- --coverage` — all tests pass, coverage ≥ 85%
- [ ] T14: Run `bunx tsc --noEmit` — zero TypeScript errors
