import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { useAuthorized } from '@/lib/hooks'
import { BackendClient, EcommerceClient } from '@/lib/backend/clients'
import {
  currencies as definedCurrencies,
  CurrenciesType,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from '@/lib/data/currencies'
import { mappedCookies, rateCheckInterval } from '@/lib/data/constants'
import { validateDecimal, getEcommercePrefix } from '@/lib/utils/helpers.utils'
import type { Option } from '@/components/common/input-select/types.input-select'
import { setMerchantMode } from '@/lib/redux/ui'
import { env } from '@/lib/env/client'
import { BillProps } from './listing'
import Cookies from 'js-cookie'

const useListing = ({ profile, rate }: BillProps) => {
  const {
    user: { mode },
    tokens
  } = profile
  const isTRANSFER = mode === 'TRANSFER'
  const isRETENTION = mode === 'RETENTION'
  const { t } = useTranslation(isRETENTION ? 'profile-bill' : 'profile-listing')
  const router = useRouter()
  const checkAuthorized = useAuthorized()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMerchantMode(mode))
  }, [dispatch, mode])

  const [mappedTokens, setMappedTokens] = useState<Option[] | null>(null)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [ranges, setRanges] = useState<{ min: number; max: number } | null>(
    null
  )
  const [inputError, setInputError] = useState('')
  const [outputError, setOutputError] = useState('')
  const [submitValue, setSubmitValue] = useState<string>(t('copyLink'))
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrenciesType>(currentCurrency)
  const [get, setGet] = useState<string>('0')
  const [send, setSend] = useState<string>('10000')

  const [getActive, setGetActive] = useState(false)
  const [getCurrencyActive, setGetCurrencyActive] = useState(false)
  const [waitingResponse, setWaitingResponse] = useState(false)

  const [linkModalProps, setLinkModalProps] = useState<
    | {
        open: true
        link: string
      }
    | { open: false }
  >({ open: false })

  const copyTimeout = useRef<NodeJS.Timeout | null>(null)

  const loading: any = selectedCurrency == null || ranges == null
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
  //Верхний инпут
  const handleGet: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!ranges || (isTRANSFER && !rate)) {
      return
    }

    const value = event.target.value

    setGet(value)
    setSend('~')

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    const sumWithFee = await EcommerceClient.calcFee(
      Number(result),
      selectedCurrency as CurrenciesType,
      'BUY',
      false,
      Cookies.get(mappedCookies.authToken)!,
      selectedToken ? selectedToken : undefined
    )

    if (sumWithFee.data.success) {
      setSend(sumWithFee.data.data.amount)
    }

    const sendRes = sumWithFee.data.amount
    const sendAmount = Number(result)

    if (sendRes < ranges.min) {
      setInputError(t('minError', { min: ranges.min }))
    } else if (sendRes > ranges.max) {
      setInputError(t('maxError', { max: ranges.max }))
    } else {
      setInputError('')
    }

    if (isRETENTION) {
      if (sendAmount < ranges.min) {
        setOutputError(t('minError', { min: ranges.min }))
      } else if (sendAmount > ranges.max) {
        setOutputError(t('maxError', { max: ranges.max }))
      } else {
        setOutputError('')
      }
    }
  }
  //Нижний инпут
  const handleSend: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!ranges || (isTRANSFER && !rate)) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    setSend(value)
    setGet('~')

    if (!validated) {
      return
    }

    const sumWithFee = await EcommerceClient.calcFee(
      Number(result),
      selectedCurrency as CurrenciesType,
      'BUY',
      true,
      Cookies.get(mappedCookies.authToken)!,
      selectedToken ? selectedToken : undefined
    )

    if (sumWithFee!.data!.success) {
      const amountRes = sumWithFee.data.data.amount
      setGet(amountRes)

      const resultNum = Number(result)

      if (resultNum < ranges.min) {
        setInputError(t('minError', { min: ranges.min }))
      } else if (resultNum > ranges.max) {
        setInputError(t('maxError', { max: ranges.max }))
      } else {
        setInputError('')
      }

      if (isRETENTION) {
        if (+amountRes < ranges.min) {
          setOutputError(t('minError', { min: ranges.min }))
        } else if (+amountRes > ranges.max) {
          setOutputError(t('maxError', { max: ranges.max }))
        } else {
          setOutputError('')
        }
      }
    }
  }

  const handleSubmit: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async (event) => {
    event.preventDefault()

    if (!selectedCurrency) {
      return
    }

    if (isTRANSFER && !selectedToken) {
      return
    }

    const token = checkAuthorized()

    if (!token) {
      router.push(`${getEcommercePrefix()}/login`)
      return
    }

    if (copyTimeout.current != null) {
      clearTimeout(copyTimeout.current)
    }

    setWaitingResponse(true)

    setSubmitValue(t('loading'))

    const response =
      isRETENTION &&
      (await EcommerceClient.createBill({
        token,
        amountIn: Number(send),
        currency: selectedCurrency
      }))

    setWaitingResponse(false)

    let link = ''

    if (!!response && response.state == 'success') {
      link =
        window.location.protocol +
        '//' +
        window.location.host +
        `/payment/${response.data.hash}`
    } else if (isTRANSFER) {
      link =
        window.location.protocol +
        '//' +
        window.location.host +
        `/payment_listing/${selectedToken}`
    } else {
      setSubmitValue(t('copyLink'))
    }

    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(link)

      setSubmitValue(t('copied'))

      setTimeout(() => {
        setSubmitValue(t('copyLink'))
        copyTimeout.current = null
      }, 2000)
    } else {
      setLinkModalProps({ open: true, link })

      setSubmitValue(t('copyLink'))
    }
  }

  useEffect(() => {
    const fetch = async (signal: AbortSignal) => {
      const response = await BackendClient.getFiatProviders({
        apiHost: `bsc.${env.host}`,
        signal
      })
      if (response.state == 'success') {
        const fiatProviders = response.data
        const buyProviders = fiatProviders.filter(
          ({ type, currency }) => type == 'BUY' && currency === selectedCurrency
        )

        if (buyProviders.length != 0) {
          const ranges = buyProviders.reduce(
            (prev, curr) => {
              if (curr.max > prev.max) {
                prev.max = curr.max
              }

              if (curr.min < prev.min) {
                prev.min = curr.min
              }

              return prev
            },
            {
              min: buyProviders[0].min,
              max: buyProviders[0].max
            }
          )

          setRanges(ranges)
        }
      }
    }

    const controller = new AbortController()
    fetch(controller.signal)

    const rateInterval = setInterval(
      () => fetch(controller.signal),
      rateCheckInterval
    )

    return () => {
      clearInterval(rateInterval)
      controller.abort()
    }
  }, [selectedCurrency])

  useEffect(() => {
    const mappedCurrencies = definedCurrencies.map((currency) => ({
      value: currency,
      description: mapCurrencyName(currency),
      shortDescription:
        mapShortCurrencyName(currency) + ' ' + mapCurrency(currency)
    }))

    if (mappedCurrencies.length > 0) {
      setCurrencies(mappedCurrencies)
      setSelectedCurrency(
        mappedCurrencies.find(({ value }) => value === currentCurrency)
          ?.value || mappedCurrencies[0].value
      )
    }
  }, [currentCurrency])

  useEffect(() => {
    if (!availableTokens || isTRANSFER) {
      return
    }

    const mappedTokens = availableTokens
      .filter((token) => token.enabled)
      .map((token) => ({
        value: token.symbol,
        icon: token.logo_uri,
        description: token.name,
        shortDescription: token.name,
        address: token.address
      }))

    if (mappedTokens.length == 0) {
      return
    }

    setSelectedToken(mappedTokens[0].value)
  }, [availableTokens, isTRANSFER])

  useEffect(() => {
    if (!tokens || !isTRANSFER) {
      return
    }

    const mappedTokens = tokens.map((token) => ({
      value: token.symbol,
      icon: token.logo_uri,
      description: token.name,
      shortDescription: token.name,
      address: token.address,
      chain_id: token.chain.id
    }))

    if (mappedTokens.length == 0) {
      return
    }
    setMappedTokens(mappedTokens)
    setSelectedToken(mappedTokens[0].value)
  }, [tokens, isTRANSFER])

  useEffect(() => {
    t('copyLink') === submitValue &&
      !!selectedToken &&
      isTRANSFER &&
      setSubmitValue(t('copyLink') + ` ${selectedToken}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitValue, selectedToken])

  useEffect(() => {
    ;(async () => {
      if (!selectedCurrency) return
      const sumTRANSFER = {
        state: 'success',
        data: {
          amount: 10000 / rate!?.buy[selectedCurrency],
          amountIn: 10000
        }
      }
      const sumWithFee = await EcommerceClient.calcFee(
        10000,
        selectedCurrency as CurrenciesType,
        'BUY',
        false,
        Cookies.get(mappedCookies.authToken)!,
        selectedToken ? selectedToken : undefined
      )
      if (sumWithFee.state === 'success') {
        setGet(sumWithFee.data.amount)
        setSend(Number(sumWithFee.data.amountIn.toFixed(2)) + '')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency])

  return {
    linkModalProps,
    getActive,
    getCurrencyActive,
    loading,
    isTRANSFER,
    get,
    selectedCurrency,
    ranges,
    currencies,
    send,
    inputError,
    waitingResponse,
    submitValue,
    outputError,
    isRETENTION,
    selectedToken,
    mappedTokens,
    setLinkModalProps,
    handleSubmit,
    handleGet,
    handleSend,
    setSelectedCurrency,
    setGetCurrencyActive,
    t
  }
}

export default useListing
