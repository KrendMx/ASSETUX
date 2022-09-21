import type { Token } from "@/lib/backend/main/types"

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

export type ServerToClientEvents = {
  chart: (data: ExplorerData[]) => void
}

export type ClientToServerEvents = {}

export type CryptoManagerProps = {
  getToken?: boolean
  getChart?: boolean
}
