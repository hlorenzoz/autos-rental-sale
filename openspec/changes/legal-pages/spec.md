# Spec: Legal Pages Implementation

## Requirements
- **High-Fidelity**: Match Atmospheric Precision design system exactly (Space Grotesk headlines, Inter body, Electric Azure primary).
- **Responsive**: Fully responsive from mobile to desktop.
- **i18n**: Support English (`en`) and Spanish (`es`) locales.
- **Accessibility**: WCAG 2.1 AA compliant (semantic HTML, sufficient contrast, keyboard navigable).
- **Performance**: Lighthouse score > 90.

## Functional Scenarios

### Scenario: Accessing Legal Pages
- **GIVEN** a user navigates to `/[locale]/privacy-policy`
- **WHEN** the page loads
- **THEN** it displays the correct legal content for that locale and matches the design.

### Scenario: Cookie Preferences Management
- **GIVEN** a user is on the `Cookie Settings` page
- **WHEN** they toggle a cookie category (e.g., Analytics) and click "Save Preferences"
- **THEN** the preference is persisted in `localStorage` and a success notification is shown.

### Scenario: Return Navigation
- **GIVEN** a user is on a legal page
- **WHEN** they click the "Back to Main" or "RETURN" link
- **THEN** they are redirected to the homepage of the current locale.

## Technical Requirements
- **Astro Pages**: `src/pages/[locale]/privacy-policy.astro`, etc.
- **Components**:
  - `src/components/ui/LegalCard.astro`: Reusable container with shadow and padding.
  - `src/components/domains/legal/CookieSettings.tsx`: React component for the interactive toggles.
- **State**: Use a simple store or local storage for cookie preferences.
