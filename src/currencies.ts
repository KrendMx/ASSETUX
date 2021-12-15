import { AppDispatch } from "./redux/store"
import { setCurrentCurrency } from "@/src/redux/uiSlice"
import { locales } from "./locales"

export const currencies = ["RUB", "UAH"] as const

export type CurrenciesType = typeof currencies[number]

export const mapCurrency = (currency: CurrenciesType) => {
  switch (currency) {
    case "UAH":
      return "₴"
    case "RUB":
      return "₽"
  }
}

export const mapCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case "UAH":
      return "Ukranian Hrivna"
    case "RUB":
      return "Russian Ruble"
  }
}

type Table = {
  [key: string]: CurrenciesType
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
          dispatch(setCurrentCurrency(localeToCurrencyTable[locale]))
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
