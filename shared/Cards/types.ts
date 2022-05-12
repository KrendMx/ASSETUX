import { ActionType } from "@/src/redux/cryptoSlice/types"

export type CardsProps = {
  mobile?: boolean
  withButtons?: boolean
  withPagination?: boolean
  rowNames?: string[]
  data?: CardData[][]
  currentPage?: number
  handleAction?: (action: ActionType, dataIndex: number) => void
}

export type CardData = string | number | JSX.Element | undefined | null
