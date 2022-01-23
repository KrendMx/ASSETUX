export type CardsProps = {
  rowNames?: string[]
  data?: CardData[][]
  currentPage?: number
}

type CardData = string | JSX.Element
