import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Popup from "./Popup"
import Button from "./Button"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"

const Container = styled.div`
  position: relative;
`

function LanguageCurrencyChange() {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)
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
  }, [popupRef, buttonRef, appLoaded])

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      {!appLoaded ? (
        <Skeleton width={75} height={18} />
      ) : (
        <Button ref={buttonRef} />
      )}
      <Popup ref={popupRef} offsetX={(popupWidth - buttonWidth) / 2} />
    </Container>
  )
}

export default LanguageCurrencyChange
