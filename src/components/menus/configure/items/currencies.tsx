import React from "react"
import styled from "styled-components"
import { currencies, mapCurrency, mapCurrencyName } from "@/lib/data/currencies"
import { ActiveNavLink } from "./styles"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setCurrentCurrency } from "@/lib/redux/ui"

const Button = styled(ActiveNavLink)`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`

const Languages: React.FC = () => {
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
