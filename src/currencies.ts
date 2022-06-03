import { AppDispatch } from "./redux/store"
import { setCurrentCurrency } from "@/src/redux/uiSlice"
import { locales } from "./locales"

export const currencies = ["RUB"] as const

export type CurrenciesType = typeof currencies[number]

export const mapCurrency = (currency: CurrenciesType) => {
  switch (currency) {
    case "RUB":
      return "₽"
  }
}

export const mapShortCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case "RUB":
      return "Rus"
  }
}

export const mapCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case "RUB":
      return "Russian Ruble"
  }
}

type Table = {
  [key: string]: CurrenciesType | undefined
}

export const localeToCurrencyTable: Table = {}

export const isCurrencyDeclared = (
  currency: string
): currency is CurrenciesType => {
  const foundCurrency = currencies.find(
    (declaredCurrency) => declaredCurrency == currency
  )

  return foundCurrency != undefined
}

export const checkCurrency = (dispatch: AppDispatch) => {
  const savedCurrency = window.localStorage.getItem("currency")

  if (savedCurrency) {
    if (isCurrencyDeclared(savedCurrency)) {
      dispatch(setCurrentCurrency(savedCurrency))
    }
  } else {
    if ("language" in navigator) {
      const userLocale = navigator.language

      for (const locale of locales) {
        if (userLocale.startsWith(locale)) {
          const mappedCurrency = localeToCurrencyTable[locale]

          if (!mappedCurrency) {
            return
          }

          dispatch(setCurrentCurrency(mappedCurrency))

          break
        }
      }
    }
  }
}

function map() {
  for (let i = 0; i < locales.length; i++) {
    localeToCurrencyTable[locales[i]] = currencies[i]
  }
}

map()
