"use client"

import * as React from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/popover"
import { Calendar } from "../Calendar/calendar"
import { cn } from "../../lib/utils"

export interface DatePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  className,
  disabled,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          data-slot="date-picker-trigger"
          className={cn(
            "inline-flex h-40 w-full items-center gap-8 rounded-md border border-border bg-surface-raised px-12 text-left text-[0.875rem] text-text",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-text-muted",
            className,
          )}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-text-muted">
            <rect x="2" y="3" width="12" height="11" rx="1" />
            <line x1="2" y1="6" x2="14" y2="6" />
            <line x1="5" y1="2" x2="5" y2="4" />
            <line x1="11" y1="2" x2="11" y2="4" />
          </svg>
          <span className="truncate">{value ? format(value, "PPP") : placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onValueChange} />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
