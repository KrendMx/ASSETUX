import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { useAppDispatch } from "@/redux/hooks"
import { setLanguageCurrencyActive } from "@/redux/ui"

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
  const dispatch = useAppDispatch()
  const { locale: currentLocale } = router

  return (
    <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <Link href={router.asPath} locale={locale} passHref>
            <ActiveNavLink
              active={currentLocale == locale}
              onClick={() => dispatch(setLanguageCurrencyActive(false))}
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
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Languages
