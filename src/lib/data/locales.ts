export const locales = ["en", "ru"] as const

export type LocalesType = typeof locales[number]

export const isLocaleDeclared = (language: string): language is LocalesType => {
  const foundLocale = locales.find(
    (declaredLocale) => language == declaredLocale
  )

  return foundLocale != undefined
}
