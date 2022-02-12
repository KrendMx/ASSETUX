import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { locales } from "@/src/locales"
import type { LocalesType } from "@/src/locales"
import PopupItem from "../PopupItem"
import PopupRow from "../PopupRow"
import { useRouter } from "next/router"

const CountryContainer = styled.div`
  display: block;
  width: 14px;
  height: 11px;
`

export const mapLanguage = (locale: LocalesType) => {
  switch (locale) {
    case "en":
      return "EN"
    case "ru":
      return "RUS"
    case "uk":
      return "UKR"
  }
}

type LanguagesProps = {
  onClick: () => void
}

function Languages({ onClick }: LanguagesProps) {
  const router = useRouter()
  const { locale: currentLocale } = router

  return (
    <>
      {locales.map((locale) => (
        <PopupRow
          onClick={() => {
            onClick()
          }}
          key={locale}
          href={"/" + locale}
        >
          <CountryContainer>
            <Image
              src={`/flags/${locale}.png`}
              width={14}
              height={11}
              layout="responsive"
              alt=""
            />
          </CountryContainer>
          <PopupItem active={locale == currentLocale}>
            {mapLanguage(locale)}
          </PopupItem>
        </PopupRow>
      ))}
    </>
  )
}

export default React.memo(Languages)
