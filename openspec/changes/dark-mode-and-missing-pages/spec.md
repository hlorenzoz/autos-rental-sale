# Spec: dark-mode-and-missing-pages

## Requirements

### REQ-001 — Dark mode visual correctness
- **Given** the user clicks the theme toggle  
- **When** `.dark` class is applied to `<html>`  
- **Then** all surfaces, text, and borders reflect dark-mode color values  
- **And** the change persists across page navigation and reloads

### REQ-002 — Dark mode token coverage
- All `--color-*` CSS variables defined in `@theme` must have a corresponding override inside `.dark {}`  
- No hardcoded hex values in components — token-only styling

### REQ-003 — Vehicle detail page
- `GET /[lang]/vehicles/[slug]` returns a 200 for every slug in `vehicles.json`  
- Page renders: vehicle image, brand, model, year, category badge, full specs table, price (sale and/or rent), availability status, CTA button  
- Page includes correct `<title>`, `<meta description>`, OpenGraph tags  
- "Back to Inventory" link navigates to `/[lang]/vehicles/`

### REQ-004 — For Sale page
- `GET /[lang]/vehicles/sell` returns vehicles where `type === 'sale' || type === 'both'`  
- VehicleFilterPanel is visible and interactive  
- Filtering by brand, category, or max price updates the displayed grid without page reload  
- Empty state shown when no vehicles match filters

### REQ-005 — For Rent page
- Same as REQ-004 but for `type === 'rent' || type === 'both'`  
- Price filter operates on `price.rent` (per-day)

### REQ-006 — VehicleFilterPanel component
- Accepts `vehicles: Vehicle[]` prop (initial list)  
- Exposes filter controls: brand (multi-select), category (multi-select), max price (number input)  
- Renders filtered count ("X vehicles found")  
- "Clear filters" button resets all to default  
- All labels come from i18n props — no hardcoded strings

### REQ-007 — Contact page
- `GET /[lang]/contact` returns 200  
- Page renders `ContactForm` island  
- Form fields: Full Name (required), Email (required, valid format), Phone (optional), Message (required, min 10 chars)  
- On invalid submit: inline field-level error messages (Zod messages)  
- On valid submit: success message replaces form, no page reload

### REQ-008 — Contact form Zod schema
- Schema exported from `src/schemas/contact.ts`  
- Validated at client boundary before any state change  
- Type `ContactFormData` exported and used in `ContactForm.tsx`

### REQ-009 — i18n completeness
- All new user-facing strings added to `en.ts` and `es.ts`  
- Keys: `contact.*`, `vehicle.*` (detail labels), `filters.noResults`, `filters.clearFilters` (already exist)  
- No hardcoded strings in any new component or page

### REQ-010 — Test coverage
- `src/schemas/contact.test.ts` — Zod schema validation (valid + invalid cases)  
- `src/components/ui/VehicleFilterPanel.test.tsx` — filter logic, reset, empty state  
- `src/components/ui/ContactForm.test.tsx` — validation errors, success state  
- All new tests must pass; total coverage must remain ≥ 85%
