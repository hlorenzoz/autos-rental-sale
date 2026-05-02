# Proposal: PWA Installer Gadget

## Intent
Implement a high-fidelity PWA installation gadget that follows the "Atmospheric Precision" design system. The gadget will encourage users to install the app for offline browsing, appearing with a delayed trigger and maintaining a specific vertical stacking order with other global UI elements (WhatsApp, Cookie Banner).

## Scope
- Create `src/components/ui/PWAInstaller.astro`.
- Implement `beforeinstallprompt` logic to handle the PWA installation flow.
- Add "below the fold" detection using `IntersectionObserver` to trigger the gadget.
- Implement a 2-second delay after trigger.
- Integrate into `BaseLayout.astro`.
- Ensure responsive stacking order: WhatsApp (top-most in its area), PWA Installer, Cookie Banner (bottom).

## Approach
1. **Component Design**:
   - Use glassmorphism (bg-surface-container-high/95, backdrop-blur-3xl).
   - Follow the visual reference: Icon, Title, Description, Install Button (Yellow/Primary), Close Button.
   - Use `fixed` positioning.
2. **Trigger Logic**:
   - Use `IntersectionObserver` on a specific target (e.g., a "below the fold" marker in the layout).
   - Delay appearance by 2 seconds once triggered.
   - Use `localStorage` to hide the gadget if the user closes it or installs the app.
3. **PWA Integration**:
   - Listen for `beforeinstallprompt` event and store it.
   - Trigger the browser's install prompt on button click.
4. **Layout Integration**:
   - In `BaseLayout.astro`, place the component.
   - Adjust CSS to handle vertical offsets when both PWA Installer and Cookie Banner are visible.

## Risks
- **Visual Overlap**: Stacking multiple fixed elements can clutter small screens. We'll use careful z-index and spacing management.
- **PWA Support**: Installation prompts behave differently across browsers/OS. We'll implement a fallback/conditional visibility.
- **Redirect Loops**: None expected as this is a UI-only change.
