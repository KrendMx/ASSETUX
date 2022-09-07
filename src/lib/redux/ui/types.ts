import type { CurrenciesType } from "@/lib/data/currencies"

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  isMobileLayoutForTablet: boolean
  burgerActive: boolean
  configureActive: boolean
  ordersActive: boolean
  currentCurrency: CurrenciesType
  appLoaded: boolean
  hideBurgerButton: boolean
  isTransferer: boolean
}
