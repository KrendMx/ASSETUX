import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UiState = {
  isMobile: boolean
  burgerActive: boolean
}

const initialState: UiState = {
  isMobile: false,
  burgerActive: false
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
    setBurgerActive: (state, action: PayloadAction<boolean>) => {
      state.burgerActive = action.payload
    }
  }
})

export const { setMobile, setBurgerActive } = uiSlice.actions

export default uiSlice.reducer
