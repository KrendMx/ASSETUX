import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UiState = {
  isMobile: boolean
  isTablet: boolean
  burgerActive: boolean
}

const initialState: UiState = {
  isMobile: false,
  burgerActive: false,
  isTablet: false
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobile: (state) => {
      state.isMobile = true
      state.isTablet = false
    },
    setBurgerActive: (state, action: PayloadAction<boolean>) => {
      state.burgerActive = action.payload
    },
    setTablet: (state) => {
      state.isTablet = true
      state.isMobile = false
    },
    setDesktop: (state) => {
      state.isTablet = false
      state.isMobile = false
    }
  }
})

export const { setMobile, setTablet, setDesktop, setBurgerActive } = uiSlice.actions

export default uiSlice.reducer
