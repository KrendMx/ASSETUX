import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppDispatch } from '@/lib/redux/hooks'
import { setConfigureActive } from '@/lib/redux/ui'
import { locales } from '@/lib/data/locales'

import { ActiveNavLink } from './styles'

import type { LocalesType } from '@/lib/data/locales'

const CountryContainer = styled.div`
  display: block;
  width: 12px;
  height: 11px;
`

const mapLanguage = (locale: LocalesType) => {
  switch (locale) {
    case 'en':
      return 'English'
    case 'ru':
      return 'Russian'
  }
}

const Languages = () => {
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
              onClick={() => dispatch(setConfigureActive(false))}
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
