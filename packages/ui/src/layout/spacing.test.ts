import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

import { SPACING_SCALE } from "./spacing"

const currentDir = dirname(fileURLToPath(import.meta.url))
const spacingCssPath = resolve(currentDir, "../styles/tokens/spacing.css")

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

describe("spacing scale", () => {
  it("keeps TypeScript spacing values aligned with CSS theme tokens", async () => {
    const css = await readFile(spacingCssPath, "utf8")

    expect(css).toMatch(/--spacing:\s*initial;/)

    for (const [key, value] of Object.entries(SPACING_SCALE)) {
      expect(css).toMatch(
        new RegExp(`--spacing-${key}:\\s*${escapeRegExp(value)};`),
      )
    }
  })
})
