import { TokenOption } from '@/components/home/form-group/form/types.form'
import {
  IChain,
  IMerchantToken
} from '@/lib/backend/ecommerce/types.backend.ecommerce'
import { Blockchain, Token } from './backend/main/types.backend.main'
import type { Option } from '@/components/common/input-select/types.input-select'
import { env } from './env/client.mjs'

export const mapTokens = (tokens: Token[] | IMerchantToken[]): TokenOption[] =>
  tokens
    // .filter((token) => token.enabled)
    .map((token) => ({
      value: token.symbol,
      icon: token.logo_uri,
      description: token.name,
      shortDescription: token.name,
      address: token.address
    }))

export const mapBlockchains = (
  blockchains: IChain[] | Blockchain[]
): Option[] =>
  blockchains.map((blockchain) => {
    return {
      value: blockchain.title,
      description: blockchain.title,
      icon: blockchain.logo,
      chain_id: (blockchain as Object).hasOwnProperty('id')
        ? (blockchain as IChain).id
        : (blockchain as Blockchain).chain_id
    }
  })

export const constructURL = (apiHost: string) => {
  return `${env.hostProtocol}://${apiHost}`
}

export const validatePhone = (value: string) => {
  let groups = value
    .replace(/\D/g, '')
    .trim()
    .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)
  value = !groups![3]
    ? `+${groups![1]} ${groups![2]}`
    : `+${groups![1]} (${groups![2]}) ${groups![3]} ${groups![4]}`
  return value
}
