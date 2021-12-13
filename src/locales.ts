import type { NextRouter } from "next/router"

export const locales = ["en", "ru", "uk"] as const

export type LocalesType = typeof locales[number]

export const isLocaleDeclared = (language: string): language is LocalesType => {
  const foundLocale = locales.find(
    (declaredLocale) => language == declaredLocale
  )

  return foundLocale != undefined
}

export const checkLocale = (router: NextRouter) => {
  const { asPath, locale } = router
  const savedLocale = window.localStorage.getItem("language")
  if (savedLocale && isLocaleDeclared(savedLocale) && savedLocale != locale) {
    router.push(asPath, asPath, { locale: savedLocale })
  }
}
