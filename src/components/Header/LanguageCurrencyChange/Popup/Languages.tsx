import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { useRouter } from "next/router"

import { locales } from "@/src/utils/locales"

import PopupItem from "../PopupItem"
import PopupRow from "../PopupRow"

import type { LocalesType } from "@/src/utils/locales"

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
  }
}

type LanguagesProps = {
  onClick: () => void
}

function Languages({ onClick }: LanguagesProps) {
  const router = useRouter()
  const { locale: currentLocale, defaultLocale } = router

  return (
    <>
      {locales.map((locale) => (
        <PopupRow
          onClick={() => {
            onClick()
          }}
          key={locale}
          href={(locale == defaultLocale ? "" : "/" + locale) + router.asPath}
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
