# Design: Legal Pages Implementation

## Architecture
We will use Astro's file-based routing with a dynamic `[locale]` segment to handle multiple languages.

### Routing Structure
- `/src/pages/[locale]/privacy-policy.astro`
- `/src/pages/[locale]/terms-of-service.astro`
- `/src/pages/[locale]/cookie-settings.astro`

### Component Decomposition
1. **LegalLayout (`src/layouts/LegalLayout.astro`)**:
   - Wraps `BaseLayout`.
   - Adds the "Return" header and the site footer.
   - Centers content in a max-width container.
2. **LegalSection (`src/components/ui/LegalSection.astro`)**:
   - Implements the card style from the design: `bg-surface-container-lowest`, `rounded-xl`, `shadow`, `border`.
   - Accepts a title and an icon name.
3. **CookieManager (`src/components/domains/legal/CookieManager.tsx`)**:
   - Client-side React component.
   - Handles the toggles for different cookie categories.
   - Uses `localStorage` for persistence.

### Data Model
i18n strings will be stored in `src/i18n/legal.ts`:
```typescript
export const legalContent = {
  en: {
    privacy: { ... },
    terms: { ... },
    cookies: { ... }
  },
  es: {
    privacy: { ... },
    terms: { ... },
    cookies: { ... }
  }
}
```

### Styling
- Use Tailwind CSS v4 `@theme` variables (already set up in `tailwind.css`).
- Ensure `Space Grotesk` is used for all headers.
- Use `Electric Azure` (primary) for highlights and icons.
