import { createAsyncThunk } from "@reduxjs/toolkit"

import { BackendClient } from "@/lib/backend/clients"

import type { RootState } from "../store"
import type {
  GetBlockchains,
  GetTokens
} from "@/lib/backend/main/types.backend.main"

export const getBlockchains = createAsyncThunk<
  GetBlockchains,
  AbortSignal | undefined,
  {
    state: RootState
  }
>("crypto/getBlockchains", async (signal) => {
  return BackendClient.getBlockchains(signal)
})

export const getBuyTokens = createAsyncThunk<
  GetTokens | null,
  { signal: AbortSignal | undefined },
  {
    state: RootState
  }
>("crypto/getTokens", async ({ signal }, { getState }) => {
  const state = getState()

  if (state.crypto.selectedBlockchain) {
    return BackendClient.getTokens({
      apiHost: state.crypto.selectedBlockchain.url,
      signal,
      type: "buy"
    })
  }

  return null
})

export const getSellTokens = createAsyncThunk<
  GetTokens | null,
  { signal: AbortSignal | undefined },
  {
    state: RootState
  }
>("crypto/getSellTokens", async ({ signal }, { getState }) => {
  const state = getState()

  if (state.crypto.selectedBlockchain) {
    return BackendClient.getTokens({
      apiHost: state.crypto.selectedBlockchain.url,
      signal,
      type: "sell"
    })
  }

  return null
})
