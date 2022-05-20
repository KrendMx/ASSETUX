import { createAsyncThunk } from "@reduxjs/toolkit"

import { BackendClient } from "@/src/BackendClients"

import type { RootState } from "../store"
import type { GetBlockchains, GetTokens } from "@/src/BackendClients/main/types"

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
