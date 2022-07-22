import React from "react"
import styled from "styled-components"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setCurrentCurrency } from "@/lib/redux/ui"
import { currencies, mapCurrency } from "@/lib/data/currencies"

import { PopupItem, PopupRow } from "./styles"

const CurrencyContainer = styled.span``

type CurrenciesProps = {
  onClick: () => void
}

function Currencies({ onClick }: CurrenciesProps) {
  const dispatch = useAppDispatch()
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)

  return (
    <>
      {currencies.map((currency) => (
        <PopupRow
          as="button"
          key={currency}
          onClick={() => {
            dispatch(setCurrentCurrency(currency))
            onClick()
          }}
        >
          <CurrencyContainer>{mapCurrency(currency)}</CurrencyContainer>
          <PopupItem active={currentCurrency == currency}>{currency}</PopupItem>
        </PopupRow>
      ))}
    </>
  )
}

export default React.memo(Currencies)
