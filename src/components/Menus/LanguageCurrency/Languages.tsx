import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { useRouter } from "next/router"

import { locales } from "@/utils/locales"

import ActiveNavLink from "./ActiveNavLink"

import type { LocalesType } from "@/utils/locales"

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
  }
}

function Languages() {
  const router = useRouter()
  const { locale: currentLocale, defaultLocale } = router

  return (
    <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <ActiveNavLink
            active={currentLocale == locale}
            href={(locale == defaultLocale ? "" : "/" + locale) + router.asPath}
          >
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
