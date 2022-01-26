import {
  createSlice,
  PayloadAction,
  createAction,
  createAsyncThunk
} from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import BackendClient from "../BackendClient"
import type { RootState } from "./store"
import type {
  GetBlockchains,
  Blockchain,
  GetTokens,
  Token
} from "../BackendClient/types"
import { ExplorerData } from "@/components/Home/CryptoManager/types"

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

export const getTokens = createAsyncThunk<
  GetTokens | null,
  void,
  {
    state: RootState
  }
>("crypto/getTokens", async (_, { getState }) => {
  const state = getState()
  if (state.crypto.selectedBlockchain) {
    return BackendClient.getTokens({
      apiHost: state.crypto.selectedBlockchain.url
    })
  }

  return null
})

export type ActionType = "BUY" | "SELL"

export type CryptoState = {
  availableBlockchains: Blockchain[] | null
  selectedBlockchain: Blockchain | null
  availableTokens: Token[] | null
  selectedToken: Token | null
  currentRate: number | null
  action: ActionType
  explorerData: ExplorerData[] | null
}

const initialState: CryptoState = {
  selectedBlockchain: null,
  availableBlockchains: null,
  availableTokens: null,
  selectedToken: null,
  currentRate: null,
  action: "BUY",
  explorerData: null
}

export const CryptoSlice = createSlice({
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
    builder.addCase(
      getTokens.fulfilled,
      (state, action: PayloadAction<GetTokens | null>) => {
        if (action.payload) {
          const payload = action.payload
          if (payload.status == 200) {
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

export const {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction,
  setCurrentRate,
  setExplorerData
} = CryptoSlice.actions

export default CryptoSlice.reducer
