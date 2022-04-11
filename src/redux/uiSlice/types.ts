import type { CurrenciesType } from "@/src/currencies"

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  isMobileLayoutForTablet: boolean
  burgerActive: boolean
  languageCurrencyActive: boolean
  ordersActive: boolean
  currentCurrency: CurrenciesType
  appLoaded: boolean
}
