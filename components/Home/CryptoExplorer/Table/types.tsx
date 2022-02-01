export type TableProps = {
  customHeadings: TableHeading[]
  data?: RowData[][]
  displayPerPage?: number
  displayIndexes?: boolean
  currentPage?: number
}

export type TableHeading = {
  value: string
  sortFn?: (a: any, b: any) => number
}

export type RowData = string | number | JSX.Element

export type SortInfo = {
  ascending: boolean
  nColumn: number
}