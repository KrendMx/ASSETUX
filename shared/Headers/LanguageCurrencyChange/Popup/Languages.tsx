import React from "react"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import locales from "../../../../locales"
import PopupItem from "../PopupItem"
import PopupRow from "../PopupRow"
import { useRouter } from "next/router"

const CountryContainer = styled.div`
  display: block;
  width: 14px;
  height: 11px;
`

export const mapLanguage = (locale: string) => {
  switch (locale) {
    case "en":
      return "EN"
    case "ru":
      return "RUS"
    case "uk":
      return "UKR"
    default:
      return ""
  }
}

type LanguagesProps = {
  onClick: () => void
}

function Languages({ onClick }: LanguagesProps) {
  const router = useRouter()
  const { locale: currentLocale, asPath } = router

  return (
    <>
      {locales.map((locale) => (
        <Link href={asPath} key={locale} locale={locale} passHref>
          <PopupRow onClick={onClick}>
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
        </Link>
      ))}
    </>
  )
}

export default React.memo(Languages)
