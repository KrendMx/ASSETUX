import type { CurrenciesType } from "@/utils/currencies"

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  isMobileLayoutForTablet: boolean
  burgerActive: boolean
  languageCurrencyActive: boolean
  ordersActive: boolean
  currentCurrency: CurrenciesType
  appLoaded: boolean
  hideBurgerButton: boolean
}
