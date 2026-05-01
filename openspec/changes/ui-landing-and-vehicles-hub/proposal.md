## Change Proposal — ui-landing-and-vehicles-hub

**What**: Implement the landing page and vehicles hub UI based on 3 Stitch design assets.
**Why**: Move from data layer to visual presentation, establishing the AeroDrive brand.
**Where**: src/components/, src/pages/, tailwind.css, src/i18n/
**Learned**: Data layer is already verified (44 passing tests). Atmospheric Precision tokens are extracted but not yet applied to Tailwind v4.

### Approach
1. **Token Integration**: Apply @theme tokens in `tailwind.css`.
2. **Global Components**: `TopNavBar` (static), `Footer` (static).
3. **Interactive Islands**: `SearchPill` (React) for real-time buy/rent toggle and search input.
4. **Domain Components**: `VehicleCard`, `VehicleGrid`, `HeroSection`, `FeatureCard`.
5. **Pages**:
   - Landing (`/`): Hero + Featured Vehicles + Features.
   - Inventory (`/vehicles`): Full grid + Filters.
6. **i18n**: Extract all labels (Search, Buy/Rent, Specs, Nav) to dictionaries.
