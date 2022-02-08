import { useEffect, useRef } from "react"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction
} from "@/src/redux/cryptoSlice"
import { setCurrentCurrency } from "@/src/redux/uiSlice"
import { isCurrencyDeclared } from "@/src/currencies"

type QueryObject = {
  [key: string]: string | undefined
}

const updateURL = (newUrl: string) => {
  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    "",
    newUrl
  )
}

const mapQueryObject = (query: QueryObject) => {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
}

function QueryController() {
  const dispatch = useAppDispatch()

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

  const processedQuery = useRef(false)

  useEffect(() => {
    if (processedQuery.current) {
      const query: QueryObject = {}

      query["action"] = action

      query["currency"] = currentCurrency

      if (selectedBlockchain) {
        query["blockchain"] = selectedBlockchain.chain_id.toString()
      }

      if (selectedToken) {
        query["token"] = selectedToken.symbol
      }

      const newUrl = window.location.pathname + "?" + mapQueryObject(query)

      console.log(newUrl)

      updateURL(newUrl)
    }
  }, [selectedBlockchain, selectedToken, action, currentCurrency])

  useEffect(() => {
    if (availableBlockchains && availableTokens && !processedQuery.current) {
      const queryParams = new URLSearchParams(window.location.search)

      const action = queryParams.get("action")
      const currency = queryParams.get("currency")
      const token = queryParams.get("token")
      const blockchain = queryParams.get("blockchain")

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

      processedQuery.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBlockchains, availableTokens])

  return null
}

export default QueryController
