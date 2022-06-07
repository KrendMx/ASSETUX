import { useEffect } from "react"
import { useRouter } from "next/router"

import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction,
  setSellOrderId
} from "@/redux/cryptoSlice"
import { setCurrentCurrency } from "@/redux/uiSlice"
import { isCurrencyDeclared } from "@/utils/currencies"
import { mapQueryObject, updateURL } from "@/utils/helpers"
import { usePrevious } from "@/utils/hooks"

import type { QueryObject } from "@/utils/helpers"

let processedQuery = false

function QueryController() {
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
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const sellOrderId = useAppSelector((state) => state.crypto.sellOrderId)
  const prevSellOrderId = usePrevious(sellOrderId)

  useEffect(() => {
    if (processedQuery) {
      const query: QueryObject = {}

      query["action"] = action.toLowerCase()

      if (sellOrderId) {
        query["id"] = sellOrderId
      } else {
        query["currency"] = currentCurrency.toLowerCase()

        if (selectedBlockchain) {
          // query["blockchain"] = selectedBlockchain.chain_id.toString()
        }

        if (selectedToken) {
          query["token"] = selectedToken.symbol.toLowerCase()
        }
      }

      if (sellOrderId || (sellOrderId == null && prevSellOrderId != null)) {
        router.push({
          pathname: router.pathname,
          query
        })
      } else {
        const newUrl = window.location.pathname + "?" + mapQueryObject(query)

        updateURL(newUrl)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockchain, selectedToken, action, currentCurrency, sellOrderId])

  useEffect(() => {
    if (availableBlockchains && availableTokens && !processedQuery) {
      const queryParams = new URLSearchParams(window.location.search)

      const action = queryParams.get("action")
      const currency = queryParams.get("currency")
      const token = queryParams.get("token")
      const blockchain = queryParams.get("blockchain")
      const orderId = queryParams.get("id")

      if (action) {
        const lowerCasedAction = action.toLowerCase()

        if (lowerCasedAction == "sell") {
          dispatch(swapAction("SELL"))
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

      if (action == "sell" && orderId != null) {
        dispatch(setSellOrderId(orderId))
      }

      processedQuery = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBlockchains, availableTokens])

  return null
}

export default QueryController
