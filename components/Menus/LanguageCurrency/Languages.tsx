import React from "react"
import styled from "styled-components"
import { locales } from "@/src/locales"
import type { LocalesType } from "@/src/locales"
import Link from "next/link"
import ActiveNavLink from "./ActiveNavLink"
import Image from "next/image"
import { useRouter } from "next/router"

const CountryContainer = styled.div`
  display: block;
  width: 12px;
  height: 11px;
`

const mapLanguage = (locale: LocalesType) => {
  switch (locale) {
    case "en":
      return "English"
    case "ru":
      return "Russian"
    case "uk":
      return "Ukranian"
  }
}

function Languages() {
  const router = useRouter()
  const { locale: currentLocale } = router

  return (
    <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <ActiveNavLink active={currentLocale == locale} href={"/" + locale}>
            <CountryContainer>
              <Image
                src={`/flags/${locale}.png`}
                width={12}
                height={11}
                layout="responsive"
                alt=""
              />
            </CountryContainer>
            <span>{mapLanguage(locale)}</span>
          </ActiveNavLink>
        </li>
      ))}
    </ul>
  )
}

export default Languages
