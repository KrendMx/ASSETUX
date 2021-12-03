import React from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { setBurgerActive } from "@/src/redux/uiSlice"

const StyledButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`

const Bar = styled.span`
  display: block;
  width: 20px;
  height: 3px;
  background-color: #000000;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`

function Button() {
  const dispatch = useAppDispatch()
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)

  return (
    <StyledButton
      type="button"
      onClick={() => {
        dispatch(setBurgerActive(!burgerActive))
      }}
    >
      <Bar />
      <Bar />
      <Bar />
    </StyledButton>
  )
}

export default Button
