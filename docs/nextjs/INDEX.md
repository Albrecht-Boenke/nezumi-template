---
title: Next.js — documentation index
description: Handbook mirror; flat numbered `NNN-*.mdx` files; see "Agent retrieval".
---

# Next.js documentation

## Project pins (read first)

Project Catalog pins from `pnpm-workspace.yaml`:

- `next`: `^16.2.5`
- `react`: `^19.2.6`
- `react-dom`: `^19.2.6`
- `typescript`: `^6.0.3`
- `tailwindcss`: `^4.2.4`
- `@tailwindcss/postcss`: `^4.2.4`

These are the workspace Catalog ranges used by packages that declare `catalog:`. The offline mirror in this directory is reference text from nextjs.org and does not prove the installed project version. For an exact resolved version, verify the lockfile or the active install. If present, the cross-framework stack summary is [`../../FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

Offline mirror: flat files `NNN-slug.mdx` in this directory (`NNN` is three digits).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

## Agent retrieval

Use this file as the **single navigation root**. Do **not** assume nested `01-app/` tree paths; all pages are **flat** `NNN-kebab-slug.mdx` next to `INDEX.md`.

| Need | Where to look |
|------|----------------|
| App Router (routing, RSC, metadata, config) | Sections **App Router** in this index |
| Pages Router (legacy) | Sections **Pages Router** |
| Compiler / Turbopack / bundling | **Architecture** and App/Pages API reference topics |
| Community / contributing | **Community** |

**Rules:** The numeric prefix `NNN` is a stable slot (001–999), not a topic priority. Prefer the **Summary** on each index line to pick the right file. Slug segments mirror the former upstream path under `docs/` (e.g. `01-app-03-api-reference-…`). When in doubt, open the linked `mdx` by **number from this index**, not from guessed nested paths.

**MDX note:** Pages may contain Next.js–specific MDX features; the source text remains the primary offline mirror.

Original site: [nextjs.org/docs](https://nextjs.org/docs) · Upstream source: [vercel/next.js `docs`](https://github.com/vercel/next.js/tree/canary/docs).

## Handbook root

- [426 — Next.js Docs](./426-index.mdx) | Type: Conceptual | Summary: Welcome to the Next.js Documentation.

## App Router — Overview

- [257 — App Router](./257-01-app-index.mdx) | Type: Conceptual | Summary: The App Router is a file-system based router that uses React's latest features such as Server Components, Suspense, Server Functions, and more.

## App Router — Getting started

- [001 — Installation](./001-01-app-01-getting-started-01-installation.mdx) | Type: Tutorial | Summary: Learn how to create a new Next.js application with the `create-next-app` CLI, and set up TypeScript, ESLint, and Module Path Aliases.
- [002 — Project structure and organization](./002-01-app-01-getting-started-02-project-structure.mdx) | Type: Tutorial | Summary: Learn the folder and file conventions in Next.js, and how to organize your project.
- [003 — Layouts and Pages](./003-01-app-01-getting-started-03-layouts-and-pages.mdx) | Type: Tutorial | Summary: Learn how to create your first pages and layouts, and link between them with the Link component.
- [004 — Linking and Navigating](./004-01-app-01-getting-started-04-linking-and-navigating.mdx) | Type: Tutorial | Summary: Learn how the built-in navigation optimizations work, including prefetching, prerendering, and client-side navigation, and how to optimize navigation for dynamic routes and slow networks.
- [005 — Server and Client Components](./005-01-app-01-getting-started-05-server-and-client-components.mdx) | Type: Tutorial | Summary: Learn how you can use React Server and Client Components to render parts of your application on the server or the client.
- [006 — Fetching Data](./006-01-app-01-getting-started-06-fetching-data.mdx) | Type: Tutorial | Summary: Learn how to fetch data and stream content that depends on data.
- [007 — Mutating Data](./007-01-app-01-getting-started-07-mutating-data.mdx) | Type: Tutorial | Summary: Learn how to mutate data using Server Functions and Server Actions in Next.js.
- [008 — Caching](./008-01-app-01-getting-started-08-caching.mdx) | Type: Tutorial | Summary: Learn how to cache data and UI in Next.js
- [009 — Revalidating](./009-01-app-01-getting-started-09-revalidating.mdx) | Type: Tutorial | Summary: Learn how to revalidate cached data using time-based and on-demand strategies.
- [010 — Error Handling](./010-01-app-01-getting-started-10-error-handling.mdx) | Type: Tutorial | Summary: Learn how to display expected errors and handle uncaught exceptions.
- [011 — CSS](./011-01-app-01-getting-started-11-css.mdx) | Type: Tutorial | Summary: Learn about the different ways to add CSS to your application, including Tailwind CSS, CSS Modules, Global CSS, and more.
- [012 — Image Optimization](./012-01-app-01-getting-started-12-images.mdx) | Type: Tutorial | Summary: Learn how to optimize images in Next.js
- [013 — Font Optimization](./013-01-app-01-getting-started-13-fonts.mdx) | Type: Tutorial | Summary: Learn how to optimize fonts in Next.js
- [014 — Metadata and OG images](./014-01-app-01-getting-started-14-metadata-and-og-images.mdx) | Type: Tutorial | Summary: Learn how to add metadata to your pages and create dynamic OG images.
- [015 — Route Handlers](./015-01-app-01-getting-started-15-route-handlers.mdx) | Type: Tutorial | Summary: Learn how to use Route Handlers
- [016 — Proxy](./016-01-app-01-getting-started-16-proxy.mdx) | Type: Tutorial | Summary: Learn how to use Proxy
- [017 — Deploying](./017-01-app-01-getting-started-17-deploying.mdx) | Type: Tutorial | Summary: Learn how to deploy your Next.js application.
- [018 — Upgrading](./018-01-app-01-getting-started-18-upgrading.mdx) | Type: Tutorial | Summary: Learn how to upgrade your Next.js application to the latest version or canary.
- [019 — Getting Started](./019-01-app-01-getting-started-index.mdx) | Type: Tutorial | Summary: Learn how to create full-stack web applications with the Next.js App Router.

## App Router — Guides

- [020 — How to set up your Next.js project for AI coding agents](./020-01-app-02-guides-ai-agents.mdx) | Type: Tutorial | Summary: Learn how to configure your Next.js project so AI coding agents use up-to-date documentation instead of outdated training data.
- [021 — How to add analytics to your Next.js application](./021-01-app-02-guides-analytics.mdx) | Type: Tutorial | Summary: Measure and track page performance using Next.js Speed Insights
- [022 — How to implement authentication in Next.js](./022-01-app-02-guides-authentication.mdx) | Type: Tutorial | Summary: Learn how to implement authentication in your Next.js application.
- [023 — How to use Next.js as a backend for your frontend](./023-01-app-02-guides-backend-for-frontend.mdx) | Type: Tutorial | Summary: Learn how to use Next.js as a backend framework
- [024 — Caching and Revalidating (Previous Model)](./024-01-app-02-guides-caching-without-cache-components.mdx) | Type: Tutorial | Summary: Learn how to cache and revalidate data using fetch options, unstable_cache, and route segment configs for projects not using Cache Components.
- [025 — Using a CDN with Next.js](./025-01-app-02-guides-cdn-caching.mdx) | Type: Tutorial | Summary: Learn how CDN caching works with Next.js, including what works today, cache variability, and the direction toward pathname-based cache keying.
- [026 — How to configure Continuous Integration (CI) build caching](./026-01-app-02-guides-ci-build-caching.mdx) | Type: Tutorial | Summary: Learn how to configure CI to cache Next.js builds
- [027 — How to set a Content Security Policy (CSP) for your Next.js application](./027-01-app-02-guides-content-security-policy.mdx) | Type: Tutorial | Summary: Learn how to set a Content Security Policy (CSP) for your Next.js application.
- [028 — How to use CSS-in-JS libraries](./028-01-app-02-guides-css-in-js.mdx) | Type: Tutorial | Summary: Use CSS-in-JS libraries with Next.js
- [029 — How to set up a custom server in Next.js](./029-01-app-02-guides-custom-server.mdx) | Type: Tutorial | Summary: Start a Next.js app programmatically using a custom server.
- [030 — How to think about data security in Next.js](./030-01-app-02-guides-data-security.mdx) | Type: Tutorial | Summary: Learn the built-in data security features in Next.js and learn best practices for protecting your application's data.
- [031 — How to use debugging tools with Next.js](./031-01-app-02-guides-debugging.mdx) | Type: Tutorial | Summary: Learn how to debug your Next.js application with VS Code, Chrome DevTools, or Firefox DevTools.
- [032 — Deploying Next.js to different platforms](./032-01-app-02-guides-deploying-to-platforms.mdx) | Type: Tutorial | Summary: Understand which Next.js features require specific platform capabilities and how to choose the right deployment target.
- [033 — How to preview content with Draft Mode in Next.js](./033-01-app-02-guides-draft-mode.mdx) | Type: Tutorial | Summary: Next.js has draft mode to toggle between static and dynamic pages. You can learn how it works with App Router here.
- [034 — How to use environment variables in Next.js](./034-01-app-02-guides-environment-variables.mdx) | Type: Tutorial | Summary: Learn to add and access environment variables in your Next.js application.
- [035 — How to create forms with Server Actions](./035-01-app-02-guides-forms.mdx) | Type: Tutorial | Summary: Learn how to create forms in Next.js with React Server Actions.
- [036 — How revalidation works in Next.js](./036-01-app-02-guides-how-revalidation-works.mdx) | Type: Tutorial | Summary: A deep dive into how Next.js revalidates cached content, including the tag system, cache consistency, and multi-instance coordination.
- [037 — How to implement Incremental Static Regeneration (ISR)](./037-01-app-02-guides-incremental-static-regeneration.mdx) | Type: Tutorial | Summary: Learn how to create or update static pages at runtime with Incremental Static Regeneration.
- [038 — Guides](./038-01-app-02-guides-index.mdx) | Type: Tutorial | Summary: Learn how to implement common patterns and real-world use cases using Next.js
- [039 — Ensuring instant navigations](./039-01-app-02-guides-instant-navigation.mdx) | Type: Tutorial | Summary: Learn how to structure your app to prefetch and prerender more content, providing instant page loads and client navigations.
- [040 — How to set up instrumentation](./040-01-app-02-guides-instrumentation.mdx) | Type: Tutorial | Summary: Learn how to use instrumentation to run code at server startup in your Next.js app
- [041 — Internationalization](./041-01-app-02-guides-internationalization.mdx) | Type: Tutorial | Summary: Add support for multiple languages with internationalized routing and localized content.
- [042 — How to implement JSON-LD in your Next.js application](./042-01-app-02-guides-json-ld.mdx) | Type: Tutorial | Summary: Learn how to add JSON-LD to your Next.js application to describe your content to search engines and AI.
- [043 — How to lazy load Client Components and libraries](./043-01-app-02-guides-lazy-loading.mdx) | Type: Tutorial | Summary: Lazy load imported libraries and React Components to improve your application's loading performance.
- [044 — How to optimize your local development environment](./044-01-app-02-guides-local-development.mdx) | Type: Tutorial | Summary: Learn how to optimize your local development environment with Next.js.
- [045 — Enabling Next.js MCP Server for Coding Agents](./045-01-app-02-guides-mcp.mdx) | Type: Tutorial | Summary: Learn how to use Next.js MCP support to allow coding agents access to your application state
- [046 — How to use markdown and MDX in Next.js](./046-01-app-02-guides-mdx.mdx) | Type: Tutorial | Summary: Learn how to configure MDX and use it in your Next.js apps.
- [047 — How to optimize memory usage](./047-01-app-02-guides-memory-usage.mdx) | Type: Tutorial | Summary: Optimize memory used by your application in development and production.
- [048 — Migrating to Cache Components](./048-01-app-02-guides-migrating-to-cache-components.mdx) | Type: Tutorial | Summary: Learn how to migrate from route segment configs to Cache Components in Next.js.
- [049 — How to migrate from Pages to the App Router](./049-01-app-02-guides-migrating-app-router-migration.mdx) | Type: Tutorial | Summary: Learn how to upgrade your existing Next.js application from the Pages Router to the App Router.
- [050 — How to migrate from Create React App to Next.js](./050-01-app-02-guides-migrating-from-create-react-app.mdx) | Type: Tutorial | Summary: Learn how to migrate your existing React application from Create React App to Next.js.
- [051 — How to migrate from Vite to Next.js](./051-01-app-02-guides-migrating-from-vite.mdx) | Type: Tutorial | Summary: Learn how to migrate your existing React application from Vite to Next.js.
- [052 — Migrating](./052-01-app-02-guides-migrating-index.mdx) | Type: Tutorial | Summary: Learn how to migrate from popular frameworks to Next.js
- [053 — How to build multi-tenant apps in Next.js](./053-01-app-02-guides-multi-tenant.mdx) | Type: Tutorial | Summary: Learn how to build multi-tenant apps with the App Router.
- [054 — How to build micro-frontends using multi-zones and Next.js](./054-01-app-02-guides-multi-zones.mdx) | Type: Tutorial | Summary: Learn how to build micro-frontends using Next.js Multi-Zones to deploy multiple Next.js apps under a single domain.
- [055 — How to set up instrumentation with OpenTelemetry](./055-01-app-02-guides-open-telemetry.mdx) | Type: Tutorial | Summary: Learn how to instrument your Next.js app with OpenTelemetry.
- [056 — Optimizing package bundling](./056-01-app-02-guides-package-bundling.mdx) | Type: Tutorial | Summary: Learn how to analyze and optimize your application's server and client bundles with the Next.js Bundle Analyzer for Turbopack, and the `@next/bundle-analyzer` plugin for Webpack.
- [057 — Implementing Partial Prerendering on your platform](./057-01-app-02-guides-ppr-platform-guide.mdx) | Type: Tutorial | Summary: A guide for platform engineers on implementing PPR support, from basic origin rendering to optimized CDN integration.
- [058 — Prefetching](./058-01-app-02-guides-prefetching.mdx) | Type: Tutorial | Summary: Learn how to configure prefetching in Next.js
- [059 — How Next.js preserves UI state with Activity](./059-01-app-02-guides-preserving-ui-state.mdx) | Type: Tutorial | Summary: Learn how React's Activity component preserves UI state across navigations in Next.js and how to control what resets.
- [060 — How to prevent flash before hydration](./060-01-app-02-guides-preventing-flash-before-hydration.mdx) | Type: Tutorial | Summary: Learn how to correct server-rendered content before the browser paints, avoiding visible flash when the page hydrates.
- [061 — How to optimize your Next.js application for production](./061-01-app-02-guides-production-checklist.mdx) | Type: Tutorial | Summary: Recommendations to ensure the best performance and user experience before taking your Next.js application to production.
- [062 — How to build a Progressive Web Application (PWA) with Next.js](./062-01-app-02-guides-progressive-web-apps.mdx) | Type: Tutorial | Summary: Learn how to build a Progressive Web Application (PWA) with Next.js.
- [063 — Building public pages](./063-01-app-02-guides-public-static-pages.mdx) | Type: Tutorial | Summary: Learn how to build public, "static" pages that share data across users, such as landing pages, list pages (products, blogs, etc.), marketing and news sites.
- [064 — How to handle redirects in Next.js](./064-01-app-02-guides-redirecting.mdx) | Type: Tutorial | Summary: Learn the different ways to handle redirects in Next.js.
- [065 — Next.js Rendering Philosophy](./065-01-app-02-guides-rendering-philosophy.mdx) | Type: Tutorial | Summary: Learn how Next.js treats static and dynamic rendering as a spectrum at the component level, and what this means for deployment.
- [066 — How to use Sass](./066-01-app-02-guides-sass.mdx) | Type: Tutorial | Summary: Style your Next.js application using Sass.
- [067 — How to load and optimize scripts](./067-01-app-02-guides-scripts.mdx) | Type: Tutorial | Summary: Optimize 3rd party scripts with the built-in Script component.
- [068 — How to self-host your Next.js application](./068-01-app-02-guides-self-hosting.mdx) | Type: Tutorial | Summary: Learn how to self-host your Next.js application on a Node.js server, Docker image, or static HTML files (static exports).
- [069 — How to build single-page applications with Next.js](./069-01-app-02-guides-single-page-applications.mdx) | Type: Tutorial | Summary: Next.js fully supports building Single-Page Applications (SPAs).
- [070 — How to create a static export of your Next.js application](./070-01-app-02-guides-static-exports.mdx) | Type: Tutorial | Summary: Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.
- [071 — Streaming](./071-01-app-02-guides-streaming.mdx) | Type: Tutorial | Summary: Learn how streaming works in Next.js and how to use it to progressively render UI as data becomes available.
- [072 — How to install Tailwind CSS v3 in your Next.js application](./072-01-app-02-guides-tailwind-v3-css.mdx) | Type: Tutorial | Summary: Style your Next.js Application using Tailwind CSS v3 for broader browser support.
- [073 — How to set up Cypress with Next.js](./073-01-app-02-guides-testing-cypress.mdx) | Type: Tutorial | Summary: Learn how to set up Cypress with Next.js for End-to-End (E2E) and Component Testing.
- [074 — Testing](./074-01-app-02-guides-testing-index.mdx) | Type: Tutorial | Summary: Learn how to set up Next.js with four commonly used testing tools — Cypress, Playwright, Vitest, and Jest.
- [075 — How to set up Jest with Next.js](./075-01-app-02-guides-testing-jest.mdx) | Type: Tutorial | Summary: Learn how to set up Jest with Next.js for Unit Testing and Snapshot Testing.
- [076 — How to set up Playwright with Next.js](./076-01-app-02-guides-testing-playwright.mdx) | Type: Tutorial | Summary: Learn how to set up Playwright with Next.js for End-to-End (E2E) Testing.
- [077 — How to set up Vitest with Next.js](./077-01-app-02-guides-testing-vitest.mdx) | Type: Tutorial | Summary: Learn how to set up Vitest with Next.js for Unit Testing.
- [078 — How to optimize third-party libraries](./078-01-app-02-guides-third-party-libraries.mdx) | Type: Tutorial | Summary: Optimize the performance of third-party libraries in your application with the `@next/third-parties` package.
- [079 — Codemods](./079-01-app-02-guides-upgrading-codemods.mdx) | Type: Tutorial | Summary: Use codemods to upgrade your Next.js codebase when new features are released.
- [080 — Upgrade Guides](./080-01-app-02-guides-upgrading-index.mdx) | Type: Tutorial | Summary: Learn how to upgrade to the latest versions of Next.js.
- [081 — How to upgrade to version 14](./081-01-app-02-guides-upgrading-version-14.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 13 to 14.
- [082 — How to upgrade to version 15](./082-01-app-02-guides-upgrading-version-15.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 14 to 15.
- [083 — How to upgrade to version 16](./083-01-app-02-guides-upgrading-version-16.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 15 to 16.
- [084 — How to use and optimize videos](./084-01-app-02-guides-videos.mdx) | Type: Tutorial | Summary: Recommendations and best practices for optimizing videos in your Next.js application.
- [085 — Designing view transitions](./085-01-app-02-guides-view-transitions.mdx) | Type: Tutorial | Summary: Learn how to use view transitions to communicate meaning during navigation, loading, and content changes in a Next.js app.

## App Router — API reference — Overview

- [255 — API Reference](./255-01-app-03-api-reference-index.mdx) | Type: Reference | Summary: Next.js API Reference for the App Router.

## App Router — API reference — Directives

- [086 — Directives](./086-01-app-03-api-reference-01-directives-index.mdx) | Type: Reference | Summary: Directives are used to modify the behavior of your Next.js application.
- [087 — use cache: private](./087-01-app-03-api-reference-01-directives-use-cache-private.mdx) | Type: Reference | Summary: Learn how to use the "use cache: private" directive to cache functions that access runtime request APIs.
- [088 — use cache: remote](./088-01-app-03-api-reference-01-directives-use-cache-remote.mdx) | Type: Reference | Summary: Learn how to use the "use cache: remote" directive for persistent, shared caching using remote cache handlers.
- [089 — use cache](./089-01-app-03-api-reference-01-directives-use-cache.mdx) | Type: Reference | Summary: Learn how to use the "use cache" directive to cache data in your Next.js application.
- [090 — use client](./090-01-app-03-api-reference-01-directives-use-client.mdx) | Type: Reference | Summary: Learn how to use the use client directive to render a component on the client.
- [091 — use server](./091-01-app-03-api-reference-01-directives-use-server.mdx) | Type: Reference | Summary: Learn how to use the use server directive to execute code on the server.

## App Router — API reference — Components

- [092 — Font Module](./092-01-app-03-api-reference-02-components-font.mdx) | Type: Reference | Summary: Optimizing loading web fonts with the built-in `next/font` loaders.
- [093 — Form Component](./093-01-app-03-api-reference-02-components-form.mdx) | Type: Reference | Summary: Learn how to use the `<Form>` component to handle form submissions and search params updates with client-side navigation.
- [094 — Image Component](./094-01-app-03-api-reference-02-components-image.mdx) | Type: Reference | Summary: Optimize Images in your Next.js Application using the built-in `next/image` Component.
- [095 — Components](./095-01-app-03-api-reference-02-components-index.mdx) | Type: Reference | Summary: API Reference for Next.js built-in components.
- [096 — Link Component](./096-01-app-03-api-reference-02-components-link.mdx) | Type: Reference | Summary: Enable fast client-side navigation with the built-in `next/link` component.
- [097 — Script Component](./097-01-app-03-api-reference-02-components-script.mdx) | Type: Reference | Summary: Optimize third-party scripts in your Next.js application using the built-in `next/script` Component.

## App Router — API reference — File conventions

- [098 — favicon, icon, and apple-icon](./098-01-app-03-api-reference-03-file-conventions-01-metadata-app-icons.mdx) | Type: Reference | Summary: API Reference for the Favicon, Icon and Apple Icon file conventions.
- [099 — Metadata Files API Reference](./099-01-app-03-api-reference-03-file-conventions-01-metadata-index.mdx) | Type: Reference | Summary: API documentation for the metadata file conventions.
- [100 — manifest.json](./100-01-app-03-api-reference-03-file-conventions-01-metadata-manifest.mdx) | Type: Reference | Summary: API Reference for manifest.json file.
- [101 — opengraph-image and twitter-image](./101-01-app-03-api-reference-03-file-conventions-01-metadata-opengraph-image.mdx) | Type: Reference | Summary: API Reference for the Open Graph Image and Twitter Image file conventions.
- [102 — robots.txt](./102-01-app-03-api-reference-03-file-conventions-01-metadata-robots.mdx) | Type: Reference | Summary: API Reference for robots.txt file.
- [103 — sitemap.xml](./103-01-app-03-api-reference-03-file-conventions-01-metadata-sitemap.mdx) | Type: Reference | Summary: API Reference for the sitemap.xml file.
- [104 — dynamicParams](./104-01-app-03-api-reference-03-file-conventions-02-route-segment-config-dynamicparams.mdx) | Type: Reference | Summary: API reference for the dynamicParams route segment config option.
- [105 — Route Segment Config](./105-01-app-03-api-reference-03-file-conventions-02-route-segment-config-index.mdx) | Type: Reference | Summary: Learn about how to configure options for Next.js route segments.
- [106 — instant](./106-01-app-03-api-reference-03-file-conventions-02-route-segment-config-instant.mdx) | Type: Reference | Summary: API reference for the instant route segment config.
- [107 — maxDuration](./107-01-app-03-api-reference-03-file-conventions-02-route-segment-config-maxduration.mdx) | Type: Reference | Summary: API reference for the maxDuration route segment config option.
- [108 — preferredRegion (deprecated)](./108-01-app-03-api-reference-03-file-conventions-02-route-segment-config-preferredregion.mdx) | Type: Reference | Summary: API reference for the preferredRegion route segment config option.
- [109 — prefetch](./109-01-app-03-api-reference-03-file-conventions-02-route-segment-config-prefetch.mdx) | Type: Reference | Summary: API reference for the prefetch route segment config.
- [110 — runtime](./110-01-app-03-api-reference-03-file-conventions-02-route-segment-config-runtime.mdx) | Type: Reference | Summary: API reference for the runtime route segment config option.
- [111 — default.js](./111-01-app-03-api-reference-03-file-conventions-default.mdx) | Type: Reference | Summary: API Reference for the default.js file.
- [112 — Dynamic Route Segments](./112-01-app-03-api-reference-03-file-conventions-dynamic-routes.mdx) | Type: Reference | Summary: Dynamic Route Segments can be used to programmatically generate route segments from dynamic data.
- [113 — error.js](./113-01-app-03-api-reference-03-file-conventions-error.mdx) | Type: Reference | Summary: API reference for the error.js special file.
- [114 — forbidden.js](./114-01-app-03-api-reference-03-file-conventions-forbidden.mdx) | Type: Reference | Summary: API reference for the forbidden.js special file.
- [115 — File-system conventions](./115-01-app-03-api-reference-03-file-conventions-index.mdx) | Type: Reference | Summary: API Reference for Next.js file-system conventions.
- [116 — instrumentation-client.js](./116-01-app-03-api-reference-03-file-conventions-instrumentation-client.mdx) | Type: Reference | Summary: Learn how to add client-side instrumentation to track and monitor your Next.js application's frontend performance.
- [117 — instrumentation.js](./117-01-app-03-api-reference-03-file-conventions-instrumentation.mdx) | Type: Reference | Summary: API reference for the instrumentation.js file.
- [118 — Intercepting Routes](./118-01-app-03-api-reference-03-file-conventions-intercepting-routes.mdx) | Type: Reference | Summary: Use intercepting routes to load a new route within the current layout while masking the browser URL, useful for advanced routing patterns such as modals.
- [119 — layout.js](./119-01-app-03-api-reference-03-file-conventions-layout.mdx) | Type: Reference | Summary: API reference for the layout.js file.
- [120 — loading.js](./120-01-app-03-api-reference-03-file-conventions-loading.mdx) | Type: Reference | Summary: API reference for the loading.js file.
- [121 — mdx-components.js](./121-01-app-03-api-reference-03-file-conventions-mdx-components.mdx) | Type: Reference | Summary: API reference for the mdx-components.js file.
- [122 — middleware.js](./122-01-app-03-api-reference-03-file-conventions-middleware.mdx) | Type: Reference | Summary: API reference for the middleware.js file (deprecated, renamed to proxy.js).
- [123 — not-found.js](./123-01-app-03-api-reference-03-file-conventions-not-found.mdx) | Type: Reference | Summary: API reference for the not-found.js file.
- [124 — page.js](./124-01-app-03-api-reference-03-file-conventions-page.mdx) | Type: Reference | Summary: API reference for the page.js file.
- [125 — Parallel Routes](./125-01-app-03-api-reference-03-file-conventions-parallel-routes.mdx) | Type: Reference | Summary: Simultaneously render one or more pages in the same view that can be navigated independently. A pattern for highly dynamic applications.
- [126 — proxy.js](./126-01-app-03-api-reference-03-file-conventions-proxy.mdx) | Type: Reference | Summary: API reference for the proxy.js file.
- [127 — public Folder](./127-01-app-03-api-reference-03-file-conventions-public-folder.mdx) | Type: Reference | Summary: Next.js allows you to serve static files, like images, in the public directory. You can learn how it works here.
- [128 — Route Groups](./128-01-app-03-api-reference-03-file-conventions-route-groups.mdx) | Type: Reference | Summary: Route Groups can be used to partition your Next.js application into different sections.
- [129 — route.js](./129-01-app-03-api-reference-03-file-conventions-route.mdx) | Type: Reference | Summary: API reference for the route.js special file.
- [130 — src Folder](./130-01-app-03-api-reference-03-file-conventions-src-folder.mdx) | Type: Reference | Summary: Save pages under the `src` folder as an alternative to the root `pages` directory.
- [131 — template.js](./131-01-app-03-api-reference-03-file-conventions-template.mdx) | Type: Reference | Summary: API Reference for the template.js file.
- [132 — unauthorized.js](./132-01-app-03-api-reference-03-file-conventions-unauthorized.mdx) | Type: Reference | Summary: API reference for the unauthorized.js special file.

## App Router — API reference — Functions

- [133 — after](./133-01-app-03-api-reference-04-functions-after.mdx) | Type: Reference | Summary: API Reference for the after function.
- [134 — cacheLife](./134-01-app-03-api-reference-04-functions-cachelife.mdx) | Type: Reference | Summary: Learn how to use the cacheLife function to set the cache expiration time for a cached function or component.
- [135 — cacheTag](./135-01-app-03-api-reference-04-functions-cachetag.mdx) | Type: Reference | Summary: Learn how to use the cacheTag function to manage cache invalidation in your Next.js application.
- [136 — unstable_catchError](./136-01-app-03-api-reference-04-functions-catcherror.mdx) | Type: Reference | Summary: API Reference for the unstable_catchError function.
- [137 — connection](./137-01-app-03-api-reference-04-functions-connection.mdx) | Type: Reference | Summary: API Reference for the connection function.
- [138 — cookies](./138-01-app-03-api-reference-04-functions-cookies.mdx) | Type: Reference | Summary: API Reference for the cookies function.
- [139 — draftMode](./139-01-app-03-api-reference-04-functions-draft-mode.mdx) | Type: Reference | Summary: API Reference for the draftMode function.
- [140 — fetch](./140-01-app-03-api-reference-04-functions-fetch.mdx) | Type: Reference | Summary: API reference for the extended fetch function.
- [141 — forbidden](./141-01-app-03-api-reference-04-functions-forbidden.mdx) | Type: Reference | Summary: API Reference for the forbidden function.
- [142 — generateImageMetadata](./142-01-app-03-api-reference-04-functions-generate-image-metadata.mdx) | Type: Reference | Summary: Learn how to generate multiple images in a single Metadata API special file.
- [143 — generateMetadata](./143-01-app-03-api-reference-04-functions-generate-metadata.mdx) | Type: Reference | Summary: Learn how to add Metadata to your Next.js application for improved search engine optimization (SEO) and web shareability.
- [144 — generateSitemaps](./144-01-app-03-api-reference-04-functions-generate-sitemaps.mdx) | Type: Reference | Summary: Learn how to use the generateSiteMaps function to create multiple sitemaps for your application.
- [145 — generateStaticParams](./145-01-app-03-api-reference-04-functions-generate-static-params.mdx) | Type: Reference | Summary: API reference for the generateStaticParams function.
- [146 — generateViewport](./146-01-app-03-api-reference-04-functions-generate-viewport.mdx) | Type: Reference | Summary: API Reference for the generateViewport function.
- [147 — headers](./147-01-app-03-api-reference-04-functions-headers.mdx) | Type: Reference | Summary: API reference for the headers function.
- [148 — ImageResponse](./148-01-app-03-api-reference-04-functions-image-response.mdx) | Type: Reference | Summary: API Reference for the ImageResponse constructor.
- [149 — Functions](./149-01-app-03-api-reference-04-functions-index.mdx) | Type: Reference | Summary: API Reference for Next.js Functions and Hooks.
- [150 — NextRequest](./150-01-app-03-api-reference-04-functions-next-request.mdx) | Type: Reference | Summary: API Reference for NextRequest.
- [151 — NextResponse](./151-01-app-03-api-reference-04-functions-next-response.mdx) | Type: Reference | Summary: API Reference for NextResponse.
- [152 — notFound](./152-01-app-03-api-reference-04-functions-not-found.mdx) | Type: Reference | Summary: API Reference for the notFound function.
- [153 — permanentRedirect](./153-01-app-03-api-reference-04-functions-permanentredirect.mdx) | Type: Reference | Summary: API Reference for the permanentRedirect function.
- [154 — redirect](./154-01-app-03-api-reference-04-functions-redirect.mdx) | Type: Reference | Summary: API Reference for the redirect function.
- [155 — refresh](./155-01-app-03-api-reference-04-functions-refresh.mdx) | Type: Reference | Summary: API Reference for the refresh function.
- [156 — revalidatePath](./156-01-app-03-api-reference-04-functions-revalidatepath.mdx) | Type: Reference | Summary: API Reference for the revalidatePath function.
- [157 — revalidateTag](./157-01-app-03-api-reference-04-functions-revalidatetag.mdx) | Type: Reference | Summary: API Reference for the revalidateTag function.
- [158 — unauthorized](./158-01-app-03-api-reference-04-functions-unauthorized.mdx) | Type: Reference | Summary: API Reference for the unauthorized function.
- [159 — unstable_cache](./159-01-app-03-api-reference-04-functions-unstable_cache.mdx) | Type: Reference | Summary: API Reference for the unstable_cache function.
- [160 — unstable_io](./160-01-app-03-api-reference-04-functions-unstable_io.mdx) | Type: Reference | Summary: API Reference for the unstable_io function.
- [161 — unstable_noStore](./161-01-app-03-api-reference-04-functions-unstable_nostore.mdx) | Type: Reference | Summary: API Reference for the unstable_noStore function.
- [162 — unstable_rethrow](./162-01-app-03-api-reference-04-functions-unstable_rethrow.mdx) | Type: Reference | Summary: API Reference for the unstable_rethrow function.
- [163 — updateTag](./163-01-app-03-api-reference-04-functions-updatetag.mdx) | Type: Reference | Summary: API Reference for the updateTag function.
- [164 — useLinkStatus](./164-01-app-03-api-reference-04-functions-use-link-status.mdx) | Type: Reference | Summary: API Reference for the useLinkStatus hook.
- [165 — useParams](./165-01-app-03-api-reference-04-functions-use-params.mdx) | Type: Reference | Summary: API Reference for the useParams hook.
- [166 — usePathname](./166-01-app-03-api-reference-04-functions-use-pathname.mdx) | Type: Reference | Summary: API Reference for the usePathname hook.
- [167 — useReportWebVitals](./167-01-app-03-api-reference-04-functions-use-report-web-vitals.mdx) | Type: Reference | Summary: API Reference for the useReportWebVitals function.
- [168 — useRouter](./168-01-app-03-api-reference-04-functions-use-router.mdx) | Type: Reference | Summary: API reference for the useRouter hook.
- [169 — useSearchParams](./169-01-app-03-api-reference-04-functions-use-search-params.mdx) | Type: Reference | Summary: API Reference for the useSearchParams hook.
- [170 — useSelectedLayoutSegment](./170-01-app-03-api-reference-04-functions-use-selected-layout-segment.mdx) | Type: Reference | Summary: API Reference for the useSelectedLayoutSegment hook.
- [171 — useSelectedLayoutSegments](./171-01-app-03-api-reference-04-functions-use-selected-layout-segments.mdx) | Type: Reference | Summary: API Reference for the useSelectedLayoutSegments hook.
- [172 — userAgent](./172-01-app-03-api-reference-04-functions-useragent.mdx) | Type: Reference | Summary: The userAgent helper extends the Web Request API with additional properties and methods to interact with the user agent object from the request.

## App Router — API reference — Config

- [173 — adapterPath](./173-01-app-03-api-reference-05-config-01-next-config-js-adapterpath.mdx) | Type: Reference | Summary: Configure a custom adapter for Next.js to hook into the build process.
- [174 — allowedDevOrigins](./174-01-app-03-api-reference-05-config-01-next-config-js-alloweddevorigins.mdx) | Type: Reference | Summary: Use `allowedDevOrigins` to configure additional origins that can request the dev server.
- [175 — appDir](./175-01-app-03-api-reference-05-config-01-next-config-js-appdir.mdx) | Type: Reference | Summary: Enable the App Router to use layouts, streaming, and more.
- [176 — assetPrefix](./176-01-app-03-api-reference-05-config-01-next-config-js-assetprefix.mdx) | Type: Reference | Summary: Learn how to use the assetPrefix config option to configure your CDN.
- [177 — authInterrupts](./177-01-app-03-api-reference-05-config-01-next-config-js-authinterrupts.mdx) | Type: Reference | Summary: Learn how to enable the experimental `authInterrupts` configuration option to use `forbidden` and `unauthorized`.
- [178 — basePath](./178-01-app-03-api-reference-05-config-01-next-config-js-basepath.mdx) | Type: Reference | Summary: Use `basePath` to deploy a Next.js application under a sub-path of a domain.
- [179 — cacheComponents](./179-01-app-03-api-reference-05-config-01-next-config-js-cachecomponents.mdx) | Type: Reference | Summary: Learn how to enable the cacheComponents flag in Next.js.
- [180 — cacheHandlers](./180-01-app-03-api-reference-05-config-01-next-config-js-cachehandlers.mdx) | Type: Reference | Summary: Configure custom cache handlers for use cache directives in Next.js.
- [181 — cacheLife](./181-01-app-03-api-reference-05-config-01-next-config-js-cachelife.mdx) | Type: Reference | Summary: Learn how to set up cacheLife configurations in Next.js.
- [182 — compress](./182-01-app-03-api-reference-05-config-01-next-config-js-compress.mdx) | Type: Reference | Summary: Next.js provides gzip compression to compress rendered content and static files, it only works with the server target. Learn more about it here.
- [183 — crossOrigin](./183-01-app-03-api-reference-05-config-01-next-config-js-crossorigin.mdx) | Type: Reference | Summary: Use the `crossOrigin` option to add a crossOrigin tag on the `script` tags generated by `next/script`.
- [184 — cssChunking](./184-01-app-03-api-reference-05-config-01-next-config-js-csschunking.mdx) | Type: Reference | Summary: Use the `cssChunking` option to control how CSS files are chunked in your Next.js application.
- [185 — deploymentId](./185-01-app-03-api-reference-05-config-01-next-config-js-deploymentid.mdx) | Type: Reference | Summary: Configure a deployment identifier used for version skew protection and cache busting.
- [186 — devIndicators](./186-01-app-03-api-reference-05-config-01-next-config-js-devindicators.mdx) | Type: Reference | Summary: Configuration options for the on-screen indicator that gives context about the current route you're viewing during development.
- [187 — distDir](./187-01-app-03-api-reference-05-config-01-next-config-js-distdir.mdx) | Type: Reference | Summary: Set a custom build directory to use instead of the default .next directory.
- [188 — env](./188-01-app-03-api-reference-05-config-01-next-config-js-env.mdx) | Type: Reference | Summary: Learn to add and access environment variables in your Next.js application at build time.
- [189 — expireTime](./189-01-app-03-api-reference-05-config-01-next-config-js-expiretime.mdx) | Type: Reference | Summary: Customize stale-while-revalidate expire time for ISR enabled pages.
- [190 — exportPathMap](./190-01-app-03-api-reference-05-config-01-next-config-js-exportpathmap.mdx) | Type: Reference | Summary: Customize the pages that will be exported as HTML files when using `next export`.
- [191 — generateBuildId](./191-01-app-03-api-reference-05-config-01-next-config-js-generatebuildid.mdx) | Type: Reference | Summary: Configure the build id, which is used to identify the current build in which your application is being served.
- [192 — generateEtags](./192-01-app-03-api-reference-05-config-01-next-config-js-generateetags.mdx) | Type: Reference | Summary: Next.js will generate etags for every page by default. Learn more about how to disable etag generation here.
- [193 — headers](./193-01-app-03-api-reference-05-config-01-next-config-js-headers.mdx) | Type: Reference | Summary: Add custom HTTP headers to your Next.js app.
- [194 — htmlLimitedBots](./194-01-app-03-api-reference-05-config-01-next-config-js-htmllimitedbots.mdx) | Type: Reference | Summary: Specify a list of user agents that should receive blocking metadata.
- [195 — httpAgentOptions](./195-01-app-03-api-reference-05-config-01-next-config-js-httpagentoptions.mdx) | Type: Reference | Summary: Next.js will automatically use HTTP Keep-Alive by default. Learn more about how to disable HTTP Keep-Alive here.
- [196 — images](./196-01-app-03-api-reference-05-config-01-next-config-js-images.mdx) | Type: Reference | Summary: Custom configuration for the next/image loader
- [197 — Custom Next.js Cache Handler](./197-01-app-03-api-reference-05-config-01-next-config-js-incrementalcachehandlerpath.mdx) | Type: Reference | Summary: Configure the Next.js cache used for storing and revalidating data to use any external service like Redis, Memcached, or others.
- [198 — next.config.js](./198-01-app-03-api-reference-05-config-01-next-config-js-index.mdx) | Type: Reference | Summary: Learn how to configure your application with next.config.js.
- [199 — inlineCss](./199-01-app-03-api-reference-05-config-01-next-config-js-inlinecss.mdx) | Type: Reference | Summary: Enable inline CSS support.
- [200 — logging](./200-01-app-03-api-reference-05-config-01-next-config-js-logging.mdx) | Type: Reference | Summary: Configure logging behavior in the terminal when running Next.js in development mode, including fetch logging, incoming requests, and forwarding browser console logs to the terminal.
- [201 — mdxRs](./201-01-app-03-api-reference-05-config-01-next-config-js-mdxrs.mdx) | Type: Reference | Summary: Use the new Rust compiler to compile MDX files in the App Router.
- [202 — onDemandEntries](./202-01-app-03-api-reference-05-config-01-next-config-js-ondemandentries.mdx) | Type: Reference | Summary: Configure how Next.js will dispose and keep in memory pages created in development.
- [203 — optimizePackageImports](./203-01-app-03-api-reference-05-config-01-next-config-js-optimizepackageimports.mdx) | Type: Reference | Summary: API Reference for optimizePackageImports Next.js Config Option
- [204 — output](./204-01-app-03-api-reference-05-config-01-next-config-js-output.mdx) | Type: Reference | Summary: Next.js automatically traces which files are needed by each page to allow for easy deployment of your application. Learn how it works here.
- [205 — outputHashSalt](./205-01-app-03-api-reference-05-config-01-next-config-js-outputhashsalt.mdx) | Type: Reference | Summary: Learn how to incorporate a custom salt string into content-addressed output filenames.
- [206 — pageExtensions](./206-01-app-03-api-reference-05-config-01-next-config-js-pageextensions.mdx) | Type: Reference | Summary: Extend the default page extensions used by Next.js when resolving pages in the Pages Router.
- [207 — poweredByHeader](./207-01-app-03-api-reference-05-config-01-next-config-js-poweredbyheader.mdx) | Type: Reference | Summary: Next.js will add the `x-powered-by` header by default. Learn to opt-out of it here.
- [208 — productionBrowserSourceMaps](./208-01-app-03-api-reference-05-config-01-next-config-js-productionbrowsersourcemaps.mdx) | Type: Reference | Summary: Enables browser source map generation during the production build.
- [209 — proxyClientMaxBodySize](./209-01-app-03-api-reference-05-config-01-next-config-js-proxyclientmaxbodysize.mdx) | Type: Reference | Summary: Configure the maximum request body size when using proxy.
- [210 — reactCompiler](./210-01-app-03-api-reference-05-config-01-next-config-js-reactcompiler.mdx) | Type: Reference | Summary: Enable the React Compiler to automatically optimize component rendering.
- [211 — reactMaxHeadersLength](./211-01-app-03-api-reference-05-config-01-next-config-js-reactmaxheaderslength.mdx) | Type: Reference | Summary: The maximum length of the headers that are emitted by React and added to the response.
- [212 — reactStrictMode](./212-01-app-03-api-reference-05-config-01-next-config-js-reactstrictmode.mdx) | Type: Reference | Summary: The complete Next.js runtime is now Strict Mode-compliant, learn how to opt-in
- [213 — redirects](./213-01-app-03-api-reference-05-config-01-next-config-js-redirects.mdx) | Type: Reference | Summary: Add redirects to your Next.js app.
- [214 — rewrites](./214-01-app-03-api-reference-05-config-01-next-config-js-rewrites.mdx) | Type: Reference | Summary: Add rewrites to your Next.js app.
- [215 — sassOptions](./215-01-app-03-api-reference-05-config-01-next-config-js-sassoptions.mdx) | Type: Reference | Summary: Configure Sass options.
- [216 — serverActions](./216-01-app-03-api-reference-05-config-01-next-config-js-serveractions.mdx) | Type: Reference | Summary: Configure Server Actions behavior in your Next.js application.
- [217 — serverComponentsHmrCache](./217-01-app-03-api-reference-05-config-01-next-config-js-servercomponentshmrcache.mdx) | Type: Reference | Summary: Configure whether fetch responses in Server Components are cached across HMR refresh requests.
- [218 — serverExternalPackages](./218-01-app-03-api-reference-05-config-01-next-config-js-serverexternalpackages.mdx) | Type: Reference | Summary: Opt-out specific dependencies from the Server Components bundling and use native Node.js `require`.
- [219 — staleTimes](./219-01-app-03-api-reference-05-config-01-next-config-js-staletimes.mdx) | Type: Reference | Summary: Learn how to override the invalidation time of the client cache.
- [220 — staticGeneration*](./220-01-app-03-api-reference-05-config-01-next-config-js-staticgeneration.mdx) | Type: Reference | Summary: Learn how to configure static generation in your Next.js application.
- [221 — taint](./221-01-app-03-api-reference-05-config-01-next-config-js-taint.mdx) | Type: Reference | Summary: Enable tainting Objects and Values.
- [222 — trailingSlash](./222-01-app-03-api-reference-05-config-01-next-config-js-trailingslash.mdx) | Type: Reference | Summary: Configure Next.js pages to resolve with or without a trailing slash.
- [223 — transpilePackages](./223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx) | Type: Reference | Summary: Automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (`node_modules`).
- [224 — turbopack](./224-01-app-03-api-reference-05-config-01-next-config-js-turbopack.mdx) | Type: Reference | Summary: Configure Next.js with Turbopack-specific options
- [225 — Turbopack FileSystem Caching](./225-01-app-03-api-reference-05-config-01-next-config-js-turbopackfilesystemcache.mdx) | Type: Reference | Summary: Learn how to enable FileSystem Caching for Turbopack builds
- [226 — turbopack.ignoreIssue](./226-01-app-03-api-reference-05-config-01-next-config-js-turbopackignoreissue.mdx) | Type: Reference | Summary: Suppress specific Turbopack errors and warnings from the CLI output and error overlay.
- [227 — turbopackLocalPostcssConfig](./227-01-app-03-api-reference-05-config-01-next-config-js-turbopacklocalpostcssconfig.mdx) | Type: Reference | Summary: Enable per-directory PostCSS config resolution in Turbopack so that the config closest to each CSS file takes precedence over the project root config.
- [228 — typedRoutes](./228-01-app-03-api-reference-05-config-01-next-config-js-typedroutes.mdx) | Type: Reference | Summary: Enable support for statically typed links.
- [229 — typescript](./229-01-app-03-api-reference-05-config-01-next-config-js-typescript.mdx) | Type: Reference | Summary: Configure how Next.js handles TypeScript errors during production builds and specify a custom tsconfig file.
- [230 — urlImports](./230-01-app-03-api-reference-05-config-01-next-config-js-urlimports.mdx) | Type: Reference | Summary: Configure Next.js to allow importing modules from external URLs.
- [231 — useLightningcss](./231-01-app-03-api-reference-05-config-01-next-config-js-uselightningcss.mdx) | Type: Reference | Summary: Enable experimental support for Lightning CSS.
- [232 — viewTransition](./232-01-app-03-api-reference-05-config-01-next-config-js-viewtransition.mdx) | Type: Reference | Summary: Enable ViewTransition API from React in App Router
- [233 — webVitalsAttribution](./233-01-app-03-api-reference-05-config-01-next-config-js-webvitalsattribution.mdx) | Type: Reference | Summary: Learn how to use the webVitalsAttribution option to pinpoint the source of Web Vitals issues.
- [234 — Custom Webpack Config](./234-01-app-03-api-reference-05-config-01-next-config-js-webpack.mdx) | Type: Reference | Summary: Learn how to customize the webpack config used by Next.js
- [235 — TypeScript](./235-01-app-03-api-reference-05-config-02-typescript.mdx) | Type: Reference | Summary: Next.js provides a TypeScript-first development experience for building your React application.
- [236 — ESLint Plugin](./236-01-app-03-api-reference-05-config-03-eslint.mdx) | Type: Reference | Summary: Learn how to use and configure the ESLint plugin to catch common issues and problems in a Next.js application.
- [237 — Configuration](./237-01-app-03-api-reference-05-config-index.mdx) | Type: Reference | Summary: Learn how to configure Next.js applications.

## App Router — API reference — CLI

- [238 — create-next-app](./238-01-app-03-api-reference-06-cli-create-next-app.mdx) | Type: Reference | Summary: Create Next.js apps using one command with the create-next-app CLI.
- [239 — CLI](./239-01-app-03-api-reference-06-cli-index.mdx) | Type: Reference | Summary: API Reference for the Next.js Command Line Interface (CLI) tools.
- [240 — next CLI](./240-01-app-03-api-reference-06-cli-next.mdx) | Type: Reference | Summary: Learn how to run and build your application with the Next.js CLI.

## App Router — API reference — Adapters

- [241 — Configuration](./241-01-app-03-api-reference-07-adapters-01-configuration.mdx) | Type: Reference | Summary: Configure `adapterPath` or `NEXT_ADAPTER_PATH` to use a custom deployment adapter.
- [242 — Creating an Adapter](./242-01-app-03-api-reference-07-adapters-02-creating-an-adapter.mdx) | Type: Reference | Summary: Create an adapter module that implements the `NextAdapter` interface.
- [243 — API Reference](./243-01-app-03-api-reference-07-adapters-03-api-reference.mdx) | Type: Reference | Summary: Reference for `modifyConfig` and `onBuildComplete` in the `NextAdapter` interface.
- [244 — Testing Adapters](./244-01-app-03-api-reference-07-adapters-04-testing-adapters.mdx) | Type: Reference | Summary: Validate adapters with the Next.js compatibility test harness and custom lifecycle scripts.
- [245 — Routing with @next/routing](./245-01-app-03-api-reference-07-adapters-05-routing-with-next-routing.mdx) | Type: Reference | Summary: Use `@next/routing` to apply Next.js route matching behavior in adapters.
- [246 — Implementing PPR in an Adapter](./246-01-app-03-api-reference-07-adapters-06-implementing-ppr-in-an-adapter.mdx) | Type: Reference | Summary: Implement Partial Prerendering support in an adapter using fallback output and cache hooks.
- [247 — Runtime Integration](./247-01-app-03-api-reference-07-adapters-07-runtime-integration.mdx) | Type: Reference | Summary: Understand how build-time adapters and runtime cache interfaces work together.
- [248 — Invoking Entrypoints](./248-01-app-03-api-reference-07-adapters-08-invoking-entrypoints.mdx) | Type: Reference | Summary: Invoke Node.js and Edge build entrypoints with adapter runtime context.
- [249 — Output Types](./249-01-app-03-api-reference-07-adapters-09-output-types.mdx) | Type: Reference | Summary: Reference for all build output types exposed to adapters.
- [250 — Routing Information](./250-01-app-03-api-reference-07-adapters-10-routing-information.mdx) | Type: Reference | Summary: Reference for routing phases and route fields exposed in `onBuildComplete`.
- [251 — Use Cases](./251-01-app-03-api-reference-07-adapters-11-use-cases.mdx) | Type: Reference | Summary: Common patterns and examples for deployment adapter implementations.
- [252 — Adapters](./252-01-app-03-api-reference-07-adapters-index.mdx) | Type: Reference | Summary: Build deployment adapters for Next.js platforms and infrastructure.

## App Router — API reference — 07 Edge

- [253 — Edge Runtime](./253-01-app-03-api-reference-07-edge.mdx) | Type: Reference | Summary: API Reference for the Edge Runtime.

## App Router — API reference — 08 Turbopack

- [254 — Turbopack](./254-01-app-03-api-reference-08-turbopack.mdx) | Type: Reference | Summary: Turbopack is an incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js.

## App Router — Glossary

- [256 — Next.js Glossary](./256-01-app-04-glossary.mdx) | Type: Conceptual | Summary: A glossary of common terms used in Next.js.

## Pages Router — Overview

- [417 — Pages Router](./417-02-pages-index.mdx) | Type: Conceptual | Summary: Before Next.js 13, the Pages Router was the main way to create routes in Next.js with an intuitive file-system router.

## Pages Router — API reference

- [414 — Edge Runtime](./414-02-pages-04-api-reference-06-edge.mdx) | Type: Reference | Summary: API Reference for the Edge Runtime.
- [415 — Turbopack](./415-02-pages-04-api-reference-08-turbopack.mdx) | Type: Reference | Summary: Turbopack is an incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js.

## Pages Router — Building your application

- [312 — Pages and Layouts](./312-02-pages-03-building-your-application-01-routing-01-pages-and-layouts.mdx) | Type: Tutorial | Summary: Create your first page and shared layout with the Pages Router.
- [313 — Dynamic Routes](./313-02-pages-03-building-your-application-01-routing-02-dynamic-routes.mdx) | Type: Tutorial | Summary: Dynamic Routes are pages that allow you to add custom params to your URLs. Start creating Dynamic Routes and learn more here.
- [314 — Linking and Navigating](./314-02-pages-03-building-your-application-01-routing-03-linking-and-navigating.mdx) | Type: Tutorial | Summary: Learn how navigation works in Next.js, and how to use the Link Component and `useRouter` hook.
- [315 — Custom App](./315-02-pages-03-building-your-application-01-routing-05-custom-app.mdx) | Type: Tutorial | Summary: Control page initialization and add a layout that persists for all pages by overriding the default App component used by Next.js.
- [316 — Custom Document](./316-02-pages-03-building-your-application-01-routing-06-custom-document.mdx) | Type: Tutorial | Summary: Extend the default document markup added by Next.js.
- [317 — API Routes](./317-02-pages-03-building-your-application-01-routing-07-api-routes.mdx) | Type: Tutorial | Summary: Next.js supports API Routes, which allow you to build your API without leaving your Next.js app. Learn how it works here.
- [318 — Custom Errors](./318-02-pages-03-building-your-application-01-routing-08-custom-error.mdx) | Type: Tutorial | Summary: Override and extend the built-in Error page to handle custom errors.
- [319 — Routing](./319-02-pages-03-building-your-application-01-routing-index.mdx) | Type: Tutorial | Summary: Learn the fundamentals of routing for front-end applications with the Pages Router.
- [320 — Server-side Rendering (SSR)](./320-02-pages-03-building-your-application-02-rendering-01-server-side-rendering.mdx) | Type: Tutorial | Summary: Use Server-side Rendering to render pages on each request.
- [321 — Static Site Generation (SSG)](./321-02-pages-03-building-your-application-02-rendering-02-static-site-generation.mdx) | Type: Tutorial | Summary: Use Static Site Generation (SSG) to prerender pages at build time.
- [322 — Automatic Static Optimization](./322-02-pages-03-building-your-application-02-rendering-04-automatic-static-optimization.mdx) | Type: Tutorial | Summary: Next.js automatically optimizes your app to be static HTML whenever possible. Learn how it works here.
- [323 — Client-side Rendering (CSR)](./323-02-pages-03-building-your-application-02-rendering-05-client-side-rendering.mdx) | Type: Tutorial | Summary: Learn how to implement client-side rendering in the Pages Router.
- [324 — Rendering](./324-02-pages-03-building-your-application-02-rendering-index.mdx) | Type: Tutorial | Summary: Learn the fundamentals of rendering in React and Next.js.
- [325 — getStaticProps](./325-02-pages-03-building-your-application-03-data-fetching-01-get-static-props.mdx) | Type: Tutorial | Summary: Fetch data and generate static pages with `getStaticProps`. Learn more about this API for data fetching in Next.js.
- [326 — getStaticPaths](./326-02-pages-03-building-your-application-03-data-fetching-02-get-static-paths.mdx) | Type: Tutorial | Summary: Fetch data and generate static pages with `getStaticPaths`. Learn more about this API for data fetching in Next.js.
- [327 — getServerSideProps](./327-02-pages-03-building-your-application-03-data-fetching-03-get-server-side-props.mdx) | Type: Tutorial | Summary: Fetch data on each request with `getServerSideProps`.
- [328 — Client-side Fetching](./328-02-pages-03-building-your-application-03-data-fetching-05-client-side.mdx) | Type: Tutorial | Summary: Learn about client-side data fetching, and how to use SWR, a data fetching React Hook library that handles caching, revalidation, focus tracking, refetching on interval and more.
- [329 — Data Fetching](./329-02-pages-03-building-your-application-03-data-fetching-index.mdx) | Type: Tutorial | Summary: Next.js allows you to fetch data in multiple ways, with prerendering, server-side rendering or static-site generation, and incremental static regeneration. Learn how to manage your application data…
- [330 — Error Handling](./330-02-pages-03-building-your-application-06-configuring-12-error-handling.mdx) | Type: Tutorial | Summary: Handle errors in your Next.js app.
- [331 — Configuring](./331-02-pages-03-building-your-application-06-configuring-index.mdx) | Type: Tutorial | Summary: Learn how to configure your Next.js application.
- [332 — Building Your Application](./332-02-pages-03-building-your-application-index.mdx) | Type: Tutorial | Summary: Learn how to use Next.js features to build your application.

## Pages Router — Getting started

- [258 — Create a new Next.js application](./258-02-pages-01-getting-started-01-installation.mdx) | Type: Tutorial | Summary: How to create a new Next.js application with `create-next-app`. Set up TypeScript, ESLint,and configure your `next.config.js` file.
- [259 — Project Structure and Organization](./259-02-pages-01-getting-started-02-project-structure.mdx) | Type: Tutorial | Summary: Learn about the folder and file conventions in a Next.js project, and how to organize your project.
- [260 — Image Optimization](./260-02-pages-01-getting-started-04-images.mdx) | Type: Tutorial | Summary: Optimize your images with the built-in `next/image` component.
- [261 — How to use fonts](./261-02-pages-01-getting-started-05-fonts.mdx) | Type: Tutorial | Summary: Learn how to use fonts in Next.js
- [262 — How to use CSS in your application](./262-02-pages-01-getting-started-06-css.mdx) | Type: Tutorial | Summary: Learn about the different ways to add CSS to your application, including CSS Modules, Global CSS, Tailwind CSS, and more.
- [263 — How to deploy your Next.js application](./263-02-pages-01-getting-started-11-deploying.mdx) | Type: Tutorial | Summary: Learn how to deploy your Next.js application.
- [264 — Getting Started - Pages Router](./264-02-pages-01-getting-started-index.mdx) | Type: Tutorial | Summary: Learn how to create full-stack web applications with Next.js with the Pages Router.

## Pages Router — Guides

- [265 — How to set up analytics](./265-02-pages-02-guides-analytics.mdx) | Type: Tutorial | Summary: Measure and track page performance using Next.js
- [266 — How to implement authentication in Next.js](./266-02-pages-02-guides-authentication.mdx) | Type: Tutorial | Summary: Learn how to implement authentication in Next.js, covering best practices, securing routes, authorization techniques, and session management.
- [267 — How to configure Babel in Next.js](./267-02-pages-02-guides-babel.mdx) | Type: Tutorial | Summary: Extend the babel preset added by Next.js with your own configs.
- [268 — How to configure Continuous Integration (CI) build caching](./268-02-pages-02-guides-ci-build-caching.mdx) | Type: Tutorial | Summary: Learn how to configure CI to cache Next.js builds
- [269 — How to set a Content Security Policy (CSP) for your Next.js application](./269-02-pages-02-guides-content-security-policy.mdx) | Type: Tutorial | Summary: Learn how to set a Content Security Policy (CSP) for your Next.js application.
- [270 — How to use CSS-in-JS libraries](./270-02-pages-02-guides-css-in-js.mdx) | Type: Tutorial | Summary: Use CSS-in-JS libraries with Next.js
- [271 — How to set up a custom server in Next.js](./271-02-pages-02-guides-custom-server.mdx) | Type: Tutorial | Summary: Start a Next.js app programmatically using a custom server.
- [272 — How to use debugging tools with Next.js](./272-02-pages-02-guides-debugging.mdx) | Type: Tutorial | Summary: Learn how to debug your Next.js application with VS Code or Chrome DevTools.
- [273 — How to preview content with Draft Mode in Next.js](./273-02-pages-02-guides-draft-mode.mdx) | Type: Tutorial | Summary: Next.js has draft mode to toggle between static and dynamic pages. You can learn how it works with Pages Router.
- [274 — How to use environment variables in Next.js](./274-02-pages-02-guides-environment-variables.mdx) | Type: Tutorial | Summary: Learn to add and access environment variables in your Next.js application.
- [275 — How to create forms with API Routes](./275-02-pages-02-guides-forms.mdx) | Type: Tutorial | Summary: Learn how to handle form submissions and data mutations with Next.js.
- [276 — How to implement Incremental Static Regeneration (ISR)](./276-02-pages-02-guides-incremental-static-regeneration.mdx) | Type: Tutorial | Summary: Learn how to create or update static pages at runtime with Incremental Static Regeneration.
- [277 — Guides](./277-02-pages-02-guides-index.mdx) | Type: Tutorial | Summary: Learn how to implement common UI patterns and use cases using Next.js
- [278 — How to set up instrumentation](./278-02-pages-02-guides-instrumentation.mdx) | Type: Tutorial | Summary: Learn how to use instrumentation to run code at server startup in your Next.js app
- [279 — How to implement internationalization in Next.js](./279-02-pages-02-guides-internationalization.mdx) | Type: Tutorial | Summary: Next.js has built-in support for internationalized routing and language detection. Learn more here.
- [280 — How to lazy load Client Components and libraries](./280-02-pages-02-guides-lazy-loading.mdx) | Type: Tutorial | Summary: Lazy load imported libraries and React Components to improve your application's overall loading performance.
- [281 — How to use markdown and MDX in Next.js](./281-02-pages-02-guides-mdx.mdx) | Type: Tutorial | Summary: Learn how to configure MDX to write JSX in your markdown files.
- [282 — How to migrate from Pages to the App Router](./282-02-pages-02-guides-migrating-app-router-migration.mdx) | Type: Tutorial | Summary: Learn how to upgrade your existing Next.js application from the Pages Router to the App Router.
- [283 — How to migrate from Create React App to Next.js](./283-02-pages-02-guides-migrating-from-create-react-app.mdx) | Type: Tutorial | Summary: Learn how to migrate your existing React application from Create React App to Next.js.
- [284 — How to migrate from Vite to Next.js](./284-02-pages-02-guides-migrating-from-vite.mdx) | Type: Tutorial | Summary: Learn how to migrate your existing React application from Vite to Next.js.
- [285 — Migrating](./285-02-pages-02-guides-migrating-index.mdx) | Type: Tutorial | Summary: Learn how to migrate from popular frameworks to Next.js
- [286 — How to build micro-frontends using multi-zones and Next.js](./286-02-pages-02-guides-multi-zones.mdx) | Type: Tutorial | Summary: Learn how to build micro-frontends using Next.js Multi-Zones to deploy multiple Next.js apps under a single domain.
- [287 — How to instrument your Next.js app with OpenTelemetry](./287-02-pages-02-guides-open-telemetry.mdx) | Type: Tutorial | Summary: Learn how to instrument your Next.js app with OpenTelemetry.
- [288 — How to optimize package bundling](./288-02-pages-02-guides-package-bundling.mdx) | Type: Tutorial | Summary: Learn how to optimize your application's server and client bundles.
- [289 — How to configure PostCSS in Next.js](./289-02-pages-02-guides-post-css.mdx) | Type: Tutorial | Summary: Extend the PostCSS config and plugins added by Next.js with your own.
- [290 — How to preview content with Preview Mode in Next.js](./290-02-pages-02-guides-preview-mode.mdx) | Type: Tutorial | Summary: Next.js has the preview mode for statically generated pages. You can learn how it works here.
- [291 — How to optimize your Next.js application for production](./291-02-pages-02-guides-production-checklist.mdx) | Type: Tutorial | Summary: Recommendations to ensure the best performance and user experience before taking your Next.js application to production.
- [292 — How to handle redirects in Next.js](./292-02-pages-02-guides-redirecting.mdx) | Type: Tutorial | Summary: Learn the different ways to handle redirects in Next.js.
- [293 — How to use Sass in Next.js](./293-02-pages-02-guides-sass.mdx) | Type: Tutorial | Summary: Learn how to use Sass in your Next.js application.
- [294 — How to load and optimize scripts](./294-02-pages-02-guides-scripts.mdx) | Type: Tutorial | Summary: Optimize 3rd party scripts with the built-in Script component.
- [295 — How to self-host your Next.js application](./295-02-pages-02-guides-self-hosting.mdx) | Type: Tutorial | Summary: Learn how to self-host your Next.js application on a Node.js server, Docker image, or static HTML files (static exports).
- [296 — How to create a static export of your Next.js application](./296-02-pages-02-guides-static-exports.mdx) | Type: Tutorial | Summary: Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.
- [297 — Tailwind CSS](./297-02-pages-02-guides-tailwind-v3-css.mdx) | Type: Tutorial | Summary: Style your Next.js Application using Tailwind CSS.
- [298 — How to set up Cypress with Next.js](./298-02-pages-02-guides-testing-cypress.mdx) | Type: Tutorial | Summary: Learn how to set up Next.js with Cypress for End-to-End (E2E) and Component Testing.
- [299 — Testing](./299-02-pages-02-guides-testing-index.mdx) | Type: Tutorial | Summary: Learn how to set up Next.js with three commonly used testing tools — Cypress, Playwright, Vitest, and Jest.
- [300 — How to set up Jest with Next.js](./300-02-pages-02-guides-testing-jest.mdx) | Type: Tutorial | Summary: Learn how to set up Next.js with Jest for Unit Testing.
- [301 — How to set up Playwright with Next.js](./301-02-pages-02-guides-testing-playwright.mdx) | Type: Tutorial | Summary: Learn how to set up Next.js with Playwright for End-to-End (E2E) and Integration testing.
- [302 — How to set up Vitest with Next.js](./302-02-pages-02-guides-testing-vitest.mdx) | Type: Tutorial | Summary: Learn how to set up Next.js with Vitest and React Testing Library - two popular unit testing libraries.
- [303 — How to optimize third-party libraries](./303-02-pages-02-guides-third-party-libraries.mdx) | Type: Tutorial | Summary: Optimize the performance of third-party libraries in your application with the `@next/third-parties` package.
- [304 — Codemods](./304-02-pages-02-guides-upgrading-codemods.mdx) | Type: Tutorial | Summary: Use codemods to upgrade your Next.js codebase when new features are released.
- [305 — Upgrading](./305-02-pages-02-guides-upgrading-index.mdx) | Type: Tutorial | Summary: Learn how to upgrade to the latest versions of Next.js.
- [306 — How to upgrade to version 10](./306-02-pages-02-guides-upgrading-version-10.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 9 to Version 10.
- [307 — How to upgrade to version 11](./307-02-pages-02-guides-upgrading-version-11.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 10 to Version 11.
- [308 — How to upgrade to version 12](./308-02-pages-02-guides-upgrading-version-12.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 11 to Version 12.
- [309 — How to upgrade to version 13](./309-02-pages-02-guides-upgrading-version-13.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 12 to 13.
- [310 — How to upgrade to version 14](./310-02-pages-02-guides-upgrading-version-14.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 13 to 14.
- [311 — How to upgrade to version 9](./311-02-pages-02-guides-upgrading-version-9.mdx) | Type: Tutorial | Summary: Upgrade your Next.js Application from Version 8 to Version 9.

## Pages Router — API reference — Overview

- [416 — API Reference](./416-02-pages-04-api-reference-index.mdx) | Type: Reference | Summary: Next.js API Reference for the Pages Router.

## Pages Router — API reference — Components

- [333 — Font Module](./333-02-pages-04-api-reference-01-components-font.mdx) | Type: Reference | Summary: API Reference for the Font Module
- [334 — Form](./334-02-pages-04-api-reference-01-components-form.mdx) | Type: Reference | Summary: Learn how to use the `<Form>` component to handle form submissions and search params updates with client-side navigation.
- [335 — Head](./335-02-pages-04-api-reference-01-components-head.mdx) | Type: Reference | Summary: Add custom elements to the `head` of your page with the built-in Head component.
- [336 — Image (Legacy)](./336-02-pages-04-api-reference-01-components-image-legacy.mdx) | Type: Reference | Summary: Backwards compatible Image Optimization with the Legacy Image component.
- [337 — Image](./337-02-pages-04-api-reference-01-components-image.mdx) | Type: Reference | Summary: Optimize Images in your Next.js Application using the built-in `next/image` Component.
- [338 — Components](./338-02-pages-04-api-reference-01-components-index.mdx) | Type: Reference | Summary: API Reference for Next.js built-in components in the Pages Router.
- [339 — Link](./339-02-pages-04-api-reference-01-components-link.mdx) | Type: Reference | Summary: API reference for the `<Link>` component.
- [340 — Script](./340-02-pages-04-api-reference-01-components-script.mdx) | Type: Reference | Summary: Optimize third-party scripts in your Next.js application using the built-in `next/script` Component.

## Pages Router — API reference — Functions

- [346 — getInitialProps](./346-02-pages-04-api-reference-03-functions-get-initial-props.mdx) | Type: Reference | Summary: Fetch dynamic data on the server for your React component with getInitialProps.
- [347 — getServerSideProps](./347-02-pages-04-api-reference-03-functions-get-server-side-props.mdx) | Type: Reference | Summary: API reference for `getServerSideProps`. Learn how to fetch data on each request with Next.js.
- [348 — getStaticPaths](./348-02-pages-04-api-reference-03-functions-get-static-paths.mdx) | Type: Reference | Summary: API reference for `getStaticPaths`. Learn how to fetch data and generate static pages with `getStaticPaths`.
- [349 — getStaticProps](./349-02-pages-04-api-reference-03-functions-get-static-props.mdx) | Type: Reference | Summary: API reference for `getStaticProps`. Learn how to use `getStaticProps` to generate static pages with Next.js.
- [350 — Functions](./350-02-pages-04-api-reference-03-functions-index.mdx) | Type: Reference | Summary: API Reference for Functions and Hooks in Pages Router.
- [351 — NextRequest](./351-02-pages-04-api-reference-03-functions-next-request.mdx) | Type: Reference | Summary: API Reference for NextRequest.
- [352 — NextResponse](./352-02-pages-04-api-reference-03-functions-next-response.mdx) | Type: Reference | Summary: API Reference for NextResponse.
- [353 — useParams](./353-02-pages-04-api-reference-03-functions-use-params.mdx) | Type: Reference | Summary: API Reference for the useParams hook in the Pages Router.
- [354 — useReportWebVitals](./354-02-pages-04-api-reference-03-functions-use-report-web-vitals.mdx) | Type: Reference | Summary: useReportWebVitals
- [355 — useRouter](./355-02-pages-04-api-reference-03-functions-use-router.mdx) | Type: Reference | Summary: Learn more about the API of the Next.js Router, and access the router instance in your page with the useRouter hook.
- [356 — useSearchParams](./356-02-pages-04-api-reference-03-functions-use-search-params.mdx) | Type: Reference | Summary: API Reference for the useSearchParams hook in the Pages Router.
- [357 — userAgent](./357-02-pages-04-api-reference-03-functions-useragent.mdx) | Type: Reference | Summary: The userAgent helper extends the Web Request API with additional properties and methods to interact with the user agent object from the request.

## Pages Router — API reference — Config

- [358 — adapterPath](./358-02-pages-04-api-reference-04-config-01-next-config-js-adapterpath.mdx) | Type: Reference | Summary: Configure a custom adapter for Next.js to hook into the build process.
- [359 — allowedDevOrigins](./359-02-pages-04-api-reference-04-config-01-next-config-js-alloweddevorigins.mdx) | Type: Reference | Summary: Use `allowedDevOrigins` to configure additional origins that can request the dev server.
- [360 — assetPrefix](./360-02-pages-04-api-reference-04-config-01-next-config-js-assetprefix.mdx) | Type: Reference | Summary: Learn how to use the assetPrefix config option to configure your CDN.
- [361 — basePath](./361-02-pages-04-api-reference-04-config-01-next-config-js-basepath.mdx) | Type: Reference | Summary: Use `basePath` to deploy a Next.js application under a sub-path of a domain.
- [362 — bundlePagesRouterDependencies](./362-02-pages-04-api-reference-04-config-01-next-config-js-bundlepagesrouterdependencies.mdx) | Type: Reference | Summary: Enable automatic dependency bundling for Pages Router
- [363 — compress](./363-02-pages-04-api-reference-04-config-01-next-config-js-compress.mdx) | Type: Reference | Summary: Next.js provides gzip compression to compress rendered content and static files, it only works with the server target. Learn more about it here.
- [364 — crossOrigin](./364-02-pages-04-api-reference-04-config-01-next-config-js-crossorigin.mdx) | Type: Reference | Summary: Use the `crossOrigin` option to add a crossOrigin tag on the `script` tags generated by `next/script` and `next/head`.
- [365 — deploymentId](./365-02-pages-04-api-reference-04-config-01-next-config-js-deploymentid.mdx) | Type: Reference | Summary: Configure a deployment identifier used for version skew protection and cache busting.
- [366 — devIndicators](./366-02-pages-04-api-reference-04-config-01-next-config-js-devindicators.mdx) | Type: Reference | Summary: Optimized pages include an indicator to let you know if it's being statically optimized. You can opt-out of it here.
- [367 — distDir](./367-02-pages-04-api-reference-04-config-01-next-config-js-distdir.mdx) | Type: Reference | Summary: Set a custom build directory to use instead of the default .next directory.
- [368 — env](./368-02-pages-04-api-reference-04-config-01-next-config-js-env.mdx) | Type: Reference | Summary: Learn to add and access environment variables in your Next.js application at build time.
- [369 — exportPathMap](./369-02-pages-04-api-reference-04-config-01-next-config-js-exportpathmap.mdx) | Type: Reference | Summary: Customize the pages that will be exported as HTML files when using `next export`.
- [370 — generateBuildId](./370-02-pages-04-api-reference-04-config-01-next-config-js-generatebuildid.mdx) | Type: Reference | Summary: Configure the build id, which is used to identify the current build in which your application is being served.
- [371 — generateEtags](./371-02-pages-04-api-reference-04-config-01-next-config-js-generateetags.mdx) | Type: Reference | Summary: Next.js will generate etags for every page by default. Learn more about how to disable etag generation here.
- [372 — headers](./372-02-pages-04-api-reference-04-config-01-next-config-js-headers.mdx) | Type: Reference | Summary: Add custom HTTP headers to your Next.js app.
- [373 — httpAgentOptions](./373-02-pages-04-api-reference-04-config-01-next-config-js-httpagentoptions.mdx) | Type: Reference | Summary: Next.js will automatically use HTTP Keep-Alive by default. Learn more about how to disable HTTP Keep-Alive here.
- [374 — images](./374-02-pages-04-api-reference-04-config-01-next-config-js-images.mdx) | Type: Reference | Summary: Custom configuration for the next/image loader
- [375 — next.config.js Options](./375-02-pages-04-api-reference-04-config-01-next-config-js-index.mdx) | Type: Reference | Summary: Learn about the options available in next.config.js for the Pages Router.
- [376 — logging](./376-02-pages-04-api-reference-04-config-01-next-config-js-logging.mdx) | Type: Reference | Summary: Configure logging behavior in the terminal when running Next.js in development mode.
- [377 — onDemandEntries](./377-02-pages-04-api-reference-04-config-01-next-config-js-ondemandentries.mdx) | Type: Reference | Summary: Configure how Next.js will dispose and keep in memory pages created in development.
- [378 — optimizePackageImports](./378-02-pages-04-api-reference-04-config-01-next-config-js-optimizepackageimports.mdx) | Type: Reference | Summary: API Reference for optimizePackageImports Next.js Config Option
- [379 — output](./379-02-pages-04-api-reference-04-config-01-next-config-js-output.mdx) | Type: Reference | Summary: Next.js automatically traces which files are needed by each page to allow for easy deployment of your application. Learn how it works here.
- [380 — pageExtensions](./380-02-pages-04-api-reference-04-config-01-next-config-js-pageextensions.mdx) | Type: Reference | Summary: Extend the default page extensions used by Next.js when resolving pages in the Pages Router.
- [381 — poweredByHeader](./381-02-pages-04-api-reference-04-config-01-next-config-js-poweredbyheader.mdx) | Type: Reference | Summary: Next.js will add the `x-powered-by` header by default. Learn to opt-out of it here.
- [382 — productionBrowserSourceMaps](./382-02-pages-04-api-reference-04-config-01-next-config-js-productionbrowsersourcemaps.mdx) | Type: Reference | Summary: Enables browser source map generation during the production build.
- [383 — experimental.proxyClientMaxBodySize](./383-02-pages-04-api-reference-04-config-01-next-config-js-proxyclientmaxbodysize.mdx) | Type: Reference | Summary: Configure the maximum request body size when using proxy.
- [384 — reactStrictMode](./384-02-pages-04-api-reference-04-config-01-next-config-js-reactstrictmode.mdx) | Type: Reference | Summary: The complete Next.js runtime is now Strict Mode-compliant, learn how to opt-in
- [385 — redirects](./385-02-pages-04-api-reference-04-config-01-next-config-js-redirects.mdx) | Type: Reference | Summary: Add redirects to your Next.js app.
- [386 — rewrites](./386-02-pages-04-api-reference-04-config-01-next-config-js-rewrites.mdx) | Type: Reference | Summary: Add rewrites to your Next.js app.
- [387 — serverExternalPackages](./387-02-pages-04-api-reference-04-config-01-next-config-js-serverexternalpackages.mdx) | Type: Reference | Summary: Opt-out specific dependencies from the dependency bundling enabled by `bundlePagesRouterDependencies`.
- [388 — trailingSlash](./388-02-pages-04-api-reference-04-config-01-next-config-js-trailingslash.mdx) | Type: Reference | Summary: Configure Next.js pages to resolve with or without a trailing slash.
- [389 — transpilePackages](./389-02-pages-04-api-reference-04-config-01-next-config-js-transpilepackages.mdx) | Type: Reference | Summary: Automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (`node_modules`).
- [390 — turbopack](./390-02-pages-04-api-reference-04-config-01-next-config-js-turbopack.mdx) | Type: Reference | Summary: Configure Next.js with Turbopack-specific options
- [391 — typescript](./391-02-pages-04-api-reference-04-config-01-next-config-js-typescript.mdx) | Type: Reference | Summary: Next.js reports TypeScript errors by default. Learn to opt-out of this behavior here.
- [392 — urlImports](./392-02-pages-04-api-reference-04-config-01-next-config-js-urlimports.mdx) | Type: Reference | Summary: Configure Next.js to allow importing modules from external URLs.
- [393 — useLightningcss](./393-02-pages-04-api-reference-04-config-01-next-config-js-uselightningcss.mdx) | Type: Reference | Summary: Enable experimental support for Lightning CSS.
- [394 — webVitalsAttribution](./394-02-pages-04-api-reference-04-config-01-next-config-js-webvitalsattribution.mdx) | Type: Reference | Summary: Learn how to use the webVitalsAttribution option to pinpoint the source of Web Vitals issues.
- [395 — Custom Webpack Config](./395-02-pages-04-api-reference-04-config-01-next-config-js-webpack.mdx) | Type: Reference | Summary: Learn how to customize the webpack config used by Next.js
- [396 — TypeScript](./396-02-pages-04-api-reference-04-config-01-typescript.mdx) | Type: Reference | Summary: Next.js provides a TypeScript-first development experience for building your React application.
- [397 — ESLint](./397-02-pages-04-api-reference-04-config-02-eslint.mdx) | Type: Reference | Summary: Next.js reports ESLint errors and warnings during builds by default. Learn how to opt-out of this behavior here.
- [398 — Configuration](./398-02-pages-04-api-reference-04-config-index.mdx) | Type: Reference | Summary: Learn how to configure your Next.js application.

## Pages Router — API reference — CLI

- [399 — create-next-app CLI](./399-02-pages-04-api-reference-05-cli-create-next-app.mdx) | Type: Reference | Summary: Create Next.js apps using one command with the create-next-app CLI.
- [400 — CLI](./400-02-pages-04-api-reference-05-cli-index.mdx) | Type: Reference | Summary: API Reference for the Next.js Command Line Interface (CLI) tools.
- [401 — next CLI](./401-02-pages-04-api-reference-05-cli-next.mdx) | Type: Reference | Summary: Learn how to run and build your application with the Next.js CLI.

## Pages Router — API reference — Adapters

- [402 — Configuration](./402-02-pages-04-api-reference-06-adapters-01-configuration.mdx) | Type: Reference | Summary: Configure `adapterPath` or `NEXT_ADAPTER_PATH` to use a custom deployment adapter.
- [403 — Creating an Adapter](./403-02-pages-04-api-reference-06-adapters-02-creating-an-adapter.mdx) | Type: Reference | Summary: Create an adapter module that implements the `NextAdapter` interface.
- [404 — API Reference](./404-02-pages-04-api-reference-06-adapters-03-api-reference.mdx) | Type: Reference | Summary: Reference for `modifyConfig` and `onBuildComplete` in the `NextAdapter` interface.
- [405 — Testing Adapters](./405-02-pages-04-api-reference-06-adapters-04-testing-adapters.mdx) | Type: Reference | Summary: Validate adapters with the Next.js compatibility test harness and custom lifecycle scripts.
- [406 — Routing with @next/routing](./406-02-pages-04-api-reference-06-adapters-05-routing-with-next-routing.mdx) | Type: Reference | Summary: Use `@next/routing` to apply Next.js route matching behavior in adapters.
- [407 — Implementing PPR in an Adapter](./407-02-pages-04-api-reference-06-adapters-06-implementing-ppr-in-an-adapter.mdx) | Type: Reference | Summary: Implement Partial Prerendering support in an adapter using fallback output and cache hooks.
- [408 — Runtime Integration](./408-02-pages-04-api-reference-06-adapters-07-runtime-integration.mdx) | Type: Reference | Summary: Understand how build-time adapters and runtime cache interfaces work together.
- [409 — Invoking Entrypoints](./409-02-pages-04-api-reference-06-adapters-08-invoking-entrypoints.mdx) | Type: Reference | Summary: Invoke Node.js and Edge build entrypoints with adapter runtime context.
- [410 — Output Types](./410-02-pages-04-api-reference-06-adapters-09-output-types.mdx) | Type: Reference | Summary: Reference for all build output types exposed to adapters.
- [411 — Routing Information](./411-02-pages-04-api-reference-06-adapters-10-routing-information.mdx) | Type: Reference | Summary: Reference for routing phases and route fields exposed in `onBuildComplete`.
- [412 — Use Cases](./412-02-pages-04-api-reference-06-adapters-11-use-cases.mdx) | Type: Reference | Summary: Common patterns and examples for deployment adapter implementations.
- [413 — Adapters](./413-02-pages-04-api-reference-06-adapters-index.mdx) | Type: Reference | Summary: Build deployment adapters for Next.js platforms and infrastructure.

## Pages Router — API reference — 02-file-conventions

- [341 — File-system conventions](./341-02-pages-04-api-reference-02-file-conventions-index.mdx) | Type: Reference | Summary: API Reference for Next.js file-system conventions.
- [342 — instrumentation.js](./342-02-pages-04-api-reference-02-file-conventions-instrumentation.mdx) | Type: Reference | Summary: API reference for the instrumentation.js file.
- [343 — Proxy](./343-02-pages-04-api-reference-02-file-conventions-proxy.mdx) | Type: Reference | Summary: Learn how to use Proxy to run code before a request is completed.
- [344 — public Folder](./344-02-pages-04-api-reference-02-file-conventions-public-folder.mdx) | Type: Reference | Summary: Next.js allows you to serve static files, like images, in the public directory. You can learn how it works here.
- [345 — src Directory](./345-02-pages-04-api-reference-02-file-conventions-src-folder.mdx) | Type: Reference | Summary: Save pages under the `src` folder as an alternative to the root `pages` directory.

## Architecture

- [418 — Accessibility](./418-03-architecture-accessibility.mdx) | Type: Conceptual | Summary: The built-in accessibility features of Next.js.
- [419 — Fast Refresh](./419-03-architecture-fast-refresh.mdx) | Type: Conceptual | Summary: Fast Refresh is a hot module reloading experience that gives you instantaneous feedback on edits made to your React components.
- [420 — Architecture](./420-03-architecture-index.mdx) | Type: Conceptual | Summary: How Next.js Works
- [421 — Next.js Compiler](./421-03-architecture-nextjs-compiler.mdx) | Type: Conceptual | Summary: Next.js Compiler, written in Rust, which transforms and minifies your Next.js application.
- [422 — Supported Browsers](./422-03-architecture-supported-browsers.mdx) | Type: Conceptual | Summary: Browser support and which JavaScript features are supported by Next.js.

## Community

- [423 — Docs Contribution Guide](./423-04-community-01-contribution-guide.mdx) | Type: Conceptual | Summary: Learn how to contribute to Next.js Documentation
- [424 — Rspack Integration](./424-04-community-02-rspack.mdx) | Type: Conceptual | Summary: Use the `next-rspack` plugin to bundle your Next.js with Rspack.
- [425 — Next.js Community](./425-04-community-index.mdx) | Type: Conceptual | Summary: Get involved in the Next.js community.

## Files in this directory

| File | Note |
|------|------|
| `INDEX.md` | This navigation file |
| `NNN-*.mdx` | Mirror pages (see numbering in the index above) |
