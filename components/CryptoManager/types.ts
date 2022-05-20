import type { Token } from "@/src/BackendClients/main/types"

export type ExplorerData = {
  buy: number
  change24: number
  currency: string
  id: number
  sell: number
  ticker: string
  token_address: string
  volume24: number
  token: Token
}
