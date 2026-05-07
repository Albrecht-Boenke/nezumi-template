---
title: shadcn/ui — documentation index
description: Hierarchical index (v4 docs mirror; local `.mdx` under `overview/`, `components/`, `installation/`, etc.)
---

# shadcn/ui documentation

## Project pins (read first)

Project Catalog pins from `pnpm-workspace.yaml` relevant to this doc set:

- `next`: `^16.2.5`
- `react`: `^19.2.6`
- `react-dom`: `^19.2.6`
- `tailwindcss`: `^4.2.4`
- `@tailwindcss/postcss`: `^4.2.4`
- `typescript`: `^6.0.3`

There is no workspace Catalog pin for a `shadcn` package in this repository. Generated shadcn/ui-style code and component dependencies must be checked in the actual app or package files, for example `packages/ui/package.json`. The offline mirror in this directory is reference text from ui.shadcn.com and does not prove the installed project version. For exact resolved versions, verify the lockfile or the active install. If present, the cross-framework stack summary is [`../../FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

**Offline mirror:** Content matches [ui.shadcn.com/docs](https://ui.shadcn.com/docs). The upstream route group **`(root)`** is mirrored as **`overview/`** (paths without parentheses). All pages are `.mdx`.

---

- [01 — Introduction](./overview/index.mdx) | Type: Conceptual | Summary: shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code. | Topics: introduction

    - [02 — shadcn (CLI)](./overview/cli.mdx) | Type: How-to | Summary: Use the shadcn CLI to add components to your project. | Prerequisites: Introduction | Topics: cli

    - [03 — components.json](./overview/components-json.mdx) | Type: Reference | Summary: Configuration for your project. | Prerequisites: Introduction | Topics: components-json, configuration

    - [04 — Theming](./overview/theming.mdx) | Type: Conceptual | Summary: Using CSS variables and theme tokens. | Prerequisites: Introduction | Topics: theming, css-variables

    - [05 — Tailwind v4](./overview/tailwind-v4.mdx) | Type: How-to | Summary: How to use shadcn/ui with Tailwind v4 and React 19. | Prerequisites: Introduction | Topics: tailwind-v4

    - [06 — JavaScript](./overview/javascript.mdx) | Type: How-to | Summary: How to use shadcn/ui with JavaScript | Prerequisites: Introduction | Topics: javascript

    - [07 — Package Imports](./overview/package-imports.mdx) | Type: How-to | Summary: Configure shadcn/ui with package.json imports. | Prerequisites: Introduction | Topics: package-imports

    - [08 — Monorepo](./overview/monorepo.mdx) | Type: How-to | Summary: Using shadcn/ui components and CLI in a monorepo. | Prerequisites: Introduction | Topics: monorepo

    - [09 — Next.js 15 + React 19](./overview/react-19.mdx) | Type: How-to | Summary: Using shadcn/ui with Next.js 15 and React 19. | Prerequisites: Introduction | Topics: react-19, nextjs

    - [10 — MCP Server](./overview/mcp.mdx) | Type: How-to | Summary: Use the shadcn MCP server to browse, search, and install components from registries. | Prerequisites: Introduction | Topics: mcp

    - [11 — Skills](./overview/skills.mdx) | Type: Conceptual | Summary: Give your AI assistant deep knowledge of shadcn/ui components, patterns, and best practices. | Prerequisites: Introduction | Topics: skills, ai

    - [12 — Figma](./overview/figma.mdx) | Type: Conceptual | Summary: Every component recreated in Figma. With customizable props, typography and icons. | Prerequisites: Introduction | Topics: figma

    - [13 — Open in v0](./overview/v0.mdx) | Type: How-to | Summary: Open components in v0 for customization. | Prerequisites: Introduction | Topics: v0

    - [14 — Registry Directory](./overview/directory.mdx) | Type: Reference | Summary: Discover community registries for shadcn/ui components and blocks. | Prerequisites: Introduction | Topics: registry-directory

    - [15 — Legacy Docs](./overview/legacy.mdx) | Type: Conceptual | Summary: View the legacy docs for shadcn/ui and Tailwind v3. | Prerequisites: Introduction | Topics: legacy

    - [16 — Blocks](./overview/_blocks.mdx) | Type: How-to | Summary: Contribute components to the blocks library. | Prerequisites: Introduction | Topics: blocks

    - [17 — Your project is ready!](./overview/new.mdx) | Type: Conceptual | Summary: You've created a new project with shadcn/ui. | Prerequisites: Introduction | Topics: new-project

    - [18 — Installation — Next.js](./installation/next.mdx) | Type: Tutorial | Summary: Install and configure shadcn/ui for Next.js. | Prerequisites: Introduction | Topics: installation, nextjs

    - [19 — Dark Mode](./dark-mode/index.mdx) | Type: How-to | Summary: Adding dark mode to your site. | Prerequisites: Introduction | Topics: dark-mode

        - [20 — Dark Mode — Next.js](./dark-mode/next.mdx) | Type: How-to | Summary: Adding dark mode to your Next.js app. | Prerequisites: Dark Mode | Topics: dark-mode, nextjs

    - [21 — Forms](./forms/index.mdx) | Type: Conceptual | Summary: Build forms with React and shadcn/ui. | Prerequisites: Introduction | Topics: forms

        - [22 — Forms — Next.js](./forms/next.mdx) | Type: How-to | Summary: Build forms in React using useActionState and Server Actions. | Prerequisites: Forms | Topics: forms, nextjs, server-actions

        - [23 — Forms — React Hook Form](./forms/react-hook-form.mdx) | Type: How-to | Summary: Build forms in React using React Hook Form and Zod. | Prerequisites: Forms | Topics: forms, react-hook-form, zod

        - [24 — Forms — TanStack Form](./forms/tanstack-form.mdx) | Type: How-to | Summary: Build forms in React using TanStack Form and Zod. | Prerequisites: Forms | Topics: forms, tanstack-form, zod

    - [25 — Components](./components/index.mdx) | Type: Reference | Summary: Here you can find all the components available in the library. We are working on adding more components. | Prerequisites: Introduction | Topics: components

        - [26 — Accordion](./components/radix/accordion.mdx) | Type: Reference | Summary: A vertically stacked set of interactive headings that each reveal a section of content. | Prerequisites: Components | Topics: components, radix, accordion

        - [27 — Alert](./components/radix/alert.mdx) | Type: Reference | Summary: Displays a callout for user attention. | Prerequisites: Components | Topics: components, radix, alert

        - [28 — Alert Dialog](./components/radix/alert-dialog.mdx) | Type: Reference | Summary: A modal dialog that interrupts the user with important content and expects a response. | Prerequisites: Components | Topics: components, radix, alert-dialog

        - [29 — Aspect Ratio](./components/radix/aspect-ratio.mdx) | Type: Reference | Summary: Displays content within a desired ratio. | Prerequisites: Components | Topics: components, radix, aspect-ratio

        - [30 — Avatar](./components/radix/avatar.mdx) | Type: Reference | Summary: An image element with a fallback for representing the user. | Prerequisites: Components | Topics: components, radix, avatar

        - [31 — Badge](./components/radix/badge.mdx) | Type: Reference | Summary: Displays a badge or a component that looks like a badge. | Prerequisites: Components | Topics: components, radix, badge

        - [32 — Breadcrumb](./components/radix/breadcrumb.mdx) | Type: Reference | Summary: Displays the path to the current resource using a hierarchy of links. | Prerequisites: Components | Topics: components, radix, breadcrumb

        - [33 — Button](./components/radix/button.mdx) | Type: Reference | Summary: Displays a button or a component that looks like a button. | Prerequisites: Components | Topics: components, radix, button

        - [34 — Button Group](./components/radix/button-group.mdx) | Type: Reference | Summary: A container that groups related buttons together with consistent styling. | Prerequisites: Components | Topics: components, radix, button-group

        - [35 — Calendar](./components/radix/calendar.mdx) | Type: Reference | Summary: A calendar component that allows users to select a date or a range of dates. | Prerequisites: Components | Topics: components, radix, calendar

        - [36 — Card](./components/radix/card.mdx) | Type: Reference | Summary: Displays a card with header, content, and footer. | Prerequisites: Components | Topics: components, radix, card

        - [37 — Carousel](./components/radix/carousel.mdx) | Type: Reference | Summary: A carousel with motion and swipe built using Embla. | Prerequisites: Components | Topics: components, radix, carousel

        - [38 — Chart](./components/radix/chart.mdx) | Type: Reference | Summary: Beautiful charts. Built using Recharts. Copy and paste into your apps. | Prerequisites: Components | Topics: components, radix, chart

        - [39 — Checkbox](./components/radix/checkbox.mdx) | Type: Reference | Summary: A control that allows the user to toggle between checked and not checked. | Prerequisites: Components | Topics: components, radix, checkbox

        - [40 — Collapsible](./components/radix/collapsible.mdx) | Type: Reference | Summary: An interactive component which expands/collapses a panel. | Prerequisites: Components | Topics: components, radix, collapsible

        - [41 — Combobox](./components/radix/combobox.mdx) | Type: Reference | Summary: Autocomplete input with a list of suggestions. | Prerequisites: Components | Topics: components, radix, combobox

        - [42 — Command](./components/radix/command.mdx) | Type: Reference | Summary: Command menu for search and quick actions. | Prerequisites: Components | Topics: components, radix, command

        - [43 — Context Menu](./components/radix/context-menu.mdx) | Type: Reference | Summary: Displays a menu of actions triggered by a right click. | Prerequisites: Components | Topics: components, radix, context-menu

        - [44 — Data Table](./components/radix/data-table.mdx) | Type: Reference | Summary: Powerful table and datagrids built using TanStack Table. | Prerequisites: Components | Topics: components, radix, data-table

        - [45 — Date Picker](./components/radix/date-picker.mdx) | Type: Reference | Summary: A date picker component with range and presets. | Prerequisites: Components | Topics: components, radix, date-picker

        - [46 — Dialog](./components/radix/dialog.mdx) | Type: Reference | Summary: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert. | Prerequisites: Components | Topics: components, radix, dialog

        - [47 — Direction](./components/radix/direction.mdx) | Type: Reference | Summary: A provider component that sets the text direction for your application. | Prerequisites: Components | Topics: components, radix, direction

        - [48 — Drawer](./components/radix/drawer.mdx) | Type: Reference | Summary: A drawer component for React. | Prerequisites: Components | Topics: components, radix, drawer

        - [49 — Dropdown Menu](./components/radix/dropdown-menu.mdx) | Type: Reference | Summary: Displays a menu to the user — such as a set of actions or functions — triggered by a button. | Prerequisites: Components | Topics: components, radix, dropdown-menu

        - [50 — Empty](./components/radix/empty.mdx) | Type: Reference | Summary: Use the Empty component to display an empty state. | Prerequisites: Components | Topics: components, radix, empty

        - [51 — Field](./components/radix/field.mdx) | Type: Reference | Summary: Combine labels, controls, and help text to compose accessible form fields and grouped inputs. | Prerequisites: Components | Topics: components, radix, field

        - [52 — Hover Card](./components/radix/hover-card.mdx) | Type: Reference | Summary: For sighted users to preview content available behind a link. | Prerequisites: Components | Topics: components, radix, hover-card

        - [53 — Input](./components/radix/input.mdx) | Type: Reference | Summary: A text input component for forms and user data entry with built-in styling and accessibility features. | Prerequisites: Components | Topics: components, radix, input

        - [54 — Input Group](./components/radix/input-group.mdx) | Type: Reference | Summary: Add addons, buttons, and helper content to inputs. | Prerequisites: Components | Topics: components, radix, input-group

        - [55 — Input OTP](./components/radix/input-otp.mdx) | Type: Reference | Summary: Accessible one-time password component with copy-paste functionality. | Prerequisites: Components | Topics: components, radix, input-otp

        - [56 — Item](./components/radix/item.mdx) | Type: Reference | Summary: A versatile component for displaying content with media, title, description, and actions. | Prerequisites: Components | Topics: components, radix, item

        - [57 — Kbd](./components/radix/kbd.mdx) | Type: Reference | Summary: Used to display textual user input from keyboard. | Prerequisites: Components | Topics: components, radix, kbd

        - [58 — Label](./components/radix/label.mdx) | Type: Reference | Summary: Renders an accessible label associated with controls. | Prerequisites: Components | Topics: components, radix, label

        - [59 — Menubar](./components/radix/menubar.mdx) | Type: Reference | Summary: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands. | Prerequisites: Components | Topics: components, radix, menubar

        - [60 — Native Select](./components/radix/native-select.mdx) | Type: Reference | Summary: A styled native HTML select element with consistent design system integration. | Prerequisites: Components | Topics: components, radix, native-select

        - [61 — Navigation Menu](./components/radix/navigation-menu.mdx) | Type: Reference | Summary: A collection of links for navigating websites. | Prerequisites: Components | Topics: components, radix, navigation-menu

        - [62 — Pagination](./components/radix/pagination.mdx) | Type: Reference | Summary: Pagination with page navigation, next and previous links. | Prerequisites: Components | Topics: components, radix, pagination

        - [63 — Popover](./components/radix/popover.mdx) | Type: Reference | Summary: Displays rich content in a portal, triggered by a button. | Prerequisites: Components | Topics: components, radix, popover

        - [64 — Progress](./components/radix/progress.mdx) | Type: Reference | Summary: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar. | Prerequisites: Components | Topics: components, radix, progress

        - [65 — Radio Group](./components/radix/radio-group.mdx) | Type: Reference | Summary: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time. | Prerequisites: Components | Topics: components, radix, radio-group

        - [66 — Resizable](./components/radix/resizable.mdx) | Type: Reference | Summary: Accessible resizable panel groups and layouts with keyboard support. | Prerequisites: Components | Topics: components, radix, resizable

        - [67 — Scroll Area](./components/radix/scroll-area.mdx) | Type: Reference | Summary: Augments native scroll functionality for custom, cross-browser styling. | Prerequisites: Components | Topics: components, radix, scroll-area

        - [68 — Select](./components/radix/select.mdx) | Type: Reference | Summary: Displays a list of options for the user to pick from—triggered by a button. | Prerequisites: Components | Topics: components, radix, select

        - [69 — Separator](./components/radix/separator.mdx) | Type: Reference | Summary: Visually or semantically separates content. | Prerequisites: Components | Topics: components, radix, separator

        - [70 — Sheet](./components/radix/sheet.mdx) | Type: Reference | Summary: Extends the Dialog component to display content that complements the main content of the screen. | Prerequisites: Components | Topics: components, radix, sheet

        - [71 — Sidebar](./components/radix/sidebar.mdx) | Type: Reference | Summary: A composable, themeable and customizable sidebar component. | Prerequisites: Components | Topics: components, radix, sidebar

        - [72 — Skeleton](./components/radix/skeleton.mdx) | Type: Reference | Summary: Use to show a placeholder while content is loading. | Prerequisites: Components | Topics: components, radix, skeleton

        - [73 — Slider](./components/radix/slider.mdx) | Type: Reference | Summary: An input where the user selects a value from within a given range. | Prerequisites: Components | Topics: components, radix, slider

        - [74 — Sonner](./components/radix/sonner.mdx) | Type: Reference | Summary: An opinionated toast component for React. | Prerequisites: Components | Topics: components, radix, sonner

        - [75 — Spinner](./components/radix/spinner.mdx) | Type: Reference | Summary: An indicator that can be used to show a loading state. | Prerequisites: Components | Topics: components, radix, spinner

        - [76 — Switch](./components/radix/switch.mdx) | Type: Reference | Summary: A control that allows the user to toggle between checked and not checked. | Prerequisites: Components | Topics: components, radix, switch

        - [77 — Table](./components/radix/table.mdx) | Type: Reference | Summary: A responsive table component. | Prerequisites: Components | Topics: components, radix, table

        - [78 — Tabs](./components/radix/tabs.mdx) | Type: Reference | Summary: A set of layered sections of content—known as tab panels—that are displayed one at a time. | Prerequisites: Components | Topics: components, radix, tabs

        - [79 — Textarea](./components/radix/textarea.mdx) | Type: Reference | Summary: Displays a form textarea or a component that looks like a textarea. | Prerequisites: Components | Topics: components, radix, textarea

        - [80 — Toast](./components/radix/toast.mdx) | Type: Reference | Summary: A succinct message that is displayed temporarily. | Prerequisites: Components | Topics: components, radix, toast

        - [81 — Toggle](./components/radix/toggle.mdx) | Type: Reference | Summary: A two-state button that can be either on or off. | Prerequisites: Components | Topics: components, radix, toggle

        - [82 — Toggle Group](./components/radix/toggle-group.mdx) | Type: Reference | Summary: A set of two-state buttons that can be toggled on or off. | Prerequisites: Components | Topics: components, radix, toggle-group

        - [83 — Tooltip](./components/radix/tooltip.mdx) | Type: Reference | Summary: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. | Prerequisites: Components | Topics: components, radix, tooltip

        - [84 — Typography](./components/radix/typography.mdx) | Type: Reference | Summary: Styles for headings, paragraphs, lists, etc. | Prerequisites: Components | Topics: components, radix, typography

    - [85 — Registry — Introduction](./registry/index.mdx) | Type: Conceptual | Summary: Run your own code registry. | Prerequisites: Introduction | Topics: registry

        - [86 — Getting Started](./registry/getting-started.mdx) | Type: Tutorial | Summary: Learn how to get setup and run your own component registry. | Prerequisites: Registry — Introduction | Topics: registry, getting-started

        - [87 — registry.json](./registry/registry-json.mdx) | Type: Reference | Summary: Schema for running your own component registry. | Prerequisites: Registry — Introduction | Topics: registry, registry-json

        - [88 — registry-item.json](./registry/registry-item-json.mdx) | Type: Reference | Summary: Specification for registry items. | Prerequisites: Registry — Introduction | Topics: registry, registry-item

        - [89 — Examples](./registry/examples.mdx) | Type: Reference | Summary: Examples of registry items: styles, components, css vars, etc. | Prerequisites: Registry — Introduction | Topics: registry, examples

        - [90 — Authentication](./registry/authentication.mdx) | Type: How-to | Summary: Secure your registry with authentication for private and personalized components. | Prerequisites: Registry — Introduction | Topics: registry, authentication

        - [91 — Namespaces](./registry/namespace.mdx) | Type: How-to | Summary: Configure and use multiple resource registries with namespace support. | Prerequisites: Registry — Introduction | Topics: registry, namespaces

        - [92 — MCP Server](./registry/mcp.mdx) | Type: Reference | Summary: MCP support for registry developers | Prerequisites: Registry — Introduction | Topics: registry, mcp

        - [93 — Open in v0](./registry/open-in-v0.mdx) | Type: How-to | Summary: Integrate your registry with Open in v0. | Prerequisites: Registry — Introduction | Topics: registry, v0

        - [94 — Add a Registry](./registry/registry-index.mdx) | Type: How-to | Summary: Open Source Registry Index | Prerequisites: Registry — Introduction | Topics: registry, registry-index

        - [95 — FAQ](./registry/faq.mdx) | Type: Reference | Summary: Frequently asked questions about running a registry. | Prerequisites: Registry — Introduction | Topics: registry, faq

    - [96 — Changelog](./changelog/index.mdx) | Type: Conceptual | Summary: Latest updates and announcements. | Prerequisites: Introduction | Topics: changelog

        - [97 — June 2023 - New CLI, Styles and more](./changelog/2023-06-new-cli.mdx) | Type: Conceptual | Summary: June 2023 - New CLI, Styles and more | Prerequisites: Changelog | Topics: changelog

        - [98 — July 2023 - JavaScript](./changelog/2023-07-javascript.mdx) | Type: Conceptual | Summary: July 2023 - JavaScript | Prerequisites: Changelog | Topics: changelog

        - [99 — December 2023 - New Components](./changelog/2023-12-new-components.mdx) | Type: Conceptual | Summary: December 2023 - New Components | Prerequisites: Changelog | Topics: changelog

        - [100 — March 2024 - Introducing Blocks](./changelog/2024-03-blocks.mdx) | Type: Conceptual | Summary: March 2024 - Introducing Blocks | Prerequisites: Changelog | Topics: changelog

        - [101 — March 2024 - Breadcrumb and Input OTP](./changelog/2024-03-breadcrumb-otp.mdx) | Type: Conceptual | Summary: March 2024 - Breadcrumb and Input OTP | Prerequisites: Changelog | Topics: changelog

        - [102 — April 2024 - Lift Mode](./changelog/2024-04-lift-mode.mdx) | Type: Conceptual | Summary: April 2024 - Lift Mode | Prerequisites: Changelog | Topics: changelog

        - [103 — August 2024 - npx shadcn init](./changelog/2024-08-npx-shadcn-init.mdx) | Type: Conceptual | Summary: August 2024 - npx shadcn init | Prerequisites: Changelog | Topics: changelog

        - [104 — October 2024 - React 19](./changelog/2024-10-react-19.mdx) | Type: Conceptual | Summary: October 2024 - React 19 | Prerequisites: Changelog | Topics: changelog

        - [105 — October 2024 - Sidebar](./changelog/2024-10-sidebar.mdx) | Type: Conceptual | Summary: October 2024 - Sidebar | Prerequisites: Changelog | Topics: changelog

        - [106 — November 2024 - Icons](./changelog/2024-11-icons.mdx) | Type: Conceptual | Summary: November 2024 - Icons | Prerequisites: Changelog | Topics: changelog

        - [107 — December 2024 - Monorepo Support](./changelog/2024-12-monorepo.mdx) | Type: Conceptual | Summary: December 2024 - Monorepo Support | Prerequisites: Changelog | Topics: changelog

        - [108 — January 2025 - Blocks Community](./changelog/2025-01-blocks.mdx) | Type: Conceptual | Summary: January 2025 - Blocks Community | Prerequisites: Changelog | Topics: changelog

        - [109 — February 2025 - Updated Registry Schema](./changelog/2025-02-registry-schema.mdx) | Type: Conceptual | Summary: February 2025 - Updated Registry Schema | Prerequisites: Changelog | Topics: changelog

        - [110 — February 2025 - Tailwind v4](./changelog/2025-02-tailwind-v4.mdx) | Type: Conceptual | Summary: February 2025 - Tailwind v4 | Prerequisites: Changelog | Topics: changelog

        - [111 — April 2025 - Cross-framework Route Support](./changelog/2025-04-cross-framework.mdx) | Type: Conceptual | Summary: April 2025 - Cross-framework Route Support | Prerequisites: Changelog | Topics: changelog

        - [112 — April 2025 - MCP](./changelog/2025-04-mcp.mdx) | Type: Conceptual | Summary: April 2025 - MCP | Prerequisites: Changelog | Topics: changelog

        - [113 — April 2025 - shadcn 2.5.0](./changelog/2025-04-shadcn-2-5.mdx) | Type: Conceptual | Summary: April 2025 - shadcn 2.5.0 | Prerequisites: Changelog | Topics: changelog

        - [114 — May 2025 - New Site](./changelog/2025-05-new-site.mdx) | Type: Conceptual | Summary: May 2025 - New Site | Prerequisites: Changelog | Topics: changelog

        - [115 — June 2025 - Calendar Component](./changelog/2025-06-calendar.mdx) | Type: Conceptual | Summary: June 2025 - Calendar Component | Prerequisites: Changelog | Topics: changelog

        - [116 — June 2025 - radix-ui Migration](./changelog/2025-06-radix-ui.mdx) | Type: Conceptual | Summary: June 2025 - radix-ui Migration | Prerequisites: Changelog | Topics: changelog

        - [117 — July 2025 - Local File Support](./changelog/2025-07-local-file-support.mdx) | Type: Conceptual | Summary: July 2025 - Local File Support | Prerequisites: Changelog | Topics: changelog

        - [118 — July 2025 - Universal Registry Items](./changelog/2025-07-universal-registry.mdx) | Type: Conceptual | Summary: July 2025 - Universal Registry Items | Prerequisites: Changelog | Topics: changelog

        - [119 — August 2025 - shadcn CLI 3.0 and MCP Server](./changelog/2025-08-cli-3-mcp.mdx) | Type: Conceptual | Summary: August 2025 - shadcn CLI 3.0 and MCP Server | Prerequisites: Changelog | Topics: changelog

        - [120 — September 2025 - Registry Index](./changelog/2025-09-registry-index.mdx) | Type: Conceptual | Summary: September 2025 - Registry Index | Prerequisites: Changelog | Topics: changelog

        - [121 — October 2025 - New Components](./changelog/2025-10-new-components.mdx) | Type: Conceptual | Summary: October 2025 - New Components | Prerequisites: Changelog | Topics: changelog

        - [122 — October 2025 - Registry Directory](./changelog/2025-10-registry-directory.mdx) | Type: Conceptual | Summary: October 2025 - Registry Directory | Prerequisites: Changelog | Topics: changelog

        - [123 — December 2025 - npx shadcn create](./changelog/2025-12-shadcn-create.mdx) | Type: Conceptual | Summary: December 2025 - npx shadcn create | Prerequisites: Changelog | Topics: changelog

        - [124 — January 2026 - Base UI Documentation](./changelog/2026-01-base-ui.mdx) | Type: Conceptual | Summary: January 2026 - Base UI Documentation | Prerequisites: Changelog | Topics: changelog

        - [125 — January 2026 - Inline Start and End Styles](./changelog/2026-01-inline-side-styles.mdx) | Type: Conceptual | Summary: January 2026 - Inline Start and End Styles | Prerequisites: Changelog | Topics: changelog

        - [126 — January 2026 - RTL Support](./changelog/2026-01-rtl.mdx) | Type: Conceptual | Summary: January 2026 - RTL Support | Prerequisites: Changelog | Topics: changelog

        - [127 — February 2026 - Blocks for Radix and Base UI](./changelog/2026-02-blocks.mdx) | Type: Conceptual | Summary: February 2026 - Blocks for Radix and Base UI | Prerequisites: Changelog | Topics: changelog

        - [128 — February 2026 - Unified Radix UI Package](./changelog/2026-02-radix-ui.mdx) | Type: Conceptual | Summary: February 2026 - Unified Radix UI Package | Prerequisites: Changelog | Topics: changelog

        - [129 — March 2026 - shadcn/cli v4](./changelog/2026-03-cli-v4.mdx) | Type: Conceptual | Summary: March 2026 - shadcn/cli v4 | Prerequisites: Changelog | Topics: changelog

        - [130 — March 2026 - Introducing Luma](./changelog/2026-03-luma.mdx) | Type: Conceptual | Summary: March 2026 - Introducing Luma | Prerequisites: Changelog | Topics: changelog

        - [131 — April 2026 - Component Composition](./changelog/2026-04-component-composition.mdx) | Type: Conceptual | Summary: April 2026 - Component Composition | Prerequisites: Changelog | Topics: changelog

        - [132 — April 2026 - Partial Preset Apply](./changelog/2026-04-partial-preset-apply.mdx) | Type: Conceptual | Summary: April 2026 - Partial Preset Apply | Prerequisites: Changelog | Topics: changelog

        - [133 — April 2026 - shadcn preset](./changelog/2026-04-preset-commands.mdx) | Type: Conceptual | Summary: April 2026 - shadcn preset | Prerequisites: Changelog | Topics: changelog

        - [134 — April 2026 - Pointer Cursor](./changelog/2026-04-pointer-cursor.mdx) | Type: Conceptual | Summary: April 2026 - Pointer Cursor | Prerequisites: Changelog | Topics: changelog

        - [135 — April 2026 - Introducing Sera](./changelog/2026-04-sera.mdx) | Type: Conceptual | Summary: April 2026 - Introducing Sera | Prerequisites: Changelog | Topics: changelog

        - [136 — April 2026 - shadcn apply](./changelog/2026-04-shadcn-apply.mdx) | Type: Conceptual | Summary: April 2026 - shadcn apply | Prerequisites: Changelog | Topics: changelog

        - [137 — May 2026 - Package Imports and Target Aliases](./changelog/2026-05-package-imports-target-aliases.mdx) | Type: Conceptual | Summary: May 2026 - Package Imports and Target Aliases | Prerequisites: Changelog | Topics: changelog
