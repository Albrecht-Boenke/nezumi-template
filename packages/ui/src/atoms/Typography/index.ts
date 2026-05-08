import {
  createElement,
  forwardRef,
  type ElementType,
  type HTMLAttributes,
} from "react"
import { cn } from "../../lib/utils"

export type TypographyVariant =
  | "clamp-large"
  | "clamp-medium"
  | "clamp-small"
  | "clamp-text"
  | "title-large"
  | "title-medium"
  | "body-medium"
  | "label-large"
  | "label-medium"
  | "accent-large"
  | "accent-small"

export type TypographyTone =
  | "default"
  | "muted"
  | "brand"
  | "on-brand"
  | "on-brand-bg"
  | "on-error"
  | "success"
  | "warning"
  | "error"
  | "info"

const variantClass: Record<TypographyVariant, string> = {
  "clamp-large": "typography-clamp-large",
  "clamp-medium": "typography-clamp-medium",
  "clamp-small": "typography-clamp-small",
  "clamp-text": "typography-clamp-text",
  "title-large": "typography-title-large",
  "title-medium": "typography-title-medium",
  "body-medium": "typography-body-medium",
  "label-large": "typography-label-large",
  "label-medium": "typography-label-medium",
  "accent-large": "typography-accent-large",
  "accent-small": "typography-accent-small",
}

const variantDefaultTag: Record<TypographyVariant, ElementType> = {
  "clamp-large": "h1",
  "clamp-medium": "h2",
  "clamp-small": "h3",
  "clamp-text": "p",
  "title-large": "h1",
  "title-medium": "h2",
  "body-medium": "p",
  "label-large": "span",
  "label-medium": "span",
  "accent-large": "h3",
  "accent-small": "span",
}

const toneClass: Record<TypographyTone, string> = {
  default: "text-text",
  muted: "text-text-muted",
  brand: "text-brand",
  "on-brand": "text-on-brand",
  "on-brand-bg": "text-on-brand-bg",
  "on-error": "text-on-error",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
}

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant
  tone?: TypographyTone
  as?: ElementType
  balance?: boolean
  pretty?: boolean
  truncate?: boolean
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    {
      variant,
      tone = "default",
      as,
      balance,
      pretty,
      truncate,
      className,
      children,
      ...typographyProps
    },
    ref,
  ) {
    const Component = (as ?? variantDefaultTag[variant]) as ElementType

    return createElement(
      Component,
      {
        ref,
        className: cn(
          variantClass[variant],
          toneClass[tone],
          balance && "text-balance",
          pretty && "text-pretty",
          truncate && "truncate",
          className,
        ),
        ...typographyProps,
      },
      children,
    )
  },
)
