import type { Blockchain, Token } from "@/lib/backend/main/types"
import type { ExplorerData } from "@/components/common/crypto-manager/types"

export type ActionType = "BUY" | "SELL"

export type CryptoState = {
  availableBlockchains: Blockchain[] | null
  selectedBlockchain: Blockchain | null
  availableTokens: Token[] | null
  sellTokens: Token[] | null
  selectedToken: Token | null
  selectedSellToken: Token | null
  currentRate: number | null
  action: ActionType
  explorerData: ExplorerData[] | null
  sellOrderId: string | null
}
