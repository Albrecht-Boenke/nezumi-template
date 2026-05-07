---
title: TypeScript — documentation index
description: Handbook and TSConfig mirrors; flat numbered `NNN-*.mdx` files; see “Agent retrieval”.
---

# TypeScript documentation

## Project pins (read first)

Project Catalog pins from `pnpm-workspace.yaml`:

- `typescript`: `^6.0.3`
- `@types/node`: `^24.12.2`
- `@types/react`: `^19.2.14`
- `@types/react-dom`: `^19.2.3`

The root `package.json` declares `typescript` as `catalog:`. These are workspace Catalog ranges, not proof of the exact installed version. The offline mirror in this directory is reference text from typescriptlang.org and does not prove the installed project version. For an exact resolved version, verify the lockfile or the active install. If present, the cross-framework stack summary is [`../../FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

Offline mirror: flat files `NNN-slug.mdx` in this directory (`NNN` is three digits).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

## Agent retrieval

Use this file as the **single navigation root**. Do **not** assume nested `handbook/` or `tsconfig/` paths; all pages are **flat** `NNN-kebab-slug.mdx` next to `INDEX.md`.

| Need | Where to look |
|------|----------------|
| Language / handbook narrative | Sections **Handbook v2**, **Get started**, **Declaration files**, etc. |
| A specific compiler flag | Section **TSConfig — Compiler options**, then match `NNN-tsconfig-options-<flagname>.mdx` or search the index line for the flag name. |
| `tsconfig` structure / big groups | **TSConfig — Section overviews**, **TSConfig — Categories**, **TSConfig — Intro** |
| Release history | **Release notes** (chronological by upstream filename, not by `NNN`) |

**Rules:** The numeric prefix `NNN` is a stable slot (001–299), not a topic priority. Prefer the **Summary** on each index line to pick the right file. Slug tails like `handbook-handbook-v2-*` come from upstream paths; when in doubt, open the linked `mdx` by **number from this index**, not from guessed paths. Template pages for `.d.ts` snippets use the suffix `-dts` in the filename (not a second file extension).

---

## Nightly builds

- [001 — Nightly Builds](./001-handbook-nightly-builds.mdx) | Type: Conceptual | Summary: How to use a nightly build of TypeScript

## Declaration files

- [002 — Declaration Reference](./002-handbook-declaration-files-by-example.mdx) | Type: Conceptual | Summary: How to create a d.ts file for a module
- [003 — Consumption](./003-handbook-declaration-files-consumption.mdx) | Type: Conceptual | Summary: How to download d.ts files for your project
- [004 — Deep Dive](./004-handbook-declaration-files-deep-dive.mdx) | Type: Conceptual | Summary: How do d.ts files work, a deep dive
- [005 — Do's and Don'ts](./005-handbook-declaration-files-do-s-and-don-ts.mdx) | Type: Conceptual | Summary: Recommendations for writing d.ts files
- [006 — Introduction](./006-handbook-declaration-files-introduction.mdx) | Type: Conceptual | Summary: How to write a high-quality TypeScript Declaration (d.ts) file
- [007 — Library Structures](./007-handbook-declaration-files-library-structures.mdx) | Type: Conceptual | Summary: How to structure your d.ts files
- [008 — Publishing](./008-handbook-declaration-files-publishing.mdx) | Type: Conceptual | Summary: How to get your d.ts files to users
- [009 — Templates](./009-handbook-declaration-files-templates.mdx) | Type: Conceptual | Summary: Different d.ts module template examples
- [010 — Global: Modifying Module](./010-handbook-declaration-files-templates-global-modifying-module-dts.mdx) | Type: Conceptual | Summary: Global: Modifying Module
- [011 — Global: Plugin](./011-handbook-declaration-files-templates-global-plugin-dts.mdx) | Type: Conceptual | Summary: Global: Plugin
- [012 — Global .d.ts](./012-handbook-declaration-files-templates-global-dts.mdx) | Type: Conceptual | Summary: Global .d.ts
- [013 — Module: Class](./013-handbook-declaration-files-templates-module-class-dts.mdx) | Type: Conceptual | Summary: Module: Class
- [014 — Module: Function](./014-handbook-declaration-files-templates-module-function-dts.mdx) | Type: Conceptual | Summary: Module: Function
- [015 — Module: Plugin](./015-handbook-declaration-files-templates-module-plugin-dts.mdx) | Type: Conceptual | Summary: Module: Plugin
- [016 — Modules .d.ts](./016-handbook-declaration-files-templates-module-dts.mdx) | Type: Conceptual | Summary: Modules .d.ts

## Get started

- [017 — TypeScript for Functional Programmers](./017-handbook-get-started-ts-for-functional-programmers.mdx) | Type: Tutorial | Summary: Learn TypeScript if you have a background in functional programming
- [018 — TypeScript for JavaScript Programmers](./018-handbook-get-started-ts-for-js-programmers.mdx) | Type: Tutorial | Summary: Learn how TypeScript extends JavaScript
- [019 — TypeScript for Java/C# Programmers](./019-handbook-get-started-ts-for-oopers.mdx) | Type: Tutorial | Summary: Learn TypeScript if you have a background in object-oriented languages
- [020 — TypeScript for the New Programmer](./020-handbook-get-started-ts-for-the-new-programmer.mdx) | Type: Tutorial | Summary: Learn TypeScript from scratch

## Handbook v1 (legacy)

- [021 — Basic Types](./021-handbook-handbook-v1-basic-types.mdx) | Type: Conceptual | Summary: Step two in learning TypeScript: The basic types.
- [022 — Classes](./022-handbook-handbook-v1-classes.mdx) | Type: Conceptual | Summary: How classes work in TypeScript
- [023 — Functions](./023-handbook-handbook-v1-functions.mdx) | Type: Conceptual | Summary: How to add types to a function
- [024 — Generics](./024-handbook-handbook-v1-generics.mdx) | Type: Conceptual | Summary: Introduction to TypeScript and Generics
- [025 — Interfaces](./025-handbook-handbook-v1-interfaces.mdx) | Type: Conceptual | Summary: How to write an interface with TypeScript
- [026 — Literal Types](./026-handbook-handbook-v1-literal-types.mdx) | Type: Conceptual | Summary: Using literal types with TypeScript
- [027 — Unions and Intersection Types](./027-handbook-handbook-v1-unions-and-intersections.mdx) | Type: Conceptual | Summary: How to use unions and intersection types in TypeScript

## Handbook v2

- [028 — The Basics](./028-handbook-handbook-v2-basics.mdx) | Type: Conceptual | Summary: Step one in learning TypeScript: The basic types.
- [029 — Classes](./029-handbook-handbook-v2-classes.mdx) | Type: Conceptual | Summary: How classes work in TypeScript
- [030 — Everyday Types](./030-handbook-handbook-v2-everyday-types.mdx) | Type: Conceptual | Summary: The language primitives.
- [031 — Modules](./031-handbook-handbook-v2-modules.mdx) | Type: Conceptual | Summary: How JavaScript handles communicating across file boundaries.
- [032 — More on Functions](./032-handbook-handbook-v2-more-on-functions.mdx) | Type: Conceptual | Summary: Learn about how Functions work in TypeScript.
- [033 — Narrowing](./033-handbook-handbook-v2-narrowing.mdx) | Type: Conceptual | Summary: Understand how TypeScript uses JavaScript knowledge to reduce the amount of type syntax in your projects.
- [034 — Object Types](./034-handbook-handbook-v2-object-types.mdx) | Type: Conceptual | Summary: How TypeScript describes the shapes of JavaScript objects.
- [035 — The TypeScript Handbook](./035-handbook-handbook-v2-the-handbook.mdx) | Type: Conceptual | Summary: Your first step to learn TypeScript
- [036 — Type Declarations](./036-handbook-handbook-v2-type-declarations.mdx) | Type: Conceptual | Summary: How TypeScript provides types for un-typed JavaScript.
- [037 — Conditional Types](./037-handbook-handbook-v2-type-manipulation-conditional-types.mdx) | Type: Conceptual | Summary: Create types which act like if statements in the type system.
- [038 — Generics](./038-handbook-handbook-v2-type-manipulation-generics.mdx) | Type: Conceptual | Summary: Types which take parameters
- [039 — Indexed Access Types](./039-handbook-handbook-v2-type-manipulation-indexed-access-types.mdx) | Type: Conceptual | Summary: Using Type['a'] syntax to access a subset of a type.
- [040 — Keyof Type Operator](./040-handbook-handbook-v2-type-manipulation-keyof-type-operator.mdx) | Type: Conceptual | Summary: Using the keyof operator in type contexts.
- [041 — Mapped Types](./041-handbook-handbook-v2-type-manipulation-mapped-types.mdx) | Type: Conceptual | Summary: Generating types by re-using an existing type.
- [042 — Template Literal Types](./042-handbook-handbook-v2-type-manipulation-template-literal-types.mdx) | Type: Conceptual | Summary: Generating mapping types which change properties via template literal strings.
- [043 — Typeof Type Operator](./043-handbook-handbook-v2-type-manipulation-typeof-type-operator.mdx) | Type: Conceptual | Summary: Using the typeof operator in type contexts.
- [044 — Creating Types from Types](./044-handbook-handbook-v2-type-manipulation-creating-types-from-types.mdx) | Type: Conceptual | Summary: An overview of the ways in which you can create more types from existing types.
- [045 — Understanding Errors](./045-handbook-handbook-v2-understanding-errors.mdx) | Type: Conceptual | Summary: How to read TypeScript errors.

## JavaScript

- [046 — Creating .d.ts Files from .js files](./046-handbook-javascript-creating-dts-files-from-js.mdx) | Type: Conceptual | Summary: How to add d.ts generation to JavaScript projects
- [047 — JS Projects Utilizing TypeScript](./047-handbook-javascript-intro-to-js-with-ts.mdx) | Type: Conceptual | Summary: How to add type checking to JavaScript files using TypeScript
- [048 — JSDoc Reference](./048-handbook-javascript-jsdoc-reference.mdx) | Type: Conceptual | Summary: What JSDoc does TypeScript-powered JavaScript support?
- [049 — Type Checking JavaScript Files](./049-handbook-javascript-type-checking-javascript-files.mdx) | Type: Conceptual | Summary: How to add type checking to JavaScript files using TypeScript

## Modules reference

- [050 — Modules - Introduction](./050-handbook-modules-reference-introduction.mdx) | Type: Conceptual | Summary: How TypeScript models JavaScript modules
- [051 — Modules - Reference](./051-handbook-modules-reference-reference.mdx) | Type: Conceptual | Summary: Module syntax and compiler options reference
- [052 — Modules - Theory](./052-handbook-modules-reference-theory.mdx) | Type: Conceptual | Summary: How TypeScript models JavaScript modules
- [053 — Modules - ESM/CJS Interoperability](./053-handbook-modules-reference-appendices-esm-cjs-interop.mdx) | Type: Conceptual | Summary: A detailed look at interoperability between ES modules and CommonJS modules
- [054 — Handbook Modules Reference Diagrams Esm Cjs Interop](./054-handbook-modules-reference-diagrams-esm-cjs-interop.mdx) | Type: Conceptual | Summary: Handbook Modules Reference Diagrams Esm Cjs Interop
- [055 — Handbook Modules Reference Diagrams Theory](./055-handbook-modules-reference-diagrams-theory.mdx) | Type: Conceptual | Summary: Handbook Modules Reference Diagrams Theory
- [056 — Modules - Choosing Compiler Options](./056-handbook-modules-reference-guides-choosing-compiler-options.mdx) | Type: Conceptual | Summary: How to choose compiler options that reflect your module environment

## Project config

- [057 — Compiler Options in MSBuild](./057-handbook-project-config-compiler-options-in-msbuild.mdx) | Type: Conceptual | Summary: Which compiler options are available in MSBuild projects.
- [058 — tsc CLI Options](./058-handbook-project-config-compiler-options.mdx) | Type: Conceptual | Summary: A very high-level overview of the CLI compiler options for tsc
- [059 — Configuring Watch](./059-handbook-project-config-configuring-watch.mdx) | Type: Conceptual | Summary: How to configure the watch mode of TypeScript
- [060 — Integrating with Build Tools](./060-handbook-project-config-integrating-with-build-tools.mdx) | Type: Conceptual | Summary: How to use TypeScript with other build tools
- [061 — Project References](./061-handbook-project-config-project-references.mdx) | Type: Conceptual | Summary: How to split up a large TypeScript project
- [062 — What is a tsconfig.json](./062-handbook-project-config-tsconfig.json.mdx) | Type: Conceptual | Summary: Learn about how a TSConfig works

## Language reference (handbook)

- [063 — Advanced Types](./063-handbook-reference-advanced-types.mdx) | Type: Conceptual | Summary: Advanced concepts around types in TypeScript
- [064 — Declaration Merging](./064-handbook-reference-declaration-merging.mdx) | Type: Conceptual | Summary: How merging namespaces and interfaces works
- [065 — Decorators](./065-handbook-reference-decorators.mdx) | Type: Conceptual | Summary: TypeScript Decorators overview
- [066 — Enums](./066-handbook-reference-enums.mdx) | Type: Conceptual | Summary: How TypeScript enums work
- [067 — Iterators and Generators](./067-handbook-reference-iterators-and-generators.mdx) | Type: Conceptual | Summary: How Iterators and Generators work in TypeScript
- [068 — JSX](./068-handbook-reference-jsx.mdx) | Type: Conceptual | Summary: Using JSX with TypeScript
- [069 — Mixins](./069-handbook-reference-mixins.mdx) | Type: Conceptual | Summary: Using the mixin pattern with TypeScript
- [070 — Namespaces and Modules](./070-handbook-reference-namespaces-and-modules.mdx) | Type: Conceptual | Summary: How to organize code in TypeScript via modules or namespaces
- [071 — Namespaces](./071-handbook-reference-namespaces.mdx) | Type: Conceptual | Summary: How TypeScript namespaces work
- [072 — Symbols](./072-handbook-reference-symbols.mdx) | Type: Conceptual | Summary: Using the JavaScript Symbol primitive in TypeScript
- [073 — Triple-Slash Directives](./073-handbook-reference-triple-slash-directives.mdx) | Type: Conceptual | Summary: How to use triple slash directives in TypeScript
- [074 — Type Compatibility](./074-handbook-reference-type-compatibility.mdx) | Type: Conceptual | Summary: How type-checking works in TypeScript
- [075 — Type Inference](./075-handbook-reference-type-inference.mdx) | Type: Conceptual | Summary: How code flow analysis works in TypeScript
- [076 — Utility Types](./076-handbook-reference-utility-types.mdx) | Type: Conceptual | Summary: Types which are globally included in TypeScript
- [077 — Variable Declaration](./077-handbook-reference-variable-declarations.mdx) | Type: Conceptual | Summary: How TypeScript handles variable declaration

## Release notes

- [078 — TypeScript 1.1](./078-handbook-release-notes-typescript-1.1.mdx) | Type: Conceptual | Summary: TypeScript 1.1 Release Notes
- [079 — TypeScript 1.3](./079-handbook-release-notes-typescript-1.3.mdx) | Type: Conceptual | Summary: TypeScript 1.3 Release Notes
- [080 — TypeScript 1.4](./080-handbook-release-notes-typescript-1.4.mdx) | Type: Conceptual | Summary: TypeScript 1.3 Release Notes
- [081 — TypeScript 1.5](./081-handbook-release-notes-typescript-1.5.mdx) | Type: Conceptual | Summary: TypeScript 1.5 Release Notes
- [082 — TypeScript 1.6](./082-handbook-release-notes-typescript-1.6.mdx) | Type: Conceptual | Summary: TypeScript 1.6 Release Notes
- [083 — TypeScript 1.7](./083-handbook-release-notes-typescript-1.7.mdx) | Type: Conceptual | Summary: TypeScript 1.7 Release Notes
- [084 — TypeScript 1.8](./084-handbook-release-notes-typescript-1.8.mdx) | Type: Conceptual | Summary: TypeScript 1.8 Release Notes
- [085 — TypeScript 2.0](./085-handbook-release-notes-typescript-2.0.mdx) | Type: Conceptual | Summary: TypeScript 2.0 Release Notes
- [086 — TypeScript 2.1](./086-handbook-release-notes-typescript-2.1.mdx) | Type: Conceptual | Summary: TypeScript 2.1 Release Notes
- [087 — TypeScript 2.2](./087-handbook-release-notes-typescript-2.2.mdx) | Type: Conceptual | Summary: TypeScript 2.2 Release Notes
- [088 — TypeScript 2.3](./088-handbook-release-notes-typescript-2.3.mdx) | Type: Conceptual | Summary: TypeScript 2.3 Release Notes
- [089 — TypeScript 2.4](./089-handbook-release-notes-typescript-2.4.mdx) | Type: Conceptual | Summary: TypeScript 2.4 Release Notes
- [090 — TypeScript 2.5](./090-handbook-release-notes-typescript-2.5.mdx) | Type: Conceptual | Summary: TypeScript 2.5 Release Notes
- [091 — TypeScript 2.6](./091-handbook-release-notes-typescript-2.6.mdx) | Type: Conceptual | Summary: TypeScript 2.6 Release Notes
- [092 — TypeScript 2.7](./092-handbook-release-notes-typescript-2.7.mdx) | Type: Conceptual | Summary: TypeScript 2.7 Release Notes
- [093 — TypeScript 2.8](./093-handbook-release-notes-typescript-2.8.mdx) | Type: Conceptual | Summary: TypeScript 2.8 Release Notes
- [094 — TypeScript 2.9](./094-handbook-release-notes-typescript-2.9.mdx) | Type: Conceptual | Summary: TypeScript 2.9 Release Notes
- [095 — TypeScript 3.0](./095-handbook-release-notes-typescript-3.0.mdx) | Type: Conceptual | Summary: TypeScript 3.0 Release Notes
- [096 — TypeScript 3.1](./096-handbook-release-notes-typescript-3.1.mdx) | Type: Conceptual | Summary: TypeScript 3.1 Release Notes
- [097 — TypeScript 3.2](./097-handbook-release-notes-typescript-3.2.mdx) | Type: Conceptual | Summary: TypeScript 3.2 Release Notes
- [098 — TypeScript 3.3](./098-handbook-release-notes-typescript-3.3.mdx) | Type: Conceptual | Summary: TypeScript 3.3 Release Notes
- [099 — TypeScript 3.4](./099-handbook-release-notes-typescript-3.4.mdx) | Type: Conceptual | Summary: TypeScript 3.4 Release Notes
- [100 — TypeScript 3.5](./100-handbook-release-notes-typescript-3.5.mdx) | Type: Conceptual | Summary: TypeScript 3.5 Release Notes
- [101 — TypeScript 3.6](./101-handbook-release-notes-typescript-3.6.mdx) | Type: Conceptual | Summary: TypeScript 3.6 Release Notes
- [102 — TypeScript 3.7](./102-handbook-release-notes-typescript-3.7.mdx) | Type: Conceptual | Summary: TypeScript 3.7 Release Notes
- [103 — TypeScript 3.8](./103-handbook-release-notes-typescript-3.8.mdx) | Type: Conceptual | Summary: TypeScript 3.8 Release Notes
- [104 — TypeScript 3.9](./104-handbook-release-notes-typescript-3.9.mdx) | Type: Conceptual | Summary: TypeScript 3.9 Release Notes
- [105 — TypeScript 4.0](./105-handbook-release-notes-typescript-4.0.mdx) | Type: Conceptual | Summary: TypeScript 4.0 Release Notes
- [106 — TypeScript 4.1](./106-handbook-release-notes-typescript-4.1.mdx) | Type: Conceptual | Summary: TypeScript 4.1 Release Notes
- [107 — TypeScript 4.2](./107-handbook-release-notes-typescript-4.2.mdx) | Type: Conceptual | Summary: TypeScript 4.2 Release Notes
- [108 — TypeScript 4.3](./108-handbook-release-notes-typescript-4.3.mdx) | Type: Conceptual | Summary: TypeScript 4.3 Release Notes
- [109 — TypeScript 4.4](./109-handbook-release-notes-typescript-4.4.mdx) | Type: Conceptual | Summary: TypeScript 4.4 Release Notes
- [110 — TypeScript 4.5](./110-handbook-release-notes-typescript-4.5.mdx) | Type: Conceptual | Summary: TypeScript 4.5 Release Notes
- [111 — TypeScript 4.6](./111-handbook-release-notes-typescript-4.6.mdx) | Type: Conceptual | Summary: TypeScript 4.6 Release Notes
- [112 — TypeScript 4.7](./112-handbook-release-notes-typescript-4.7.mdx) | Type: Conceptual | Summary: TypeScript 4.7 Release Notes
- [113 — TypeScript 4.8](./113-handbook-release-notes-typescript-4.8.mdx) | Type: Conceptual | Summary: TypeScript 4.8 Release Notes
- [114 — TypeScript 4.9](./114-handbook-release-notes-typescript-4.9.mdx) | Type: Conceptual | Summary: TypeScript 4.9 Release Notes
- [115 — TypeScript 5.0](./115-handbook-release-notes-typescript-5.0.mdx) | Type: Conceptual | Summary: TypeScript 5.0 Release Notes
- [116 — TypeScript 5.1](./116-handbook-release-notes-typescript-5.1.mdx) | Type: Conceptual | Summary: TypeScript 5.1 Release Notes
- [117 — TypeScript 5.2](./117-handbook-release-notes-typescript-5.2.mdx) | Type: Conceptual | Summary: TypeScript 5.2 Release Notes
- [118 — TypeScript 5.3](./118-handbook-release-notes-typescript-5.3.mdx) | Type: Conceptual | Summary: TypeScript 5.3 Release Notes
- [119 — TypeScript 5.4](./119-handbook-release-notes-typescript-5.4.mdx) | Type: Conceptual | Summary: TypeScript 5.4 Release Notes
- [120 — TypeScript 5.5](./120-handbook-release-notes-typescript-5.5.mdx) | Type: Conceptual | Summary: TypeScript 5.5 Release Notes
- [121 — TypeScript 5.6](./121-handbook-release-notes-typescript-5.6.mdx) | Type: Conceptual | Summary: TypeScript 5.6 Release Notes
- [122 — TypeScript 5.7](./122-handbook-release-notes-typescript-5.7.mdx) | Type: Conceptual | Summary: TypeScript 5.7 Release Notes
- [123 — TypeScript 5.8](./123-handbook-release-notes-typescript-5.8.mdx) | Type: Conceptual | Summary: TypeScript 5.8 Release Notes
- [124 — TypeScript 5.9](./124-handbook-release-notes-typescript-5.9.mdx) | Type: Conceptual | Summary: TypeScript 5.9 Release Notes
- [125 — TypeScript 6.0](./125-handbook-release-notes-typescript-6.0.mdx) | Type: Conceptual | Summary: TypeScript 6.0 Release Notes

## Tutorials

Slots **126**, **127**, **128**, and **130** are deliberately empty in this template: upstream tutorials targeted ASP.NET Core, Angular, Babel-heavy hybrid builds, and Gulp workflows that do not align with Nezumi (React / Next.js / Turbopack or `tsc`-centric tooling).

- [129 — DOM Manipulation](./129-handbook-tutorials-dom-manipulation.mdx) | Type: Tutorial | Summary: Using the DOM with TypeScript
- [131 — Migrating from JavaScript](./131-handbook-tutorials-migrating-from-javascript.mdx) | Type: Tutorial | Summary: How to migrate from JavaScript to TypeScript
- [132 — React](./132-handbook-tutorials-react.mdx) | Type: Tutorial | Summary: Links to learn about TypeScript and React
- [133 — TypeScript Tooling in 5 minutes](./133-handbook-tutorials-typescript-tooling-in-5-minutes.mdx) | Type: Tutorial | Summary: A tutorial to understand how to create a small website with TypeScript

## TSConfig — Intro

- [157 — Tsconfig Intro](./157-tsconfig-intro.mdx) | Type: Conceptual | Summary: Tsconfig Intro

## TSConfig — Section overviews

- [295 — Tsconfig Sections Top Level](./295-tsconfig-sections-top-level.mdx) | Type: Reference | Summary: Tsconfig Sections Top Level
- [296 — Tsconfig Sections Buildoptions](./296-tsconfig-sections-buildoptions.mdx) | Type: Reference | Summary: Tsconfig Sections Buildoptions
- [297 — Tsconfig Sections Compileroptions](./297-tsconfig-sections-compileroptions.mdx) | Type: Reference | Summary: Tsconfig Sections Compileroptions
- [298 — Tsconfig Sections Typeacquisition](./298-tsconfig-sections-typeacquisition.mdx) | Type: Reference | Summary: Tsconfig Sections Typeacquisition
- [299 — Tsconfig Sections Watchoptions](./299-tsconfig-sections-watchoptions.mdx) | Type: Reference | Summary: Tsconfig Sections Watchoptions

## TSConfig — Categories

- [134 — Tsconfig Categories Additional Checks 6176](./134-tsconfig-categories-additional-checks-6176.mdx) | Type: Reference | Summary: Tsconfig Categories Additional Checks 6176
- [135 — Tsconfig Categories Advanced Options 6178](./135-tsconfig-categories-advanced-options-6178.mdx) | Type: Reference | Summary: Tsconfig Categories Advanced Options 6178
- [136 — Tsconfig Categories Backwards Compatibility 6253](./136-tsconfig-categories-backwards-compatibility-6253.mdx) | Type: Reference | Summary: Tsconfig Categories Backwards Compatibility 6253
- [137 — Tsconfig Categories Basic Options 6172](./137-tsconfig-categories-basic-options-6172.mdx) | Type: Reference | Summary: Tsconfig Categories Basic Options 6172
- [138 — Tsconfig Categories Command Line Options 6171](./138-tsconfig-categories-command-line-options-6171.mdx) | Type: Reference | Summary: Tsconfig Categories Command Line Options 6171
- [139 — Tsconfig Categories Compiler Diagnostics 6251](./139-tsconfig-categories-compiler-diagnostics-6251.mdx) | Type: Reference | Summary: Tsconfig Categories Compiler Diagnostics 6251
- [140 — Tsconfig Categories Completeness 6257](./140-tsconfig-categories-completeness-6257.mdx) | Type: Reference | Summary: Tsconfig Categories Completeness 6257
- [141 — Tsconfig Categories Editor Support 6249](./141-tsconfig-categories-editor-support-6249.mdx) | Type: Reference | Summary: Tsconfig Categories Editor Support 6249
- [142 — Tsconfig Categories Emit 6246](./142-tsconfig-categories-emit-6246.mdx) | Type: Reference | Summary: Tsconfig Categories Emit 6246
- [143 — Tsconfig Categories Experimental Options 6177](./143-tsconfig-categories-experimental-options-6177.mdx) | Type: Reference | Summary: Tsconfig Categories Experimental Options 6177
- [144 — Tsconfig Categories Interop Constraints 6252](./144-tsconfig-categories-interop-constraints-6252.mdx) | Type: Reference | Summary: Tsconfig Categories Interop Constraints 6252
- [145 — Tsconfig Categories Javascript Support 6247](./145-tsconfig-categories-javascript-support-6247.mdx) | Type: Reference | Summary: Tsconfig Categories Javascript Support 6247
- [146 — Tsconfig Categories Language And Environment 6254](./146-tsconfig-categories-language-and-environment-6254.mdx) | Type: Reference | Summary: Tsconfig Categories Language And Environment 6254
- [147 — Tsconfig Categories Module Resolution Options 6174](./147-tsconfig-categories-module-resolution-options-6174.mdx) | Type: Reference | Summary: Tsconfig Categories Module Resolution Options 6174
- [148 — Tsconfig Categories Modules 6244](./148-tsconfig-categories-modules-6244.mdx) | Type: Reference | Summary: Tsconfig Categories Modules 6244
- [149 — Tsconfig Categories Output Formatting 6256](./149-tsconfig-categories-output-formatting-6256.mdx) | Type: Reference | Summary: Tsconfig Categories Output Formatting 6256
- [150 — Tsconfig Categories Project Files 0](./150-tsconfig-categories-project-files-0.mdx) | Type: Reference | Summary: Tsconfig Categories Project Files 0
- [151 — Tsconfig Categories Projects 6255](./151-tsconfig-categories-projects-6255.mdx) | Type: Reference | Summary: Tsconfig Categories Projects 6255
- [152 — Tsconfig Categories Source Map Options 6175](./152-tsconfig-categories-source-map-options-6175.mdx) | Type: Reference | Summary: Tsconfig Categories Source Map Options 6175
- [153 — Tsconfig Categories Strict Type Checking Options 6173](./153-tsconfig-categories-strict-type-checking-options-6173.mdx) | Type: Reference | Summary: Tsconfig Categories Strict Type Checking Options 6173
- [154 — Tsconfig Categories Type Checking 6248](./154-tsconfig-categories-type-checking-6248.mdx) | Type: Reference | Summary: Tsconfig Categories Type Checking 6248
- [155 — Tsconfig Categories Watch And Build Modes 6250](./155-tsconfig-categories-watch-and-build-modes-6250.mdx) | Type: Reference | Summary: Tsconfig Categories Watch And Build Modes 6250

## TSConfig — CLI

- [156 — Tsconfig Cli Help](./156-tsconfig-cli-help.mdx) | Type: Reference | Summary: Gives local information for help on the CLI.

## TSConfig — Compiler options

- [158 — Tsconfig Options Allowarbitraryextensions](./158-tsconfig-options-allowarbitraryextensions.mdx) | Type: Reference | Summary: Enable importing files with any extension, provided a declaration file is present.
- [159 — Tsconfig Options Allowimportingtsextensions](./159-tsconfig-options-allowimportingtsextensions.mdx) | Type: Reference | Summary: Allow imports to include TypeScript file extensions.
- [160 — Tsconfig Options Allowjs](./160-tsconfig-options-allowjs.mdx) | Type: Reference | Summary: Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.
- [161 — Tsconfig Options Allowsyntheticdefaultimports](./161-tsconfig-options-allowsyntheticdefaultimports.mdx) | Type: Reference | Summary: Allow 'import x from y' when a module doesn't have a default export.
- [162 — Tsconfig Options Allowumdglobalaccess](./162-tsconfig-options-allowumdglobalaccess.mdx) | Type: Reference | Summary: Allow accessing UMD globals from modules.
- [163 — Tsconfig Options Allowunreachablecode](./163-tsconfig-options-allowunreachablecode.mdx) | Type: Reference | Summary: Disable error reporting for unreachable code.
- [164 — Tsconfig Options Allowunusedlabels](./164-tsconfig-options-allowunusedlabels.mdx) | Type: Reference | Summary: Disable error reporting for unused labels.
- [165 — Tsconfig Options Alwaysstrict](./165-tsconfig-options-alwaysstrict.mdx) | Type: Reference | Summary: Ensure 'use strict' is always emitted.
- [166 — Tsconfig Options Assumechangesonlyaffectdirectdependencies](./166-tsconfig-options-assumechangesonlyaffectdirectdependencies.mdx) | Type: Reference | Summary: Have recompiles in projects that use [`incremental`](#incremental) and `watch` mode assume that changes within a file will only affect files directly depending on it.
- [167 — Tsconfig Options Baseurl](./167-tsconfig-options-baseurl.mdx) | Type: Reference | Summary: Specify the base directory to resolve bare specifier module names.
- [168 — Tsconfig Options Charset](./168-tsconfig-options-charset.mdx) | Type: Reference | Summary: No longer supported. In early versions, manually set the text encoding for reading files.
- [169 — Tsconfig Options Checkjs](./169-tsconfig-options-checkjs.mdx) | Type: Reference | Summary: Enable error reporting in type-checked JavaScript files.
- [170 — Tsconfig Options Clean](./170-tsconfig-options-clean.mdx) | Type: Reference | Summary: Delete the outputs of all projects.
- [171 — Tsconfig Options Composite](./171-tsconfig-options-composite.mdx) | Type: Reference | Summary: Enable constraints that allow a TypeScript project to be used with project references.
- [172 — Tsconfig Options Customconditions](./172-tsconfig-options-customconditions.mdx) | Type: Reference | Summary: Conditions to set in addition to the resolver-specific defaults when resolving imports.
- [173 — Tsconfig Options Declaration](./173-tsconfig-options-declaration.mdx) | Type: Reference | Summary: Generate .d.ts files from TypeScript and JavaScript files in your project.
- [174 — Tsconfig Options Declarationdir](./174-tsconfig-options-declarationdir.mdx) | Type: Reference | Summary: Specify the output directory for generated declaration files.
- [175 — Tsconfig Options Declarationmap](./175-tsconfig-options-declarationmap.mdx) | Type: Reference | Summary: Create sourcemaps for d.ts files.
- [176 — Tsconfig Options Diagnostics](./176-tsconfig-options-diagnostics.mdx) | Type: Reference | Summary: Output compiler performance information after building.
- [177 — Tsconfig Options Disablefilenamebasedtypeacquisition](./177-tsconfig-options-disablefilenamebasedtypeacquisition.mdx) | Type: Reference | Summary: Disables inference for type acquisition by looking at filenames in a project.
- [178 — Tsconfig Options Disablereferencedprojectload](./178-tsconfig-options-disablereferencedprojectload.mdx) | Type: Reference | Summary: Reduce the number of projects loaded automatically by TypeScript.
- [179 — Tsconfig Options Disablesizelimit](./179-tsconfig-options-disablesizelimit.mdx) | Type: Reference | Summary: Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.
- [180 — Tsconfig Options Disablesolutionsearching](./180-tsconfig-options-disablesolutionsearching.mdx) | Type: Reference | Summary: Opt a project out of multi-project reference checking when editing.
- [181 — Tsconfig Options Disablesourceofprojectreferenceredirect](./181-tsconfig-options-disablesourceofprojectreferenceredirect.mdx) | Type: Reference | Summary: Disable preferring source files instead of declaration files when referencing composite projects.
- [182 — Tsconfig Options Downleveliteration](./182-tsconfig-options-downleveliteration.mdx) | Type: Reference | Summary: Emit more compliant, but verbose and less performant JavaScript for iteration.
- [183 — Tsconfig Options Emitbom](./183-tsconfig-options-emitbom.mdx) | Type: Reference | Summary: Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
- [184 — Tsconfig Options Emitdeclarationonly](./184-tsconfig-options-emitdeclarationonly.mdx) | Type: Reference | Summary: Only output d.ts files and not JavaScript files.
- [185 — Tsconfig Options Emitdecoratormetadata](./185-tsconfig-options-emitdecoratormetadata.mdx) | Type: Reference | Summary: Emit design-type metadata for decorated declarations in source files.
- [186 — Tsconfig Options Enable](./186-tsconfig-options-enable.mdx) | Type: Reference | Summary: Disable the type acquisition for JavaScript projects.
- [187 — Tsconfig Options Erasablesyntaxonly](./187-tsconfig-options-erasablesyntaxonly.mdx) | Type: Reference | Summary: Do not allow runtime constructs that are not part of ECMAScript.
- [188 — Tsconfig Options Esmoduleinterop](./188-tsconfig-options-esmoduleinterop.mdx) | Type: Reference | Summary: Emit additional JavaScript to ease support for importing CommonJS modules. This enables [`allowSyntheticDefaultImports`](#allowSyntheticDefaultImports) for type compatibility.
- [189 — Tsconfig Options Exactoptionalpropertytypes](./189-tsconfig-options-exactoptionalpropertytypes.mdx) | Type: Reference | Summary: Interpret optional property types as written, rather than adding `undefined`.
- [190 — Tsconfig Options Exclude](./190-tsconfig-options-exclude.mdx) | Type: Reference | Summary: Filters results from the [`include`](#include) option.
- [191 — Tsconfig Options Excludedirectories](./191-tsconfig-options-excludedirectories.mdx) | Type: Reference | Summary: Remove a list of directories from the watch process.
- [192 — Tsconfig Options Excludefiles](./192-tsconfig-options-excludefiles.mdx) | Type: Reference | Summary: Remove a list of files from the watch mode's processing.
- [193 — Tsconfig Options Experimentaldecorators](./193-tsconfig-options-experimentaldecorators.mdx) | Type: Reference | Summary: Enable experimental support for TC39 stage 2 draft decorators.
- [194 — Tsconfig Options Explainfiles](./194-tsconfig-options-explainfiles.mdx) | Type: Reference | Summary: Print files read during the compilation including why it was included.
- [195 — Tsconfig Options Extendeddiagnostics](./195-tsconfig-options-extendeddiagnostics.mdx) | Type: Reference | Summary: Output more detailed compiler performance information after building.
- [196 — Tsconfig Options Extends](./196-tsconfig-options-extends.mdx) | Type: Reference | Summary: Specify one or more path or node module references to base configuration files from which settings are inherited.
- [197 — Tsconfig Options Fallbackpolling](./197-tsconfig-options-fallbackpolling.mdx) | Type: Reference | Summary: Specify what approach the watcher should use if the system runs out of native file watchers.
- [198 — Tsconfig Options Files](./198-tsconfig-options-files.mdx) | Type: Reference | Summary: Include a list of files. This does not support glob patterns, as opposed to [`include`](#include).
- [199 — Tsconfig Options Force](./199-tsconfig-options-force.mdx) | Type: Reference | Summary: Build all projects, including those that appear to be up to date.
- [200 — Tsconfig Options Forceconsistentcasinginfilenames](./200-tsconfig-options-forceconsistentcasinginfilenames.mdx) | Type: Reference | Summary: Ensure that casing is correct in imports.
- [201 — Tsconfig Options Generatecpuprofile](./201-tsconfig-options-generatecpuprofile.mdx) | Type: Reference | Summary: Emit a v8 CPU profile of the compiler run for debugging.
- [202 — Tsconfig Options Generatetrace](./202-tsconfig-options-generatetrace.mdx) | Type: Reference | Summary: Generates an event trace and a list of types.
- [203 — Tsconfig Options Importhelpers](./203-tsconfig-options-importhelpers.mdx) | Type: Reference | Summary: Allow importing helper functions from tslib once per project, instead of including them per-file.
- [204 — Tsconfig Options Importsnotusedasvalues](./204-tsconfig-options-importsnotusedasvalues.mdx) | Type: Reference | Summary: Specify emit/checking behavior for imports that are only used for types.
- [205 — Tsconfig Options Include](./205-tsconfig-options-include.mdx) | Type: Reference | Summary: Specify a list of glob patterns that match files to be included in compilation.
- [206 — Tsconfig Options Incremental](./206-tsconfig-options-incremental.mdx) | Type: Reference | Summary: Save .tsbuildinfo files to allow for incremental compilation of projects.
- [207 — Tsconfig Options Inlinesourcemap](./207-tsconfig-options-inlinesourcemap.mdx) | Type: Reference | Summary: Include sourcemap files inside the emitted JavaScript.
- [208 — Tsconfig Options Inlinesources](./208-tsconfig-options-inlinesources.mdx) | Type: Reference | Summary: Include source code in the sourcemaps inside the emitted JavaScript.
- [209 — Tsconfig Options Isolateddeclarations](./209-tsconfig-options-isolateddeclarations.mdx) | Type: Reference | Summary: Require sufficient annotation on exports so other tools can trivially generate declaration files.
- [210 — Tsconfig Options Isolatedmodules](./210-tsconfig-options-isolatedmodules.mdx) | Type: Reference | Summary: Ensure that each file can be safely transpiled without relying on other imports.
- [211 — Tsconfig Options Jsx](./211-tsconfig-options-jsx.mdx) | Type: Reference | Summary: Specify what JSX code is generated.
- [212 — Tsconfig Options Jsxfactory](./212-tsconfig-options-jsxfactory.mdx) | Type: Reference | Summary: Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'.
- [213 — Tsconfig Options Jsxfragmentfactory](./213-tsconfig-options-jsxfragmentfactory.mdx) | Type: Reference | Summary: Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.
- [214 — Tsconfig Options Jsximportsource](./214-tsconfig-options-jsximportsource.mdx) | Type: Reference | Summary: Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.
- [215 — Tsconfig Options Keyofstringsonly](./215-tsconfig-options-keyofstringsonly.mdx) | Type: Reference | Summary: Make keyof only return strings instead of string, numbers or symbols. Legacy option.
- [216 — Tsconfig Options Lib](./216-tsconfig-options-lib.mdx) | Type: Reference | Summary: Specify a set of bundled library declaration files that describe the target runtime environment.
- [217 — Tsconfig Options Libreplacement](./217-tsconfig-options-libreplacement.mdx) | Type: Reference | Summary: Enable substitution of default `lib` files with custom ones.
- [218 — Tsconfig Options Listemittedfiles](./218-tsconfig-options-listemittedfiles.mdx) | Type: Reference | Summary: Print the names of emitted files after a compilation.
- [219 — Tsconfig Options Listfiles](./219-tsconfig-options-listfiles.mdx) | Type: Reference | Summary: Print all of the files read during the compilation.
- [220 — Tsconfig Options Locale](./220-tsconfig-options-locale.mdx) | Type: Reference | Summary: Set the language of the messaging from TypeScript. This does not affect emit.
- [221 — Tsconfig Options Maproot](./221-tsconfig-options-maproot.mdx) | Type: Reference | Summary: Specify the location where debugger should locate map files instead of generated locations.
- [222 — Tsconfig Options Maxnodemodulejsdepth](./222-tsconfig-options-maxnodemodulejsdepth.mdx) | Type: Reference | Summary: Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with [`allowJs`](#allowJs).
- [223 — Tsconfig Options Module](./223-tsconfig-options-module.mdx) | Type: Reference | Summary: Specify what module code is generated.
- [224 — Tsconfig Options Moduledetection](./224-tsconfig-options-moduledetection.mdx) | Type: Reference | Summary: Specify what method is used to detect whether a file is a script or a module.
- [225 — Tsconfig Options Moduleresolution](./225-tsconfig-options-moduleresolution.mdx) | Type: Reference | Summary: Specify how TypeScript looks up a file from a given module specifier.
- [226 — Tsconfig Options Modulesuffixes](./226-tsconfig-options-modulesuffixes.mdx) | Type: Reference | Summary: List of file name suffixes to search when resolving a module.
- [227 — Tsconfig Options Newline](./227-tsconfig-options-newline.mdx) | Type: Reference | Summary: Set the newline character for emitting files.
- [228 — Tsconfig Options Nocheck](./228-tsconfig-options-nocheck.mdx) | Type: Reference | Summary: Disable full type checking (only critical parse and emit errors will be reported).
- [229 — Tsconfig Options Noemit](./229-tsconfig-options-noemit.mdx) | Type: Reference | Summary: Disable emitting files from a compilation.
- [230 — Tsconfig Options Noemithelpers](./230-tsconfig-options-noemithelpers.mdx) | Type: Reference | Summary: Disable generating custom helper functions like `__extends` in compiled output.
- [231 — Tsconfig Options Noemitonerror](./231-tsconfig-options-noemitonerror.mdx) | Type: Reference | Summary: Disable emitting files if any type checking errors are reported.
- [232 — Tsconfig Options Noerrortruncation](./232-tsconfig-options-noerrortruncation.mdx) | Type: Reference | Summary: Disable truncating types in error messages.
- [233 — Tsconfig Options Nofallthroughcasesinswitch](./233-tsconfig-options-nofallthroughcasesinswitch.mdx) | Type: Reference | Summary: Enable error reporting for fallthrough cases in switch statements.
- [234 — Tsconfig Options Noimplicitany](./234-tsconfig-options-noimplicitany.mdx) | Type: Reference | Summary: Enable error reporting for expressions and declarations with an implied `any` type.
- [235 — Tsconfig Options Noimplicitoverride](./235-tsconfig-options-noimplicitoverride.mdx) | Type: Reference | Summary: Ensure overriding members in derived classes are marked with an override modifier.
- [236 — Tsconfig Options Noimplicitreturns](./236-tsconfig-options-noimplicitreturns.mdx) | Type: Reference | Summary: Enable error reporting for codepaths that do not explicitly return in a function.
- [237 — Tsconfig Options Noimplicitthis](./237-tsconfig-options-noimplicitthis.mdx) | Type: Reference | Summary: Enable error reporting when `this` is given the type `any`.
- [238 — Tsconfig Options Noimplicitusestrict](./238-tsconfig-options-noimplicitusestrict.mdx) | Type: Reference | Summary: Disable adding 'use strict' directives in emitted JavaScript files.
- [239 — Tsconfig Options Nolib](./239-tsconfig-options-nolib.mdx) | Type: Reference | Summary: Disable including any library files, including the default lib.d.ts.
- [240 — Tsconfig Options Nopropertyaccessfromindexsignature](./240-tsconfig-options-nopropertyaccessfromindexsignature.mdx) | Type: Reference | Summary: Enforces using indexed accessors for keys declared using an indexed type.
- [241 — Tsconfig Options Noresolve](./241-tsconfig-options-noresolve.mdx) | Type: Reference | Summary: Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.
- [242 — Tsconfig Options Nostrictgenericchecks](./242-tsconfig-options-nostrictgenericchecks.mdx) | Type: Reference | Summary: Disable strict checking of generic signatures in function types.
- [243 — Tsconfig Options Nouncheckedindexedaccess](./243-tsconfig-options-nouncheckedindexedaccess.mdx) | Type: Reference | Summary: Add `undefined` to a type when accessed using an index.
- [244 — Tsconfig Options Nouncheckedsideeffectimports](./244-tsconfig-options-nouncheckedsideeffectimports.mdx) | Type: Reference | Summary: Check side effect imports.
- [245 — Tsconfig Options Nounusedlocals](./245-tsconfig-options-nounusedlocals.mdx) | Type: Reference | Summary: Enable error reporting when local variables aren't read.
- [246 — Tsconfig Options Nounusedparameters](./246-tsconfig-options-nounusedparameters.mdx) | Type: Reference | Summary: Raise an error when a function parameter isn't read.
- [247 — Tsconfig Options Out](./247-tsconfig-options-out.mdx) | Type: Reference | Summary: Deprecated setting. Use [`outFile`](#outFile) instead.
- [248 — Tsconfig Options Outdir](./248-tsconfig-options-outdir.mdx) | Type: Reference | Summary: Specify an output folder for all emitted files.
- [249 — Tsconfig Options Outfile](./249-tsconfig-options-outfile.mdx) | Type: Reference | Summary: Specify a file that bundles all outputs into one JavaScript file. If [`declaration`](#declaration) is true, also designates a file that bundles all .d.ts output.
- [250 — Tsconfig Options Paths](./250-tsconfig-options-paths.mdx) | Type: Reference | Summary: Specify a set of entries that re-map imports to additional lookup locations.
- [251 — Tsconfig Options Plugins](./251-tsconfig-options-plugins.mdx) | Type: Reference | Summary: Specify a list of language service plugins to include.
- [252 — Tsconfig Options Preserveconstenums](./252-tsconfig-options-preserveconstenums.mdx) | Type: Reference | Summary: Disable erasing `const enum` declarations in generated code.
- [253 — Tsconfig Options Preservesymlinks](./253-tsconfig-options-preservesymlinks.mdx) | Type: Reference | Summary: Disable resolving symlinks to their realpath. This correlates to the same flag in node.
- [254 — Tsconfig Options Preservevalueimports](./254-tsconfig-options-preservevalueimports.mdx) | Type: Reference | Summary: Preserve unused imported values in the JavaScript output that would otherwise be removed.
- [255 — Tsconfig Options Preservewatchoutput](./255-tsconfig-options-preservewatchoutput.mdx) | Type: Reference | Summary: Disable wiping the console in watch mode.
- [256 — Tsconfig Options Pretty](./256-tsconfig-options-pretty.mdx) | Type: Reference | Summary: Enable color and formatting in TypeScript's output to make compiler errors easier to read.
- [257 — Tsconfig Options Reactnamespace](./257-tsconfig-options-reactnamespace.mdx) | Type: Reference | Summary: Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.
- [258 — Tsconfig Options References](./258-tsconfig-options-references.mdx) | Type: Reference | Summary: Specify an array of objects that specify paths for projects. Used in project references.
- [259 — Tsconfig Options Removecomments](./259-tsconfig-options-removecomments.mdx) | Type: Reference | Summary: Disable emitting comments.
- [260 — Tsconfig Options Resolvejsonmodule](./260-tsconfig-options-resolvejsonmodule.mdx) | Type: Reference | Summary: Enable importing .json files.
- [261 — Tsconfig Options Resolvepackagejsonexports](./261-tsconfig-options-resolvepackagejsonexports.mdx) | Type: Reference | Summary: Use the package.json 'exports' field when resolving package imports.
- [262 — Tsconfig Options Resolvepackagejsonimports](./262-tsconfig-options-resolvepackagejsonimports.mdx) | Type: Reference | Summary: Use the package.json 'imports' field when resolving imports.
- [263 — Tsconfig Options Rewriterelativeimportextensions](./263-tsconfig-options-rewriterelativeimportextensions.mdx) | Type: Reference | Summary: Rewrite `.ts`, `.tsx`, `.mts`, and `.cts` file extensions in relative import paths to their JavaScript equivalent in output files.
- [264 — Tsconfig Options Rootdir](./264-tsconfig-options-rootdir.mdx) | Type: Reference | Summary: Specify the root folder within your source files.
- [265 — Tsconfig Options Rootdirs](./265-tsconfig-options-rootdirs.mdx) | Type: Reference | Summary: Allow multiple folders to be treated as one when resolving modules.
- [266 — Tsconfig Options Skipdefaultlibcheck](./266-tsconfig-options-skipdefaultlibcheck.mdx) | Type: Reference | Summary: Skip type checking .d.ts files that are included with TypeScript.
- [267 — Tsconfig Options Skiplibcheck](./267-tsconfig-options-skiplibcheck.mdx) | Type: Reference | Summary: Skip type checking all .d.ts files.
- [268 — Tsconfig Options Sourcemap](./268-tsconfig-options-sourcemap.mdx) | Type: Reference | Summary: Create source map files for emitted JavaScript files.
- [269 — Tsconfig Options Sourceroot](./269-tsconfig-options-sourceroot.mdx) | Type: Reference | Summary: Specify the root path for debuggers to find the reference source code.
- [270 — Tsconfig Options Stopbuildonerrors](./270-tsconfig-options-stopbuildonerrors.mdx) | Type: Reference | Summary: Skip building downstream projects on error in upstream project.
- [271 — Tsconfig Options Strict](./271-tsconfig-options-strict.mdx) | Type: Reference | Summary: Enable all strict type-checking options.
- [272 — Tsconfig Options Strictbindcallapply](./272-tsconfig-options-strictbindcallapply.mdx) | Type: Reference | Summary: Check that the arguments for `bind`, `call`, and `apply` methods match the original function.
- [273 — Tsconfig Options Strictbuiltiniteratorreturn](./273-tsconfig-options-strictbuiltiniteratorreturn.mdx) | Type: Reference | Summary: Built-in iterators are instantiated with a TReturn type of undefined instead of any.
- [274 — Tsconfig Options Strictfunctiontypes](./274-tsconfig-options-strictfunctiontypes.mdx) | Type: Reference | Summary: When assigning functions, check to ensure parameters and the return values are subtype-compatible.
- [275 — Tsconfig Options Strictnullchecks](./275-tsconfig-options-strictnullchecks.mdx) | Type: Reference | Summary: When type checking, take into account `null` and `undefined`.
- [276 — Tsconfig Options Strictpropertyinitialization](./276-tsconfig-options-strictpropertyinitialization.mdx) | Type: Reference | Summary: Check for class properties that are declared but not set in the constructor.
- [277 — Tsconfig Options Stripinternal](./277-tsconfig-options-stripinternal.mdx) | Type: Reference | Summary: Disable emitting declarations that have `@internal` in their JSDoc comments.
- [278 — Tsconfig Options Suppressexcesspropertyerrors](./278-tsconfig-options-suppressexcesspropertyerrors.mdx) | Type: Reference | Summary: Disable reporting of excess property errors during the creation of object literals.
- [279 — Tsconfig Options Suppressimplicitanyindexerrors](./279-tsconfig-options-suppressimplicitanyindexerrors.mdx) | Type: Reference | Summary: Suppress [`noImplicitAny`](#noImplicitAny) errors when indexing objects that lack index signatures.
- [280 — Tsconfig Options Synchronouswatchdirectory](./280-tsconfig-options-synchronouswatchdirectory.mdx) | Type: Reference | Summary: Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.
- [281 — Tsconfig Options Target](./281-tsconfig-options-target.mdx) | Type: Reference | Summary: Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
- [282 — Tsconfig Options Traceresolution](./282-tsconfig-options-traceresolution.mdx) | Type: Reference | Summary: Log paths used during the [`moduleResolution`](#moduleResolution) process.
- [283 — Tsconfig Options Tsbuildinfofile](./283-tsconfig-options-tsbuildinfofile.mdx) | Type: Reference | Summary: The file to store `.tsbuildinfo` incremental build information in.
- [284 — Tsconfig Options Typeacquisition Exclude](./284-tsconfig-options-typeacquisition-exclude.mdx) | Type: Reference | Summary: Specify a list of modules which to exclude from type acquisition.
- [285 — Tsconfig Options Typeacquisition Include](./285-tsconfig-options-typeacquisition-include.mdx) | Type: Reference | Summary: Specify a list of modules which to acquire types for.
- [286 — Tsconfig Options Typeacquisition](./286-tsconfig-options-typeacquisition.mdx) | Type: Reference | Summary: Specify options for automatic acquisition of declaration files.
- [287 — Tsconfig Options Typeroots](./287-tsconfig-options-typeroots.mdx) | Type: Reference | Summary: Specify multiple folders that act like `./node_modules/@types`.
- [288 — Tsconfig Options Types](./288-tsconfig-options-types.mdx) | Type: Reference | Summary: Specify type package names to be included without being referenced in a source file.
- [289 — Tsconfig Options Usedefineforclassfields](./289-tsconfig-options-usedefineforclassfields.mdx) | Type: Reference | Summary: Emit ECMAScript-standard-compliant class fields.
- [290 — Tsconfig Options Useunknownincatchvariables](./290-tsconfig-options-useunknownincatchvariables.mdx) | Type: Reference | Summary: Default catch clause variables as `unknown` instead of `any`.
- [291 — Tsconfig Options Verbatimmodulesyntax](./291-tsconfig-options-verbatimmodulesyntax.mdx) | Type: Reference | Summary: Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.
- [292 — Tsconfig Options Verbose](./292-tsconfig-options-verbose.mdx) | Type: Reference | Summary: Enable verbose logging.
- [293 — Tsconfig Options Watchdirectory](./293-tsconfig-options-watchdirectory.mdx) | Type: Reference | Summary: Specify how directories are watched on systems that lack recursive file-watching functionality.
- [294 — Tsconfig Options Watchfile](./294-tsconfig-options-watchfile.mdx) | Type: Reference | Summary: Specify how the TypeScript watch mode works.

## Files in this directory

| File | Note |
|------|------|
| `INDEX.md` | This navigation file |
| `NNN-*.mdx` | Mirror pages (see numbering in tree) |
| `NNN-*-dts.mdx` | Declaration-file **templates** (name uses `-dts` instead of a literal `.d.ts.` in the filename) |
