export type TableProps = {
  customHeadings: TableHeading[]
  data?: RowData[][]
  displayPerPage?: number
  displayIndexes?: boolean
  currentPage?: number
  withoutShadow?: boolean
  collapseLastCols?: number
  withPagination?: boolean
}

export type TableHeading = {
  value: string
  sortFn?: (a: any, b: any) => number
}

export type RowData = string | number | JSX.Element | undefined | null

export type SortInfo = {
  ascending: boolean
  nColumn: number
}
