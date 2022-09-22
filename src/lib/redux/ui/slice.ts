import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import type { CurrenciesType } from '@/lib/data/currencies'
import type { RootState } from '../store'
import type { UiState } from './types'
import { MerchantMode } from '@/lib/backend/ecommerce/types.backend.ecommerce'

const hydrate = createAction<RootState>(HYDRATE)

const initialState: UiState = {
  isMobile: false,
  burgerActive: false,
  isTablet: false,
  isMobileLayoutForTablet: false,
  configureActive: false,
  ordersActive: false,
  currentCurrency: 'RUB',
  appLoaded: false,
  hideBurgerButton: false,
  merchantMode: undefined
}

export const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobile: (state) => {
      state.isMobile = true
      state.isTablet = false
      state.isMobileLayoutForTablet = false
    },
    setBurgerActive: (state, action: PayloadAction<boolean>) => {
      state.burgerActive = action.payload
    },
    setTablet: (state) => {
      state.isTablet = true
      state.isMobile = false
      state.isMobileLayoutForTablet = false
    },
    setDesktop: (state) => {
      state.isTablet = false
      state.isMobile = false
      state.isMobileLayoutForTablet = false
    },
    setMobileLayoutForTablet: (state) => {
      state.isMobileLayoutForTablet = true
      state.isTablet = false
      state.isMobile = false
    },
    setConfigureActive: (state, action: PayloadAction<boolean>) => {
      state.configureActive = action.payload
    },
    setOrdersActive: (state, action: PayloadAction<boolean>) => {
      state.ordersActive = action.payload
    },
    setCurrentCurrency: {
      reducer(state, action: PayloadAction<CurrenciesType>) {
        state.currentCurrency = action.payload
      },
      prepare(currency: CurrenciesType) {
        window.localStorage.setItem('currency', currency)
        return {
          payload: currency
        }
      }
    },
    setAppLoaded: (state) => {
      state.appLoaded = true
    },
    setHideBurgerButton: (state, action: PayloadAction<boolean>) => {
      state.hideBurgerButton = action.payload
    },
    setMerchantMode: (state, action: PayloadAction<MerchantMode>) => {
      state.merchantMode = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.ui
      }
    })
  }
})

export default slice
