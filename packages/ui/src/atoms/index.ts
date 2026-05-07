/**
 * @nezumi/ui - Atoms (Level 1)
 *
 * Primitive UI components
 * Pure UI, NO business logic
 *
 * INTERNAL EXPORT - expose consumer-safe leaf modules from @nezumi/ui/components/<name>.
 */

// Re-export atoms (don't export directly from here in apps!)
export { Button, buttonVariants, type ButtonProps } from "./Button"
export { Container, type ContainerProps } from "./Container"
export { Flex, type FlexProps } from "./Flex"
export { Grid, type GridProps } from "./Grid"
export { Box, type BoxProps } from "./Box"
export { Section, type SectionProps } from "./Section"

// Placeholder exports for other atoms
// export { Input, inputVariants, type InputProps } from "./Input"
// export { Label, labelVariants, type LabelProps } from "./Label"
// export { Badge, badgeVariants, type BadgeProps } from "./Badge"
// export { Icon, iconVariants, type IconProps } from "./Icon"
// export { Text, textVariants, type TextProps } from "./Text"
