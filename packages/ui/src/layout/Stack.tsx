/**
 * Stack — duenner Convenience-Wrapper um {@link Flex}
 *
 * Im Gegensatz zu `Flex` ist die Default-Richtung `"column"` (vertikal),
 * was den haeufigsten Anwendungsfall — Elemente mit konsistenter Luecke
 * untereinander stapeln — pragnanter macht.
 *
 * Stack ergaenzt keine eigene Funktionalitaet ueber Flex hinaus. Wer mehr
 * Kontrolle braucht (Reihen, Reverse, responsive Direction etc.), greift
 * direkt zu `<Flex>`.
 *
 * @example
 *   // vertikaler Stack mit 16px Luecke
 *   <Stack gap="16">
 *     <Card />
 *     <Card />
 *   </Stack>
 *
 *   // horizontaler Stack
 *   <Stack direction="horizontal" gap="8" align="center">
 *     <Icon />
 *     <Label />
 *   </Stack>
 *
 *   // responsive Luecke; `spacing` ist ein Alias fuer `gap`
 *   <Stack spacing={{ initial: "8", md: "16" }} as="ul">
 *     <li>…</li>
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
  // gap hat Vorrang vor dem `spacing`-Alias
  const resolvedGap = gap ?? spacing ?? "16"
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
