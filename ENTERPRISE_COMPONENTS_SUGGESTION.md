# Component-Referenz: Button & Card

Stack: React 19 · Tailwind v4 · radix-ui · CVA

---

## Button

Verbesserungen gegenüber `src/atoms/Button/Button.tsx`:

- `rounded-[--button-radius]` statt `rounded-md` — nutzt den Token aus `button.css`
- `icon: "size-40"` statt `h-40 w-40` — per Styling-Regel: Prefer `size-*` over `w-* h-*`
- `whitespace-nowrap` und SVG-Defaults in der Basis (`pointer-events-none`, `shrink-0`)

Icon-Sizing **nicht** per `[&_svg]:size-*` in CVA-Varianten — das übernimmt CSS via `data-icon`.
Kein `data-slot` — nicht Teil des Projekts.

```tsx
import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-8 whitespace-nowrap",
    "rounded-[--button-radius] text-sm font-medium",
    "transition-colors duration-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:     "bg-action-primary text-action-primary-fg hover:bg-action-primary-hover active:bg-action-primary-active",
        secondary:   "bg-action-secondary text-action-secondary-fg hover:bg-action-secondary-hover",
        destructive: "bg-action-destructive text-action-destructive-fg hover:bg-action-destructive-hover",
        outline:     "border border-border-strong bg-transparent text-foreground hover:bg-background-subtle hover:border-action-primary",
        ghost:       "bg-transparent text-foreground hover:bg-background-subtle",
        link:        "bg-transparent text-action-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:   "h-32 px-12 text-xs",
        md:   "h-40 px-16 text-sm",
        lg:   "h-48 px-24 text-base",
        xl:   "h-56 px-32 text-lg",
        icon: "size-40 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

Icon-Verwendung:

```tsx
<Button>
  <SearchIcon data-icon="inline-start" />
  Suchen
</Button>
```

---

## Card

Neue Komponente. Nutzt die Token aus `src/styles/components/card.css`:
`--card-radius`, `--card-padding`, `--card-bg`, `--card-border`, `--card-shadow`.

Kein `data-slot`. Token-Namen entsprechen dem tatsächlichen Projekt-Token-System
(`bg-surface`, `border-border`, `text-foreground-muted` — nicht die shadcn-upstream-Namen).

```tsx
import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-[--card-bg] text-foreground border border-[--card-border]",
        "rounded-[--card-radius] shadow-[--card-shadow]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4 p-[--card-padding]", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ref, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ref, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      ref={ref}
      className={cn("text-foreground-muted text-sm", className)}
      {...props}
    />
  )
}

function CardContent({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("p-[--card-padding] pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-[--card-padding] pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```
