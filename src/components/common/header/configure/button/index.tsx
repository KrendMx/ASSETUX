import React, { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { IoIosArrowUp } from "react-icons/io"

import { setConfigureActive } from "@/lib/redux/ui"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { mapCurrency } from "@/lib/data/currencies"
import { isLocaleDeclared } from "@/lib/data/locales"

import mapLanguage from "../map-language"

const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: var(--black);
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    margin-left: 2px;
    transform: rotate(180deg);
    font-size: 16px;
  }
`

const DynamicValue: React.FC = () => {
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const router = useRouter()
  const { locale: currentLocale } = router

  return (
    <span>
      {currentLocale &&
        isLocaleDeclared(currentLocale) &&
        mapLanguage(currentLocale)}{" "}
      / {mapCurrency(currentCurrency)}
    </span>
  )
}

const Button = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const dispatch = useAppDispatch()

  const configureActive = useAppSelector((state) => state.ui.configureActive)
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  useEffect(() => {
    if (!isMobile) {
      const handleClick = () => {
        dispatch(setConfigureActive(false))
      }

      window.addEventListener("click", handleClick)

      return () => {
        window.removeEventListener("click", handleClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <Container
      ref={ref}
      onClick={() => dispatch(setConfigureActive(!configureActive))}
    >
      <DynamicValue />
      <IoIosArrowUp />
    </Container>
  )
})

Button.displayName = "Button"

export default Button
