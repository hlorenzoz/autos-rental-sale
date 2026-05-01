# Justfile for Autos Rental & Sale
# Task automation using Just (https://github.com/casey/just)

# Default: list all available commands
default:
    @just --list

# --- Development ---

# Start the development server
dev:
    bun run dev

# Install project dependencies
install:
    bun install

# Clean build artifacts, cache, and node_modules
clean:
    rm -rf dist/ .astro/ node_modules/

# --- Build & Deployment ---

# Build the project for production
build:
    bun run build

# Preview the production build locally
preview:
    bun run preview

# --- Quality Assurance & Testing ---

# Run all verification checks (lint, typecheck, coverage)
check:
    just lint
    just typecheck
    just coverage

# Lint the codebase using ESLint
lint:
    bun run lint

# Run TypeScript type checking
typecheck:
    bun run typecheck

# Run unit tests with code coverage (enforces 85% threshold)
coverage:
    bun run test:coverage

# Run unit tests in interactive/watch mode
test:
    bun run test

# Run End-to-End tests using Playwright
e2e:
    bun run test:e2e

# Run E2E tests with UI reporter
e2e-ui:
    bun run test:e2e:ui

# --- Utilities ---

# Regenerate all PWA/Favicon icons from a source image
# Usage: just icons [path/to/source.png]
icons source_path="":
    @./scripts/generate-icons.sh {{source_path}}

# Sync Git branches (fetch and prune)
sync:
    git fetch --all --prune
    @echo "Git branches synced."

# Initial project setup (install deps and hooks)
setup:
    bun install
    bun run prepare
    @echo "Project setup complete. Run 'just dev' to start."
