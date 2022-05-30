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

export type Displayable = string | number | JSX.Element | undefined | null
export type DisplayableObject = {
  value: Displayable
}

export type CardData = Displayable | DisplayableObject

export const isDisplayableObject = (value: any): value is DisplayableObject =>
  typeof value == "object" && "value" in value
