import { createAsyncThunk } from "@reduxjs/toolkit"

import { BackendClient } from "@/backend/clients"

import type { RootState } from "../store"
import type { GetBlockchains, GetTokens } from "@/backend/main/types"

export const getBlockchains = createAsyncThunk<
  GetBlockchains,
  AbortSignal | undefined,
  {
    state: RootState
  }
>("crypto/getBlockchains", async (signal) => {
  return BackendClient.getBlockchains(signal)
})

export const getTokens = createAsyncThunk<
  GetTokens | null,
  AbortSignal | undefined,
  {
    state: RootState
  }
>("crypto/getTokens", async (signal, { getState }) => {
  const state = getState()

  if (state.crypto.selectedBlockchain) {
    return BackendClient.getTokens({
      apiHost: state.crypto.selectedBlockchain.url,
      signal
    })
  }

  return null
})
