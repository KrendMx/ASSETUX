import { configureStore } from "@reduxjs/toolkit"
import uiSlice from "./uiSlice"
import { createWrapper } from "next-redux-wrapper"

const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiSlice
    }
  })

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore["getState"]>
export type AppDispatch = RootStore["dispatch"]

export default createWrapper<RootStore>(makeStore)
