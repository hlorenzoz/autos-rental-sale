# Tasks: PWA Installer Gadget

## Setup
- [ ] Add localization keys to `src/i18n/es.ts` and `src/i18n/en.ts`. <!-- id: 0 -->

## Components
- [ ] Create `src/components/ui/PWAInstaller.astro`. <!-- id: 1 -->
  - [ ] Implement UI with glassmorphism and AI-inspired icon.
  - [ ] Implement logic for `beforeinstallprompt`.
  - [ ] Implement "below the fold" detection with `IntersectionObserver`.
  - [ ] Add 2-second delay logic.
  - [ ] Add persistence with `localStorage`.

## Integration
- [ ] Integrate `PWAInstaller` into `src/layouts/BaseLayout.astro`. <!-- id: 2 -->
- [ ] Adjust CSS for stacking order (WhatsApp, PWA, Cookies). <!-- id: 3 -->

## Verification
- [ ] Create E2E test `tests/pwa-installer.spec.ts` to verify visibility and delay. <!-- id: 4 -->
- [ ] Manual verification on mobile viewports. <!-- id: 5 -->
