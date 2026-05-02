---
name: Aura Propulsion
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b25'
  surface-container: '#1d1f29'
  surface-container-high: '#272933'
  surface-container-highest: '#32343e'
  on-surface: '#e1e1ef'
  on-surface-variant: '#c3c5d9'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b6c4ff'
  primary: '#b6c4ff'
  on-primary: '#00277f'
  primary-container: '#0057ff'
  on-primary-container: '#e5e8ff'
  inverse-primary: '#004ee7'
  secondary: '#bec6dc'
  on-secondary: '#283041'
  secondary-container: '#41495b'
  on-secondary-container: '#b0b8cd'
  tertiary: '#ffb59f'
  on-tertiary: '#5f1600'
  tertiary-container: '#c13600'
  on-tertiary-container: '#ffe3db'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001550'
  on-primary-fixed-variant: '#003ab2'
  secondary-fixed: '#dae2f8'
  secondary-fixed-dim: '#bec6dc'
  on-secondary-fixed: '#131c2b'
  on-secondary-fixed-variant: '#3f4758'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb59f'
  on-tertiary-fixed: '#3a0a00'
  on-tertiary-fixed-variant: '#862300'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343e'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 64px
---

## Brand & Style
The design system is engineered to evoke the precision of high-performance automotive engineering and the seamlessness of next-generation SaaS. It targets a sophisticated demographic that values efficiency, speed, and luxury. 

The aesthetic is a hybrid of **Minimalism** and **Glassmorphism**. By utilizing heavy whitespace and a restricted color palette, the interface maintains a premium feel, while translucent, frosted-glass layers provide a sense of depth and technical sophistication. This visual language ensures that the product feels like a tool from the future—reliable yet cutting-edge.

## Colors
The color strategy prioritizes the **Electric Azure Blue** as the primary driver of action and brand recognition. In the default dark mode, this blue acts as a high-contrast beacon against the **Base Dark** backgrounds.

**Metallic Slate** is reserved for non-interactive elements and secondary information, grounding the interface in a technical, industrial aesthetic. The accent palette is functional: **Neon Emerald** signals "Go" and availability, while **Sunset Orange** is used sparingly to drive conversion through urgency. All surfaces should utilize the defined **Surface** hex codes to ensure proper contrast and depth.

## Typography
The typographic hierarchy relies on the contrast between the geometric, technical nature of **Space Grotesk** and the utilitarian clarity of **Inter**. 

Headlines should be set with tight letter-spacing to emphasize the futuristic "machined" look of the characters. Body text prioritizes readability with generous line heights. Use **Label-caps** for metadata, such as vehicle specifications (e.g., "0-60 MPH," "RANGE"), to maintain an organized, data-driven appearance.

## Layout & Spacing
This design system utilizes a **12-column fixed grid** for desktop, ensuring that content remains centered and premium on wide displays. On mobile, the system transitions to a fluid 4-column grid.

The rhythm is based on a **4px baseline grid**. Spacing between related elements should typically be `md` (16px), while spacing between major sections should be `xl` (48px) to maintain a minimal, airy feel. Use wide margins to frame the vehicle photography, treating the UI as a gallery.

## Elevation & Depth
Depth is created through a "Glass-on-Void" philosophy. 
1. **The Base Layer:** The deep Base background (#0A0E17).
2. **The Surface Layer:** Surface containers (#121826) with 1px low-opacity borders (#FFFFFF10).
3. **The Glass Layer:** Floating elements like the navigation bar and modal overlays use a background blur (20px) and 60% opacity.
4. **Shadows:** Avoid heavy black shadows. Instead, use multi-layered "ambient" shadows with a subtle blue tint (#0057FF at 10% opacity) to make components appear as if they are illuminated by the interface's own light source.

## Shapes
The primary shape language is defined by a consistent **16px border-radius** for cards and main containers, creating a "soft-tech" feel. 

Interactive elements like buttons use a slightly tighter **12px radius** to differentiate them from static containers. Use the **pill shape** exclusively for status indicators (e.g., "Available") and search bars to introduce organic curves into an otherwise geometric layout.

## Components
- **Buttons:** Primary buttons feature a solid Electric Azure fill with white text. Secondary buttons should be ghost-styled with a 1px Metallic Slate border. Apply a subtle glow effect on hover using the primary color.
- **Glass Navigation:** The top navigation bar must be a floating "pill" or full-width bar with a 20px backdrop blur and a thin top-border highlight.
- **Vehicle Cards:** Use the 16px radius. Images should have a subtle zoom-on-hover effect. Place the "Price" in Space Grotesk and "Specs" in Inter body-sm.
- **Input Fields:** Use the Surface color for backgrounds with a 1px border. On focus, the border transitions to Electric Azure with a soft outer glow.
- **Availability Chips:** Small pill-shaped tags. "Available" uses a background of Neon Emerald at 10% opacity with solid Neon Emerald text.
- **Spec Grid:** A custom component for vehicle details (HP, Battery, Top Speed). Icons should be minimalist line-art in Metallic Slate.