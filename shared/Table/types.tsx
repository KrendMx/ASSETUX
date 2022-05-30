export type TableProps = {
  customHeadings: TableHeading[]
  data?: RowData[][]
  displayPerPage?: number
  displayIndexes?: boolean
  currentPage?: number
  withoutShadow?: boolean
  collapseLastCols?: number
  withPagination?: boolean
  collapseCols?: number[]
  customPaddings?: string
}

export type TableHeading = {
  value: string
  sortFn?: (a: any, b: any) => number
}

export type Displayable = string | number | JSX.Element | undefined | null

export type DisplayableObject = {
  value: any
  display: Displayable
}

export type RowData = Displayable | DisplayableObject

export const isDisplayableObject = (value: any): value is DisplayableObject =>
  typeof value == "object" ? "value" in value && "display" in value : false

export type SortInfo = {
  ascending: boolean
  nColumn: number
}
