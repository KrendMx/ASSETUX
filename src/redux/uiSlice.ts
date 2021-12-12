import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { currencies } from "../currencies"
import type { RootState } from "./store"

const hydrate = createAction<RootState>(HYDRATE)

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  isMobileLayoutForTablet: boolean
  burgerActive: boolean
  languageCurrencyActive: boolean
  currentCurrency: typeof currencies[number]
}

const initialState: UiState = {
  isMobile: false,
  burgerActive: false,
  isTablet: false,
  isMobileLayoutForTablet: false,
  languageCurrencyActive: false,
  currentCurrency: "USD"
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
    setCurrentCurrency: (
      state,
      action: PayloadAction<typeof currencies[number]>
    ) => {
      state.currentCurrency = action.payload
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
  setCurrentCurrency
} = uiSlice.actions

export default uiSlice.reducer
