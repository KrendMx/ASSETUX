import { TokenOption } from '@/components/home/form-group/form/types'
import { IMerchantToken } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import { Token } from './backend/main/types.backend.main'

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
