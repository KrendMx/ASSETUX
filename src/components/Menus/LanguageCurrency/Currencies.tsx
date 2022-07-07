import React from "react"
import styled from "styled-components"
import { currencies, mapCurrency, mapCurrencyName } from "@/utils/currencies"
import ActiveNavLink from "./ActiveNavLink"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { setCurrentCurrency } from "@/redux/ui"

const Button = styled(ActiveNavLink)`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`

function Languages() {
  const dispatch = useAppDispatch()
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)

  return (
    <ul>
      {currencies.map((currency) => (
        <li key={currency}>
          <Button
            as="button"
            active={currency == currentCurrency}
            onClick={() => {
              dispatch(setCurrentCurrency(currency))
            }}
          >
            <span>{mapCurrency(currency)}</span>
            <span>{mapCurrencyName(currency)}</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Languages