import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import Currencies from "./Currencies"
import Languages from "./Languages"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setLanguageCurrencyActive } from "@/redux/uiSlice"

type ContainerProps = {
  hidden: boolean
  offsetX: number
  direction: "top" | "down"
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  left: ${(props) => `-${props.offsetX}px`};
  bottom: ${(props) => (props.direction == "top" ? "calc(100% + 10px)" : 0)};
  display: flex;
  flex-direction: column;
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};

  ${(props) =>
    props.direction == "down" &&
    css`
      transform: translateY(calc(100% + 5px));
    `}

  @media only screen and (max-width: 1130px) {
    left: ${(props) => `-${props.offsetX * 2}px`};
  }
`

type PopupProps = {
  offsetX: number
  direction: "top" | "down"
}

const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ offsetX, direction }, ref) => {
    const languageCurrencyActive = useAppSelector(
      (state) => state.ui.languageCurrencyActive
    )
    const isMobile = useAppSelector((state) => state.ui.isMobile)
    const dispatch = useAppDispatch()

    const handleClick = useCallback(
      () => dispatch(setLanguageCurrencyActive(false)),
      [dispatch]
    )

    if (isMobile) {
      return null
    }

    return (
      <Container
        ref={ref}
        hidden={!languageCurrencyActive}
        offsetX={offsetX}
        direction={direction}
      >
        <Languages onClick={handleClick} />
        {/* <Currencies onClick={handleClick} /> */}
      </Container>
    )
  }
)

Popup.displayName = "Popup"

export default Popup
