---
title: Turborepo — documentation index 
description: Hierarchical index 
---

# Turborepo documentation

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

---

- [01 — Introduction](./01-index.mdx) | Type: Conceptual | Summary: Welcome to the Turborepo documentation!

    - [81 — Acknowledgements](./81-acknowledgments.mdx) | Type: Conceptual | Summary: Thank you to all these developers, build systems, and monorepo tools for their support and assistance. | Prerequisites: Introduction | Topics: acknowledgments

    - [78 — Community](./78-community.mdx) | Type: Conceptual | Summary: Learn about the Turborepo community. | Prerequisites: Introduction | Topics: community

    - [07 — Core concepts](./07-core-concepts-index.mdx) | Type: Conceptual | Summary: Learn about the core concepts behind Turborepo. | Prerequisites: Introduction | Topics: core-concepts

        - [08 — Internal Packages](./08-core-concepts-internal-packages.mdx) | Type: Conceptual | Summary: Learn how to build Internal Packages in your monorepo. | Prerequisites: Core concepts | Topics: core-concepts, internal-packages

        - [09 — Package and Task Graphs](./09-core-concepts-package-and-task-graphs.mdx) | Type: Conceptual | Summary: Turborepo builds a Task Graph based on your configuration and repository structure. | Prerequisites: Core concepts | Topics: core-concepts, package-and-task-graph

        - [10 — Package types](./10-core-concepts-package-types.mdx) | Type: Conceptual | Summary: Learn about the different types of packages in a workspace. | Prerequisites: Core concepts | Topics: core-concepts, package-types

        - [11 — Remote Caching](./11-core-concepts-remote-caching.mdx) | Type: Conceptual | Summary: Share cache artifacts across machines for even faster builds. | Prerequisites: Core concepts | Topics: core-concepts, remote-caching

    - [12 — Crafting your repository](./12-crafting-your-repository-index.mdx) | Type: Conceptual | Summary: Design and build your Turborepo. | Prerequisites: Introduction | Topics: crafting-your-repository

        - [13 — Caching](./13-crafting-your-repository-caching.mdx) | Type: Conceptual | Summary: Learn about caching in Turborepo. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, caching

        - [14 — Configuring tasks](./14-crafting-your-repository-configuring-tasks.mdx) | Type: Conceptual | Summary: Learn how to describe the workflows in your repository to get them done as fast as possible. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, configuring-tasks

        - [15 — Constructing CI](./15-crafting-your-repository-constructing-ci.mdx) | Type: Conceptual | Summary: Learn how Turborepo can help you efficiently complete all the necessary tasks and accelerate your development workflow. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, constructing-ci

        - [16 — Creating an Internal Package](./16-crafting-your-repository-creating-an-internal-package.mdx) | Type: Conceptual | Summary: Learn how to create an Internal Package for your monorepo. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, creating-an-internal-package

        - [17 — Developing applications](./17-crafting-your-repository-developing-applications.mdx) | Type: Conceptual | Summary: Learn how to develop applications in your repository. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, developing-applications

        - [18 — Managing dependencies](./18-crafting-your-repository-managing-dependencies.mdx) | Type: Conceptual | Summary: Learn how to manage dependencies in your monorepo's workspace. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, managing-dependencies

        - [19 — Running tasks](./19-crafting-your-repository-running-tasks.mdx) | Type: Conceptual | Summary: Learn how to run tasks in your repository through the `turbo` CLI. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, running-tasks

        - [20 — Structuring a repository](./20-crafting-your-repository-structuring-a-repository.mdx) | Type: Conceptual | Summary: Start by creating a repository using the conventions of the ecosystem. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, structuring-a-repository

        - [21 — Understanding your repository](./21-crafting-your-repository-understanding-your-repository.mdx) | Type: Conceptual | Summary: Learn how to understand your repository structure using Turborepo. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, understanding-your-repository

        - [22 — Upgrading](./22-crafting-your-repository-upgrading.mdx) | Type: Conceptual | Summary: Learn how to upgrade `turbo` to get the latest improvements to your repository. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, upgrading

        - [23 — Using environment variables](./23-crafting-your-repository-using-environment-variables.mdx) | Type: Conceptual | Summary: Learn how to handle environments for your applications. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, using-environment-variables

    - [02 — Getting started](./02-getting-started-index.mdx) | Type: Tutorial | Summary: Get started with Turborepo. | Prerequisites: Introduction | Topics: getting-started

        - [04 — Add to an existing repository](./04-getting-started-add-to-existing-repository.mdx) | Type: Tutorial | Summary: Using Turborepo with your existing repository | Prerequisites: Getting started | Topics: getting-started, add-to-existing-repository

        - [05 — Editor integration](./05-getting-started-editor-integration.mdx) | Type: Tutorial | Summary: Making the most of Turborepo | Prerequisites: Getting started | Topics: getting-started, editor-integration

        - [06 — Start with an example](./06-getting-started-examples.mdx) | Type: Tutorial | Summary: Start with an example Turborepo. | Prerequisites: Getting started | Topics: getting-started, examples

        - [03 — Installation](./03-getting-started-installation.mdx) | Type: Tutorial | Summary: Learn how to get started with Turborepo. | Prerequisites: Getting started | Topics: getting-started, installation

    - [24 — Guides](./24-guides-index.mdx) | Type: Conceptual | Summary: Learn how to use your favorite tooling in a Turborepo. | Prerequisites: Introduction | Topics: guides

        - [25 — Using AI with Turborepo](./25-guides-ai.mdx) | Type: How-to | Summary: Get the most out of AI coding assistants in your Turborepo. | Prerequisites: Guides | Topics: guides, ai

        - [29 — Continuous Integration](./29-guides-ci-vendors-index.mdx) | Type: How-to | Summary: Recipes for using Turborepo with GitHub Actions and Vercel. | Prerequisites: Guides | Topics: guides, ci-vendors

            - [30 — GitHub Actions](./30-guides-ci-vendors-github-actions.mdx) | Type: How-to | Summary: Learn how to use GitHub Actions with Turborepo. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, github-actions

            - [31 — Vercel](./31-guides-ci-vendors-vercel.mdx) | Type: How-to | Summary: Learn how to use Turborepo on Vercel. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, vercel

        - [32 — Frameworks](./32-guides-frameworks-index.mdx) | Type: How-to | Summary: Integrate your favorite framework into Turborepo. | Prerequisites: Guides | Topics: guides, frameworks

            - [33 — Framework bindings in libraries](./33-guides-frameworks-framework-bindings.mdx) | Type: How-to | Summary: Learn how to create framework bindings in packages. | Prerequisites: Frameworks | Topics: guides, frameworks, framework-bindings

            - [34 — Next.js](./34-guides-frameworks-nextjs.mdx) | Type: How-to | Summary: Learn how to use Next.js in a monorepo. | Prerequisites: Frameworks | Topics: guides, frameworks, nextjs

        - [26 — Generating code](./26-guides-generating-code.mdx) | Type: How-to | Summary: Learn how to generate code using Turborepo. | Prerequisites: Guides | Topics: guides, generating-code

        - [28 — Publishing libraries](./28-guides-publishing-libraries.mdx) | Type: How-to | Summary: Learn how to publish libraries to the npm registry from a monorepo. | Prerequisites: Guides | Topics: guides, publishing-libraries

        - [27 — Skipping tasks](./27-guides-skipping-tasks.mdx) | Type: How-to | Summary: Never do the same work twice. | Prerequisites: Guides | Topics: guides, skipping-tasks

        - [35 — Tools](./35-guides-tools-index.mdx) | Type: How-to | Summary: Learn how to use your favorite tools in a monorepo. | Prerequisites: Guides | Topics: guides, tools

            - [36 — ESLint](./36-guides-tools-eslint.mdx) | Type: How-to | Summary: Learn how to use ESLint in a monorepo. | Prerequisites: Tools | Topics: guides, tools, eslint

            - [37 — Playwright](./37-guides-tools-playwright.mdx) | Type: How-to | Summary: Learn how to use Playwright in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, playwright

            - [38 — Prisma](./38-guides-tools-prisma.mdx) | Type: How-to | Summary: Learn how to use Prisma in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, prisma

            - [39 — shadcn/ui](./39-guides-tools-shadcn-ui.mdx) | Type: How-to | Summary: Learn how to use shadcn/ui in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, shadcn-ui

            - [40 — Storybook](./40-guides-tools-storybook.mdx) | Type: How-to | Summary: Learn how to use Storybook in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, storybook

            - [41 — Tailwind CSS](./41-guides-tools-tailwind.mdx) | Type: How-to | Summary: Learn how to use Tailwind CSS in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, tailwind

            - [42 — TypeScript](./42-guides-tools-typescript.mdx) | Type: How-to | Summary: Learn how to use TypeScript in a monorepo. | Prerequisites: Tools | Topics: guides, tools, typescript

            - [43 — Vitest](./43-guides-tools-vitest.mdx) | Type: How-to | Summary: Learn how to use Vitest in a monorepo. | Prerequisites: Tools | Topics: guides, tools, vitest

    - [44 — Turborepo API reference](./44-reference-index.mdx) | Type: Conceptual | Summary: Learn about Turborepo's APIs using the reference. | Prerequisites: Introduction | Topics: reference

        - [45 — bin](./45-reference-bin.mdx) | Type: Reference | Summary: API reference for the `turbo bin` command | Prerequisites: Turborepo API reference | Topics: reference, bin

        - [46 — boundaries](./46-reference-boundaries.mdx) | Type: Reference | Summary: API reference for the `turbo boundaries` command | Prerequisites: Turborepo API reference | Topics: reference, boundaries

        - [47 — Configuring turbo.json](./47-reference-configuration.mdx) | Type: Reference | Summary: Learn how to configure Turborepo through `turbo.json`. | Prerequisites: Turborepo API reference | Topics: reference, configuration

        - [48 — create-turbo](./48-reference-create-turbo.mdx) | Type: Reference | Summary: Quickly set up a new Turborepo repository from scratch. | Prerequisites: Turborepo API reference | Topics: reference, create-turbo

        - [49 — devtools](./49-reference-devtools.mdx) | Type: Reference | Summary: API reference for the `turbo devtools` command | Prerequisites: Turborepo API reference | Topics: reference, devtools

        - [50 — docs](./50-reference-docs.mdx) | Type: Reference | Summary: API reference for the `turbo docs` command | Prerequisites: Turborepo API reference | Topics: reference, docs

        - [51 — eslint-config-turbo](./51-reference-eslint-config-turbo.mdx) | Type: Reference | Summary: Learn more about eslint-config-turbo. | Prerequisites: Turborepo API reference | Topics: reference, eslint-config-turbo

        - [52 — eslint-plugin-turbo](./52-reference-eslint-plugin-turbo.mdx) | Type: Reference | Summary: Learn more about eslint-plugin-turbo. | Prerequisites: Turborepo API reference | Topics: reference, eslint-plugin-turbo

        - [53 — generate](./53-reference-generate.mdx) | Type: Reference | Summary: API reference for the `turbo generate` command | Prerequisites: Turborepo API reference | Topics: reference, generate

        - [54 — File glob specification](./54-reference-globs.mdx) | Type: Reference | Summary: Learn about the file glob specification used by `turbo`. | Prerequisites: Turborepo API reference | Topics: reference, globs

        - [55 — info](./55-reference-info.mdx) | Type: Reference | Summary: API reference for the `turbo info` command | Prerequisites: Turborepo API reference | Topics: reference, info

        - [56 — link](./56-reference-link.mdx) | Type: Reference | Summary: API reference for the `turbo link` command | Prerequisites: Turborepo API reference | Topics: reference, link

        - [57 — login](./57-reference-login.mdx) | Type: Reference | Summary: API reference for the `turbo login` command | Prerequisites: Turborepo API reference | Topics: reference, login

        - [58 — logout](./58-reference-logout.mdx) | Type: Reference | Summary: API reference for the `turbo logout` command | Prerequisites: Turborepo API reference | Topics: reference, logout

        - [59 — ls](./59-reference-ls.mdx) | Type: Reference | Summary: API reference for the `turbo ls` command | Prerequisites: Turborepo API reference | Topics: reference, ls

        - [60 — Options overview](./60-reference-options-overview.mdx) | Type: Reference | Summary: Flags, configurations, and System Environment Variables for Turborepo | Prerequisites: Turborepo API reference | Topics: reference, options-overview

        - [61 — Package Configurations](./61-reference-package-configurations.mdx) | Type: Reference | Summary: Learn how to use Package Configurations to bring greater task flexibility to your monorepo's package. | Prerequisites: Turborepo API reference | Topics: reference, package-configurations

        - [62 — prune](./62-reference-prune.mdx) | Type: Reference | Summary: API reference for the `turbo prune` command | Prerequisites: Turborepo API reference | Topics: reference, prune

        - [63 — query](./63-reference-query.mdx) | Type: Reference | Summary: API reference for the `turbo query` command | Prerequisites: Turborepo API reference | Topics: reference, query

        - [64 — run](./64-reference-run.mdx) | Type: Reference | Summary: API reference for the `turbo run` command | Prerequisites: Turborepo API reference | Topics: reference, run

        - [65 — scan (Deprecated)](./65-reference-scan.mdx) | Type: Reference | Summary: API reference for the deprecated `turbo scan` command | Prerequisites: Turborepo API reference | Topics: reference, scan

        - [66 — System environment variables](./66-reference-system-environment-variables.mdx) | Type: Reference | Summary: Learn about system variables used by Turborepo. | Prerequisites: Turborepo API reference | Topics: reference, system-environment-variables

        - [67 — telemetry](./67-reference-telemetry.mdx) | Type: Reference | Summary: API reference for the `turbo telemetry` command | Prerequisites: Turborepo API reference | Topics: reference, telemetry

        - [68 — @turbo/codemod](./68-reference-turbo-codemod.mdx) | Type: Reference | Summary: Learn more about how Turborepo uses codemods to make version migrations easy. | Prerequisites: Turborepo API reference | Topics: reference, turbo-codemod

        - [69 — @turbo/gen](./69-reference-turbo-gen.mdx) | Type: Reference | Summary: Quickly generate new code in your Turborepo. | Prerequisites: Turborepo API reference | Topics: reference, turbo-gen

        - [70 — turbo-ignore](./70-reference-turbo-ignore.mdx) | Type: Reference | Summary: Learn how to use turbo-ignore to skip tasks in CI. | Prerequisites: Turborepo API reference | Topics: reference, turbo-ignore

        - [71 — unlink](./71-reference-unlink.mdx) | Type: Reference | Summary: API reference for the `turbo unlink` command | Prerequisites: Turborepo API reference | Topics: reference, unlink

        - [72 — watch](./72-reference-watch.mdx) | Type: Reference | Summary: API reference for the `watch` command | Prerequisites: Turborepo API reference | Topics: reference, watch

    - [80 — Support policy](./80-support-policy.mdx) | Type: Conceptual | Summary: Learn about Turborepo's Support policy. | Prerequisites: Introduction | Topics: support-policy

    - [79 — Telemetry](./79-telemetry.mdx) | Type: Conceptual | Summary: Learn more about Turborepo's anonymous telemetry. | Prerequisites: Introduction | Topics: telemetry

- [73 — Invalid environment variable prefix](./73-messages-invalid-env-prefix.mdx) | Type: Conceptual | Summary: Learn more about errors with invalid environment variable prefixes in Turborepo. | Topics: messages, invalid-env-prefix

- [74 — Missing root task in turbo.json](./74-messages-missing-root-task-in-turbo-json.mdx) | Type: Conceptual | Summary: Learn more about errors for missing root tasks in turbo.json in Turborepo. | Topics: messages, missing-root-task-in-turbo-json

- [75 — Package task in single-package workspace error](./75-messages-package-task-in-single-package-workspace.mdx) | Type: Conceptual | Summary: Learn more about errors with package tasks in single-package workspaces. | Topics: messages, package-task-in-single-package-workspace

- [76 — Recursive `turbo` invocations](./76-messages-recursive-turbo-invocations.mdx) | Type: Conceptual | Summary: Learn more about errors with recursive scripts and tasks in Turborepo. | Topics: messages, recursive-turbo-invocations

- [77 — Unnecessary package task syntax error](./77-messages-unnecessary-package-task-syntax.mdx) | Type: Conceptual | Summary: Learn more about errors with unnecessary package task syntax in Turborepo. | Topics: messages, unnecessary-package-task-syntax

