/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction,
  setSellOrderId,
  setRef
} from '@/lib/redux/crypto'
import { setCurrentCurrency } from '@/lib/redux/ui'
import { isCurrencyDeclared } from '@/lib/data/currencies'
import { mapQueryObject, updateURL } from '@/lib/utils/helpers.utils'
import { usePrevious } from '@/lib/hooks'

import type { QueryObject } from '@/lib/utils/helpers.utils'

let processedQuery = false

const QueryController = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const availableBlockchains = useAppSelector(
    (state) => state.crypto.availableBlockchains
  )
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )
  const selectedToken = useAppSelector((state) => state.crypto.selectedToken)
  const action = useAppSelector((state) => state.crypto.action)
  const ref = useAppSelector((state) => state.crypto.ref)
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const sellOrderId = useAppSelector((state) => state.crypto.sellOrderId)
  const prevSellOrderId = usePrevious(sellOrderId)

  const { query } = useRouter()

  useMemo(() => {
    dispatch(setRef(query?.ref as string))
  }, [])

  useEffect(() => {
    if (processedQuery) {
      const query: QueryObject = {}

      query['action'] = action.toLowerCase()

      query['ref'] = ref as string

      if (sellOrderId) {
        query['id'] = sellOrderId
      } else {
        query['currency'] = currentCurrency.toLowerCase()

        if (selectedBlockchain) {
          query['blockchain'] = selectedBlockchain.chain_id.toString()
        }

        if (selectedToken) {
          query['token'] = selectedToken.symbol.toLowerCase()
        }
      }

      if (sellOrderId || (sellOrderId == null && prevSellOrderId != null)) {
        router.push({
          pathname: router.pathname,
          query
        })
      } else {
        const newUrl = window.location.pathname + '?' + mapQueryObject(query)

        updateURL(newUrl)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockchain, selectedToken, action, currentCurrency, sellOrderId])

  useEffect(() => {
    if (availableBlockchains && availableTokens && !processedQuery) {
      const queryParams = new URLSearchParams(window.location.search)

      const action = queryParams.get('action')
      const currency = queryParams.get('currency')
      const token = queryParams.get('token')
      const blockchain = queryParams.get('blockchain')
      const orderId = queryParams.get('id')

      if (action) {
        const lowerCasedAction = action.toLowerCase()

        if (lowerCasedAction == 'sell') {
          dispatch(swapAction('SELL'))
        }
      }

      if (currency) {
        if (isCurrencyDeclared(currency)) {
          dispatch(setCurrentCurrency(currency))
        }
      }

      if (token) {
        const lowerCasedToken = token.toLowerCase()

        const foundToken = availableTokens.find(
          (availableToken) =>
            availableToken.symbol.toLowerCase() == lowerCasedToken
        )

        if (foundToken) {
          dispatch(setSelectedToken(foundToken))
        }
      }

      if (blockchain) {
        const numberBlockchain = Number(blockchain)

        if (!isNaN(numberBlockchain)) {
          const foundBlockchain = availableBlockchains.find(
            (availableBlockchain) =>
              availableBlockchain.chain_id == numberBlockchain
          )

          if (foundBlockchain) {
            dispatch(setSelectedBlockchain(foundBlockchain))
          }
        }
      }

      if (action == 'sell' && orderId != null) {
        dispatch(setSellOrderId(orderId))
      }

      processedQuery = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBlockchains, availableTokens])

  return null
}

export default QueryController
