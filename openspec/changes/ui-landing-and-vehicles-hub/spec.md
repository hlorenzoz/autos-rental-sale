## Delta Spec — ui-landing-and-vehicles-hub

### User Stories
- As a visitor, I want a high-end visual experience (AeroDrive brand) to feel trust in the service.
- As a shopper, I want to toggle between "Buy" and "Rent" easily in the hero section.
- As a browser, I want to see vehicle specs and prices clearly on cards.

### Functional Requirements
- **i18n**: All text must be bilingual (EN/ES). URL patterns: `/en/`, `/es/`, `/en/vehicles/`, etc.
- **Navigation**: Fixed glassmorphic navbar with smooth scroll (or link) behavior.
- **Search Pill**:
  - Segmented control for Buy/Rent.
  - Interactive input (placeholder only for now).
  - Hover/Active states matching Atmospheric Precision tokens.
- **Vehicle Grid**:
  - Responsive layout (1 col mobile, 2 col tablet, 3+ col desktop).
  - Cards show: Brand, Model, Year, Category, Price (Rent/Sale), and 3 key specs.
- **Performance**: Lighthouse score > 90. Astro Islands used for hydration.

### Acceptance Criteria
1. `tailwind.css` contains all design tokens from memory #550.
2. `/en/` and `/es/` pages render full landing sections.
3. `/en/vehicles` and `/es/vehicles` render the inventory grid.
4. "Buy/Rent" toggle changes the primary accent color or visual hint (optional per design).
5. All images use responsive sizing/formats.
6. Vitest component tests verify card rendering and toggle state.
7. Playwright E2E tests verify page navigation.
