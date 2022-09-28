import { IMerchant } from '@/lib/backend/ecommerce/types.backend.ecommerce'

export const inputId = {
  wallet: 'wallet',
  email: 'email',
  companyName: 'companyName',
  companyLogo: 'companyLogo' as ImageString,
  companyBackground: 'companyBackground' as ImageString
}

export type Widgets = 'wallet' | 'company'

export type ImageString = 'companyLogo' | 'companyBackground'

export type Option = {
  icon?: string
  shortDescription?: string
  description?: string
  value: string
  chain_id?: number
}

export type FormGroupProps = IMerchant
