# Proposal — site-expansion

## Intent
Expand the site with new informational/legal pages, update global layout components, redesign the Contact page with embedded map, and wire the vehicle inventory filters.

## Scope
1. **New pages**: About Us, Política de Privacidad, Términos de Servicio, Configuración de Cookies
2. **Contact redesign**: two-column layout (form + map), embed Ourense Google Maps
3. **Navbar**: remove Sign In / Ingresar button → replace with `+34 XXX XX XX` phone link
4. **Footer**: add phone number, remove Empleos/Careers link, wire legal links to real routes
5. **Vehicles hub filtering**: wire SearchPill + QuickFilterTags to a React island that filters the inventory list

## Approach
- All new pages follow the existing pattern: `[lang]/page/index.astro` + `getStaticPaths()` for EN+ES
- i18n: new `about.*` and `legal.*` keys added to both `en.ts` and `es.ts`; `footer.careers` removed; `footer.phone` + `nav.phone` added
- Vehicle filtering: new `VehicleHubIsland.tsx` React island that owns state and renders SearchPill + QuickFilterTags + reactive card grid
- Map: Google Maps iframe embed with fallback link for Ourense, Spain
- TDD: test files written BEFORE implementation for each new component

## Risks
- i18n changes (add/remove keys) must be applied atomically across en.ts, es.ts, and all consumers
- VehicleGrid is Astro SSR — cannot be made reactive; must use React island pattern
- `footer.careers` removal requires simultaneous update of Footer.astro
