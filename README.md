# Autos Rental & Sale — Dental Lopez

A production-ready web application for vehicle rental and sales, built with a performance-first architecture and strict engineering standards.

---

## 🚀 Tech Stack

This project leverages a modern, high-performance stack designed for scalability and developer experience:

- **Runtime:** [Bun](https://bun.sh/)
- **Frontend Framework:** [Astro](https://astro.build/) (Islands Architecture)
- **UI Components:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand v5](https://zustand-demo.pmnd.rs/)
- **Validation:** [Zod v4](https://zod.dev/)
- **Testing:** [Vitest](https://vitest.dev/) (Unit/Integration) & [Playwright](https://playwright.dev/) (E2E)
- **Monitoring:** [Sentry](https://sentry.io/) & [Spotlight](https://spotlightjs.com/)
- **Automation:** [Just](https://just.systems/) (Task Runner)

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have **Bun** installed on your system.

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Clone the repository.
2. Run the setup task:
   ```bash
   just setup
   ```

### Development

Start the development server with:
```bash
just dev
```

To enable **Spotlight** for enhanced debugging and error tracking:
```bash
just spotlight
```

---

## 🏗️ Architecture & Standards

This project follows strict architectural principles defined in [AGENTS.md](./AGENTS.md):

1.  **Test-Driven Development (TDD):** Mandatory for all new features and bug fixes.
2.  **Modular Design:** Domain-specific components and logic encapsulation.
3.  **Partial Hydration:** Leveraging Astro Islands to minimize client-side JavaScript.
4.  **Strict Typing:** Full TypeScript integration with Zod runtime validation.
5.  **Internationalization:** Multi-language support (ES/EN) handled via Astro i18n routing.

---

## 📋 Automation (Justfile)

We use `just` for consistent command execution:

| Command | Description |
|---------|-------------|
| `just dev` | Starts the Astro development server |
| `just spotlight` | Starts the dev server with Sentry Spotlight enabled |
| `just check` | Runs linting, typechecking, and tests |
| `just coverage` | Runs tests and generates a coverage report |
| `just test` | Runs unit and integration tests |
| `just e2e` | Runs Playwright end-to-end tests |
| `just build` | Creates a production build |

---

## 📁 Project Structure

```text
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── i18n/               # Translation dictionaries
│   ├── layouts/            # Astro layout components
│   ├── lib/                # Utilities and integrations
│   ├── pages/              # File-based routing
│   ├── schemas/            # Zod validation schemas
│   └── stores/             # Zustand state management
├── tests/                  # E2E test definitions
├── astro.config.mjs        # Astro configuration
├── Justfile                # Automation recipes
└── package.json            # Dependencies and scripts
```

---

## 📄 License

Internal Project — Dental Lopez.
