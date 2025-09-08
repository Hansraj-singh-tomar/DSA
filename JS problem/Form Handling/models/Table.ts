import { ReactNode } from "react"

export interface Column {
  id: string
  label: string
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined
  icon?: ReactNode
  colSpan?: number
  width?: string
  dateFilter?: any
  tooltip?: string
  minWidth?: number
  maxWidth?: number
  children?: Column[]
}

// Redesigned interface for flexible header configuration
export interface HeaderItem {
  type: "group" | "column"
  id: string
  label: string
  columnIds?: string[] // Only for groups - array of column IDs that belong to this group
  columnId?: string // Only for individual columns - single column ID
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined
}

// Updated configuration for grouped table headers with flexible positioning
export interface GroupedHeaderConfig {
  items: HeaderItem[] // Array of header items in the desired order (mix of groups and individual columns)
}

export type Row = {
  [key: string]: any
}
