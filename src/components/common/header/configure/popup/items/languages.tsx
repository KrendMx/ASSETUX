import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { locales } from "@/lib/data/locales"
import mapLanguage from "../../map-language"

import { CountryContainer, PopupItem, PopupRow } from "./styles"

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
