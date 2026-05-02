---
name: Atmospheric Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004ee7'
  primary: '#0043c8'
  on-primary: '#ffffff'
  primary-container: '#0057ff'
  on-primary-container: '#e5e8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006d35'
  on-secondary: '#ffffff'
  secondary-container: '#3fff8b'
  on-secondary-container: '#007237'
  tertiary: '#9c2200'
  on-tertiary: '#ffffff'
  tertiary-container: '#c72e00'
  on-tertiary-container: '#ffe4dd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001550'
  on-primary-fixed-variant: '#003ab2'
  secondary-fixed: '#62ff96'
  secondary-fixed-dim: '#00e475'
  on-secondary-fixed: '#00210b'
  on-secondary-fixed-variant: '#005226'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a2'
  on-tertiary-fixed: '#3c0700'
  on-tertiary-fixed-variant: '#8a1d00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 48px
---

## Brand & Style

The design system is defined by a sense of weightlessness, technical precision, and absolute clarity. It targets a high-performance audience that values efficiency and forward-thinking technology. The visual narrative is built around the concept of "Airy Minimalism"—utilizing expansive whitespace to reduce cognitive load while maintaining a sophisticated, high-tech edge.

The aesthetic blends **Minimalism** with **Modern Corporate** sensibilities. It avoids heavy decorative elements, favoring structural integrity and purposeful color placement. The result is a UI that feels like a premium dashboard for advanced technology: clean, professional, and unmistakably futuristic.

## Colors

The palette is anchored by **Electric Azure**, a high-vibrancy blue that signals propulsion and digital intelligence. The background architecture uses a subtle off-white to reduce glare, while pure white surfaces indicate interactive or prioritized content areas.

- **Deep Slate (#1A1C1E)** is used for primary headings to ensure maximum contrast and readability.
- **Metallic Slate (#64748B)** provides a softer touch for secondary information and meta-data.
- **Neon Emerald (#00E676)** and **Sunset Orange (#FF3D00)** act as surgical accents, reserved exclusively for success states, critical alerts, or primary calls-to-action to prevent visual fatigue.

## Typography

This design system utilizes a high-contrast typographic pairing to balance technical innovation with readability. 

**Space Grotesk** is used for headlines. Its geometric, slightly quirky apertures reflect a futuristic, scientific aesthetic. **Inter** is the primary workhorse for body text and interface elements, chosen for its exceptional clarity and neutral tone. 

Maintain generous tracking in uppercase labels to enhance the "airy" feel, while keeping headline tracking tight to maintain a sense of structural strength.

## Layout & Spacing

The layout philosophy follows a **fixed-fluid hybrid grid**. Content is contained within a 12-column structure with significant outer margins to emphasize whitespace and center the user's focus. 

- Use an **8px base grid** for all internal component spacing.
- Vertical rhythm should favor large gaps (40px+) between major sections to prevent visual clutter.
- Elements should "breathe," with internal padding often exceeding the expected standard to reinforce the minimal aesthetic.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Atmospheric Shadows**. Instead of heavy borders, surfaces are separated by their container color (White on Base Gray) and a single, highly diffused shadow style.

- **Soft Shadows:** Use a very large blur radius (20px to 40px) with low opacity (5-8%) and a subtle blue tint in the shadow color to harmonize with the Primary color.
- **Level 0:** Base Background (#F8F9FA), no shadow.
- **Level 1:** Cards/Surfaces (#FFFFFF) with a soft shadow to indicate interactable areas.
- **Backdrop Blur:** Use 12px-20px blurs on fixed navigation bars to maintain the "weightless" feel while ensuring text legibility over content.

## Shapes

The shape language is consistently approachable yet organized. A **16px (1rem)** standard corner radius is applied to all primary cards and containers, creating a "soft-tech" appearance.

Smaller components like buttons or input fields may use a slightly reduced radius (8px or 12px) to maintain a crisp relationship with their parent containers, but the overall feeling should remain rounded and friendly. Avoid 0px corners entirely to prevent the UI from feeling aggressive.

## Components

### Buttons
- **Primary:** Electric Azure background with White text. No border. Soft shadow on hover.
- **Secondary:** Transparent background with a 1px border in Metallic Slate.
- **Ghost:** Text only in Electric Azure or Metallic Slate.

### Cards
- Always use the Surface background (#FFFFFF).
- Apply a 16px border radius and a soft atmospheric shadow.
- Imagery inside cards should be high-resolution with white or transparent backgrounds to blend seamlessly with the container.

### Inputs
- Backgrounds should be the same as the Base Background (#F8F9FA) to "set into" the white cards.
- Focus state uses a 2px Electric Azure border with no glow.

### Chips & Tags
- Use a pill-shaped radius.
- Backgrounds should be low-opacity versions of the accent colors (e.g., 10% Emerald for success tags) with full-opacity text.

### Imagery
- Focus on high-key photography with plenty of light. 
- Use transparent PNGs for product shots to create an "object in space" effect, reducing visual noise from background boxes.