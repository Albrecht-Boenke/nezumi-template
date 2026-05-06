# Enterprise Grade Component Suggestions (React 19 + Tailwind v4)

Dieses Dokument enthält die Architektur-Vorschläge für die `Button` und `Card` Komponenten im **Nezumi UI** Design System, basierend auf dem aktuellen Gold-Standard für Enterprise-Applikationen (Stand Mai 2026).

## Architektonische Leitplanken

1.  **React 19 Native**: Verzicht auf `forwardRef`. Das `ref` Attribut wird als regulärer Prop behandelt.
2.  **Tailwind v4 Optimized**: Nutzung von CSS-Variablen im `@theme` Block und neuen Utilities wie `size-*`.
3.  **Data-Slot Pattern**: Jedes Komponenten-Element erhält ein `data-slot` Attribut (z.B. `data-slot="card-content"`), um präzise CSS-Selektoren und MCP-Unterstützung zu ermöglichen.
4.  **3-Layer Token System**:
    -   **Layer 1**: Primitives (OKLCH Farben, Spacing Scale).
    -   **Layer 2**: Semantic (Action-Primary, Surface-Elevated).
    -   **Layer 3**: Component-Specific (z.B. `rounded-[--card-radius]`).

---

## 1. Button (Atom)

Die Implementierung nutzt das `Slot` Primitiv für volle Flexibilität (`asChild`) und skaliert Icons automatisch basierend auf der Button-Größe.

```tsx
/**
 * @nezumi/ui — Button Atom (Enterprise Grade)
 */
import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-8 whitespace-nowrap",
    "rounded-[--button-radius] text-sm font-medium",
    "transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ],
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-action-primary-fg hover:bg-action-primary-hover active:bg-action-primary-active",
        secondary: "bg-action-secondary text-action-secondary-fg hover:bg-action-secondary-hover",
        destructive: "bg-action-destructive text-action-destructive-fg hover:bg-action-destructive-hover",
        outline: "border border-border-strong bg-transparent text-foreground hover:bg-background-subtle hover:border-action-primary",
        ghost: "bg-transparent text-foreground hover:bg-background-subtle",
        link: "bg-transparent text-action-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-32 px-12 text-xs [&_svg]:size-14",
        md: "h-40 px-16 text-sm [&_svg]:size-16",
        lg: "h-48 px-24 text-base [&_svg]:size-20",
        xl: "h-56 px-32 text-lg [&_svg]:size-24",
        icon: "size-40 p-0", 
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
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
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

---

## 2. Card (Molecule/Atom)

Die Card ist als Compound-Component aufgebaut und nutzt die Layer-3 Tokens für Radius und Padding.

```tsx
/**
 * @nezumi/ui — Card Component (Enterprise Grade)
 */
import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "bg-surface-primary text-foreground border border-border-subtle shadow-sm",
        "rounded-[--card-radius]",
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
      data-slot="card-header"
      className={cn("flex flex-col gap-4 p-[--card-padding]", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ref, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ref, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardContent({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("p-[--card-padding] pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center p-[--card-padding] pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## Warum dieser Ansatz?

1.  **Ref-Handling**: Durch den Verzicht auf `forwardRef` wird der Code sauberer und performanter, da React 19 `ref` nativ als Prop auflöst.
2.  **Scalable Icons**: Die Nutzung von `[&_svg]:size-*` innerhalb der Button-Size-Varianten stellt sicher, dass Icons ohne manuelles Zutun immer die richtige Proportion zum Button haben.
3.  **Token-Bindung**: Die explizite Nutzung von `rounded-[--card-radius]` stellt sicher, dass Änderungen an den Design-Tokens in der CSS-Datei sofort und ohne Code-Änderungen systemweit reflektiert werden.
4.  **Data-Slot Selektoren**: In komplexen Layouts oder Test-Environments können Komponenten nun über `[data-slot="button"]` angesprochen werden, was unabhängig von generierten CSS-Klassen funktioniert.
