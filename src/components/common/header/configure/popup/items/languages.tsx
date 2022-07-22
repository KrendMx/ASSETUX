import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { locales } from "@/lib/data/locales"
import mapLanguage from "../../map-language"

import { PopupItem, PopupRow } from "./styles"

const CountryContainer = styled.div`
  display: block;
  width: 14px;
  height: 11px;
`

type LanguagesProps = {
  onClick: () => void
}

function Languages({ onClick }: LanguagesProps) {
  const router = useRouter()
  const { locale: currentLocale } = router

  return (
    <>
      {locales.map((locale) => (
        <Link href={router.asPath} locale={locale} key={locale} passHref>
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
