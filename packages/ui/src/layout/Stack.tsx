/**
 * Stack — Vertikaler / horizontaler Flex-Stack
 *
 * Vereinfachter Flex-Wrapper für die häufigste Anwendung:
 * Elemente gleichmäßig entlang einer Achse stapeln.
 * `spacing` ist ein semantischer Alias für `gap`.
 *
 * @example
 *   <Stack gap="16">
 *     <Card /> <Card /> <Card />
 *   </Stack>
 *
 *   <Stack direction="horizontal" gap="8" align="center">
 *     <Icon /> <Label />
 *   </Stack>
 *
 *   <Stack spacing={{ initial: "8", md: "16" }} as="ul">
 *     responsive gap
 *   </Stack>
 */
import { Flex } from "./Flex"
import type { StackProps } from "./types"

export function Stack({
  direction = "vertical",
  spacing,
  gap,
  ...props
}: StackProps) {
  // "spacing" ist ein ergonomischer Alias für "gap".
  // gap hat Vorrang, wenn beides angegeben wird.
  const resolvedGap = gap ?? spacing ?? "16"

  // Stack-Richtung auf Flex-Direction mappen
  const flexDirection = direction === "horizontal" ? "row" : "column"

  return (
    <Flex
      direction={flexDirection}
      gap={resolvedGap}
      {...props}
    />
  )
}

Stack.displayName = "Stack"
