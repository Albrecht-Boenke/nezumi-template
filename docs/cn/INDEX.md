---
title: Class merging (`cn`) — documentation index
description: Offline mirror: flat files `NNN-slug.mdx`; clsx + tailwind-merge; see “Agent retrieval”.
---

# Class merging (`cn`) documentation

Offline mirror: flat files `NNN-kebab-slug.mdx` in this directory (`NNN` is three digits). Use with [`tailwind-merge`](https://www.npmjs.com/package/tailwind-merge) / [`clsx`](https://www.npmjs.com/package/clsx) versions pinned in your app (see root `package.json` / lockfile).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation
- Quick orientation for contributors
- Finding the right mirror page during development

It is not intended to replace individual docs.

## Agent retrieval

Use this file as the **single navigation root**. All pages are **flat** `NNN-*.mdx` next to `INDEX.md` (no subfolders).

| Need | Where to look |
|------|----------------|
| `clsx` API, modes, Tailwind IntelliSense regex | **clsx** → [001](./001-clsx-readme.mdx) |
| tailwind-merge overview & doc sequence | [002](./002-tailwind-merge-readme.mdx) |
| Motivation (“why merge”) | [003](./003-tailwind-merge-what-is-it-for.mdx) |
| When / when not to use, `twJoin` vs `twMerge` | [004](./004-tailwind-merge-when-and-how-to-use-it.mdx) |
| Merge rules, performance, caching | [005](./005-tailwind-merge-features.mdx) |
| Limits, ambiguous arbitrary values, `@apply` caveats | [006](./006-tailwind-merge-limitations.mdx) |
| Install, theme extension, `extendTailwindMerge` | [007](./007-tailwind-merge-configuration.mdx) |
| Recipes (custom scales, wrapping `twMerge`) | [008](./008-tailwind-merge-recipes.mdx) |
| Full export reference (`twMerge`, validators, …) | [009](./009-tailwind-merge-api-reference.mdx) |
| Writing plugins | [010](./010-tailwind-merge-writing-plugins.mdx) |
| Versioning / SemVer | [011](./011-tailwind-merge-versioning.mdx) |
| Contributing (upstream pointer) | [012](./012-tailwind-merge-contributing.mdx) |
| Similar packages | [013](./013-tailwind-merge-similar-packages.mdx) |

**Rules:** The numeric prefix `NNN` is a stable slot (001–013), not a reading order. Prefer the **Summary** on each index line. Cross-links inside MDX files point to these numbered neighbors.

---

## clsx

- [001 — clsx README](./001-clsx-readme.mdx) | Type: Reference | Summary: Tiny `className` constructor; API, `clsx/lite`, Tailwind VS Code regex

## tailwind-merge — introduction & usage

- [002 — tailwind-merge README](./002-tailwind-merge-readme.mdx) | Type: Overview | Summary: Entry point and links to all tailwind-merge topics
- [003 — What is it for](./003-tailwind-merge-what-is-it-for.mdx) | Type: Conceptual | Summary: Component override problem and how `twMerge` fixes cascade conflicts
- [004 — When and how to use it](./004-tailwind-merge-when-and-how-to-use-it.mdx) | Type: Conceptual | Summary: Trade-offs, `twJoin` vs `twMerge`, alternatives (`!`, variants, props)
- [005 — Features](./005-tailwind-merge-features.mdx) | Type: Reference | Summary: Conflict rules, arbitrary values, composition, LRU cache
- [006 — Limitations](./006-tailwind-merge-limitations.mdx) | Type: Reference | Summary: Look-alike classes, labels for arbitrary values, arbitrary properties vs utilities

## tailwind-merge — configuration & recipes

- [007 — Configuration](./007-tailwind-merge-configuration.mdx) | Type: Reference | Summary: Custom Tailwind theme in merge config, class groups, plugins hook
- [008 — Recipes](./008-tailwind-merge-recipes.mdx) | Type: Guide | Summary: Custom theme scales, avoiding `@apply` with merge, wrapping inputs

## tailwind-merge — API & ecosystem

- [009 — API reference](./009-tailwind-merge-api-reference.mdx) | Type: Reference | Summary: All exports (`twMerge`, `extendTailwindMerge`, `validators`, types)
- [010 — Writing plugins](./010-tailwind-merge-writing-plugins.mdx) | Type: Guide | Summary: Plugin package shape and `mergeConfigs` pattern
- [011 — Versioning](./011-tailwind-merge-versioning.mdx) | Type: Conceptual | Summary: SemVer and release channels
- [012 — Contributing](./012-tailwind-merge-contributing.mdx) | Type: Meta | Summary: Pointer to upstream contributing doc
- [013 — Similar packages](./013-tailwind-merge-similar-packages.mdx) | Type: Reference | Summary: Alternative implementations in JS and other languages

## Upstream sources

| Package | Repository |
|---------|------------|
| clsx | [github.com/lukeed/clsx](https://github.com/lukeed/clsx) |
| tailwind-merge | [github.com/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge) |

## Files in this directory

| File | Note |
|------|------|
| `INDEX.md` | This navigation file |
| `NNN-*.mdx` | Mirror pages (numbering in sections above) |
