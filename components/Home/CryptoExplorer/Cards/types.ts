import { ActionType } from "@/src/redux/cryptoSlice"

export type CardsProps = {
  mobile?: boolean
  rowNames?: string[]
  data?: CardData[][]
  currentPage?: number
  handleAction?: (action: ActionType, dataIndex: number) => void
}

type CardData = string | number | JSX.Element
