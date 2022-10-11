import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { isValidPhoneNumber } from 'libphonenumber-js'

import Configure from '@/components/common/header/configure'
import InputSelect from '@/components/common/input-select'
import HideableWithMargin from '@/components/home/form-group/form/common/hideable-with-margin'
import {
  Header,
  Footer,
  Content,
  Form,
  LogoContainer,
  Name,
  Submit,
  PoweredBy
} from './styles'

import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from '@/lib/data/currencies'
import { BackendClient } from '@/lib/backend/clients'
import { emailRegexp, genericURL } from '@/lib/data/constants'
import { stringToPieces } from '@/lib/utils/helpers.utils'
import { env } from '@/lib/env/client.mjs'

import type { MerchantData } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import type { FiatRate } from '@/lib/backend/main/types.backend.main'
import type { Option } from '@/components/common/input-select/types.input-select'
import { useAppSelector } from '@/lib/redux/hooks'
import ExchangeInfo from '@/components/common/exchange-info'
import { PaymentProps } from './payment'
import { useIsomorphicLayoutEffect } from '@/lib/hooks'
import { VISAMASTER } from '@/core/backend/types.core.backend'
import { mapBlockchains, mapTokens, validatePhone } from '@/lib/helpers.global'

const inputIds = {
  email: 'email',
  phone: 'phone',
  card: 'cardnumber',
  wallet: 'publickey',
  give: 'give'
}

const ListingPayment = (props: PaymentProps<MerchantData, FiatRate>) => {
  const {
    bill: { token, chain, widget },
    providers,
    blockchainURL,
    fiatrate
  } = props
  const displayHeader =
    widget.logoCompany != null ||
    (widget.nameCompany != null && widget.nameCompany != '')

  const { t } = useTranslation('profile-payment')
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [selectedPayment, setSelectedPayment] = useState(
    providers.find((provider) => provider.method == VISAMASTER)
      ? VISAMASTER
      : providers[0].method
  )
  const [get, setGet] = useState('0')
  const [paymentActive, setPaymentActive] = useState(false)
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [wallet, setWallet] = useState('')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
    currentCurrency
  )
  const [getCurrencyActive, setGetCurrencyActive] = useState<boolean>(false)

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

  useIsomorphicLayoutEffect(() => {
    const errorRanges = checkRanges(
      Number(+get * fiatrate?.buy[currentCurrency])
    )

    if (errorRanges) {
      setErrors({
        ...errors,
        [inputIds.give]: errorRanges
      })
    } else {
      setErrors({
        ...errors,
        [inputIds.give]: undefined
      })
    }
  }, [selectedPayment, get, providers])

  const paymentOptions: Option[] = useMemo(() => {
    const options = providers
      .filter(({ currency }) => currency === selectedCurrency)
      .map((provider) => ({
        icon: provider.logo
          ? env.hostProtocol + '://' + blockchainURL + provider.logo
          : undefined,
        value: provider.method == VISAMASTER ? VISAMASTER : provider.method,
        description: provider.method
      }))
    selectedCurrency !== 'RUB' && setSelectedPayment(options[0].value)
    return options
  }, [providers, blockchainURL, selectedCurrency])

  const checkRanges = (value: number): string | undefined => {
    const currentPayment = providers.find(
      ({ currency, method }) =>
        currency === selectedCurrency && method === selectedPayment
    )
    if (!currentPayment) {
      return undefined
    }

    if (value < currentPayment.min || value > currentPayment.max) {
      if (value > currentPayment.max) {
        return t('home:buy_maximumIs') + ' ' + currentPayment.max
      } else {
        return t('home:buy_minimumIs') + ' ' + currentPayment.min
      }
    } else {
      return undefined
    }
  }

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setEmail(value)
  }

  const handleCard: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(' ', '')
    const validated = /^[0-9]*$/.test(value)

    validated && setDetails(value)
  }

  const handleAddress: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(' ', '')
    const validated = /^[0-9a-zA-Z]*$/.test(value)
    validated && setWallet(value)
  }

  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setDetails(value.length > details.length ? validatePhone(value) : value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    const validEmail = email != '' && emailRegexp.test(email)
    const validPhone =
      selectedPayment == 'QIWI'
        ? details != '' && isValidPhoneNumber(details, 'RU')
        : true
    const validCard = selectedPayment != 'QIWI' ? details.length == 16 : true
    const validWallet = wallet.length === 42
    const validRanges = checkRanges(
      Number(+get * fiatrate?.buy[currentCurrency])
    )

    setErrors((prev) => ({
      ...prev,
      [inputIds.email]: validEmail ? undefined : t('invalidEmail'),
      [inputIds.phone]: validPhone ? undefined : t('invalidPhone'),
      [inputIds.card]: validCard ? undefined : t('invalidCard'),
      [inputIds.wallet]: validWallet ? undefined : t('invalidWallet'),
      [inputIds.give]: validRanges
    }))

    if (
      !validEmail ||
      !validPhone ||
      !validCard ||
      !validWallet ||
      !selectedCurrency ||
      validRanges
    ) {
      return
    }

    setWaitingResponse(true)

    const response = await BackendClient.getPaymentUrl({
      apiHost: blockchainURL,
      ticker: selectedCurrency,
      provider: selectedPayment,
      amount: Number(+get * fiatrate?.buy[currentCurrency]),
      cryptoAddress: wallet,
      chainId: token.chain_id,
      tokenAddress: token.address,
      email,
      card: details
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll(' ', '')
        .replaceAll('-', '')
    })

    setWaitingResponse(false)

    if (response.state != 'success' || !response.data.link) {
      return
    }

    location.href = response.data.link
  }

  return (
    <>
      {displayHeader && (
        <Header>
          {widget.logoCompany && (
            <LogoContainer>
              <Image
                src={genericURL + widget.logoCompany}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt=""
              />
            </LogoContainer>
          )}
          {widget.nameCompany && <Name>{widget.nameCompany}</Name>}
        </Header>
      )}
      <Content
        displayHeader={displayHeader}
        style={
          widget.backgroundCompany
            ? {
                backgroundImage: `url(${genericURL + widget.backgroundCompany})`
              }
            : undefined
        }
      >
        <Form onSubmit={handleSubmit}>
          <InputSelect
            label={t('home:buy_blockchain')}
            id={'blockchains'}
            selectLabel={t('home:buy_blockchainLabel')}
            options={mapBlockchains([chain])}
            displayInSelect={3}
            onActiveChange={() => null}
            onSelect={() => null}
            selectedValue={chain.title}
            selectable={false}
            displayIcon
          />
          <InputSelect
            label={t('home:buy_get')}
            id={'get'}
            value={get}
            selectedValue={token.symbol}
            selectable={false}
            onlyNumbers
            options={mapTokens([token])}
            onChange={(event) => setGet(event.target.value)}
            changeable
          />
          <ExchangeInfo
            token={token.symbol}
            currency={currentCurrency}
            rate={fiatrate?.buy[currentCurrency]}
            isLoading={false}
            placeholder={t('home:exchange_fees')}
            text="asd"
            margins
          />
          <InputSelect
            label={t('toPay')}
            value={
              Number((+get * fiatrate?.buy[currentCurrency]).toFixed(2)) + ''
            }
            options={currencies ? currencies : undefined}
            selectedValue={selectedCurrency}
            onSelect={(val) => setSelectedCurrency(val)}
            onActiveChange={setGetCurrencyActive}
            displayInSelect={2}
            selectable={!!currencies && currencies.length > 1}
            visuallyDisabled
            error={errors[inputIds.give]}
          />
          <HideableWithMargin hide={getCurrencyActive} space="0.842em">
            <InputSelect
              label={t('paymentMethod')}
              options={paymentOptions}
              selectedValue={selectedPayment}
              displayInSelect={1}
              onActiveChange={setPaymentActive}
              onSelect={(value) => {
                setSelectedPayment(value)
                setDetails('')
              }}
              displayIcon
              selectable
            />
            <HideableWithMargin hide={paymentActive} space="0.842em">
              <InputSelect
                id={inputIds.email}
                label={t('email')}
                placeholder="coolemail@gmail.com"
                autocomplete="email"
                value={email}
                onChange={handleEmail}
                error={errors[inputIds.email]}
                type="email"
                changeable
              />
              {selectedPayment == 'QIWI' ? (
                <InputSelect
                  label={t('phoneNumber')}
                  id={inputIds.phone}
                  value={details}
                  onChange={handlePhone}
                  autocomplete="tel"
                  error={errors[inputIds.phone]}
                  type="tel"
                  changeable
                  placeholder="+7 (123) 456 7890"
                />
              ) : (
                <InputSelect
                  id={inputIds.card}
                  placeholder="0000 0000 0000 0000"
                  value={stringToPieces(details, 4, ' ')}
                  onChange={handleCard}
                  label={t('creditCard')}
                  autocomplete="cc-number"
                  error={errors[inputIds.card]}
                  onlyNumbers
                  changeable
                />
              )}
            </HideableWithMargin>
          </HideableWithMargin>
          <InputSelect
            label={t('home:buy_wallet')}
            id={'wallet'}
            onChange={handleAddress}
            value={wallet}
            error={errors[inputIds.wallet]}
            placeholder="0x09A6...d5B"
            changeable
          />
          <Submit disabled={waitingResponse}>
            {waitingResponse ? t('loading') : t('submit')}
          </Submit>
        </Form>
      </Content>
      <Footer>
        {env.isStage ? (
          <Link href="/" passHref>
            <a>
              <PoweredBy />
            </a>
          </Link>
        ) : (
          <a href="https://assetux.com">
            <PoweredBy />
          </a>
        )}

        <Configure direction="top" />
      </Footer>
    </>
  )
}

export default ListingPayment
