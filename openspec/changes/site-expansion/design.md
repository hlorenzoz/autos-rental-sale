# Design — site-expansion

## VehicleHubIsland — State Architecture

```
VehicleHubIsland (client:load)
├── props: vehicles[], locale, labels
├── state: mode ('buy'|'rent'), query (string), activeTags (string[])
├── derived: filtered = tag filter ∘ filterVehicles(mode+search)
│
├── <SearchPill> — onModeChange → setMode; onSearch → setQuery
├── <QuickFilterTags> — onFilterChange → setActiveTags
│
└── results:
    ├── result count line
    ├── <VehicleCardMini[]> grid (3-col lg, 2-col md, 1-col xs)
    └── empty state (when filtered.length === 0)
```

### Tag → Filter Mapping (client-side, in island)
```ts
function applyTagFilters(vehicles: Vehicle[], tags: string[], mode: 'buy'|'rent'): Vehicle[] {
  if (tags.length === 0) return vehicles;
  const catSet = new Set<string>();
  let maxSale: number | undefined;
  let maxRent: number | undefined;

  for (const tag of tags) {
    if (tag === 'electric') catSet.add('electric-sedan');
    if (tag === 'suv')     { catSet.add('suv'); catSet.add('luxury-suv'); }
    if (tag === 'luxury')  { catSet.add('luxury-suv'); catSet.add('sports-coupe'); }
    if (tag === 'budget')  { maxSale = 50000; maxRent = 150; }
  }

  return vehicles.filter(v => {
    if (catSet.size > 0 && !catSet.has(v.category)) return false;
    if (maxSale  && mode === 'buy'  && (v.price.sale === undefined || v.price.sale > maxSale)) return false;
    if (maxRent  && mode === 'rent' && (v.price.rent === undefined || v.price.rent > maxRent)) return false;
    return true;
  });
}
```

### VehicleCardMini (inline in VehicleHubIsland.tsx)
- Reuse identical pattern from VehicleFilterPanel.tsx
- `href={/${locale}/vehicles/${vehicle.slug}}`
- CTA label: mode === 'rent' → t.vehicles.bookNow, else → t.vehicles.inquire (passed via labels)

## Contact Page — Two-Column Layout

```
<main class="pt-24 pb-xl relative overflow-hidden">
  <!-- glow decoration -->
  <div class="max-w-7xl mx-auto px-8">
    <!-- header (centered, full-width) -->
    <div class="text-center mb-xl">…</div>

    <!-- two-column grid -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-xl">
      <!-- left: 3/5 → info strip + form -->
      <div class="lg:col-span-3 space-y-lg">
        <!-- info strip (3 cards: location, phone, hours) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-md">…</div>
        <!-- form card -->
        <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-lg shadow-sm">
          <ContactForm client:load labels={…} />
        </div>
      </div>

      <!-- right: 2/5 → map -->
      <div class="lg:col-span-2">
        <div class="sticky top-28 rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm">
          <!-- map header -->
          <div class="p-md bg-surface-container-low flex justify-between items-center">
            <span>Ourense, Galicia</span>
            <a href="GOOGLE_MAPS_URL" target="_blank" rel="noopener">Ver en Maps</a>
          </div>
          <!-- iframe -->
          <iframe
            src="https://maps.google.com/maps?q=Ourense,+Galicia,+Spain&t=&z=14&ie=UTF8&iwloc=&output=embed"
            class="w-full h-[400px] lg:h-[500px]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</main>
```

## New Pages — Shared Layout Pattern
All new pages use the same Astro page structure:
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import TopNavBar from '@/components/domains/nav/TopNavBar.astro';
import Footer from '@/components/domains/shared/Footer.astro';
import { locales, getDictionary } from '@/i18n/utils';
export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
const { lang } = Astro.params;
const locale = lang as Locale;
const t = getDictionary(locale);
---
<BaseLayout locale={locale} title={`${t.X.title} | ${t.site.name}`}>
  <TopNavBar locale={locale} currentPath={Astro.url.pathname} lightLabel={t.theme.toggleLight} darkLabel={t.theme.toggleDark} />
  <main class="pt-24 pb-xl">
    <div class="max-w-4xl mx-auto px-8">
      <!-- prose content -->
    </div>
  </main>
  <Footer locale={locale} />
</BaseLayout>
```

## Legal Pages Content Architecture
Legal pages render inline prose with:
- Hero header (title + last updated)
- Numbered sections using `<section>` + `<h2>` headers
- Content in `<p>` + `<ul>` tags
- Standard Tailwind prose classes: `prose prose-invert dark:prose-invert` or equivalent custom classes

## Navbar Phone CTA — Styling
Replace `<a href="#" class="hidden md:inline-flex ...">signIn</a>` with:
```html
<a href="tel:+34XXXXXXXXX"
   class="hidden md:inline-flex rounded-full bg-primary text-on-primary px-md py-2 text-label-caps uppercase tracking-[0.05em] font-semibold font-body hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95">
  {t.nav.phone}
</a>
```

## Testing Strategy

### VehicleHubIsland.test.tsx
- MUST write tests FIRST (strict TDD: Red → Green)
- Test cases:
  1. Renders all vehicles initially in buy mode
  2. Switching to rent mode hides sale-only vehicles
  3. Search query filters by brand/model
  4. Electric tag shows only electric-sedan vehicles
  5. SUV tag shows suv + luxury-suv vehicles
  6. Budget tag shows vehicles below price cap
  7. Clearing tags shows all vehicles again
  8. Empty state renders when no vehicles match
  9. Multiple tags work (category OR logic)
