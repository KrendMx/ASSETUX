import React, { useEffect } from "react"
import { setLanguageCurrencyActive } from "@/src/redux/uiSlice"
import DynamicValue from "./DynamicValue"
import styled from "styled-components"
import { IoIosArrowUp } from "react-icons/io"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"

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

const Button = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const dispatch = useAppDispatch()
  const languageCurrencyActive = useAppSelector(
    (state) => state.ui.languageCurrencyActive
  )

  useEffect(() => {
    const handleClick = () => {
      dispatch(setLanguageCurrencyActive(false))
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container
      ref={ref}
      onClick={() =>
        dispatch(setLanguageCurrencyActive(!languageCurrencyActive))
      }
    >
      <DynamicValue />
      <IoIosArrowUp />
    </Container>
  )
})

Button.displayName = "Button"

export default Button
