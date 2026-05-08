"use client"

import type { Transition, Variants } from "framer-motion"

/**
 * Liest eine CSS Custom Property vom <html>-Element.
 * SSR-safe: gibt im Server-Rendering den Fallback zurück.
 */
function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

/** "200ms" | "0.2s" → 0.2 (Sekunden, wie Framer Motion sie erwartet) */
function toSeconds(cssTime: string): number {
  if (cssTime.endsWith("ms")) return parseFloat(cssTime) / 1000
  if (cssTime.endsWith("s"))  return parseFloat(cssTime)
  return parseFloat(cssTime) || 0
}

/** "cubic-bezier(0.4, 0, 0.2, 1)" → [0.4, 0, 0.2, 1] */
function toCubicBezier(cssEase: string): [number, number, number, number] | string {
  const m = cssEase.match(/cubic-bezier\(([^)]+)\)/)
  if (!m) return cssEase as string
  const [a, b, c, d] = m[1].split(",").map((n) => parseFloat(n.trim()))
  return [a, b, c, d]
}

/**
 * SSOT-konformer Motion-Namespace.
 * Baut zur Laufzeit aus den CSS-Tokens — kein Wert wird hier dupliziert.
 */
export const motion = {
  duration: {
    instant: () => toSeconds(readVar("--duration-instant", "0ms")),
    fast:    () => toSeconds(readVar("--duration-fast",    "100ms")),
    normal:  () => toSeconds(readVar("--duration-normal",  "200ms")),
    slow:    () => toSeconds(readVar("--duration-slow",    "300ms")),
    slower:  () => toSeconds(readVar("--duration-slower",  "500ms")),
    lazy:    () => toSeconds(readVar("--duration-lazy",    "800ms")),
  },
  ease: {
    linear:  () => toCubicBezier(readVar("--ease-linear",  "linear")),
    in:      () => toCubicBezier(readVar("--ease-in",      "cubic-bezier(0.4, 0, 1, 1)")),
    out:     () => toCubicBezier(readVar("--ease-out",     "cubic-bezier(0, 0, 0.2, 1)")),
    inOut:   () => toCubicBezier(readVar("--ease-in-out",  "cubic-bezier(0.4, 0, 0.2, 1)")),
    bounce:  () => toCubicBezier(readVar("--ease-bounce",  "cubic-bezier(0.34, 1.56, 0.64, 1)")),
    spring:  () => toCubicBezier(readVar("--ease-spring",  "cubic-bezier(0.175, 0.885, 0.32, 1.275)")),
  },
  stagger: {
    fast: () => toSeconds(readVar("--stagger-fast", "30ms")),
    base: () => toSeconds(readVar("--stagger-base", "50ms")),
    slow: () => toSeconds(readVar("--stagger-slow", "100ms")),
  },
} as const

/** Vorgefertigte Transitions für die häufigsten Use Cases */
export const transitions = {
  hover:  (): Transition => ({ duration: motion.duration.fast(),   ease: motion.ease.out() }),
  state:  (): Transition => ({ duration: motion.duration.normal(), ease: motion.ease.out() }),
  dialog: (): Transition => ({ duration: motion.duration.slow(),   ease: motion.ease.spring() }),
  page:   (): Transition => ({ duration: motion.duration.slower(), ease: motion.ease.inOut() }),
  reveal: (): Transition => ({ duration: motion.duration.lazy(),   ease: motion.ease.out() }),
} as const

/** Vorgefertigte Variants für Section-Reveals mit Stagger */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown:  { opacity: 1, y: 0 },
}

export const containerVariants = (staggerKey: keyof typeof motion.stagger = "base"): Variants => ({
  hidden: {},
  shown: {
    transition: { staggerChildren: motion.stagger[staggerKey]() },
  },
})

/** A11y: respektiert prefers-reduced-motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
