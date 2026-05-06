---
title: React — documentation index
description: Offline react.dev mirror; flat numbered `NNN-*.mdx` files; see “Agent retrieval”.
---

# React documentation

Offline mirror: flat files `NNN-slug.mdx` in this directory (`NNN` is three digits). Stack pins: [`FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

### Nezumi Template (repo context)

This workspace pins **`react`** and **`react-dom` to `^19.2.5` (typically resolved to **19.2.5**). Text in the mirrored pages may say “React 19” in the general sense; stack truth is in `FRAMEWORK_VERSION_REFERENCES.md`.

**MDX note:** Pages may contain JSX and custom tags from react.dev; plain Markdown viewers might render them oddly. The text is still authoritative mirror content.

Upstream source: [reactjs/react.dev](https://github.com/reactjs/react.dev) (`src/content`).

## Agent retrieval

Use this file as the **single navigation root**. All pages are **flat** `NNN-kebab-slug.mdx` next to `INDEX.md`; do **not** assume legacy nested paths such as `learn/…` or `reference/react/…`.

| Need | Where to look |
|------|----------------|
| Curriculum / guides | Section **Learn** (files named `NNN-learn-*`) |
| Hook or API reference (`react`, `react-dom`, compiler, RSC) | Section **Reference**; slugs encode the old path (e.g. `reference-react-usestate`) |
| Blog | Section **Blog** |
| Community meta | Section **Community** |
| Error message index | Section **Errors** |
| Runtime warnings | Section **Warnings** |
| Version changelog pages | Section **Versions** |
| German portal copy (historic home page) | [015](./015-index.mdx) — redirects to `INDEX.md` |
| Legacy path names (`learn/…`, nested `reference/…`) | **Deprecated** — use filenames here |

**Rules:** The numeric prefix `NNN` is a stable slot ordered by the former repository path (see slug after the number). In-body links may still use react.dev URL segments (`learn/…`, `reference/…`); offline, map those segments to the slug in this index (e.g. `reference/react/useState` → file `*-reference-react-usestate.mdx`). Image paths use `./images/` relative to this folder.

---

## Blog

- [001 — The React Foundation: A New Home for React Hosted by the Linux Foundation](./001-blog-2026-02-24-the-react-foundation.mdx) | Type: Conceptual | Summary: The React Foundation: A New Home for React Hosted by the Linux Foundation
- [002 — React Blog](./002-blog-index.mdx) | Type: Conceptual | Summary: React Blog

## Community

- [003 — Acknowledgements](./003-community-acknowledgements.mdx) | Type: Conceptual | Summary: Acknowledgements
- [004 — React Conferences](./004-community-conferences.mdx) | Type: Conceptual | Summary: React Conferences
- [005 — Docs Contributors](./005-community-docs-contributors.mdx) | Type: Conceptual | Summary: Docs Contributors
- [006 — React Community](./006-community-index.mdx) | Type: Conceptual | Summary: React Community
- [007 — React Meetups](./007-community-meetups.mdx) | Type: Conceptual | Summary: React Meetups
- [008 — Meet the Team](./008-community-team.mdx) | Type: Conceptual | Summary: Meet the Team
- [009 — Translations](./009-community-translations.mdx) | Type: Conceptual | Summary: Translations
- [010 — Versioning Policy](./010-community-versioning-policy.mdx) | Type: Conceptual | Summary: Versioning Policy
- [011 — React Videos](./011-community-videos.mdx) | Type: Conceptual | Summary: React Videos

## Errors

- [012 — Production error decoder (sample code 377)](./012-errors-377.mdx) | Type: Reference | Summary: Decodes minified prod errors (example code 377)
- [013 — Production error decoder (generic)](./013-errors-generic.mdx) | Type: Reference | Summary: Generic decoded error body template
- [014 — Errors overview](./014-errors-index.mdx) | Type: Reference | Summary: Links to production error URLs on react.dev

## Snapshot index (repository portal)

- [015 — Historic portal stub (German)](./015-index.mdx) | Type: Conceptual | Summary: Former `index.md` notes; navigation is now this `INDEX.md`

## Learn

- [016 — Add React to an Existing Project](./016-learn-add-react-to-an-existing-project.mdx) | Type: Learn / guide | Summary: Add React to an Existing Project
- [017 — Adding Interactivity](./017-learn-adding-interactivity.mdx) | Type: Learn / guide | Summary: Adding Interactivity
- [018 — Build a React app from Scratch](./018-learn-build-a-react-app-from-scratch.mdx) | Type: Learn / guide | Summary: Build a React app from Scratch
- [019 — Choosing the State Structure](./019-learn-choosing-the-state-structure.mdx) | Type: Learn / guide | Summary: Choosing the State Structure
- [020 — Conditional Rendering](./020-learn-conditional-rendering.mdx) | Type: Learn / guide | Summary: Conditional Rendering
- [021 — Creating a React App](./021-learn-creating-a-react-app.mdx) | Type: Learn / guide | Summary: Creating a React App
- [022 — Describing the UI](./022-learn-describing-the-ui.mdx) | Type: Learn / guide | Summary: Describing the UI
- [023 — Editor Setup](./023-learn-editor-setup.mdx) | Type: Learn / guide | Summary: Editor Setup
- [024 — Escape Hatches](./024-learn-escape-hatches.mdx) | Type: Learn / guide | Summary: Escape Hatches
- [025 — Extracting State Logic into a Reducer](./025-learn-extracting-state-logic-into-a-reducer.mdx) | Type: Learn / guide | Summary: Extracting State Logic into a Reducer
- [026 — Importing and Exporting Components](./026-learn-importing-and-exporting-components.mdx) | Type: Learn / guide | Summary: Importing and Exporting Components
- [027 — Quick Start](./027-learn-index.mdx) | Type: Tutorial | Summary: Quick Start
- [028 — Installation](./028-learn-installation.mdx) | Type: Learn / guide | Summary: Installation
- [029 — JavaScript in JSX with Curly Braces](./029-learn-javascript-in-jsx-with-curly-braces.mdx) | Type: Learn / guide | Summary: JavaScript in JSX with Curly Braces
- [030 — Keeping Components Pure](./030-learn-keeping-components-pure.mdx) | Type: Learn / guide | Summary: Keeping Components Pure
- [031 — Lifecycle of Reactive Effects](./031-learn-lifecycle-of-reactive-effects.mdx) | Type: Learn / guide | Summary: Lifecycle of Reactive Effects
- [032 — Managing State](./032-learn-managing-state.mdx) | Type: Learn / guide | Summary: Managing State
- [033 — Manipulating the DOM with Refs](./033-learn-manipulating-the-dom-with-refs.mdx) | Type: Learn / guide | Summary: Manipulating the DOM with Refs
- [034 — Passing Data Deeply with Context](./034-learn-passing-data-deeply-with-context.mdx) | Type: Learn / guide | Summary: Passing Data Deeply with Context
- [035 — Passing Props to a Component](./035-learn-passing-props-to-a-component.mdx) | Type: Learn / guide | Summary: Passing Props to a Component
- [036 — Preserving and Resetting State](./036-learn-preserving-and-resetting-state.mdx) | Type: Learn / guide | Summary: Preserving and Resetting State
- [037 — Queueing a Series of State Updates](./037-learn-queueing-a-series-of-state-updates.mdx) | Type: Learn / guide | Summary: Queueing a Series of State Updates
- [038 — Debugging and Troubleshooting](./038-learn-react-compiler-debugging.mdx) | Type: Learn / guide | Summary: Debugging and Troubleshooting
- [039 — Incremental Adoption](./039-learn-react-compiler-incremental-adoption.mdx) | Type: Learn / guide | Summary: Incremental Adoption
- [040 — React Compiler](./040-learn-react-compiler-index.mdx) | Type: Learn / guide | Summary: React Compiler
- [041 — Installation](./041-learn-react-compiler-installation.mdx) | Type: Learn / guide | Summary: Installation
- [042 — Introduction](./042-learn-react-compiler-introduction.mdx) | Type: Learn / guide | Summary: Introduction
- [043 — React Developer Tools](./043-learn-react-developer-tools.mdx) | Type: Learn / guide | Summary: React Developer Tools
- [044 — Reacting to Input with State](./044-learn-reacting-to-input-with-state.mdx) | Type: Learn / guide | Summary: Reacting to Input with State
- [045 — Referencing Values with Refs](./045-learn-referencing-values-with-refs.mdx) | Type: Learn / guide | Summary: Referencing Values with Refs
- [046 — Removing Effect Dependencies](./046-learn-removing-effect-dependencies.mdx) | Type: Learn / guide | Summary: Removing Effect Dependencies
- [047 — Render and Commit](./047-learn-render-and-commit.mdx) | Type: Learn / guide | Summary: Render and Commit
- [048 — Rendering Lists](./048-learn-rendering-lists.mdx) | Type: Learn / guide | Summary: Rendering Lists
- [049 — Responding to Events](./049-learn-responding-to-events.mdx) | Type: Learn / guide | Summary: Responding to Events
- [050 — Reusing Logic with Custom Hooks](./050-learn-reusing-logic-with-custom-hooks.mdx) | Type: Learn / guide | Summary: Reusing Logic with Custom Hooks
- [051 — RSC Sandbox Test](./051-learn-rsc-sandbox-test.mdx) | Type: Learn / guide | Summary: RSC Sandbox Test
- [052 — Scaling Up with Reducer and Context](./052-learn-scaling-up-with-reducer-and-context.mdx) | Type: Learn / guide | Summary: Scaling Up with Reducer and Context
- [053 — Separating Events from Effects](./053-learn-separating-events-from-effects.mdx) | Type: Learn / guide | Summary: Separating Events from Effects
- [054 — Setup](./054-learn-setup.mdx) | Type: Learn / guide | Summary: Setup
- [055 — Sharing State Between Components](./055-learn-sharing-state-between-components.mdx) | Type: Learn / guide | Summary: Sharing State Between Components
- [056 — State: A Component's Memory](./056-learn-state-a-components-memory.mdx) | Type: Learn / guide | Summary: State: A Component's Memory
- [057 — State as a Snapshot](./057-learn-state-as-a-snapshot.mdx) | Type: Learn / guide | Summary: State as a Snapshot
- [058 — Synchronizing with Effects](./058-learn-synchronizing-with-effects.mdx) | Type: Learn / guide | Summary: Synchronizing with Effects
- [059 — Thinking in React](./059-learn-thinking-in-react.mdx) | Type: Learn / guide | Summary: Thinking in React
- [060 — Tutorial: Tic-Tac-Toe](./060-learn-tutorial-tic-tac-toe.mdx) | Type: Tutorial | Summary: Tutorial: Tic-Tac-Toe
- [061 — Using TypeScript](./061-learn-typescript.mdx) | Type: Learn / guide | Summary: Using TypeScript
- [062 — Understanding Your UI as a Tree](./062-learn-understanding-your-ui-as-a-tree.mdx) | Type: Learn / guide | Summary: Understanding Your UI as a Tree
- [063 — Updating Arrays in State](./063-learn-updating-arrays-in-state.mdx) | Type: Learn / guide | Summary: Updating Arrays in State
- [064 — Updating Objects in State](./064-learn-updating-objects-in-state.mdx) | Type: Learn / guide | Summary: Updating Objects in State
- [065 — Writing Markup with JSX](./065-learn-writing-markup-with-jsx.mdx) | Type: Learn / guide | Summary: Writing Markup with JSX
- [066 — You Might Not Need an Effect](./066-learn-you-might-not-need-an-effect.mdx) | Type: Learn / guide | Summary: You Might Not Need an Effect
- [067 — Your First Component](./067-learn-your-first-component.mdx) | Type: Learn / guide | Summary: Your First Component

## Reference

### React DevTools

- [068 — React Performance tracks](./068-reference-dev-tools-react-performance-tracks.mdx) | Type: Reference | Summary: React Performance tracks

### eslint-plugin-react-hooks

- [069 — eslint-plugin-react-hooks](./069-reference-eslint-plugin-react-hooks-index.mdx) | Type: Reference | Summary: eslint-plugin-react-hooks
- [070 — component-hook-factories](./070-reference-eslint-plugin-react-hooks-lints-component-hook-factories.mdx) | Type: Reference | Summary: component-hook-factories
- [071 — config](./071-reference-eslint-plugin-react-hooks-lints-config.mdx) | Type: Reference | Summary: config
- [072 — error-boundaries](./072-reference-eslint-plugin-react-hooks-lints-error-boundaries.mdx) | Type: Reference | Summary: error-boundaries
- [073 — exhaustive-deps](./073-reference-eslint-plugin-react-hooks-lints-exhaustive-deps.mdx) | Type: Reference | Summary: exhaustive-deps
- [074 — gating](./074-reference-eslint-plugin-react-hooks-lints-gating.mdx) | Type: Reference | Summary: gating
- [075 — globals](./075-reference-eslint-plugin-react-hooks-lints-globals.mdx) | Type: Reference | Summary: globals
- [076 — immutability](./076-reference-eslint-plugin-react-hooks-lints-immutability.mdx) | Type: Reference | Summary: immutability
- [077 — incompatible-library](./077-reference-eslint-plugin-react-hooks-lints-incompatible-library.mdx) | Type: Reference | Summary: incompatible-library
- [078 — preserve-manual-memoization](./078-reference-eslint-plugin-react-hooks-lints-preserve-manual-memoization.mdx) | Type: Reference | Summary: preserve-manual-memoization
- [079 — purity](./079-reference-eslint-plugin-react-hooks-lints-purity.mdx) | Type: Reference | Summary: purity
- [080 — refs](./080-reference-eslint-plugin-react-hooks-lints-refs.mdx) | Type: Reference | Summary: refs
- [081 — rules-of-hooks](./081-reference-eslint-plugin-react-hooks-lints-rules-of-hooks.mdx) | Type: Reference | Summary: rules-of-hooks
- [082 — set-state-in-effect](./082-reference-eslint-plugin-react-hooks-lints-set-state-in-effect.mdx) | Type: Reference | Summary: set-state-in-effect
- [083 — set-state-in-render](./083-reference-eslint-plugin-react-hooks-lints-set-state-in-render.mdx) | Type: Reference | Summary: set-state-in-render
- [084 — static-components](./084-reference-eslint-plugin-react-hooks-lints-static-components.mdx) | Type: Reference | Summary: static-components
- [085 — unsupported-syntax](./085-reference-eslint-plugin-react-hooks-lints-unsupported-syntax.mdx) | Type: Reference | Summary: unsupported-syntax
- [086 — use-memo](./086-reference-eslint-plugin-react-hooks-lints-use-memo.mdx) | Type: Reference | Summary: use-memo

### Package react (`react`)

- [087 — <Activity>](./087-reference-react-activity.mdx) | Type: Reference | Summary: <Activity>
- [088 — Children](./088-reference-react-children.mdx) | Type: Reference | Summary: Children
- [089 — Component](./089-reference-react-component.mdx) | Type: Reference | Summary: Component
- [090 — <Fragment> (<>...</>)](./090-reference-react-fragment.mdx) | Type: Reference | Summary: <Fragment> (<>...</>)
- [091 — <Profiler>](./091-reference-react-profiler.mdx) | Type: Reference | Summary: <Profiler>
- [092 — PureComponent](./092-reference-react-purecomponent.mdx) | Type: Reference | Summary: PureComponent
- [093 — <StrictMode>](./093-reference-react-strictmode.mdx) | Type: Reference | Summary: <StrictMode>
- [094 — <Suspense>](./094-reference-react-suspense.mdx) | Type: Reference | Summary: <Suspense>
- [095 — <ViewTransition>](./095-reference-react-viewtransition.mdx) | Type: Reference | Summary: <ViewTransition>
- [096 — act](./096-reference-react-act.mdx) | Type: Reference | Summary: act
- [097 — addTransitionType](./097-reference-react-addtransitiontype.mdx) | Type: Reference | Summary: addTransitionType
- [098 — Built-in React APIs](./098-reference-react-apis.mdx) | Type: Reference | Summary: Built-in React APIs
- [099 — cache](./099-reference-react-cache.mdx) | Type: Reference | Summary: cache
- [100 — cacheSignal](./100-reference-react-cachesignal.mdx) | Type: Reference | Summary: cacheSignal
- [101 — captureOwnerStack](./101-reference-react-captureownerstack.mdx) | Type: Reference | Summary: captureOwnerStack
- [102 — cloneElement](./102-reference-react-cloneelement.mdx) | Type: Reference | Summary: cloneElement
- [103 — Built-in React Components](./103-reference-react-components.mdx) | Type: Reference | Summary: Built-in React Components
- [104 — createContext](./104-reference-react-createcontext.mdx) | Type: Reference | Summary: createContext
- [105 — createElement](./105-reference-react-createelement.mdx) | Type: Reference | Summary: createElement
- [106 — createRef](./106-reference-react-createref.mdx) | Type: Reference | Summary: createRef
- [107 — experimental_taintObjectReference](./107-reference-react-experimental-taintobjectreference.mdx) | Type: Reference | Summary: experimental_taintObjectReference
- [108 — experimental_taintUniqueValue](./108-reference-react-experimental-taintuniquevalue.mdx) | Type: Reference | Summary: experimental_taintUniqueValue
- [109 — forwardRef](./109-reference-react-forwardref.mdx) | Type: Reference | Summary: forwardRef
- [110 — Built-in React Hooks](./110-reference-react-hooks.mdx) | Type: Reference | Summary: Built-in React Hooks
- [111 — React Reference Overview](./111-reference-react-index.mdx) | Type: Reference | Summary: React Reference Overview
- [112 — isValidElement](./112-reference-react-isvalidelement.mdx) | Type: Reference | Summary: isValidElement
- [113 — lazy](./113-reference-react-lazy.mdx) | Type: Reference | Summary: lazy
- [114 — Legacy React APIs](./114-reference-react-legacy.mdx) | Type: Reference | Summary: Legacy React APIs
- [115 — memo](./115-reference-react-memo.mdx) | Type: Reference | Summary: memo
- [116 — startTransition](./116-reference-react-starttransition.mdx) | Type: Reference | Summary: startTransition
- [117 — use](./117-reference-react-use.mdx) | Type: Reference | Summary: use
- [118 — useActionState](./118-reference-react-useactionstate.mdx) | Type: Reference | Summary: useActionState
- [119 — useCallback](./119-reference-react-usecallback.mdx) | Type: Reference | Summary: useCallback
- [120 — useContext](./120-reference-react-usecontext.mdx) | Type: Reference | Summary: useContext
- [121 — useDebugValue](./121-reference-react-usedebugvalue.mdx) | Type: Reference | Summary: useDebugValue
- [122 — useDeferredValue](./122-reference-react-usedeferredvalue.mdx) | Type: Reference | Summary: useDeferredValue
- [123 — useEffect](./123-reference-react-useeffect.mdx) | Type: Reference | Summary: useEffect
- [124 — useEffectEvent](./124-reference-react-useeffectevent.mdx) | Type: Reference | Summary: useEffectEvent
- [125 — useId](./125-reference-react-useid.mdx) | Type: Reference | Summary: useId
- [126 — useImperativeHandle](./126-reference-react-useimperativehandle.mdx) | Type: Reference | Summary: useImperativeHandle
- [127 — useInsertionEffect](./127-reference-react-useinsertioneffect.mdx) | Type: Reference | Summary: useInsertionEffect
- [128 — useLayoutEffect](./128-reference-react-uselayouteffect.mdx) | Type: Reference | Summary: useLayoutEffect
- [129 — useMemo](./129-reference-react-usememo.mdx) | Type: Reference | Summary: useMemo
- [130 — useOptimistic](./130-reference-react-useoptimistic.mdx) | Type: Reference | Summary: useOptimistic
- [131 — useReducer](./131-reference-react-usereducer.mdx) | Type: Reference | Summary: useReducer
- [132 — useRef](./132-reference-react-useref.mdx) | Type: Reference | Summary: useRef
- [133 — useState](./133-reference-react-usestate.mdx) | Type: Reference | Summary: useState
- [134 — useSyncExternalStore](./134-reference-react-usesyncexternalstore.mdx) | Type: Reference | Summary: useSyncExternalStore
- [135 — useTransition](./135-reference-react-usetransition.mdx) | Type: Reference | Summary: useTransition

### React Compiler (reference)

- [136 — compilationMode](./136-reference-react-compiler-compilationmode.mdx) | Type: Reference | Summary: compilationMode
- [137 — Compiling Libraries](./137-reference-react-compiler-compiling-libraries.mdx) | Type: Reference | Summary: Compiling Libraries
- [138 — Configuration](./138-reference-react-compiler-configuration.mdx) | Type: Reference | Summary: Configuration
- [139 — use memo](./139-reference-react-compiler-directives-use-memo.mdx) | Type: Reference | Summary: use memo
- [140 — use no memo](./140-reference-react-compiler-directives-use-no-memo.mdx) | Type: Reference | Summary: use no memo
- [141 — Directives](./141-reference-react-compiler-directives.mdx) | Type: Reference | Summary: Directives
- [142 — gating](./142-reference-react-compiler-gating.mdx) | Type: Reference | Summary: gating
- [143 — logger](./143-reference-react-compiler-logger.mdx) | Type: Reference | Summary: logger
- [144 — panicThreshold](./144-reference-react-compiler-panicthreshold.mdx) | Type: Reference | Summary: panicThreshold
- [145 — target](./145-reference-react-compiler-target.mdx) | Type: Reference | Summary: target

### Package react-dom (`react-dom`)

- [146 — createRoot](./146-reference-react-dom-client-createroot.mdx) | Type: Reference | Summary: createRoot
- [147 — hydrateRoot](./147-reference-react-dom-client-hydrateroot.mdx) | Type: Reference | Summary: hydrateRoot
- [148 — Client React DOM APIs](./148-reference-react-dom-client-index.mdx) | Type: Reference | Summary: Client React DOM APIs
- [149 — Common components (e.g. <div>)](./149-reference-react-dom-components-common.mdx) | Type: Reference | Summary: Common components (e.g. <div>)
- [150 — <form>](./150-reference-react-dom-components-form.mdx) | Type: Reference | Summary: <form>
- [151 — React DOM Components](./151-reference-react-dom-components-index.mdx) | Type: Reference | Summary: React DOM Components
- [152 — <input>](./152-reference-react-dom-components-input.mdx) | Type: Reference | Summary: <input>
- [153 — Built-in `<link>`](./153-reference-react-dom-components-link.mdx) | Type: Reference | Summary: Document `<link>`
- [154 — Built-in `<meta>`](./154-reference-react-dom-components-meta.mdx) | Type: Reference | Summary: Document `<meta>`
- [155 — <option>](./155-reference-react-dom-components-option.mdx) | Type: Reference | Summary: <option>
- [156 — <progress>](./156-reference-react-dom-components-progress.mdx) | Type: Reference | Summary: <progress>
- [157 — Built-in `<script>`](./157-reference-react-dom-components-script.mdx) | Type: Reference | Summary: Document `<script>`
- [158 — <select>](./158-reference-react-dom-components-select.mdx) | Type: Reference | Summary: <select>
- [159 — Built-in `<style>`](./159-reference-react-dom-components-style.mdx) | Type: Reference | Summary: Document `<style>`
- [160 — <textarea>](./160-reference-react-dom-components-textarea.mdx) | Type: Reference | Summary: <textarea>
- [161 — <title>](./161-reference-react-dom-components-title.mdx) | Type: Reference | Summary: <title>
- [162 — createPortal](./162-reference-react-dom-createportal.mdx) | Type: Reference | Summary: createPortal
- [163 — flushSync](./163-reference-react-dom-flushsync.mdx) | Type: Reference | Summary: flushSync
- [164 — Built-in React DOM Hooks](./164-reference-react-dom-hooks-index.mdx) | Type: Reference | Summary: Built-in React DOM Hooks
- [165 — useFormStatus](./165-reference-react-dom-hooks-useformstatus.mdx) | Type: Reference | Summary: useFormStatus
- [166 — React DOM APIs](./166-reference-react-dom-index.mdx) | Type: Reference | Summary: React DOM APIs
- [167 — preconnect](./167-reference-react-dom-preconnect.mdx) | Type: Reference | Summary: preconnect
- [168 — prefetchDNS](./168-reference-react-dom-prefetchdns.mdx) | Type: Reference | Summary: prefetchDNS
- [169 — preinit](./169-reference-react-dom-preinit.mdx) | Type: Reference | Summary: preinit
- [170 — preinitModule](./170-reference-react-dom-preinitmodule.mdx) | Type: Reference | Summary: preinitModule
- [171 — preload](./171-reference-react-dom-preload.mdx) | Type: Reference | Summary: preload
- [172 — preloadModule](./172-reference-react-dom-preloadmodule.mdx) | Type: Reference | Summary: preloadModule
- [173 — Server React DOM APIs](./173-reference-react-dom-server-index.mdx) | Type: Reference | Summary: Server React DOM APIs
- [174 — renderToPipeableStream](./174-reference-react-dom-server-rendertopipeablestream.mdx) | Type: Reference | Summary: renderToPipeableStream
- [175 — renderToReadableStream](./175-reference-react-dom-server-rendertoreadablestream.mdx) | Type: Reference | Summary: renderToReadableStream
- [176 — renderToStaticMarkup](./176-reference-react-dom-server-rendertostaticmarkup.mdx) | Type: Reference | Summary: renderToStaticMarkup
- [177 — renderToString](./177-reference-react-dom-server-rendertostring.mdx) | Type: Reference | Summary: renderToString
- [178 — resume](./178-reference-react-dom-server-resume.mdx) | Type: Reference | Summary: resume
- [179 — resumeToPipeableStream](./179-reference-react-dom-server-resumetopipeablestream.mdx) | Type: Reference | Summary: resumeToPipeableStream
- [180 — Static React DOM APIs](./180-reference-react-dom-static-index.mdx) | Type: Reference | Summary: Static React DOM APIs
- [181 — prerender](./181-reference-react-dom-static-prerender.mdx) | Type: Reference | Summary: prerender
- [182 — prerenderToNodeStream](./182-reference-react-dom-static-prerendertonodestream.mdx) | Type: Reference | Summary: prerenderToNodeStream
- [183 — resumeAndPrerender](./183-reference-react-dom-static-resumeandprerender.mdx) | Type: Reference | Summary: resumeAndPrerender
- [184 — resumeAndPrerenderToNodeStream](./184-reference-react-dom-static-resumeandprerendertonodestream.mdx) | Type: Reference | Summary: resumeAndPrerenderToNodeStream

### React Server Components (`react`/RSC)

- [185 — Directives](./185-reference-rsc-directives.mdx) | Type: Reference | Summary: Directives
- [186 — Server Components](./186-reference-rsc-server-components.mdx) | Type: Reference | Summary: Server Components
- [187 — Server Functions](./187-reference-rsc-server-functions.mdx) | Type: Reference | Summary: Server Functions
- [188 — 'use client'](./188-reference-rsc-use-client.mdx) | Type: Reference | Summary: 'use client'
- [189 — 'use server'](./189-reference-rsc-use-server.mdx) | Type: Reference | Summary: 'use server'

### Rules of React

- [190 — Components and Hooks must be pure](./190-reference-rules-components-and-hooks-must-be-pure.mdx) | Type: Reference | Summary: Components and Hooks must be pure
- [191 — Rules of React](./191-reference-rules-index.mdx) | Type: Reference | Summary: Rules of React
- [192 — React calls Components and Hooks](./192-reference-rules-react-calls-components-and-hooks.mdx) | Type: Reference | Summary: React calls Components and Hooks
- [193 — Rules of Hooks](./193-reference-rules-rules-of-hooks.mdx) | Type: Reference | Summary: Rules of Hooks

## Versions

- [194 — React Versions](./194-versions.mdx) | Type: Conceptual | Summary: React Versions

## Warnings

- [195 — Invalid ARIA Prop Warning](./195-warnings-invalid-aria-prop.mdx) | Type: Conceptual | Summary: Invalid ARIA Prop Warning
- [196 — Rules of Hooks](./196-warnings-invalid-hook-call-warning.mdx) | Type: Conceptual | Summary: Rules of Hooks
- [197 — react-dom/test-utils Deprecation Warnings](./197-warnings-react-dom-test-utils.mdx) | Type: Conceptual | Summary: react-dom/test-utils Deprecation Warnings
- [198 — react-test-renderer Deprecation Warnings](./198-warnings-react-test-renderer.mdx) | Type: Conceptual | Summary: react-test-renderer Deprecation Warnings
- [199 — Special Props Warning](./199-warnings-special-props.mdx) | Type: Conceptual | Summary: Special Props Warning
- [200 — Unknown Prop Warning](./200-warnings-unknown-prop.mdx) | Type: Conceptual | Summary: Unknown Prop Warning

## Files in this directory

| File | Note |
|------|------|
| `INDEX.md` | This navigation file |
| `NNN-*.mdx` | Mirror pages (number + path-derived slug) |

