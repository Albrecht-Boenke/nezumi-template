---
title: Nezumi UI — documentation index
description: Project UI architecture, shadcn workflow, and conventions; flat numbered `NNN-nezumi-ui-*.mdx` files; see “Agent retrieval”.
---

# Nezumi UI documentation

Offline project docs: flat files `NNN-nezumi-ui-slug.mdx` in this directory (`NNN` is three digits). Stack pins: [`FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

## Agent retrieval

Use this file as the **single navigation root**. Do **not** assume nested `rules/` paths; all numbered pages are **flat** `NNN-nezumi-ui-kebab-slug.mdx` next to `INDEX.md`. The agent skill for shadcn workflows remains in [`SKILL.md`](./SKILL.md) (same folder); rule-like content is mirrored in the numbered files below.

| Need | Where to look |
|------|----------------|
| Install, build, first imports | **Getting started** |
| Package layers, tokens, build | **Architecture**, **Foundation**, **Design tokens** |
| Atomic folders vs public API | **Atomic design**, **Public API** |
| Adding components, exports | **Component development**, **Public API** |
| Theming, CSS variables, presets | **Customization** |
| shadcn CLI flags and presets | **shadcn CLI** |
| shadcn MCP tools | **shadcn MCP** |
| Tailwind class rules, semantic colors | **Styling** |
| Icons in buttons | **Icons** |
| Forms, FieldGroup, InputGroup | **Forms** |
| Composition, overlays, Card | **Composition** |
| Radix vs base primitive APIs | **Base vs radix** |
| Monorepo boundaries | **Monorepo architecture** |

**Rules:** The numeric prefix `NNN` is a stable slot (001–019), not a reading order. Prefer the **Summary** on each index line. **Until `docs/nezumi-ui/` is declared full SSOT, vendor docs have priority** for framework behavior (`docs/react/`, `docs/nextjs/`, `docs/tailwind-css/`, `docs/shadcn-ui/`). Use this Nezumi index as project-specific supplement.

---

## Core — Nezumi UI package

- [001 — Getting Started](./001-nezumi-ui-getting-started.mdx) | Type: Guide | Summary: Install, build, import CSS and public components
- [002 — Architecture Overview](./002-nezumi-ui-architecture-overview.mdx) | Type: Conceptual | Summary: Layers, public API, tokens, framework baseline
- [003 — Atomic Design](./003-nezumi-ui-atomic-design.mdx) | Type: Conceptual | Summary: Internal atoms–templates vs public `components/*` leaves
- [004 — Public API](./004-nezumi-ui-public-api.mdx) | Type: Reference | Summary: Import paths, `package.json` exports, adding a leaf
- [005 — Foundation And Tokens](./005-nezumi-ui-foundation.mdx) | Type: Reference | Summary: `src/styles/` layout, `@theme`, dark mode
- [006 — Component Development](./006-nezumi-ui-component-development.mdx) | Type: Guide | Summary: Implementation steps, CVA example, public leaf
- [007 — Best Practices](./007-nezumi-ui-best-practices.mdx) | Type: Guide | Summary: Imports, styling, React 19 refs, shadcn alignment
- [008 — Migration Guide](./008-nezumi-ui-migration-guide.mdx) | Type: Guide | Summary: Imports, tokens, verification commands
- [009 — FAQ](./009-nezumi-ui-faq.mdx) | Type: Reference | Summary: Short answers for common tasks
- [010 — Design Tokens & Tailwind v4](./010-nezumi-ui-design-tokens-tailwind-v4.mdx) | Type: Conceptual | Summary: 3-layer tokens, `@theme`, motion, OKLCH, file layout
- [011 — Monorepo Architecture](./011-nezumi-ui-monorepo-architecture.mdx) | Type: Conceptual | Summary: Workspace layout, exports, Next.js notes

## Tooling — shadcn / MCP

- [012 — shadcn CLI](./012-nezumi-ui-shadcn-cli.mdx) | Type: Reference | Summary: `init`, `add`, `apply`, flags, presets, templates
- [013 — Customization & Theming](./013-nezumi-ui-customization-theming.mdx) | Type: Guide | Summary: CSS variables, dark mode, extending theme, components
- [014 — shadcn MCP](./014-nezumi-ui-shadcn-mcp.mdx) | Type: Reference | Summary: MCP setup, registry tools

## Rules — patterns for agents and contributors

- [015 — Styling](./015-nezumi-ui-styling.mdx) | Type: Rules | Summary: Semantic colors, variants, `gap` vs `space-*`, `cn()`, overlays
- [016 — Icons](./016-nezumi-ui-icons.mdx) | Type: Rules | Summary: `data-icon`, no icon sizing in composed components
- [017 — Forms & Inputs](./017-nezumi-ui-forms-inputs.mdx) | Type: Rules | Summary: FieldGroup, InputGroup, ToggleGroup, validation attributes
- [018 — Composition](./018-nezumi-ui-composition.mdx) | Type: Rules | Summary: Groups, overlays, Card, Tabs, Alert, Empty, toasts
- [019 — Base vs Radix](./019-nezumi-ui-shadcn-base-vs-radix.mdx) | Type: Reference | Summary: `components.json` `base` field and API differences

## Agent skill (bundled)

- [`SKILL.md`](./SKILL.md) | Type: Agent | Summary: shadcn/ui workflow, critical rules with links to 015–019 and 012–014
