import { AppDispatch } from '../redux/store'
import { setCurrentCurrency } from '@/lib/redux/ui'
import { locales } from './locales'
import { countryCodes } from './mock'

export type CurrenciesType = 'RUB' | 'UAH' | 'KZT' | 'EUR' | 'USD'

export const currencies: CurrenciesType[] = ['RUB', 'UAH', 'KZT', 'EUR', 'USD']

export const mapCurrency = (currency: CurrenciesType) => {
  switch (currency) {
    case 'RUB':
      return '₽'
    case 'UAH':
      return '₴'
    case 'KZT':
      return '₸'
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
  }
}

export const mapShortCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case 'RUB':
      return 'Rus'
    case 'UAH':
      return 'Ukr'
    case 'KZT':
      return 'Kaz'
    case 'EUR':
      return 'EU'
    case 'USD':
      return 'US'
  }
}

export const mapCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case 'RUB':
      return 'Russian Ruble'
    case 'UAH':
      return 'Ukrainian hryvnia'
    case 'KZT':
      return 'Kazakhstani tenge'
    case 'EUR':
      return 'EURO'
    case 'USD':
      return 'US Dollar'
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

const browserLocale = () => navigator.language || navigator.languages[0]

const isEULocale = (locale: string) => {
  let code: string = locale

  if (locale.indexOf('-') >= 0) {
    code = locale.split('-')[1]
  }

  return !!countryCodes[code.toUpperCase() as keyof typeof countryCodes]
}

export const detectUserLocaleForCurrency = () => {
  const locale = browserLocale()
  if (locale === 'uk') return currencies[1] // ukaraine locale
  else if (isEULocale(locale)) return currencies[3] // EURO zone
  else if (locale === 'en' || locale.split('-')[0] === 'en')
    return currencies[4] // USD - en locales
  else if (locale === 'kk') return currencies[2] // Kazakhstani users
  else return currencies[0] // default RUB
}

export const checkCurrency = (dispatch: AppDispatch) => {
  const savedCurrency = window.localStorage.getItem('currency')
  // console.log()
  if (savedCurrency) {
    if (isCurrencyDeclared(savedCurrency)) {
      dispatch(setCurrentCurrency(savedCurrency))
    }
  } else {
    const mappedCurrency = detectUserLocaleForCurrency()
    dispatch(setCurrentCurrency(mappedCurrency))
  }
}

const map = () => {
  for (let i = 0; i < locales.length; i++) {
    localeToCurrencyTable[locales[i]] = currencies[i]
  }
}

map()
