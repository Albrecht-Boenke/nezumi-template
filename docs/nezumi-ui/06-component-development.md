# Component Development

## Steps

1. Implement the component internally.
2. Use Tailwind utilities generated from `@theme`.
3. Use `cn` from `@nezumi/ui/lib/utils`.
4. Add a public leaf export under `src/components`.
5. Add focused tests when behavior grows beyond simple rendering.

## Example

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@nezumi/ui/lib/utils"

const alertVariants = cva("rounded-lg border p-16 text-sm", {
  variants: {
    variant: {
      default: "bg-background text-foreground border-border",
      success: "bg-success text-success-fg border-success",
      warning: "bg-warning text-warning-fg border-warning",
      destructive: "bg-destructive text-white border-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  ref?: React.Ref<HTMLDivElement>
}

export function Alert({ className, variant, ref, ...props }: AlertProps) {
  return <div ref={ref} className={cn(alertVariants({ variant }), className)} {...props} />
}
```

## Public Leaf

```tsx
export { Alert, type AlertProps } from "../molecules/Alert"
```

Consumer import:

```tsx
import { Alert } from "@nezumi/ui/components/alert"
```
