"use client"

import * as React from "react"

// NOTE: The 'recharts' dependency has been removed from this file to resolve a build issue.
// The original chart components are preserved in the project history and can be restored later.

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = () => null
const ChartTooltipContent = () => null
const ChartLegend = () => null
const ChartLegendContent = () => null
const ChartStyle = () => null

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
