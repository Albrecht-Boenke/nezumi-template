"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "../../lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("p-12", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-16",
        month: "flex flex-col gap-16",
        month_caption: "flex justify-center items-center h-32 relative",
        caption_label: "text-text font-medium text-[0.875rem]",
        nav: "flex items-center gap-8",
        button_previous: "h-24 w-24 inline-flex items-center justify-center rounded-sm hover:bg-surface-muted text-text-muted",
        button_next: "h-24 w-24 inline-flex items-center justify-center rounded-sm hover:bg-surface-muted text-text-muted",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-text-muted w-32 font-normal text-[0.75rem]",
        week: "flex w-full mt-8",
        day: "h-32 w-32 text-center text-[0.875rem] p-0 relative",
        day_button: "h-32 w-32 inline-flex items-center justify-center rounded-sm text-text hover:bg-surface-muted aria-selected:bg-brand aria-selected:text-on-brand",
        selected: "bg-brand text-on-brand",
        today: "ring-1 ring-ring",
        outside: "text-text-muted opacity-50",
        disabled: "text-text-muted opacity-50 pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
