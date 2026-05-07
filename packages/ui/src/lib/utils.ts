import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Breakpoint = "initial" | "sm" | "md" | "lg" | "xl" | "2xl"

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>

export function getResponsiveClasses<T extends string>(
  prop: Responsive<T> | undefined,
  classMap: Record<T, string>,
  responsivePrefixes: Record<Breakpoint, string> = {
    initial: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  }
): string {
  if (!prop) return ""

  if (typeof prop === "string") {
    return classMap[prop] || ""
  }

  const classes: string[] = []
  for (const [bp, value] of Object.entries(prop)) {
    if (value && classMap[value as T]) {
      const prefix = responsivePrefixes[bp as Breakpoint]
      const baseClass = classMap[value as T]
      classes.push(`${prefix}${baseClass}`)
    }
  }
  return classes.join(" ")
}
