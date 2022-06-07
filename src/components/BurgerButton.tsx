import React from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setBurgerActive } from "@/redux/uiSlice"

type StyledButtonProps = {
  active: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => (props.active ? "0" : "5px")};
  }

  & > *:first-child {
    transform: ${(props) =>
      props.active ? "rotate(45deg) translate(1px, 1px)" : "none"};
  }

  & > *:last-child {
    transform: ${(props) =>
      props.active ? "rotate(-45deg) translate(1px, -1px)" : "none"};
  }

  & > *:nth-child(2) {
    display: ${(props) => (props.active ? "none" : "block")};
  }
`

const Bar = styled.span`
  display: block;
  width: 20px;
  height: 3px;
  background-color: #000000;
`

function Button() {
  const dispatch = useAppDispatch()
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)

  return (
    <StyledButton
      active={burgerActive}
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
