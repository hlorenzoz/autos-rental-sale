# Overview

This `AGENTS.md` document serves as the master specification and operating manual for any AI agent or automated developer acting upon this repository. It dictates the architectural standards, development workflows, testing strategies, and technology stack required to build, maintain, and scale this production-ready web application. 

The primary goal is to ensure consistency, high performance, modularity, and strict adherence to Test-Driven Development (TDD) across all agent-generated or assisted code.

---

# Tech Stack

The following stack is strictly enforced. No substitutions or alternative libraries may be introduced without explicit architectural approval.

*   **Runtime & Package Manager:** Bun
*   **Frontend Framework:** Astro (leveraging Astro Islands for partial hydration)
*   **UI/Component Framework:** React (or Preact, for interactive islands)
*   **Styling:** Tailwind CSS v4
*   **Schema & Data Validation:** Zod v4
*   **State Management:** Zustand v5
*   **Unit & Integration Testing:** Vitest (with Coverage integration)
*   **End-to-End (E2E) Testing:** Playwright
*   **Automation:** Just (Task Runner)
*   **Continuous Integration / Quality:** Pre-commit Hooks (Husky/Lefthook), Lighthouse CI
*   **Monitoring & Error Tracking:** Sentry (with Spotlight integration)
    *   **Filtering Policy:** Errors originating from `node_modules` or core node modules are strictly excluded via `beforeSend` to minimize noise in Spotlight and Sentry.

---

# Architecture Principles

1.  **Modular & Scalable Design:** Features must be encapsulated within their own domains. Avoid monolithic components or tightly coupled logic.
2.  **Separation of Concerns:** Strictly separate UI components, business logic/state, data fetching, and schema validation.
3.  **Performance First (Astro Islands):** Default to static HTML generation via Astro. Only hydrate components that require client-side interactivity using `client:load`, `client:visible`, or `client:idle`.
4.  **Strict Typing:** TypeScript is mandatory. `any` is forbidden. External data interfaces and internal state must be strictly typed and validated at runtime.
5.  **SEO & Accessibility (a11y):** All UI components must adhere to WCAG 2.1 AA standards. Semantic HTML must be used. Metadata, OpenGraph tags, and canonical URLs must be handled dynamically per page.

---

# Design System Rules

If a specific design specification is provided in a feature request, it must be followed pixel-perfectly. If no design is provided, the agent must implement a default UI system with the following characteristics:

*   **Aesthetic:** Clean, modern, professional, and slightly futuristic.
*   **Spacing & Grid:** Base-8 spacing system utilizing Tailwind's utility classes.
*   **Typography:** highly legible sans-serif stack (e.g., Inter or Roboto default).
*   **Corners & Borders:** Subtle rounded corners (e.g., `rounded-lg` or `rounded-xl`) with fine borders (`border-white/10` in dark mode, `border-gray-200` in light mode).
*   **Interactions:** Smooth transitions on hover, focus, and active states (`transition-all duration-200 ease-in-out`).

---

# Development Workflow (TDD)

Test-Driven Development is **mandatory**. Agents must execute the following workflow for any feature or bug fix:

1.  **Test Definition:** Write a failing Vitest unit test or Playwright E2E test defining the expected behavior.
2.  **Execution & Verification:** Run the test to ensure it fails as expected (Red).
3.  **Implementation:** Write the minimum amount of robust code required to pass the test.
4.  **Validation:** Run the test to ensure it passes (Green).
5.  **Refactoring:** Clean up code, optimize, and enforce typing/linting without breaking the tests.
6.  **Pre-commit Validation:** Ensure all pre-commit hooks (linting, type checking, test coverage) pass locally before finalizing the change.

---

# State Management Strategy

*   **Library:** Zustand v5
*   **Scope:** Only use global state for data that genuinely needs to be accessed across disparate parts of the application (e.g., user session, UI theme, complex multi-step forms).
*   **Colocation:** Keep state as close to the UI as possible. Prefer component-level state (React `useState`/`useReducer`) for localized interactivity.
*   **Immutability:** Zustand slices must adhere to immutable update patterns.

---

# Validation Strategy

*   **Library:** Zod v4
*   **API Payloads:** All incoming API data must be parsed and validated through a Zod schema before being utilized in the application state.
*   **Forms:** Form inputs must be validated using Zod schemas on both the client side (before submission) and server side (API endpoints/Astro actions).
*   **Environment Variables:** Env vars must be strictly typed and validated at application boot using Zod.

---

# Internationalization (i18n)

*   **Default Support:** English (`en`) and Spanish (`es`).
*   **Routing:** Use Astro's built-in i18n routing capabilities (`prefixDefaultLocale` strategy).
*   **Dictionaries:** Store translations in modular, type-safe JSON or TypeScript dictionaries organized by domain or page.
*   **Agent Requirement:** Any user-facing string generated by the agent must be extracted to the i18n dictionary and referenced via a translation helper function. Hardcoding strings in UI components is prohibited.

---

# Theming (Light/Dark)

*   **Strategy:** Tailwind's `class` strategy (toggling a `.dark` class on the `<html>` element).
*   **CSS Variables:** Define base colors via CSS variables integrated into Tailwind v4's `@theme` directive. 
*   **Persistence:** The user's theme preference must be stored in `localStorage` and synchronized with the operating system preference using `window.matchMedia('(prefers-color-scheme: dark)')`.
*   **Flash Prevention:** Implement an inline script in the `<head>` to set the theme class before the browser renders the DOM.

---

# PWA Strategy

*   **Manifest:** A fully populated `manifest.webmanifest` must be generated, defining icons, theme colors, display modes (`standalone`), and app name.
*   **Service Worker:** Implement a Service Worker strategy (e.g., via Workbox) to cache static assets, Astro generated pages, and API responses.
*   **Offline Support:** Provide a graceful fallback UI when the application is completely offline.
*   **Lighthouse Checks:** Lighthouse CI will run against PRs to ensure PWA installability and performance criteria are met.

---

# Testing Strategy

1.  **Unit Tests (Vitest):**
    *   Focus on isolated utilities, Zod schemas, state stores (Zustand), and pure UI components.
    *   Coverage minimum: 85% for statements, branches, functions, and lines (aiming for 100%).
2.  **Component Tests (Vitest + Testing Library):**
    *   Test complex interactive components (Astro islands) in isolation.
3.  **End-to-End Tests (Playwright):**
    *   Map critical user journeys (e.g., authentication flow, checkout, data submission).
    *   Tests must run against multiple modern browsers and mobile viewports.
4.  **Performance & Web Vitals (Lighthouse CI):**
    *   Performance score strictly > 90.
    *   Accessibility score strictly > 95.

---

# Automation & Tasks

The project utilizes `just` as a command runner to ensure consistent task execution across environments. All developers and agents should prefer these recipes over direct `bun run` commands.

*   **Setup:** `just setup` (Initial installation and hook preparation)
*   **Development:** `just dev` (Starts Astro dev server)
*   **Verification:** `just check` (Runs lint, typecheck, and coverage)
*   **Testing:** `just test` (Unit tests), `just e2e` (E2E tests)
*   **Build:** `just build` (Production build)
*   **Maintenance:** `just icons` (Regenerates PWA icons)

---

# Folder Structure

The repository must adhere to the following directory tree layout to maintain modularity:

```text
/
├── .husky/                 # Pre-commit hooks configuration
├── .lighthouseci/          # Lighthouse CI assertions
├── playwright/             # E2E test definitions
├── public/                 # Static assets (fonts, icons, manifest, service worker)
├── scripts/                # Automation and maintenance scripts
├── src/
│   ├── assets/             # Unprocessed assets (images, global CSS)
│   ├── components/         # Reusable UI components (pure, stateless where possible)
│   │   ├── ui/             # Generic design system components (buttons, inputs)
│   │   └── domains/        # Feature-specific components
│   ├── i18n/               # Translation dictionaries and utilities
│   ├── layouts/            # Astro layout components (base HTML structure)
│   ├── lib/                # Third-party integrations, utility functions
│   ├── pages/              # Astro file-based routing mechanism
│   ├── schemas/            # Zod validation schemas
│   ├── stores/             # Zustand state slices
│   └── tests/              # Unit and integration tests (or colocated .test.ts files)
├── tests/                  # Playwright E2E configuration and tests
├── astro.config.mjs        # Astro configuration
├── sentry.client.config.ts # Sentry client-side configuration
├── sentry.server.config.ts # Sentry server-side configuration
├── tailwind.css            # Tailwind v4 base styles and @theme definitions
├── Justfile                # Task runner configuration
├── package.json            # Bun package definitions and scripts
└── vitest.config.ts        # Vitest configuration and coverage settings
```

---

## Available Skills

Use these slash commands to trigger specialized agents:

### Project Skills

| Command | Description | File |
|---------|-------------|------|
| `/test` | Run unit/integration tests with Vitest | [`.claude/commands/test.md`](.claude/commands/test.md) |
| `/e2e` | Run end-to-end tests with Playwright | [`.claude/commands/e2e.md`](.claude/commands/e2e.md) |
| `/style` | Manage Tailwind CSS v4 styling and components | [`.claude/commands/style.md`](.claude/commands/style.md) |
| `/validate` | Define and validate Zod schemas | [`.claude/commands/validate.md`](.claude/commands/validate.md) |
| `/state` | Manage Zustand global state stores | [`.claude/commands/state.md`](.claude/commands/state.md) |
| `/git_commit` | Commit changes using conventional commits | [`.claude/commands/git_commit.md`](.claude/commands/git_commit.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Writing or updating Vitest tests | `/test` |
| Running or debugging Playwright tests | `/e2e` |
| Modifying Tailwind classes or design tokens | `/style` |
| Creating or updating Zod schemas | `/validate` |
| Managing Zustand stores | `/state` |
| Committing changes (general) | `/git_commit` |

---

# Agent Rules & Constraints

1.  **Execution Policy:** Read this `AGENTS.md` before executing any architectural changes.
2.  **No Boilerplate Bloat:** Do not generate unused code. Only write exactly what is required to pass the current TDD cycle.
3.  **Strict Dependencies:** Do not add dependencies via `bun add` without verifying if native Astro, standard DOM APIs, or the existing stack can solve the problem.
4.  **Refusal to Degrade:** If a user requests a change that violates TDD, skips validation, or degrades performance scores below defined thresholds, the agent MUST flag the violation and request confirmation before proceeding.
5.  **Language Continuity:** Maintain bilingual support (es/en) for all newly generated features.
6.  **Git Commits:** Use the global `git-commit` skill for all git operations. Do NOT execute manual `git commit` commands; leverage the skill to ensure conventional commit standards and intelligent staging.

---

# Extension Guidelines

To extend this specification:
1. Propose the change via a Pull Request modifying this `AGENTS.md` file.
2. Ensure new technologies do not conflict with the existing Astro/Bun/Tailwind architecture.
3. Update the `Tech Stack` and `Testing Strategy` sections accordingly to reflect new validation requirements.