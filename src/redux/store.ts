import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import uiSlice from "./uiSlice"
import cryptoSlice from "./cryptoSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiSlice,
      crypto: cryptoSlice
    }
  })

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore["getState"]>
export type AppDispatch = RootStore["dispatch"]

export default createWrapper<RootStore>(makeStore)
