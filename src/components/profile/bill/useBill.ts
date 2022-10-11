import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { useIsomorphicLayoutEffect, useAuthorized } from '@/lib/hooks'
import { BackendClient, EcommerceClient } from '@/lib/backend/clients'
import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from '@/lib/data/currencies'
import { rateCheckInterval } from '@/lib/data/constants'
import { validateDecimal, getEcommercePrefix } from '@/lib/utils/helpers.utils'
import type { Option } from '@/components/common/input-select/types.input-select'
import type { FiatRate } from '@/lib/backend/main/types.backend.main'
import { setMerchantMode } from '@/lib/redux/ui'
import { mapBlockchains } from '@/lib/helpers.global'
import { BillProps } from './bill'
import { useTranslation } from 'next-i18next'

const useBill = ({ profile }: BillProps) => {
  const {
    user: { mode },
    tokens: token_info
  } = profile
  const { t } = useTranslation('profile-bill')
  const router = useRouter()
  const checkAuthorized = useAuthorized()
  const isTRANSFER = mode == 'TRANSFER'
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMerchantMode(mode))
  }, [dispatch, mode])
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )
  const availableBlockchains = useAppSelector(
    (state) => state.crypto.availableBlockchains
  )
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )

  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)

  const blockchains = useMemo(
    () => (availableBlockchains ? mapBlockchains(availableBlockchains) : null),
    [availableBlockchains]
  )

  const transferBlockchains = useMemo(
    () =>
      token_info && isTRANSFER
        ? mapBlockchains(token_info.map((token) => token.chain))
        : null,
    [isTRANSFER, token_info]
  )

  const [tokens, setTokens] = useState<Option[] | null>(null)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [rates, setRates] = useState<FiatRate[] | null>(null)
  const [ranges, setRanges] = useState<{ min: number; max: number } | null>(
    null
  )
  const [inputError, setInputError] = useState('')
  const [submitValue, setSubmitValue] = useState<string>(t('copyLink'))

  const [selectedChain, setSelectedChain] = useState<Option | undefined>(
    undefined
  )
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [get, setGet] = useState({
    visible: '',
    actual: 0
  })
  const [send, setSend] = useState('10000')

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

  const currentRate = useMemo(() => {
    if (!rates || !selectedToken || !selectedCurrency) {
      return null
    }

    const rate = rates.find((rate) => rate.name == selectedToken)

    return rate ? rate.buy[selectedCurrency] : null
  }, [rates, selectedToken, selectedCurrency])

  const loading =
    selectedToken == null ||
    selectedCurrency == null ||
    currentRate == null ||
    ranges == null

  const handleGet: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!currentRate || !ranges) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    setGet({
      visible: result,
      actual: Number(result)
    })

    const resultNum = Number(result)

    const sendAmount = resultNum * currentRate

    if (sendAmount < ranges.min) {
      setInputError(t('minError', { min: ranges.min }))
    } else if (sendAmount > ranges.max) {
      setInputError(t('maxError', { max: ranges.max }))
    } else {
      setInputError('')
    }

    setSend(sendAmount.toFixed(2))
  }

  const handleSend: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!currentRate || !ranges) {
      return
    }

    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    setSend(result)

    const resultNum = Number(result)

    if (resultNum < ranges.min) {
      setInputError(t('minError', { min: ranges.min }))
    } else if (resultNum > ranges.max) {
      setInputError(t('maxError', { max: ranges.max }))
    } else {
      setInputError('')
    }

    const getAmount = resultNum / currentRate

    setGet({
      visible: getAmount.toFixed(2),
      actual: getAmount
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    if (
      !selectedBlockchain ||
      !selectedToken ||
      !availableTokens ||
      !selectedCurrency
    ) {
      return
    }

    const token = checkAuthorized()

    if (!token) {
      router.push(`${getEcommercePrefix()}/login`)

      return
    }

    const tokenId = availableTokens.find(
      (token) => token.symbol == selectedToken
    )?.id

    if (!tokenId) {
      return
    }

    if (copyTimeout.current != null) {
      clearTimeout(copyTimeout.current)
    }

    setWaitingResponse(true)

    setSubmitValue(t('loading'))

    const response = await EcommerceClient.createBill({
      token,
      amountIn: Number(send),
      currency: selectedCurrency
    })

    setWaitingResponse(false)

    if (response.state == 'success') {
      const link =
        window.location.protocol +
        '//' +
        window.location.host +
        `/payment/${response.data.hash}`

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
    } else {
      setSubmitValue(t('copyLink'))
    }
  }

  useEffect(() => {
    if (!selectedBlockchain) {
      return
    }

    const fetch = async (signal: AbortSignal) => {
      const responses = await Promise.all([
        BackendClient.getFiatRates({
          apiHost: selectedBlockchain.url,
          signal
        }),
        BackendClient.getFiatProviders({
          apiHost: selectedBlockchain.url,
          signal
        })
      ])

      if (responses[0].state == 'success') {
        setRates(responses[0].data)
      }

      if (responses[1].state == 'success') {
        const fiatProviders = responses[1].data
        const buyProviders = fiatProviders.filter(
          (provider) => provider.type == 'BUY'
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
  }, [selectedBlockchain, currentCurrency])

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

    setTokens(mappedTokens)
    setSelectedToken(mappedTokens[0].value)
  }, [availableTokens, isTRANSFER])

  useEffect(() => {
    if (!token_info || !isTRANSFER) {
      return
    }

    const mappedTokens = token_info.map((token) => ({
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

    setTokens(mappedTokens)
    setSelectedToken(mappedTokens[0].value)
  }, [token_info, isTRANSFER])

  useEffect(() => {
    if (!transferBlockchains || !tokens || !isTRANSFER) {
      return
    }

    const [_selectedToken] = tokens.filter(
      ({ value }) => value === selectedToken
    )
    const [_selectedChain] = transferBlockchains.filter((blockchain) => {
      return blockchain.chain_id === _selectedToken.chain_id
    })
    setSelectedChain(_selectedChain)
  }, [transferBlockchains, selectedToken, tokens, isTRANSFER])

  useIsomorphicLayoutEffect(() => {
    if (!currentRate) {
      return
    }

    const amount = Number(send) / currentRate

    setGet({
      visible: amount.toFixed(2),
      actual: amount
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRate])

  return {
    linkModalProps,
    setLinkModalProps,
    getActive,
    getCurrencyActive,
    handleSubmit,
    loading,
    blockchains,
    isTRANSFER,
    selectedChain,
    tokens,
    handleGet,
    get,
    setSelectedToken,
    selectedToken,
    setGetActive,
    selectedCurrency,
    currentRate,
    ranges,
    currencies,
    handleSend,
    send,
    inputError,
    setSelectedCurrency,
    setGetCurrencyActive,
    waitingResponse,
    submitValue
  }
}

export default useBill