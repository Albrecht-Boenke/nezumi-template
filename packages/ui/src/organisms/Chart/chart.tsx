"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "../../lib/utils"

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<"light" | "dark", string>
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />")
  return ctx
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        data-slot="chart"
        className={cn(
          "flex aspect-video justify-center text-[0.75rem] text-text",
          "[&_.recharts-cartesian-axis-tick_text]:fill-text-muted",
          "[&_.recharts-cartesian-grid_line]:stroke-border",
          "[&_.recharts-tooltip-cursor]:stroke-border",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, v]) => v.theme || v.color)
  if (!colorConfig.length) return null
  const css = colorConfig
    .map(([key, item]) => {
      const color = item.theme?.light ?? item.color
      return color ? `  --color-${key}: ${color};` : null
    })
    .filter(Boolean)
    .join("\n")
  const dark = colorConfig
    .map(([key, item]) => {
      const color = item.theme?.dark ?? item.color
      return color ? `  --color-${key}: ${color};` : null
    })
    .filter(Boolean)
    .join("\n")
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart=${id}] {\n${css}\n}\n.dark [data-chart=${id}] {\n${dark}\n}`,
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel,
  className,
}: React.ComponentProps<"div"> & {
  active?: boolean
  payload?: Array<{ name?: string; value?: unknown; color?: string; dataKey?: string }>
  label?: React.ReactNode
  hideLabel?: boolean
}) {
  const { config } = useChart()
  if (!active || !payload?.length) return null
  return (
    <div
      className={cn(
        "min-w-[8rem] rounded-md border border-border bg-surface-raised px-12 py-8 text-[0.75rem] shadow-md",
        className,
      )}
    >
      {!hideLabel && label != null && <div className="mb-4 font-medium text-text">{label}</div>}
      <div className="grid gap-4">
        {payload.map((item, idx) => {
          const key = item.dataKey ?? item.name ?? String(idx)
          const itemConfig = config[key as string]
          return (
            <div key={idx} className="flex items-center justify-between gap-12 text-text-muted">
              <div className="flex items-center gap-8">
                <span className="h-8 w-8 rounded-sm" style={{ backgroundColor: item.color }} aria-hidden />
                <span>{itemConfig?.label ?? item.name ?? key}</span>
              </div>
              <span className="font-mono text-text">{String(item.value)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  payload,
  className,
}: {
  payload?: Array<{ value?: string; color?: string; dataKey?: string }>
  className?: string
}) {
  const { config } = useChart()
  if (!payload?.length) return null
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-12 pt-12", className)}>
      {payload.map((item, idx) => {
        const key = item.dataKey ?? item.value ?? String(idx)
        const itemConfig = config[key as string]
        return (
          <div key={idx} className="flex items-center gap-8 text-[0.75rem] text-text-muted">
            <span className="h-8 w-8 rounded-sm" style={{ backgroundColor: item.color }} aria-hidden />
            <span>{itemConfig?.label ?? item.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle }
