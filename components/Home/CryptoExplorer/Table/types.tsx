export type TableProps = {
  customHeadings?: string[]
  data?: RowData[][]
  displayPerPage?: number
  displayIndexes?: boolean
  currentPage?: number
}

type RowData = string | number | JSX.Element
