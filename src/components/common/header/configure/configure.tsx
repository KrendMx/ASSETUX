import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Popup from "./popup"
import Button from "./button"

const Container = styled.div`
  position: relative;
`

type ConfigureProps = {
  direction?: "top" | "down"
}

const Configure: React.FC<ConfigureProps> = ({ direction = "down" }) => {
  const [popupWidth, setPopupWidth] = useState(0)
  const [buttonWidth, setButtonWidth] = useState(0)

  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (popupRef.current) {
      setPopupWidth(popupRef.current.clientWidth)
    }
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.clientWidth)
    }
  }, [popupRef, buttonRef])

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      <Button ref={buttonRef} />
      <Popup
        ref={popupRef}
        offsetX={(popupWidth - buttonWidth) / 2}
        direction={direction}
      />
    </Container>
  )
}

export default Configure
