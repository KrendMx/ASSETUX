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
  tablePaddings?: string
}

export type TableHeading = {
  value: string
  sortFn?: (a: any, b: any) => number
}

export type RowData = {
  sortValue?: any
  value: string | number | JSX.Element | undefined | null
}

export type SortInfo = {
  ascending: boolean
  nColumn: number
}

export type ContainerProps = {
  withShadow?: boolean
  customPaddings?: string
}
export type ArrowContainerProps = {
  shouldRotate?: boolean
}
export type RowProps = {
  nRows?: number
  collapseCols?: number[]
}
export type ElementProps = {
  paddings?: string
}
