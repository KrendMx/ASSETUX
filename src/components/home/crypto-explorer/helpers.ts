import { ExplorerData } from "@/components/common/crypto-manager/types.crypto-manager"
import { TFunction } from "next-i18next"

export const tableHeadings = (t: TFunction) => [
  {
    value: t("home:explorer_ticker"),
    sortFn: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)
  },
  {
    value: t("home:explorer_buy"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:explorer_sell"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:explorer_change"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:explorer_volume"),
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  { value: t("home:explorer_trade") },
  { value: t("home:explorer_pool") }
]

export const cardRowNames = (t: TFunction) => [
  t("home:explorer_ticker"),
  t("home:explorer_buy"),
  t("home:explorer_sell"),
  t("home:explorer_change"),
  t("home:explorer_volume")
]

export const checkExplorerDataByContext = (
  explorerData: ExplorerData,
  context: string
): boolean => {
  const lowerCasedCtx = context.toLowerCase()
  const valuesToCheck = explorerData.token.name.toLowerCase().split(" ")
  valuesToCheck.push(explorerData.token.symbol.toLowerCase())

  let good = false

  for (const value of valuesToCheck) {
    if (value.startsWith(lowerCasedCtx)) {
      good = true
      break
    }
  }

  return good
}
