import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

const currentDir = dirname(fileURLToPath(import.meta.url))
const stylesDir = currentDir

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
})
