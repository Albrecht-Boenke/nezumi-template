import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

const currentDir = dirname(fileURLToPath(import.meta.url))
const stylesDir = currentDir
const packageDir = resolve(stylesDir, "../..")

function tokenDeclaration(name: string, value: string): RegExp {
  return new RegExp(`${name}:\\s*${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")};`)
}

describe("design tokens", () => {
  it("exposes shadcn-compatible color aliases through Nezumi semantics", async () => {
    const css = await readFile(resolve(stylesDir, "semantic/colors.css"), "utf8")

    expect(css).toMatch(tokenDeclaration("--color-background", "var(--color-surface)"))
    expect(css).toMatch(tokenDeclaration("--color-foreground", "var(--color-text)"))
    expect(css).toMatch(tokenDeclaration("--color-primary", "var(--color-brand)"))
    expect(css).toMatch(tokenDeclaration("--color-primary-foreground", "var(--color-on-brand)"))
    expect(css).toMatch(tokenDeclaration("--color-secondary-foreground", "var(--color-on-secondary)"))
    expect(css).toMatch(tokenDeclaration("--color-muted", "var(--color-surface-muted)"))
    expect(css).toMatch(tokenDeclaration("--color-muted-foreground", "var(--color-text-muted)"))
    expect(css).toMatch(tokenDeclaration("--color-card", "var(--color-surface-raised)"))
    expect(css).toMatch(tokenDeclaration("--color-card-foreground", "var(--color-text)"))
    expect(css).toMatch(tokenDeclaration("--color-popover", "var(--color-surface-raised)"))
    expect(css).toMatch(tokenDeclaration("--color-popover-foreground", "var(--color-text)"))
    expect(css).toMatch(tokenDeclaration("--color-input", "var(--color-border)"))
    expect(css).toMatch(tokenDeclaration("--color-destructive", "var(--color-error)"))
    expect(css).toMatch(tokenDeclaration("--color-destructive-foreground", "var(--color-on-error)"))
  })

  it("uses class-based dark mode for Tailwind variants", async () => {
    const css = await readFile(resolve(stylesDir, "design-tokens.css"), "utf8")

    expect(css).toContain("@custom-variant dark (&:where(.dark, .dark *));")
  })

  it("disables Tailwind default colors so color utilities come from Nezumi tokens", async () => {
    const css = await readFile(resolve(stylesDir, "tokens/colors.css"), "utf8")

    expect(css).toContain("--color-*: initial;")
    expect(css).toMatch(tokenDeclaration("--color-nezumi-sabi", "oklch(from #47585c l c h)"))
  })

  it("keeps button structure tokens in the component token layer", async () => {
    const css = await readFile(resolve(stylesDir, "components/button.css"), "utf8")

    expect(css).toMatch(tokenDeclaration("--radius-button", "var(--radius-sm)"))
    expect(css).toMatch(tokenDeclaration("--spacing-button-md-x", "var(--spacing-24)"))
    expect(css).toMatch(tokenDeclaration("--font-weight-button", "var(--font-weight-medium)"))
  })

  it("keeps typography primitives in the global token layer", async () => {
    const css = await readFile(resolve(stylesDir, "tokens/typography.css"), "utf8")

    expect(css).toMatch(tokenDeclaration("--font-family-sans", 'var(--font-urbanist, "Urbanist"), system-ui,\n    -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'))
    expect(css).toMatch(tokenDeclaration("--font-family-accent", 'var(--font-space-grotesk, "Space Grotesk"),\n    var(--font-family-sans)'))
    expect(css).toMatch(tokenDeclaration("--font-accent", "var(--font-family-accent)"))
    expect(css).toMatch(tokenDeclaration("--font-weight-regular", "400"))
    expect(css).not.toContain("--text-sm:")
    expect(css).not.toContain("--text-4xl:")
    expect(css).not.toContain("--font-weight-normal:")
    expect(css).not.toContain("--font-weight-semibold:")
    expect(css).not.toContain("--leading-normal:")
    expect(css).not.toContain("--tracking-tight:")
  })

  it("keeps typography component classes with the Typography atom", async () => {
    const css = await readFile(resolve(stylesDir, "../atoms/Typography/tokens.css"), "utf8")
    const designTokens = await readFile(resolve(stylesDir, "design-tokens.css"), "utf8")

    expect(designTokens).toContain('@import "../atoms/Typography/tokens.css";')
    expect(css).toContain(".typography-clamp-large")
    expect(css).toContain(".typography-clamp-text")
    expect(css).toContain(".typography-body-medium")
    expect(css).toContain(".typography-label-medium")
    expect(css).toContain(".typography-accent-small")
    expect(css).not.toContain(".typography-display-large")
    expect(css).not.toContain(".typography-headline-medium")
    expect(css).not.toContain(".typography-body-small")
    expect(css).toMatch(tokenDeclaration("--typography-clamp-large-size", "clamp(2.5rem, 4vw + 1rem, 4.5rem)"))
    expect(css).toMatch(tokenDeclaration("--typography-body-medium-size", "16px"))
    expect(css).toMatch(tokenDeclaration("--typography-label-medium-weight", "var(--font-weight-bold)"))
    expect(css).toMatch(tokenDeclaration("--typography-accent-small-size", "13px"))
  })

  it("exports typography and theme provider public surfaces", async () => {
    const pkg = JSON.parse(await readFile(resolve(packageDir, "package.json"), "utf8")) as {
      exports: Record<string, string>
    }

    expect(pkg.exports["./components/typography"]).toBe("./src/components/typography.tsx")
    expect(pkg.exports["./providers/theme"]).toBe("./src/providers/Theme/index.tsx")
  })

  it("registers only the product breakpoints required by DESIGN.md", async () => {
    const css = await readFile(resolve(stylesDir, "tokens/breakpoints.css"), "utf8")

    expect(css).toContain("--breakpoint-*: initial;")
    expect(css).toMatch(tokenDeclaration("--breakpoint-md", "48rem"))
    expect(css).toMatch(tokenDeclaration("--breakpoint-lg", "64rem"))
    expect(css).not.toContain("--breakpoint-sm")
    expect(css).not.toContain("--breakpoint-xl")
    expect(css).not.toContain("--breakpoint-2xl")
  })
})
