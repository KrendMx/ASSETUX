import slice from "./slice"

export const {
  setMobile,
  setTablet,
  setDesktop,
  setBurgerActive,
  setMobileLayoutForTablet,
  setLanguageCurrencyActive,
  setOrdersActive,
  setCurrentCurrency,
  setAppLoaded,
  setHideBurgerButton
} = slice.actions

export default slice.reducer
