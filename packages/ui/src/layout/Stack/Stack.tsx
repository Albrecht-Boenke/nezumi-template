import { Flex } from "../Flex"
import type { StackProps } from "../types"

export function Stack({
  direction = "vertical",
  spacing,
  gap,
  ...props
}: StackProps) {
  return (
    <Flex
      direction={direction === "horizontal" ? "row" : "column"}
      gap={spacing ?? gap}
      {...props}
    />
  )
}

Stack.displayName = "Stack"
