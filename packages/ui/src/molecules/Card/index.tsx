import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-card border border-card-border bg-card-surface text-card-text shadow-card",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-card-header-gap p-card-header-padding",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "typography-title-medium font-semibold leading-none tracking-tight text-card-title-text",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "typography-body-medium text-card-description-text",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "p-card-content-padding",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-card-footer-padding",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "ml-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
}
