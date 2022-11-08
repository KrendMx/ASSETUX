import type { Blockchain, Token } from '@/lib/backend/main/types.backend.main'
import type { ExplorerData } from '@/components/common/crypto-manager/types.crypto-manager'

export type ActionType = 'BUY' | 'SELL'

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
  ref: string | null
}
