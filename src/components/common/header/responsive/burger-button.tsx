import React from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setBurgerActive } from "@/lib/redux/ui"
import { Bar, StyledButton } from "./style"

const Button = () => {
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
