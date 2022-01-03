import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { allowSkeletons } from "../constants"
import type { CurrenciesType } from "../currencies"
import type { RootState } from "./store"

const hydrate = createAction<RootState>(HYDRATE)

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  isMobileLayoutForTablet: boolean
  burgerActive: boolean
  languageCurrencyActive: boolean
  currentCurrency: CurrenciesType
  appLoaded: boolean
}

const initialState: UiState = {
  isMobile: false,
  burgerActive: false,
  isTablet: false,
  isMobileLayoutForTablet: false,
  languageCurrencyActive: false,
  currentCurrency: "RUB",
  appLoaded: false
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobile: (state) => {
      state.isMobile = true
      state.isTablet = false
      state.isMobileLayoutForTablet = false
    },
    setBurgerActive: (state, action: PayloadAction<boolean>) => {
      state.burgerActive = action.payload
    },
    setTablet: (state) => {
      state.isTablet = true
      state.isMobile = false
      state.isMobileLayoutForTablet = false
    },
    setDesktop: (state) => {
      state.isTablet = false
      state.isMobile = false
      state.isMobileLayoutForTablet = false
    },
    setMobileLayoutForTablet: (state) => {
      state.isMobileLayoutForTablet = true
      state.isTablet = false
      state.isMobile = false
    },
    setLanguageCurrencyActive: (state, action: PayloadAction<boolean>) => {
      state.languageCurrencyActive = action.payload
    },
    setCurrentCurrency: {
      reducer(state, action: PayloadAction<CurrenciesType>) {
        state.currentCurrency = action.payload
      },
      prepare(currency: CurrenciesType) {
        window.localStorage.setItem("currency", currency)
        return {
          payload: currency
        }
      }
    },
    setAppLoaded: (state) => {
      state.appLoaded = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.ui
      }
    })
  }
})

export const {
  setMobile,
  setTablet,
  setDesktop,
  setBurgerActive,
  setMobileLayoutForTablet,
  setLanguageCurrencyActive,
  setCurrentCurrency,
  setAppLoaded
} = uiSlice.actions

export const selectShowSkeleton = (state: RootState) => {
  if (allowSkeletons) {
    return !state.ui.appLoaded
  }

  return false
}

export default uiSlice.reducer
