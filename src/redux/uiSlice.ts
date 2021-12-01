import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UiState = {}

const initialState: UiState = {}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {}
})

export const {} = uiSlice.actions

export default uiSlice.reducer
