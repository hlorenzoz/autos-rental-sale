# Specification: PWA Installer Gadget

## Requirements
- **Visibility**: The gadget must be hidden by default.
- **Trigger**: It should appear 2 seconds after the user scrolls past the "above the fold" section (detected via `IntersectionObserver`).
- **Persistence**: Once closed or installed, it should not appear again for the session (or indefinitely, using `localStorage`).
- **Responsive Stacking**:
  - Desktop: Bottom right area, below WhatsApp.
  - Mobile: Bottom area, above Cookie Banner if visible.
- **Actions**:
  - **Install**: Triggers the browser PWA installation.
  - **Close**: Hides the gadget and persists the choice.
- **Internationalization**: Content must be localized in `en` and `es`.

## User Scenarios
### Scenario 1: First Visit and Scroll
- **Given** the user is on any page.
- **When** the user scrolls to the "below the fold" content.
- **And** 2 seconds pass.
- **Then** the PWA Installer gadget should slide up from the bottom.

### Scenario 2: Successful Installation
- **Given** the PWA Installer gadget is visible.
- **When** the user clicks "Install".
- **Then** the browser's native install prompt appears.
- **And** upon success, the gadget disappears and stays hidden.

### Scenario 3: Closing the Gadget
- **Given** the PWA Installer gadget is visible.
- **When** the user clicks the "X" button.
- **Then** the gadget disappears and does not reappear during the session.

## Localization Keys
- `pwa.title`: "Access Luxury ..." / "Accede a Lujo ..."
- `pwa.description`: "Install our premium properties catalog for offline browsing." / "Instala nuestro catálogo de propiedades premium para navegar sin conexión."
- `pwa.install`: "Install" / "Instalar"
