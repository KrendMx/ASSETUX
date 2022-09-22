import { ExplorerData } from "@/components/common/crypto-manager/types.crypto-manager"
import { MarketHistoryData, Token } from "@/lib/backend/main/types.backend.main"
import { CurrenciesType, mapCurrency } from "@/lib/data/currencies"
import { ActionType } from "@/lib/redux/crypto/types"
import { GraphData } from "./element/graph"
import Element from "./element"

const mapMarketHistory = (
  marketHistory: MarketHistoryData[],
  currency: CurrenciesType
): GraphData[] => {
  const startHistory = marketHistory.at(0)

  if (!startHistory) {
    return []
  }

  const startTimestamp = Number(startHistory.timestamp)

  const marketHistoryLength = marketHistory.length

  const graphData = new Array<GraphData>(marketHistoryLength)

  for (let i = 0; i < marketHistory.length; i++) {
    graphData[i] = {
      x: Number(marketHistory[i]!.timestamp) - startTimestamp,
      y: marketHistory[i]!.price[currency]
    }
  }

  return graphData
}

export const mapExplorerData = (
  explorerData: ExplorerData[],
  handleAction: (action: ActionType, token: Token) => void,
  currency: CurrenciesType,
  action: ActionType
) => {
  return explorerData
    .filter((element) => element.token.enabled && element.currency == currency)
    .sort((a, b) => b.buy - a.buy)
    .map((element) => (
      <Element
        key={element.id}
        icon={element.token.logo_uri}
        symbol={element.token.symbol}
        price={`${action == "SELL" ? element.sell : element.buy} ${mapCurrency(
          currency
        )}`}
        change24h={element.change24}
        marketHistory={
          element.token.market_history &&
          mapMarketHistory(element.token.market_history, currency)
        }
        onBuy={() => handleAction("BUY", element.token)}
        onSell={() => handleAction("SELL", element.token)}
      />
    ))
}

export const getSkeletons = () => {
  const skeletons = []
  for (let i = 0; i < 6; i++) {
    skeletons.push(<Element key={i} />)
  }
  return skeletons
}
