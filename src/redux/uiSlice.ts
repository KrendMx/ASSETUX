import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import type { RootState } from "./store"

const hydrate = createAction<RootState>(HYDRATE)

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  isMobileLayoutForTablet: boolean
  burgerActive: boolean
}

const initialState: UiState = {
  isMobile: false,
  burgerActive: false,
  isTablet: false,
  isMobileLayoutForTablet: false
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
  setMobileLayoutForTablet
} = uiSlice.actions

export default uiSlice.reducer
