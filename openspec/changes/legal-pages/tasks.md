# Tasks: Legal Pages Implementation

- [ ] **Batch 1: Foundation & Shared Components**
  - [ ] Create `src/i18n/legal.ts` with EN/ES content.
  - [ ] Implement `src/layouts/LegalLayout.astro`.
  - [ ] Implement `src/components/ui/LegalSection.astro`.
  - [ ] Add tests for `LegalSection` layout and styling.

- [ ] **Batch 2: Privacy Policy & Terms of Service**
  - [ ] Implement `src/pages/[locale]/privacy-policy.astro`.
  - [ ] Implement `src/pages/[locale]/terms-of-service.astro`.
  - [ ] Add Playwright E2E tests for legal pages accessibility and content.

- [ ] **Batch 3: Cookie Settings (Interactive)**
  - [ ] Create `src/components/domains/legal/CookieManager.tsx` (React island).
  - [ ] Implement `src/pages/[locale]/cookie-settings.astro`.
  - [ ] Add unit tests for `CookieManager` logic (Zustand or local state).
  - [ ] Add E2E tests for cookie preference persistence.

- [ ] **Batch 4: Final Polish & Verification**
  - [ ] Run full test suite (`bun run test` and `bun run e2e`).
  - [ ] Audit with Lighthouse for performance and accessibility.
