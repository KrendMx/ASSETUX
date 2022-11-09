import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import ui from './ui'
import crypto from './crypto'

const makeStore = () =>
  configureStore({
    reducer: {
      ui,
      crypto
    }
  })

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = RootStore['dispatch']

export default createWrapper<RootStore>(makeStore)
