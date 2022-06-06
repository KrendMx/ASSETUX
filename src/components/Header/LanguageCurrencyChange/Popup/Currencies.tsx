import React from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { setCurrentCurrency } from "@/src/redux/uiSlice"
import PopupRow from "../PopupRow"
import PopupItem from "../PopupItem"
import { currencies, mapCurrency } from "@/src/utils/currencies"

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
