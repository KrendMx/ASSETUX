export type CardsProps = {
  mobile?: boolean
  withPagination?: boolean
  rowNames?: string[]
  data?: CardData[][]
  currentPage?: number
  buttons?: ActionElement[]
}

export type CardData = {
  value: string | number | JSX.Element | undefined | null
}

export type ActionElement = (dataIndex: number) => JSX.Element | null
