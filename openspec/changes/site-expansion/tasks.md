# Tasks — site-expansion

## Agent 1: layout-updates (Navbar + Footer + i18n footer/nav)

- [ ] T1-A: Add `nav.phone: '+34 XXX XX XX'` to `src/i18n/en.ts` and `src/i18n/es.ts`
- [ ] T1-B: Add `footer.phone: '+34 XXX XX XX'` to both locale files
- [ ] T1-C: Remove `footer.careers` from both locale files (en.ts removes key from type, es.ts removes value)
- [ ] T1-D: Update `src/components/domains/nav/TopNavBar.astro` — remove signIn `<a>` block, add phone `<a href="tel:...">` with same styling
- [ ] T1-E: Update `src/components/domains/shared/Footer.astro`:
  - Remove careers `<li>` element
  - Update legal hrefs to real routes (`/legal/privacy/`, `/legal/terms/`, `/legal/cookies/`)
  - Update Inventory column hrefs to real routes
  - Add phone number to the bottom bar

## Agent 2: new-pages (About + 3 Legal pages + i18n about/legal)

- [ ] T2-A: Add `about.*` keys to `src/i18n/en.ts` and `src/i18n/es.ts`
- [ ] T2-B: Add `legal.*` keys (privacyTitle, privacyLastUpdated, termsTitle, etc.) to both locale files
- [ ] T2-C: Create `src/pages/[lang]/about/index.astro` with professional content
- [ ] T2-D: Create `src/pages/[lang]/legal/privacy/index.astro` with GDPR placeholder content in Spanish (ES locale) / English (EN locale)
- [ ] T2-E: Create `src/pages/[lang]/legal/terms/index.astro` with Terms of Service boilerplate
- [ ] T2-F: Create `src/pages/[lang]/legal/cookies/index.astro` with Cookie Policy boilerplate

## Agent 3: contact-redesign (Contact page redesign + map)

- [ ] T3-A: Redesign `src/pages/[lang]/contact/index.astro`:
  - Two-column layout: form (3/5) + map (2/5) on lg+; single column on mobile
  - Update location to Ourense, Galicia, España
  - Update phone to +34 XXX XX XX
  - Update schedule to Lun–Sáb, 9:00–19:00
  - Embed Google Maps iframe: `https://maps.google.com/maps?q=Ourense,+Galicia,+Spain&t=&z=14&ie=UTF8&iwloc=&output=embed`
  - Add "Ver en Google Maps" link opening the provided URL in a new tab
  - Use sticky map panel on desktop

## Agent 4: vehicles-hub (VehicleHubIsland + wiring)

- [ ] T4-A: Write failing tests in `src/components/ui/VehicleHubIsland.test.tsx` (Red phase)
  - 9 test cases per design.md
- [ ] T4-B: Implement `src/components/ui/VehicleHubIsland.tsx` (Green phase)
  - Props: vehicles, locale, labels (VehicleHubLabels)
  - State: mode, query, activeTags
  - Derived: filtered vehicles (filterVehicles + tag overlay)
  - Renders: SearchPill + QuickFilterTags + result count + card grid + empty state
- [ ] T4-C: Update `src/pages/[lang]/vehicles/index.astro`:
  - Remove standalone SearchPill + QuickFilterTags islands
  - Add VehicleHubIsland client:load with all vehicles + locale + labels from t.*
- [ ] T4-D: Run `bun run test` to verify Green phase

## Parallelism Note
- Agents 1 and 2 both touch en.ts and es.ts but DIFFERENT top-level keys:
  - Agent 1: `nav.phone`, `footer.phone`, remove `footer.careers`
  - Agent 2: `about.*`, `legal.*`
- Use Edit tool (targeted old_string→new_string) NOT full file rewrites to avoid collision
