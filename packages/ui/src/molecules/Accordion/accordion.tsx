"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Box, Flex } from "../../layout"
import { cn } from "../../lib/utils"

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ref, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ref, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <Box as={AccordionPrimitive.Header} display="flex">
      <Flex
        as={AccordionPrimitive.Trigger}
        ref={ref}
        flex="1"
        align="center"
        justify="between"
        gap="8"
        py="16"
        data-slot="accordion-trigger"
        className={cn(
          "text-left typography-title-medium text-text",
          "transition-all duration-fast hover:underline",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 shrink-0 text-text-muted transition-transform duration-normal" aria-hidden="true">
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </Flex>
    </Box>
  )
}

function AccordionContent({ className, children, ref, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-text",
        "data-[state=closed]:animate-[accordion-up_var(--duration-fast)_var(--ease-in)]",
        "data-[state=open]:animate-[accordion-down_var(--duration-normal)_var(--ease-out)]",
      )}
      {...props}
    >
      <Box pb="16" pt="0" className={cn(className)}>{children}</Box>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
