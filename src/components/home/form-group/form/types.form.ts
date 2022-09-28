export type PaymentOption = {
  value: string
  description: string
  icon?: string
  min: number
  max: number
}

export type TokenOption = {
  value: string
  icon: string
  description: string
  shortDescription: string
  address: string
}
