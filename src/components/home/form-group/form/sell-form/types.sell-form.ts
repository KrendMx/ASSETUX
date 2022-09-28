import type { Option } from '@/components/common/input-select/types.input-select'
import type { PaymentOption, TokenOption } from '../types.form'
import type {
  FiatRate,
  FiatProvider,
  Blockchain,
  Token
} from '@/lib/backend/main/types.backend.main'
import type { CurrenciesType } from '@/lib/data/currencies'

export type SellFormProps = {
  blockchains: Option[] | null
  currencies: Option[] | null
  tokens: TokenOption[] | null
  serviceAvailable: boolean | null
  onTokenChange: (token: string) => void
  currentBlockchain: Blockchain | null
  currentToken: Token | null
  currentCurrency: CurrenciesType
  rates: FiatRate[] | null
  payments: FiatProvider[] | null
}
