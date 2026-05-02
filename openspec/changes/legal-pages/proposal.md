# Proposal: Legal Pages Implementation

## Intent
Implement the legal pages for the application to ensure compliance and provide clear information to users regarding privacy, terms, and cookies.

## Scope
- `Privacy Policy` page
- `Terms of Service` page
- `Cookie Settings` page
- i18n support for all pages (English and Spanish)
- High-fidelity styling using Tailwind CSS v4 and the Atmospheric Precision design system.

## Approach
1. **Layout**: Use/Create a dedicated `LegalLayout` that follows the "Airy Minimalism" aesthetic.
2. **Components**:
   - `LegalHeader`: Title and last updated date.
   - `LegalSection`: Card-like container for legal articles.
   - `CookieToggle`: Interactive component for cookie preferences (React island).
3. **i18n**: Store all legal text in `src/i18n/legal.ts` (or similar) to avoid hardcoding.
4. **Routing**: Implement as Astro pages with dynamic [locale] paths.

## Risks
- **Font Availability**: Ensure Space Grotesk and Inter are correctly loaded.
- **Tailwind v4 Setup**: Verify current Tailwind v4 configuration matches the design tokens in `DESIGN.md`.

## Metadata
- **Design Reference**: `@designs/legal`
- **Theme**: Atmospheric Precision
