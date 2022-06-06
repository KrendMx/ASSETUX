import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

import { getBlockchains, getTokens } from "./thunks"

import type { RootState } from "../store"
import type {
  GetBlockchains,
  Blockchain,
  GetTokens,
  Token
} from "@/src/BackendClients/main/types"
import type { ExplorerData } from "@/src/components/CryptoManager/types"
import type { ActionType, CryptoState } from "./types"

const hydrate = createAction<RootState>(HYDRATE)

const initialState: CryptoState = {
  selectedBlockchain: null,
  availableBlockchains: null,
  availableTokens: null,
  selectedToken: null,
  currentRate: null,
  action: "BUY",
  explorerData: null,
  sellOrderId: null
}

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedBlockchain: (state, action: PayloadAction<Blockchain>) => {
      state.selectedBlockchain = action.payload
    },
    setSelectedToken: (state, action: PayloadAction<Token>) => {
      state.selectedToken = action.payload
    },
    setCurrentRate: (state, action: PayloadAction<number | null>) => {
      state.currentRate = action.payload
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
    },
    setExplorerData: (state, action: PayloadAction<ExplorerData[] | null>) => {
      state.explorerData = action.payload
    },
    setSellOrderId: (state, action: PayloadAction<string | null>) => {
      state.sellOrderId = action.payload
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
        if (action.payload.state == "success") {
          const data = action.payload.data

          if (data && data.length > 0) {
            state.availableBlockchains = data
            state.selectedBlockchain = data[0]
          }
        }
      }
    )
    builder.addCase(
      getTokens.fulfilled,
      (state, action: PayloadAction<GetTokens | null>) => {
        if (action.payload) {
          const payload = action.payload

          if (payload.state == "success") {
            const data = payload.data

            if (data && data.length > 0) {
              state.availableTokens = data
              state.selectedToken = data[0]
            }
          }
        }
      }
    )
  }
})

export default cryptoSlice
