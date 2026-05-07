import * as React from "react"
import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { Button } from "./Button"

type ActGlobal = typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}

;(globalThis as ActGlobal).IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => {
    root.unmount()
  })
  container.remove()
})

function render(ui: React.ReactNode): HTMLElement {
  act(() => {
    root.render(ui)
  })

  const element = container.firstElementChild
  expect(element).toBeInstanceOf(HTMLElement)
  return element as HTMLElement
}

describe("Button", () => {
  it("renders a native button with default classes", () => {
    const element = render(<Button>Save</Button>)

    expect(element.tagName).toBe("BUTTON")
    expect(element.textContent).toBe("Save")
    expect(element.className).toContain("bg-brand")
    expect(element.className).toContain("h-40")
  })

  it("applies variant, size, and custom classes", () => {
    const element = render(
      <Button className="custom-class" size="lg" variant="outline">
        Open
      </Button>,
    )

    expect(element.className).toContain("border-border")
    expect(element.className).toContain("h-48")
    expect(element.className).toContain("custom-class")
  })

  it("destructive variant uses on-error foreground token", () => {
    const element = render(<Button variant="destructive">Delete</Button>)

    expect(element.className).toContain("bg-error")
    expect(element.className).toContain("text-on-error")
  })

  it("secondary variant uses on-secondary foreground token", () => {
    const element = render(<Button variant="secondary">More</Button>)

    expect(element.className).toContain("bg-secondary")
    expect(element.className).toContain("text-on-secondary")
  })

  it("supports DESIGN.md action variant names", () => {
    const tonal = render(<Button variant="tonal">Tonal</Button>)
    expect(tonal.className).toContain("bg-secondary")
    expect(tonal.className).toContain("text-on-secondary")

    const elevated = render(<Button variant="elevated">Lifted</Button>)
    expect(elevated.className).toContain("bg-surface-raised")
    expect(elevated.className).toContain("text-brand")
    expect(elevated.className).toContain("shadow-sm")
  })

  it("forwards button props and ref", () => {
    const ref = React.createRef<HTMLButtonElement>()
    const element = render(
      <Button data-testid="action" disabled ref={ref} type="button">
        Run
      </Button>,
    )

    expect(element).toBe(ref.current)
    expect((element as HTMLButtonElement).disabled).toBe(true)
    expect(element.getAttribute("type")).toBe("button")
    expect(element.getAttribute("data-testid")).toBe("action")
  })

  it("renders the child element when asChild is true", () => {
    const element = render(
      <Button asChild variant="link">
        <a href="/docs">Docs</a>
      </Button>,
    )

    expect(element.tagName).toBe("A")
    expect(element.getAttribute("href")).toBe("/docs")
    expect(element.className).toContain("text-brand")
    expect(element.hasAttribute("asChild")).toBe(false)
  })
})
