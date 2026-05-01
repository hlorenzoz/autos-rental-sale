## Task List — ui-landing-and-vehicles-hub

### Batch 1: Foundations & UI Atoms
- [x] Implement Tailwind v4 @theme in `tailwind.css` (tokens from #550).
- [x] Add missing i18n strings for navigation and vehicle labels.
- [x] Create `src/components/ui/Button.astro` (variants: primary, secondary, ghost).
- [x] Create `src/components/ui/Badge.astro` (for categories/status).

### Batch 2: Structural Components
- [x] Build `src/components/domains/nav/TopNavBar.astro` (glassmorphism).
- [x] Build `src/components/domains/shared/Footer.astro`.
- [x] Build `src/components/domains/vehicles/VehicleCard.astro` (static).
- [x] Build `src/components/domains/vehicles/VehicleGrid.astro`.

### Batch 3: Interactive Islands
- [x] Create `src/components/ui/SearchPill.tsx` (React).
- [x] Integrate `SearchPill` into a `HeroSection.astro`.

### Batch 4: Page Assembly & Routing
- [ ] Assemble `src/pages/[lang]/index.astro` (Landing).
- [x] Assemble `src/pages/[lang]/vehicles/index.astro` (Inventory).
- [x] Ensure proper i18n routing in `astro.config.mjs`.

### Batch 5: Verification
- [ ] Add unit tests for `VehicleCard` pricing logic.
- [ ] Add Playwright E2E tests for navigation.
- [ ] Run `just check` and verify coverage & performance.
