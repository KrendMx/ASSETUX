import type { Blockchain, Token } from "@/src/BackendClient/types"
import type { ExplorerData } from "@/components/CryptoManager/types"

export type ActionType = "BUY" | "SELL"

export type CryptoState = {
  availableBlockchains: Blockchain[] | null
  selectedBlockchain: Blockchain | null
  availableTokens: Token[] | null
  selectedToken: Token | null
  currentRate: number | null
  action: ActionType
  explorerData: ExplorerData[] | null
}
