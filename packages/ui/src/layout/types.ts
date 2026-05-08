/**
 * @packages/ui/layout — Core Types
 *
 * Inspiriert von Radix UI Themes Layout-API,
 * re-implementiert auf Tailwind v4 + shadcn-Patterns.
 *
 * Alle Spacing-Props akzeptieren SpacingValue (px-basierte Skala)
 * sowie ResponsiveValue für Breakpoint-spezifische Werte.
 */
import type { HTMLAttributes, ElementType, Ref, CSSProperties } from "react"
import type { SpacingValue } from "./spacing"

/**
 * Responsive Value — einzelner Wert ODER Breakpoint-Objekt.
 *
 * @example
 *   p="16"                          → 16px auf allen Breakpoints
 *   p={{ initial: "8", md: "16" }}  → 8px mobil, 16px ab md
 */
export type ResponsiveValue<T> = T | {
  initial?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  "2xl"?: T
}

// ---- Alignment & Layout ----

export type AlignItems     = "start" | "center" | "end" | "stretch" | "baseline"
export type JustifyContent = "start" | "center" | "end" | "between" | "around" | "evenly"
export type FlexDirection  = "row" | "column" | "row-reverse" | "column-reverse"
export type FlexWrap       = "nowrap" | "wrap" | "wrap-reverse"
export type GridAutoFlow   = "row" | "column" | "dense" | "row-dense" | "column-dense"
export type FlexDisplayValue = "flex" | "inline-flex" | "none"
export type GridDisplayValue = "grid" | "inline-grid" | "none"

/** Erlaubte display-Werte für das display-Prop */
export type DisplayValue =
  | "block"
  | "inline-block"
  | "inline"
  | "none"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline-grid"

/**
 * Basis-Props geteilt von Box, Flex, Grid, Container, Section, Stack.
 *
 * Das polymorphe `as`-Prop ermöglicht semantisch korrektes HTML:
 *   <Box as="article"> → rendert <article>
 *   <Stack as="ul">    → rendert <ul>
 */
export interface BaseLayoutProps extends HTMLAttributes<HTMLElement> {
  // Padding
  p?:  ResponsiveValue<SpacingValue>
  px?: ResponsiveValue<SpacingValue>
  py?: ResponsiveValue<SpacingValue>
  pt?: ResponsiveValue<SpacingValue>
  pr?: ResponsiveValue<SpacingValue>
  pb?: ResponsiveValue<SpacingValue>
  pl?: ResponsiveValue<SpacingValue>

  // Margin — akzeptiert "auto" für mx-auto, mt-auto etc.
  m?:  ResponsiveValue<SpacingValue | "auto">
  mx?: ResponsiveValue<SpacingValue | "auto">
  my?: ResponsiveValue<SpacingValue | "auto">
  mt?: ResponsiveValue<SpacingValue | "auto">
  mr?: ResponsiveValue<SpacingValue | "auto">
  mb?: ResponsiveValue<SpacingValue | "auto">
  ml?: ResponsiveValue<SpacingValue | "auto">

  // Display override
  display?: ResponsiveValue<DisplayValue>

  // Dimensionen — akzeptiert Tailwind-Keywords oder beliebige CSS-Werte
  w?:    string
  h?:    string
  minW?: string
  maxW?: string
  minH?: string
  maxH?: string

  // Polymorphic — rendert als beliebiges HTML-Element oder React-Komponente
  as?: ElementType

  // React 19.2.6 / react-dom 19.2.6 — ref direkt als prop
  ref?: Ref<HTMLElement>

  style?: CSSProperties
}

// ---- Komponent-spezifische Props ----

export type BoxProps = BaseLayoutProps

export interface FlexProps extends Omit<BaseLayoutProps, "display"> {
  display?: ResponsiveValue<FlexDisplayValue>
  direction?: ResponsiveValue<FlexDirection>
  wrap?:      ResponsiveValue<FlexWrap>
  gap?:       ResponsiveValue<SpacingValue>
  align?:     ResponsiveValue<AlignItems>
  justify?:   ResponsiveValue<JustifyContent>
  /**
   * flex shorthand: "1" → flex-1, "auto" → flex-auto, "none" → flex-none
   * oder beliebiger CSS-Wert: "0 0 200px"
   */
  flex?:   string
  basis?:  string
  grow?:   "0" | "1"
  shrink?: "0" | "1"
}

export interface GridProps extends Omit<BaseLayoutProps, "display"> {
  display?: ResponsiveValue<GridDisplayValue>
  /**
   * Anzahl Spalten (Zahl → repeat(n, 1fr)) oder CSS-String:
   *   cols={3}                     → grid-cols-3
   *   cols="200px 1fr"             → [grid-template-columns:200px_1fr]
   *   cols={{ initial: 1, md: 3 }} → responsive
   */
  cols?:      ResponsiveValue<number | string>
  rows?:      ResponsiveValue<number | string>
  gap?:       ResponsiveValue<SpacingValue>
  /** Spalten-Gap (überschreibt gap für die x-Achse) */
  columnGap?: ResponsiveValue<SpacingValue>
  /** Zeilen-Gap (überschreibt gap für die y-Achse) */
  rowGap?:    ResponsiveValue<SpacingValue>
  align?:     ResponsiveValue<AlignItems>
  justify?:   ResponsiveValue<JustifyContent>
  autoFlow?:  GridAutoFlow
}

export interface ContainerProps extends BaseLayoutProps {
  /**
   * Maximale Breite des Containers:
   *   sm  → max-w-md   (~448px)
   *   md  → max-w-2xl  (~672px)
   *   lg  → max-w-4xl  (~896px) — Default
   *   xl  → max-w-6xl  (~1152px)
   *   2xl → max-w-7xl  (~1280px)
   */
  size?:     ResponsiveValue<"sm" | "md" | "lg" | "xl" | "2xl">
  /** Automatisches mx-auto (Default: true) */
  centered?: boolean
}

export interface SectionProps extends BaseLayoutProps {
  /**
   * Vordefiniertess vertikales Padding:
   *   sm → py-32   md → py-48   lg → py-64 (Default)   xl → py-96
   * Wird von explizitem py-Prop überschrieben.
   */
  size?: ResponsiveValue<"sm" | "md" | "lg" | "xl">
}

export interface StackProps extends Omit<FlexProps, "direction"> {
  /** "vertical" → flex-col (Default), "horizontal" → flex-row */
  direction?: "vertical" | "horizontal"
  /** Alias für gap */
  spacing?:   ResponsiveValue<SpacingValue>
}
