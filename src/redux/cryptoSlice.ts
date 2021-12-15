import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import type { RootState } from "./store"

const hydrate = createAction<RootState>(HYDRATE)

export type ActionType = "BUY" | "SELL"

export type CryptoState = {
  selectedBlockchain: string | null
  action: ActionType
}

const initialState: CryptoState = {
  selectedBlockchain: null,
  action: "BUY"
}

export const CryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedBlockchain: (state, action: PayloadAction<string>) => {
      state.selectedBlockchain = action.payload
    },
    swapAction: (state, action: PayloadAction<ActionType | undefined>) => {
      if (action.payload) {
        state.action = action.payload
      } else {
        if (state.action == "BUY") {
          state.action = "SELL"
        } else {
          state.action = "BUY"
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.crypto
      }
    })
  }
})

export const { setSelectedBlockchain, swapAction } = CryptoSlice.actions

export default CryptoSlice.reducer
