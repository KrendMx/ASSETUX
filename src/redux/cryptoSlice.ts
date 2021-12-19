import {
  createSlice,
  PayloadAction,
  createAction,
  createAsyncThunk
} from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import BackendClient from "../BackendClient"
import type { RootState } from "./store"
import type { GetBlockchains, Blockchain } from "../BackendClient/types"

const hydrate = createAction<RootState>(HYDRATE)

export const getBlockchains = createAsyncThunk<
  GetBlockchains,
  void,
  {
    state: RootState
  }
>("crypto/getBlockchains", async () => {
  return BackendClient.getBlockchains()
})

export type ActionType = "BUY" | "SELL"

export type CryptoState = {
  availableBlockchains: Blockchain[] | null
  selectedBlockchain: Blockchain | null
  action: ActionType
}

const initialState: CryptoState = {
  selectedBlockchain: null,
  availableBlockchains: null,
  action: "BUY"
}

export const CryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedBlockchain: (state, action: PayloadAction<Blockchain>) => {
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
    builder.addCase(
      getBlockchains.fulfilled,
      (state, action: PayloadAction<GetBlockchains>) => {
        if (action.payload.status == 200) {
          const data = action.payload.data
          if (data && data.length > 0) {
            state.availableBlockchains = data
            state.selectedBlockchain = data[0]
          }
        }
      }
    )
  }
})

export const { setSelectedBlockchain, swapAction } = CryptoSlice.actions

export default CryptoSlice.reducer
