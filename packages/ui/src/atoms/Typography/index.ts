import {
  createElement,
  forwardRef,
  type ElementType,
  type HTMLAttributes,
} from "react"
import { cn } from "../../lib/utils"

export type TypographyVariant =
  | "display-large"
  | "display-medium"
  | "display-small"
  | "headline-large"
  | "headline-medium"
  | "headline-small"
  | "title-fluid"
  | "body-fluid"
  | "title-large"
  | "title-medium"
  | "title-small"
  | "body-large"
  | "body-medium"
  | "body-small"
  | "label-large"
  | "label-medium"
  | "label-small"

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
  "display-large": "typography-display-large",
  "display-medium": "typography-display-medium",
  "display-small": "typography-display-small",
  "headline-large": "typography-headline-large",
  "headline-medium": "typography-headline-medium",
  "headline-small": "typography-headline-small",
  "title-fluid": "typography-title-fluid",
  "body-fluid": "typography-body-fluid",
  "title-large": "typography-title-large",
  "title-medium": "typography-title-medium",
  "title-small": "typography-title-small",
  "body-large": "typography-body-large",
  "body-medium": "typography-body-medium",
  "body-small": "typography-body-small",
  "label-large": "typography-label-large",
  "label-medium": "typography-label-medium",
  "label-small": "typography-label-small",
}

const variantDefaultTag: Record<TypographyVariant, ElementType> = {
  "display-large": "h1",
  "display-medium": "h1",
  "display-small": "h2",
  "headline-large": "h2",
  "headline-medium": "h3",
  "headline-small": "h4",
  "title-fluid": "h3",
  "body-fluid": "p",
  "title-large": "h1",
  "title-medium": "h2",
  "title-small": "h3",
  "body-large": "p",
  "body-medium": "p",
  "body-small": "p",
  "label-large": "span",
  "label-medium": "span",
  "label-small": "span",
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
