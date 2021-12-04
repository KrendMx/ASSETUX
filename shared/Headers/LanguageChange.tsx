import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { IoIosArrowUp } from "react-icons/io"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

const Container = styled.div`
  position: relative;
`

const Button = styled.button`
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

type PopupProps = {
  hidden: boolean
  offset: number
}

const Popup = styled.div<PopupProps>`
  position: absolute;
  left: ${(props) => `-${props.offset}px`};
  bottom: 0;
  display: flex;
  flex-direction: column;
  transform: translateY(calc(100% + 5px));
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};

  @media only screen and (max-width: 1130px) {
    left: ${(props) => `-${props.offset * 2}px`};
  }

  @media only screen and (max-width: 550px) {
    left: 0;
  }
`

const PopupRow = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--black);
  padding: 15px 20px;
  text-decoration: none;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`

const CountryContainer = styled.div`
  position: relative;
  width: 14px;
  height: 11px;
`

const mapLanguage = (locale: string) => {
  switch (locale) {
    case "en":
      return "EN"
    case "ru":
      return "RUS"
    case "de":
      return "GER"
    default:
      return ""
  }
}

function LanguageChange() {
  const [popupActive, setPopupActive] = useState(false)
  const [popupWidth, setPopupWidth] = useState(0)
  const [buttonWidth, setButtonWidth] = useState(0)
  const router = useRouter()
  const { locale } = router

  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClick = () => {
      setPopupActive(false)
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

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
      <Button ref={buttonRef} onClick={() => setPopupActive(!popupActive)}>
        {locale && mapLanguage(locale)}
        <IoIosArrowUp />
      </Button>
      <Popup
        ref={popupRef}
        hidden={!popupActive}
        offset={(popupWidth - buttonWidth) / 2}
      >
        {locale != "en" && (
          <Link href="/" locale="en" passHref>
            <PopupRow>EN</PopupRow>
          </Link>
        )}
        {locale != "ru" && (
          <Link href="/" locale="ru" passHref>
            <PopupRow>
              <CountryContainer>
                <Image src="/russia!!!.png" layout="fill" alt="" />
              </CountryContainer>
              <span>RUS</span>
            </PopupRow>
          </Link>
        )}
        {locale != "de" && (
          <Link href="/" locale="de" passHref>
            <PopupRow>
              <CountryContainer>
                <Image src="/germany.png" layout="fill" alt="" />
              </CountryContainer>
              <span>GER</span>
            </PopupRow>
          </Link>
        )}
      </Popup>
    </Container>
  )
}

export default LanguageChange
