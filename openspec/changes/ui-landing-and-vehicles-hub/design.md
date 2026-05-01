## Technical Design — ui-landing-and-vehicles-hub

### Styling Architecture
- **Tailwind v4**: Use the new `@theme` directive in `src/assets/styles/global.css` (or `tailwind.css`).
- **CSS Variables**: Map Material Design 3 tokens to semantic names (e.g., `--color-primary`, `--font-display`).

### Component Blueprint
1. **Layouts**:
   - `BaseLayout.astro`: Wraps everything. Loads fonts (Space Grotesk, Inter).
2. **Interactive Islands (React)**:
   - `SearchPill.tsx`: Uses `useState` for Buy/Rent toggle.
   - `VehicleFilter.tsx`: (Future) side panel, but for now just the grid layout.
3. **Static Components (Astro)**:
   - `TopNavBar.astro`: Sticky, glassmorphism (`backdrop-blur-xl`).
   - `VehicleCard.astro`: Accepts a `Vehicle` object as prop. Formats prices using a utility.
   - `VehicleGrid.astro`: Server-side filtering using `filterVehicles` from `src/lib/vehicles`.

### i18n Strategy
- Add keys to `src/i18n/ui.ts` (or equivalent):
  - `nav.inventory`, `nav.sell`, `nav.services`, `nav.about`
  - `landing.hero_title`, `landing.hero_subtitle`
  - `vehicles.buy`, `vehicles.rent`, `vehicles.per_day`

### Data Integration
- Pages will call `getAllVehicles()` or `getFeaturedVehicles()` in the frontmatter.
- `VehicleCard` will be 100% static Astro for maximum performance (0kb client JS).

### Verification Plan
- **Unit**: Verify `VehicleCard` renders correct price format based on `type`.
- **E2E**: Verify language switching preserves the current page (e.g., `/en/vehicles` → `/es/vehicles`).
- **Performance**: Run `bun run check` and verify Tailwind builds correctly.
