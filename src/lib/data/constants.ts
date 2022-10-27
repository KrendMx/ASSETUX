import { env } from '../env/client'

export const tablet = 1130

export const mobile = 550

export const mobileLayoutForTablet = 985

export const optimizeRemoteImages = false

export const rateCheckInterval = 60000

export const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const floatRegexp = /^[0-9]+(\.)?[0-9]*$/

export const cardholderRegex = /^[A-Z]+\ [A-Z]+$/

export const detailRegex = /^[0-9]*$/

export const phoneReplaceRegex = /(\d{3})(\d{3})(\d{2})(\d{2})/g

/*
  Здесь поменял регулярку 
  добавил дефисы 
  и остальную шаболду (-.~'`—) по стандартам visa на card holder
*/
export const holderRegexp = /^([a-zA-Z?\-\.'~`—?\s]*)$/

export const walletRegexp = /^0x[a-fA-F0-9]{40}$/

export const allowSkeletons = true

export const perPageValues = [5, 50, 100]

export const cardsPerPage = 3

export const cardsWidth = 850

export const mappedCookies = {
  authToken: 'ecommerce_token'
}

export const genericURL = `${env.hostProtocol}://bsc.${env.host}`

export const listCurrencyError: Required<any> = {
  USD: {
    VISA: 2,
    MASTERCARD: 3
  },
  EUR: {
    VISA: 2,
    MASTERCARD: 3
  },
  RUB: {
    MIR: 5
  },
  KZT: 4,
  UAH: 6
}
