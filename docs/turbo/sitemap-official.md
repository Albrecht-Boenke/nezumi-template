# Turborepo Documentation Sitemap

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

---

- [Introduction](/docs) | Type: Conceptual | Summary: Welcome to the Turborepo documentation!

    - [Acknowledgements](/docs/acknowledgments) | Type: Conceptual | Summary: Thank you to all these developers, build systems, and monorepo tools for their support and assistance. | Prerequisites: Introduction | Topics: acknowledgments

    - [Community](/docs/community) | Type: Conceptual | Summary: Learn about the Turborepo community. | Prerequisites: Introduction | Topics: community

    - [Core concepts](/docs/core-concepts) | Type: Conceptual | Summary: Learn about the core concepts behind Turborepo. | Prerequisites: Introduction | Topics: core-concepts

        - [Internal Packages](/docs/core-concepts/internal-packages) | Type: Conceptual | Summary: Learn how to build Internal Packages in your monorepo. | Prerequisites: Core concepts | Topics: core-concepts, internal-packages

        - [Package and Task Graphs](/docs/core-concepts/package-and-task-graph) | Type: Conceptual | Summary: Turborepo builds a Task Graph based on your configuration and repository structure. | Prerequisites: Core concepts | Topics: core-concepts, package-and-task-graph

        - [Package types](/docs/core-concepts/package-types) | Type: Conceptual | Summary: Learn about the different types of packages in a workspace. | Prerequisites: Core concepts | Topics: core-concepts, package-types

        - [Remote Caching](/docs/core-concepts/remote-caching) | Type: Conceptual | Summary: Share cache artifacts across machines for even faster builds. | Prerequisites: Core concepts | Topics: core-concepts, remote-caching

    - [Crafting your repository](/docs/crafting-your-repository) | Type: Conceptual | Summary: Design and build your Turborepo. | Prerequisites: Introduction | Topics: crafting-your-repository

        - [Caching](/docs/crafting-your-repository/caching) | Type: Conceptual | Summary: Learn about caching in Turborepo. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, caching

        - [Configuring tasks](/docs/crafting-your-repository/configuring-tasks) | Type: Conceptual | Summary: Learn how to describe the workflows in your repository to get them done as fast as possible. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, configuring-tasks

        - [Constructing CI](/docs/crafting-your-repository/constructing-ci) | Type: Conceptual | Summary: Learn how Turborepo can help you efficiently complete all the necessary tasks and accelerate your development workflow. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, constructing-ci

        - [Creating an Internal Package](/docs/crafting-your-repository/creating-an-internal-package) | Type: Conceptual | Summary: Learn how to create an Internal Package for your monorepo. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, creating-an-internal-package

        - [Developing applications](/docs/crafting-your-repository/developing-applications) | Type: Conceptual | Summary: Learn how to develop applications in your repository. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, developing-applications

        - [Managing dependencies](/docs/crafting-your-repository/managing-dependencies) | Type: Conceptual | Summary: Learn how to manage dependencies in your monorepo's workspace. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, managing-dependencies

        - [Running tasks](/docs/crafting-your-repository/running-tasks) | Type: Conceptual | Summary: Learn how to run tasks in your repository through the `turbo` CLI. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, running-tasks

        - [Structuring a repository](/docs/crafting-your-repository/structuring-a-repository) | Type: Conceptual | Summary: Start by creating a repository using the conventions of the ecosystem. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, structuring-a-repository

        - [Understanding your repository](/docs/crafting-your-repository/understanding-your-repository) | Type: Conceptual | Summary: Learn how to understand your repository structure using Turborepo. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, understanding-your-repository

        - [Upgrading](/docs/crafting-your-repository/upgrading) | Type: Conceptual | Summary: Learn how to upgrade `turbo` to get the latest improvements to your repository. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, upgrading

        - [Using environment variables](/docs/crafting-your-repository/using-environment-variables) | Type: Conceptual | Summary: Learn how to handle environments for your applications. | Prerequisites: Crafting your repository | Topics: crafting-your-repository, using-environment-variables

    - [Getting started](/docs/getting-started) | Type: Tutorial | Summary: Get started with Turborepo. | Prerequisites: Introduction | Topics: getting-started

        - [Add to an existing repository](/docs/getting-started/add-to-existing-repository) | Type: Tutorial | Summary: Using Turborepo with your existing repository | Prerequisites: Getting started | Topics: getting-started, add-to-existing-repository

        - [Editor integration](/docs/getting-started/editor-integration) | Type: Tutorial | Summary: Making the most of Turborepo | Prerequisites: Getting started | Topics: getting-started, editor-integration

        - [Start with an example](/docs/getting-started/examples) | Type: Tutorial | Summary: Start with an example Turborepo. | Prerequisites: Getting started | Topics: getting-started, examples

        - [Installation](/docs/getting-started/installation) | Type: Tutorial | Summary: Learn how to get started with Turborepo. | Prerequisites: Getting started | Topics: getting-started, installation

    - [Guides](/docs/guides) | Type: Conceptual | Summary: Learn how to use your favorite tooling in a Turborepo. | Prerequisites: Introduction | Topics: guides

        - [Using AI with Turborepo](/docs/guides/ai) | Type: How-to | Summary: Get the most out of AI coding assistants in your Turborepo. | Prerequisites: Guides | Topics: guides, ai

        - [Continuous Integration](/docs/guides/ci-vendors) | Type: How-to | Summary: Recipes for using Turborepo with Vercel, GitHub Actions, and other continuous integration providers. | Prerequisites: Guides | Topics: guides, ci-vendors

            - [Buildkite](/docs/guides/ci-vendors/buildkite) | Type: How-to | Summary: Learn how to use Buildkite with Turborepo. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, buildkite

            - [CircleCI](/docs/guides/ci-vendors/circleci) | Type: How-to | Summary: Learn how to use CircleCI with Turborepo. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, circleci

            - [GitHub Actions](/docs/guides/ci-vendors/github-actions) | Type: How-to | Summary: Learn how to use GitHub Actions with Turborepo. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, github-actions

            - [GitLab CI](/docs/guides/ci-vendors/gitlab-ci) | Type: How-to | Summary: Learn how to use GitLab CI with Turborepo. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, gitlab-ci

            - [Travis CI](/docs/guides/ci-vendors/travis-ci) | Type: How-to | Summary: How to use Travis CI with Turborepo to optimize your CI workflow | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, travis-ci

            - [Vercel](/docs/guides/ci-vendors/vercel) | Type: How-to | Summary: Learn how to use Turborepo on Vercel. | Prerequisites: Continuous Integration | Topics: guides, ci-vendors, vercel

        - [Frameworks](/docs/guides/frameworks) | Type: How-to | Summary: Integrate your favorite framework into Turborepo. | Prerequisites: Guides | Topics: guides, frameworks

            - [Framework bindings in libraries](/docs/guides/frameworks/framework-bindings) | Type: How-to | Summary: Learn how to create framework bindings in packages. | Prerequisites: Frameworks | Topics: guides, frameworks, framework-bindings

            - [Next.js](/docs/guides/frameworks/nextjs) | Type: How-to | Summary: Learn how to use Next.js in a monorepo. | Prerequisites: Frameworks | Topics: guides, frameworks, nextjs

            - [Nuxt](/docs/guides/frameworks/nuxt) | Type: How-to | Summary: Learn more about using Nuxt in your monorepo. | Prerequisites: Frameworks | Topics: guides, frameworks, nuxt

            - [SvelteKit](/docs/guides/frameworks/sveltekit) | Type: How-to | Summary: Learn more about using SvelteKit in your monorepo. | Prerequisites: Frameworks | Topics: guides, frameworks, sveltekit

            - [Vite](/docs/guides/frameworks/vite) | Type: How-to | Summary: Learn more about using Vite in your monorepo. | Prerequisites: Frameworks | Topics: guides, frameworks, vite

        - [Generating code](/docs/guides/generating-code) | Type: How-to | Summary: Learn how to generate code using Turborepo. | Prerequisites: Guides | Topics: guides, generating-code

        - [Handling platforms](/docs/guides/handling-platforms) | Type: How-to | Summary: Learn how to handle caching around operating systems, architectures, and other arbitrary conditions for Turborepo tasks. | Prerequisites: Guides | Topics: guides, handling-platforms

        - [Microfrontends](/docs/guides/microfrontends) | Type: How-to | Summary: Learn how to use Turborepo's built-in microfrontends proxy for local development. | Prerequisites: Guides | Topics: guides, microfrontends

        - [Migrating from Nx](/docs/guides/migrating-from-nx) | Type: How-to | Summary: Learn how to migrate to Turborepo from Nx. | Prerequisites: Guides | Topics: guides, migrating-from-nx

        - [Multi-language support](/docs/guides/multi-language) | Type: How-to | Summary: Learn how to use multiple languages with Turborepo. | Prerequisites: Guides | Topics: guides, multi-language

        - [Publishing libraries](/docs/guides/publishing-libraries) | Type: How-to | Summary: Learn how to publish libraries to the npm registry from a monorepo. | Prerequisites: Guides | Topics: guides, publishing-libraries

        - [Single-package workspaces](/docs/guides/single-package-workspaces) | Type: How-to | Summary: Learn how to use Turborepo in a single-package workspace. | Prerequisites: Guides | Topics: guides, single-package-workspaces

        - [Skipping tasks](/docs/guides/skipping-tasks) | Type: How-to | Summary: Never do the same work twice. | Prerequisites: Guides | Topics: guides, skipping-tasks

        - [Tools](/docs/guides/tools) | Type: How-to | Summary: Learn how to use your favorite tools in a monorepo. | Prerequisites: Guides | Topics: guides, tools

            - [Biome](/docs/guides/tools/biome) | Type: How-to | Summary: Learn how to use Biome in your Turborepo projects. | Prerequisites: Tools | Topics: guides, tools, biome

            - [Docker](/docs/guides/tools/docker) | Type: How-to | Summary: Learn how to use Docker in a monorepo. | Prerequisites: Tools | Topics: guides, tools, docker

            - [ESLint](/docs/guides/tools/eslint) | Type: How-to | Summary: Learn how to use ESLint in a monorepo. | Prerequisites: Tools | Topics: guides, tools, eslint

            - [Jest](/docs/guides/tools/jest) | Type: How-to | Summary: Learn how to use Jest in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, jest

            - [Oxc (oxlint and oxfmt)](/docs/guides/tools/oxc) | Type: How-to | Summary: Learn how to use oxlint and oxfmt in your Turborepo projects. | Prerequisites: Tools | Topics: guides, tools, oxc

            - [Playwright](/docs/guides/tools/playwright) | Type: How-to | Summary: Learn how to use Playwright in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, playwright

            - [Prisma](/docs/guides/tools/prisma) | Type: How-to | Summary: Learn how to use Prisma in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, prisma

            - [shadcn/ui](/docs/guides/tools/shadcn-ui) | Type: How-to | Summary: Learn how to use shadcn/ui in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, shadcn-ui

            - [Storybook](/docs/guides/tools/storybook) | Type: How-to | Summary: Learn how to use Storybook in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, storybook

            - [Tailwind CSS](/docs/guides/tools/tailwind) | Type: How-to | Summary: Learn how to use Tailwind CSS in a Turborepo. | Prerequisites: Tools | Topics: guides, tools, tailwind

            - [TypeScript](/docs/guides/tools/typescript) | Type: How-to | Summary: Learn how to use TypeScript in a monorepo. | Prerequisites: Tools | Topics: guides, tools, typescript

            - [Vitest](/docs/guides/tools/vitest) | Type: How-to | Summary: Learn how to use Vitest in a monorepo. | Prerequisites: Tools | Topics: guides, tools, vitest

    - [Turborepo API reference](/docs/reference) | Type: Conceptual | Summary: Learn about Turborepo's APIs using the reference. | Prerequisites: Introduction | Topics: reference

        - [bin](/docs/reference/bin) | Type: Reference | Summary: API reference for the `turbo bin` command | Prerequisites: Turborepo API reference | Topics: reference, bin

        - [boundaries](/docs/reference/boundaries) | Type: Reference | Summary: API reference for the `turbo boundaries` command | Prerequisites: Turborepo API reference | Topics: reference, boundaries

        - [Configuring turbo.json](/docs/reference/configuration) | Type: Reference | Summary: Learn how to configure Turborepo through `turbo.json`. | Prerequisites: Turborepo API reference | Topics: reference, configuration

        - [create-turbo](/docs/reference/create-turbo) | Type: Reference | Summary: Quickly set up a new Turborepo repository from scratch. | Prerequisites: Turborepo API reference | Topics: reference, create-turbo

        - [devtools](/docs/reference/devtools) | Type: Reference | Summary: API reference for the `turbo devtools` command | Prerequisites: Turborepo API reference | Topics: reference, devtools

        - [docs](/docs/reference/docs) | Type: Reference | Summary: API reference for the `turbo docs` command | Prerequisites: Turborepo API reference | Topics: reference, docs

        - [eslint-config-turbo](/docs/reference/eslint-config-turbo) | Type: Reference | Summary: Learn more about eslint-config-turbo. | Prerequisites: Turborepo API reference | Topics: reference, eslint-config-turbo

        - [eslint-plugin-turbo](/docs/reference/eslint-plugin-turbo) | Type: Reference | Summary: Learn more about eslint-plugin-turbo. | Prerequisites: Turborepo API reference | Topics: reference, eslint-plugin-turbo

        - [generate](/docs/reference/generate) | Type: Reference | Summary: API reference for the `turbo generate` command | Prerequisites: Turborepo API reference | Topics: reference, generate

        - [File glob specification](/docs/reference/globs) | Type: Reference | Summary: Learn about the file glob specification used by `turbo`. | Prerequisites: Turborepo API reference | Topics: reference, globs

        - [info](/docs/reference/info) | Type: Reference | Summary: API reference for the `turbo info` command | Prerequisites: Turborepo API reference | Topics: reference, info

        - [link](/docs/reference/link) | Type: Reference | Summary: API reference for the `turbo link` command | Prerequisites: Turborepo API reference | Topics: reference, link

        - [login](/docs/reference/login) | Type: Reference | Summary: API reference for the `turbo login` command | Prerequisites: Turborepo API reference | Topics: reference, login

        - [logout](/docs/reference/logout) | Type: Reference | Summary: API reference for the `turbo logout` command | Prerequisites: Turborepo API reference | Topics: reference, logout

        - [ls](/docs/reference/ls) | Type: Reference | Summary: API reference for the `turbo ls` command | Prerequisites: Turborepo API reference | Topics: reference, ls

        - [Options overview](/docs/reference/options-overview) | Type: Reference | Summary: Flags, configurations, and System Environment Variables for Turborepo | Prerequisites: Turborepo API reference | Topics: reference, options-overview

        - [Package Configurations](/docs/reference/package-configurations) | Type: Reference | Summary: Learn how to use Package Configurations to bring greater task flexibility to your monorepo's package. | Prerequisites: Turborepo API reference | Topics: reference, package-configurations

        - [prune](/docs/reference/prune) | Type: Reference | Summary: API reference for the `turbo prune` command | Prerequisites: Turborepo API reference | Topics: reference, prune

        - [query](/docs/reference/query) | Type: Reference | Summary: API reference for the `turbo query` command | Prerequisites: Turborepo API reference | Topics: reference, query

        - [run](/docs/reference/run) | Type: Reference | Summary: API reference for the `turbo run` command | Prerequisites: Turborepo API reference | Topics: reference, run

        - [scan (Deprecated)](/docs/reference/scan) | Type: Reference | Summary: API reference for the deprecated `turbo scan` command | Prerequisites: Turborepo API reference | Topics: reference, scan

        - [System environment variables](/docs/reference/system-environment-variables) | Type: Reference | Summary: Learn about system variables used by Turborepo. | Prerequisites: Turborepo API reference | Topics: reference, system-environment-variables

        - [telemetry](/docs/reference/telemetry) | Type: Reference | Summary: API reference for the `turbo telemetry` command | Prerequisites: Turborepo API reference | Topics: reference, telemetry

        - [@turbo/codemod](/docs/reference/turbo-codemod) | Type: Reference | Summary: Learn more about how Turborepo uses codemods to make version migrations easy. | Prerequisites: Turborepo API reference | Topics: reference, turbo-codemod

        - [@turbo/gen](/docs/reference/turbo-gen) | Type: Reference | Summary: Quickly generate new code in your Turborepo. | Prerequisites: Turborepo API reference | Topics: reference, turbo-gen

        - [turbo-ignore](/docs/reference/turbo-ignore) | Type: Reference | Summary: Learn how to use turbo-ignore to skip tasks in CI. | Prerequisites: Turborepo API reference | Topics: reference, turbo-ignore

        - [unlink](/docs/reference/unlink) | Type: Reference | Summary: API reference for the `turbo unlink` command | Prerequisites: Turborepo API reference | Topics: reference, unlink

        - [watch](/docs/reference/watch) | Type: Reference | Summary: API reference for the `watch` command | Prerequisites: Turborepo API reference | Topics: reference, watch

    - [Support policy](/docs/support-policy) | Type: Conceptual | Summary: Learn about Turborepo's Support policy. | Prerequisites: Introduction | Topics: support-policy

    - [Telemetry](/docs/telemetry) | Type: Conceptual | Summary: Learn more about Turborepo's anonymous telemetry. | Prerequisites: Introduction | Topics: telemetry

- [Invalid environment variable prefix](/docs/messages/invalid-env-prefix) | Type: Conceptual | Summary: Learn more about errors with invalid environment variable prefixes in Turborepo. | Topics: messages, invalid-env-prefix

- [Missing root task in turbo.json](/docs/messages/missing-root-task-in-turbo-json) | Type: Conceptual | Summary: Learn more about errors for missing root tasks in turbo.json in Turborepo. | Topics: messages, missing-root-task-in-turbo-json

- [Package task in single-package workspace error](/docs/messages/package-task-in-single-package-workspace) | Type: Conceptual | Summary: Learn more about errors with package tasks in single-package workspaces. | Topics: messages, package-task-in-single-package-workspace

- [Recursive `turbo` invocations](/docs/messages/recursive-turbo-invocations) | Type: Conceptual | Summary: Learn more about errors with recursive scripts and tasks in Turborepo. | Topics: messages, recursive-turbo-invocations

- [Unnecessary package task syntax error](/docs/messages/unnecessary-package-task-syntax) | Type: Conceptual | Summary: Learn more about errors with unnecessary package task syntax in Turborepo. | Topics: messages, unnecessary-package-task-syntax