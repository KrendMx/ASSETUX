import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { getBlockchains, getBuyTokens, getSellTokens } from './thunks'

import type { RootState } from '../store'
import type {
  GetBlockchains,
  Blockchain,
  GetTokens,
  Token
} from '@/lib/backend/main/types.backend.main'
import type { ExplorerData } from '@/components/common/crypto-manager/types.crypto-manager'
import type { ActionType, CryptoState } from './types.crypto'

const hydrate = createAction<RootState>(HYDRATE)

const initialState: CryptoState = {
  selectedBlockchain: null,
  availableBlockchains: null,
  availableTokens: null,
  sellTokens: null,
  selectedToken: null,
  selectedSellToken: null,
  currentRate: null,
  action: 'BUY',
  explorerData: null,
  sellOrderId: null
}

export const slice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedBlockchain: (state, action: PayloadAction<Blockchain>) => {
      state.selectedBlockchain = action.payload
    },
    setSelectedToken: (state, action: PayloadAction<Token>) => {
      state.selectedToken = action.payload
    },
    setSelectedSellToken: (state, action: PayloadAction<Token>) => {
      state.selectedSellToken = action.payload
    },
    setCurrentRate: (state, action: PayloadAction<number | null>) => {
      state.currentRate = action.payload
    },
    swapAction: (state, action: PayloadAction<ActionType | undefined>) => {
      if (action.payload) {
        state.action = action.payload
      } else {
        if (state.action == 'BUY') {
          state.action = 'SELL'
        } else {
          state.action = 'BUY'
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
        if (action.payload.state == 'success') {
          const data = action.payload.data

          if (data && data.length > 0) {
            state.availableBlockchains = data
            state.selectedBlockchain = data[0]
          }
        }
      }
    )
    builder.addCase(
      getBuyTokens.fulfilled,
      (state, action: PayloadAction<GetTokens | null>) => {
        if (action.payload) {
          const payload = action.payload
          if (payload.state == 'success') {
            const data = payload.data

            if (data && data.length > 0) {
              state.availableTokens = data
              state.selectedToken = data[0]
            }
          }
        }
      }
    )
    builder.addCase(
      getSellTokens.fulfilled,
      (state, action: PayloadAction<GetTokens | null>) => {
        if (action.payload) {
          const payload = action.payload
          if (payload.state == 'success') {
            const data = payload.data

            if (data && data.length > 0) {
              state.sellTokens = data
              state.selectedSellToken = data[0]
            }
          }
        }
      }
    )
  }
})

export default slice
