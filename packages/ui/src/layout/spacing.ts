/**
 * @nezumi/ui/layout — Spacing Scale
 *
 * Pixel-benannte Spacing-Werte auf rem-Basis.
 * Benennung nach px macht den konkreten Wert explizit lesbar:
 *   <Flex gap="16"> → 16px gap
 *
 * Alignt mit dem CSS-first @theme Spacing-Scale in src/styles/tokens/spacing.css.
 * CSS bleibt Source of Truth; dieses Objekt begrenzt nur erlaubte Prop-Werte.
 */

export const SPACING_SCALE = {
  "0":  "0rem",
  "1":  "0.0625rem",  // 1px
  "2":  "0.125rem",   // 2px
  "4":  "0.25rem",    // 4px
  "8":  "0.5rem",     // 8px
  "12": "0.75rem",    // 12px
  "16": "1rem",       // 16px
  "24": "1.5rem",     // 24px
  "32": "2rem",       // 32px
  "40": "2.5rem",     // 40px
  "48": "3rem",       // 48px
  "56": "3.5rem",     // 56px
  "64": "4rem",       // 64px
  "96": "6rem",       // 96px
} as const

export type SpacingValue = keyof typeof SPACING_SCALE
