# Design: PWA Installer Gadget

## UI Components
- **Container**: `fixed`, `z-[90]`.
  - Desktop: Bottom-6, right-6 (needs to push WhatsApp up or be below it).
  - Mobile: Bottom-24 (to stay above the Cookie Banner which is at `bottom-0` with `p-6`).
- **Styling**:
  - Background: `bg-surface-container-high/95`, `backdrop-blur-3xl`.
  - Border: `border-white/10`.
  - Shadow: Deep shadow for elevation.
  - Animations: `translate-y` and `opacity` transitions.

## Stacking Strategy
We will use CSS variables or Tailwind classes to manage stacking.
- `CookieBanner`: `z-[100]`, `bottom-0`.
- `PWAInstaller`: `z-[90]`, `bottom-[offset]`.
- `WhatsAppWidget`: `z-[80]`, `bottom-[offset]`.

Wait, the user said:
- Gidget: WhatsApp
- Gidget: PWA Installer
- Banner: Cookie Policy

Usually "below" in a list means lower on the screen or lower in priority.
But if WhatsApp is "above", and PWA Installer is "below WhatsApp", then:
[WhatsApp]
[PWA Installer]
[Cookie Banner]

So from bottom to top:
1. Cookie Banner (at the very bottom)
2. PWA Installer (above Cookie Banner)
3. WhatsApp (above PWA Installer)

Let's check `WhatsAppWidget.astro` again. It's at `bottom-6`.
If the Cookie Banner is active, it takes up about `200px` height.
If the PWA Installer is above it, it might be quite high on the screen.

I'll design the PWA Installer to be a "floating card" that stacks vertically.

## Implementation Details
- **Intersection Observer**: Attach to a hidden marker in `BaseLayout` or just observe a footer element.
- **`beforeinstallprompt`**:
  ```javascript
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Signal the component that it can show
  });
  ```
