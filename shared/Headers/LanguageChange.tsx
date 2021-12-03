import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { IoIosArrowUp } from "react-icons/io"
import { useRouter } from "next/router"
import Link from "next/link"

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

const Popup = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  transform: translateY(calc(100% + 5px));
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`

const PopupRow = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: var(--black);
  padding: 15px 20px;
  text-decoration: none;
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
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    const handleClick = () => {
      setPopupActive(false)
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      <Button onClick={() => setPopupActive(!popupActive)}>
        {locale && mapLanguage(locale)}
        <IoIosArrowUp />
      </Button>
      {popupActive && (
        <Popup>
          {locale != "en" && (
            <Link href="/" locale="en" passHref>
              <PopupRow>EN</PopupRow>
            </Link>
          )}
          {locale != "ru" && (
            <Link href="/" locale="ru" passHref>
              <PopupRow>RUS</PopupRow>
            </Link>
          )}
          {locale != "de" && (
            <Link href="/" locale="de" passHref>
              <PopupRow>GER</PopupRow>
            </Link>
          )}
        </Popup>
      )}
    </Container>
  )
}

export default LanguageChange
