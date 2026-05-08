import * as React from "react"
import { Box, Flex } from "../../layout"
import { cn } from "../../lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
}

function Card({ className, size = "default", ref, ...props }: CardProps) {
  return (
    <Box
      ref={ref}
      data-slot="card"
      className={cn(
        "bg-card-surface text-card-text border border-card-border rounded-card shadow-card",
        size === "sm" && "p-12",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <Box
      ref={ref}
      display="flex"
      data-slot="card-header"
      className={cn(
        "flex-col gap-card-header-gap p-card-header-padding",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ref, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn(
        "text-card-title-text font-bold",
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ref, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn(
        "text-card-description-text text-card-description",
        className,
      )}
      {...props}
    />
  )
}

function CardAction({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <Flex
      ref={ref}
      justify="end"
      gap="8"
      data-slot="card-action"
      className={cn(className)}
      {...props}
    />
  )
}

function CardContent({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <Box
      ref={ref}
      data-slot="card-content"
      className={cn(
        "p-card-content-padding",
        className,
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <Flex
      ref={ref}
      align="center"
      data-slot="card-footer"
      className={cn("p-card-footer-padding", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
}
