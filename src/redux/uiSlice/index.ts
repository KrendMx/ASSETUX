import uiSlice from "./slice"

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
} = uiSlice.actions

export default uiSlice.reducer
