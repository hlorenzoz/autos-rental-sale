# Spec — site-expansion

## New Pages

### SC-01: About Us page
- Route: `/[lang]/about/index.astro`
- `getStaticPaths()` returns both locales (en, es)
- Uses BaseLayout, TopNavBar, Footer components
- Content: mission statement, values, team blurb — professional placeholder in each locale's language
- i18n keys: `about.title`, `about.subtitle`, `about.missionTitle`, `about.missionBody`, `about.valuesTitle`, `about.value1Title`, `about.value1Body`, `about.value2Title`, `about.value2Body`, `about.value3Title`, `about.value3Body`

### SC-02: Política de Privacidad
- Route: `/[lang]/legal/privacy/index.astro`
- Standard GDPR-compliant placeholder in Spanish (ES) / English (EN)
- Sections: Responsable, Datos recogidos, Finalidad, Legitimación, Destinatarios, Derechos
- i18n keys: `legal.privacyTitle`, `legal.privacyLastUpdated`

### SC-03: Términos de Servicio
- Route: `/[lang]/legal/terms/index.astro`
- Sections: Aceptación, Uso del servicio, Reservas, Precios, Responsabilidad, Jurisdicción
- i18n keys: `legal.termsTitle`, `legal.termsLastUpdated`

### SC-04: Configuración de Cookies
- Route: `/[lang]/legal/cookies/index.astro`
- Sections: ¿Qué son las cookies?, Tipos utilizados, Gestión, Política de terceros
- i18n keys: `legal.cookiesTitle`, `legal.cookiesLastUpdated`

## Contact Page Redesign (SC-05)

### Layout
- Two-column on md+: left = contact info + form (60%), right = map (40%)
- Single column on mobile: info strip → map → form
- Google Maps embed pointing to Ourense, Province of Ourense, Spain
- Prominent CTA link opening the provided Google Maps URL in a new tab
- Location updated to: Ourense, Galicia, España (remove Miami/Buenos Aires reference)

### Map embed URL
`https://maps.google.com/maps?q=Ourense,+Galicia,+Spain&t=&z=14&ie=UTF8&iwloc=&output=embed`

### Contact info strip
- Icon: location_on → "Ourense, Galicia, España"
- Icon: phone → "+34 XXX XX XX"
- Icon: schedule → "Lun–Sáb, 9:00–19:00"

## Navbar Update (SC-06)

- Remove: `<a href="#" class="..."> {t.nav.signIn} </a>` block entirely
- Add: `<a href="tel:+34XXXXXXXXX" ...>+34 XXX XX XX</a>` with same positioning/styling (rounded-full, bg-primary, text-on-primary)
- i18n: add `nav.phone: '+34 XXX XX XX'` to both locales
- Keep `nav.signIn` key in dictionary (dead key — no TypeScript error, avoids cascade)

## Footer Update (SC-07)

- Remove entire careers `<li>` from Footer.astro
- Add phone number row to bottom bar (left of language switcher)
- Update legal link hrefs:
  - Privacy → `/${locale}/legal/privacy/`
  - Terms → `/${locale}/legal/terms/`
  - Cookies → `/${locale}/legal/cookies/`
- Update Inventory column links to real routes: `/${locale}/vehicles/`, `/${locale}/vehicles/rent/`, `/${locale}/vehicles/sell/`
- i18n: add `footer.phone: '+34 XXX XX XX'` to both locales; remove `footer.careers` from both en.ts and es.ts AND from Footer.astro simultaneously

## Vehicle Hub Filtering (SC-08)

### VehicleHubIsland.tsx
- Path: `src/components/ui/VehicleHubIsland.tsx`
- Props: `vehicles: Vehicle[]`, `locale: Locale`, `labels: VehicleHubLabels`
- State:
  - `mode: 'buy' | 'rent'` — drives type filter (`sale` | `rent`)
  - `query: string` — full-text search
  - `activeTags: string[]` — quick filter tags
- Derived (useMemo):
  - Step 1: `filterVehicles(vehicles, { type: mode === 'buy' ? 'sale' : 'rent', search: query || undefined })`
  - Step 2: apply tag overlays (category sets + budget price caps)
  - Tag mapping:
    - `'electric'` → categories: `['electric-sedan']`
    - `'suv'` → categories: `['suv', 'luxury-suv']`
    - `'luxury'` → categories: `['luxury-suv', 'sports-coupe']`
    - `'budget'` → `maxPriceSale: 50000` / `maxPricePerDay: 150`
  - Multi-tag category logic: OR union of all selected category sets
- Renders: SearchPill + QuickFilterTags + result count + VehicleCardMini grid (or empty state)
- `VehicleCardMini` inline in same file (reuse pattern from VehicleFilterPanel.tsx)

### vehicles/index.astro update
- Remove standalone `SearchPill` + `QuickFilterTags` islands
- Add `VehicleHubIsland` as single `client:load` island passing all vehicles + locale + labels

### VehicleHubLabels interface
```ts
interface VehicleHubLabels {
  buyLabel: string;
  rentLabel: string;
  placeholder: string;
  filterLabel: string;
  filters: FilterTag[];
  noResults: string;
  noResultsHint: string;
  clearFilters: string;
  found: string; // "{N} results"
}
```

## i18n Additions

### en.ts additions
```ts
nav: { ...existing, phone: '+34 XXX XX XX' }
footer: { ...existing minus careers, phone: '+34 XXX XX XX' }
about: {
  title: 'About Us',
  subtitle: 'Our story, our mission, our passion for mobility.',
  missionTitle: 'Our Mission',
  missionBody: 'To redefine automotive mobility by connecting people with exceptional vehicles — whether to rent for an experience or own for a lifetime.',
  valuesTitle: 'Our Values',
  value1Title: 'Excellence',
  value1Body: 'Every vehicle in our fleet is rigorously inspected and maintained to the highest standards.',
  value2Title: 'Transparency',
  value2Body: 'Clear pricing, honest advice, and straightforward processes — no hidden fees.',
  value3Title: 'Customer First',
  value3Body: 'Your satisfaction drives everything we do. We are here before, during, and after every transaction.',
}
legal: {
  privacyTitle: 'Privacy Policy',
  privacyLastUpdated: 'Last updated: January 2025',
  termsTitle: 'Terms of Service',
  termsLastUpdated: 'Last updated: January 2025',
  cookiesTitle: 'Cookie Settings',
  cookiesLastUpdated: 'Last updated: January 2025',
}
```

### es.ts additions (same keys, Spanish values)
```ts
nav: { ...existing, phone: '+34 XXX XX XX' }
footer: { ...existing minus careers, phone: '+34 XXX XX XX' }
about: {
  title: 'Nosotros',
  subtitle: 'Nuestra historia, nuestra misión, nuestra pasión por la movilidad.',
  missionTitle: 'Nuestra Misión',
  missionBody: 'Redefinir la movilidad automotriz conectando a las personas con vehículos excepcionales — ya sea para alquilar una experiencia o para ser propietario de por vida.',
  valuesTitle: 'Nuestros Valores',
  value1Title: 'Excelencia',
  value1Body: 'Cada vehículo de nuestra flota es inspeccionado y mantenido rigurosamente bajo los más altos estándares.',
  value2Title: 'Transparencia',
  value2Body: 'Precios claros, asesoramiento honesto y procesos directos — sin cargos ocultos.',
  value3Title: 'El Cliente Primero',
  value3Body: 'Tu satisfacción impulsa todo lo que hacemos. Estamos aquí antes, durante y después de cada transacción.',
}
legal: {
  privacyTitle: 'Política de Privacidad',
  privacyLastUpdated: 'Última actualización: enero de 2025',
  termsTitle: 'Términos de Servicio',
  termsLastUpdated: 'Última actualización: enero de 2025',
  cookiesTitle: 'Configuración de Cookies',
  cookiesLastUpdated: 'Última actualización: enero de 2025',
}
```
