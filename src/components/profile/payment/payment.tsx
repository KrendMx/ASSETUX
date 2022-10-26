import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { isValidPhoneNumber } from 'libphonenumber-js'

import InputSelect from '@/components/common/input-select'
import HideableWithMargin from '@/components/home/form-group/form/common/hideable-with-margin'
import { Content, Form, Submit } from './styles'

import {
  currencies as definedCurrencies,
  CurrenciesType,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from '@/lib/data/currencies'

import { BackendClient, EcommerceClient } from '@/lib/backend/clients'
import {
  cardholderRegex,
  emailRegexp,
  genericURL,
  listCurrencyError
} from '@/lib/data/constants'
import { stringToPieces } from '@/lib/utils/helpers.utils'

import type {
  IEcommerceBill,
  ITokenBalance
} from '@/lib/backend/ecommerce/types.backend.ecommerce'
import type {
  FiatProvider,
  FiatRate
} from '@/lib/backend/main/types.backend.main'
import type { Option } from '@/components/common/input-select/types.input-select'
import { useAppSelector } from '@/lib/redux/hooks'
import { QIWI, VISAMASTER } from '@/core/backend/types.core.backend'
import { validatePhone } from '@/lib/helpers.global'
import Maintenance, {
  EuroUsingWarning
} from '@/components/home/form-group/form/common/maintenance'
import { env } from '@/lib/env/client'
import PaymentHeader from './header'
import PaymentFooter from './footer'
import WarningPopup from '@/components/home/infoPopup/infoPopUp'
import Popup505 from '@/components/home/infoPopup/Popup_505/Popup_505'

const inputIds = {
  email: 'email',
  phone: 'phone',
  card: 'cardnumber',
  wallet: 'publickey',
  cardholder: 'cardholder'
}

export type PaymentProps<T, B> = {
  bill: T
  providers: FiatProvider[]
  blockchainURL: string
  fiatrate: B
  balanceOfToken?: ITokenBalance
}

const Payment = (props: PaymentProps<IEcommerceBill, FiatRate[]>) => {
  const { bill, providers, blockchainURL } = props
  const widget = bill.widget
  const displayHeader =
    widget.logoCompany != null ||
    (widget.nameCompany != null && widget.nameCompany != '')

  const { t } = useTranslation('profile-payment')
  const currentCurrency = props.bill.bill.currency
  const [selectedPayment, setSelectedPayment] = useState(
    providers.find((provider) => provider.method == VISAMASTER)
      ? 'QIWIVISAMASTER'
      : providers[0].method
  )
  const [paymentActive, setPaymentActive] = useState(false)
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrenciesType>(
    currentCurrency as CurrenciesType
  )
  const [getCurrencyActive, setGetCurrencyActive] = useState<boolean>(false)
  const [serviceUnavaliable, setServiceUnavaliable] = useState<boolean>(false)
  const [euroModalOpen, setEuroModalOpen] = useState<boolean>(false)
  const [cardholder, setCardholder] = useState<string>('')
  const [visPopup, setVisPopup] = useState<boolean>(false)
  const [popupCase, setPopupCase] = useState<number>(0)
  const [visWrongPopup, setVisWrongPopup] = useState<boolean>(false)

  useEffect(() => {
    const mappedCurrencies = definedCurrencies.map((currency) => ({
      value: currency,
      description: mapCurrencyName(currency),
      shortDescription:
        mapShortCurrencyName(currency) + ' ' + mapCurrency(currency)
    }))

    if (mappedCurrencies.length > 0) {
      setCurrencies(mappedCurrencies)
      // setSelectedCurrency()
      // setSelectedCurrency(
      //   mappedCurrencies.find(({ value }) => value === currentCurrency)
      //     ?.value || mappedCurrencies[0].value
      // )
    }
  }, [currentCurrency])

  const paymentOptions: Option[] = useMemo(() => {
    const options = providers
      // TODO: Maybe add recalculate send sum by changing currency and filter providers by min max
      .filter(({ currency, max, min }) => currency === selectedCurrency)
      .map((provider) => ({
        icon: provider.logo
          ? env.hostProtocol + '://' + blockchainURL + provider.logo
          : undefined,
        value:
          provider.method == VISAMASTER ? 'QIWIVISAMASTER' : provider.method,
        description: provider.method
      }))
    selectedCurrency !== 'RUB' && setSelectedPayment(options[0].value)
    return options
  }, [providers, blockchainURL, selectedCurrency])

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setEmail(value)
  }

  const handleCardholderInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    setCardholder(value.toUpperCase())
  }

  const handleCard: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replaceAll(' ', '')
    const validated = /^[0-9]*$/.test(value)

    validated && setDetails(value)
  }

  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setDetails(value.length > details.length ? validatePhone(value) : value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    const euroAccept = !!sessionStorage.getItem('euro_accept')

    if (!euroAccept && selectedCurrency === 'EUR') {
      setEuroModalOpen(true)
      return
    }

    setWaitingResponse(true)

    const validEmail = email != '' && emailRegexp.test(email)
    const validPhone =
      selectedPayment == QIWI
        ? details != '' && isValidPhoneNumber(details, 'RU')
        : true
    const validCard = selectedPayment != QIWI ? details.length == 16 : true
    const validCardholder =
      bill.bill.currency === 'EUR' || bill.bill.currency === 'USD'
        ? cardholderRegex.test(cardholder)
        : true

    if (
      selectedPayment != QIWI &&
      details.length > 0 &&
      !(currentCurrency == 'RUB')
    ) {
      const card_res = await BackendClient.checkCardValidation({
        apiHost: 'bsc.dev.assetux.com',
        bin: details.slice(0, 6),
        currency: currentCurrency as CurrenciesType
      })
      if (card_res.status === 500) {
        setVisWrongPopup(true)
        setWaitingResponse(false)
        return
      } else if (card_res.status !== 200) {
        setVisPopup(true)
        if (currentCurrency == 'RUB') {
          setPopupCase(5)
        } else if (currentCurrency == 'UAH') {
          setPopupCase(6)
        } else if (currentCurrency == 'KZT') {
          setPopupCase(4)
        }
        if (card_res.data.data.message == 'Unsupported') {
          setPopupCase(1)
        } else if (
          currentCurrency != 'KZT' &&
          currentCurrency != 'UAH' &&
          currentCurrency != 'RUB'
        ) {
          setPopupCase(
            listCurrencyError[currentCurrency][
              card_res.data.data.message.type as string
            ]
          )
        }
      }
    }

    console.log(cardholderRegex.test(cardholder), cardholder)

    setErrors((prev) => ({
      ...prev,
      [inputIds.email]: validEmail ? undefined : t('invalidEmail'),
      [inputIds.phone]: validPhone ? undefined : t('invalidPhone'),
      [inputIds.card]:
        validCard && popupCase == 0 ? undefined : t('invalidCard'),
      [inputIds.cardholder]: validCardholder
        ? undefined
        : t('invalidCardholder')
    }))

    setWaitingResponse(false)

    if (
      !validEmail ||
      !validPhone ||
      !validCard ||
      !validCardholder ||
      popupCase !== 0 ||
      visWrongPopup
    ) {
      setWaitingResponse(false)
      return
    }
    console.log(
      !validEmail ||
        !validPhone ||
        !validCard ||
        !validCardholder ||
        popupCase !== 0 ||
        visWrongPopup
    )
    // return
    const response = await EcommerceClient.createPayment({
      paymentMethod: selectedPayment,
      email,
      cardHolder: {
        firstName: cardholder.split(' ')[0],
        lastName: cardholder.split(' ')[1]
      },
      creditCard: details
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll(' ', '')
        .replaceAll('-', ''),
      ecommerceBillHash: bill.bill.hash
    })

    setWaitingResponse(false)

    if (response.state != 'success') {
      setServiceUnavaliable(true)
      return
    }

    location.href = response.data.linkToPaymentString
  }

  return (
    <>
      <PaymentHeader widget={widget} displayHeader={displayHeader} />
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
        <Form onSubmit={handleSubmit} style={{ minHeight: 500 }}>
          {serviceUnavaliable && <Maintenance bgStyle={{ borderRadius: 10 }} />}
          {euroModalOpen && (
            <EuroUsingWarning
              setOpen={setEuroModalOpen}
              bgStyle={{ borderRadius: 10 }}
              miniScroll
            />
          )}
          <InputSelect
            label={t('toPay')}
            value={bill.bill.sendAmount + ''}
            visuallyDisabled
            options={currencies ? currencies : undefined}
            selectedValue={bill.bill.currency}
            onSelect={(val) => setSelectedCurrency(val as CurrenciesType)}
            onActiveChange={setGetCurrencyActive}
            displayInSelect={2}
            selectable={false}
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
              selectable={paymentOptions.length > 1}
            />
            {(bill.bill.currency === 'EUR' || bill.bill.currency === 'USD') && (
              <>
                <HideableWithMargin hide={false} margins>
                  <InputSelect
                    label={t('home:buy_cardholder')}
                    id={inputIds.cardholder}
                    onChange={handleCardholderInput}
                    value={cardholder}
                    error={errors[inputIds.cardholder]}
                    placeholder=""
                    changeable
                  />
                </HideableWithMargin>
              </>
            )}
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
              {selectedPayment == QIWI ? (
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
                  value={stringToPieces(details, 4, ' ')}
                  onChange={handleCard}
                  label={t('creditCard')}
                  autocomplete="cc-number"
                  error={errors[inputIds.card]}
                  placeholder="0000 0000 0000 0000"
                  onlyNumbers
                  changeable
                />
              )}
              <Submit disabled={waitingResponse}>
                {waitingResponse ? t('loading') : t('submit')}
              </Submit>
            </HideableWithMargin>
          </HideableWithMargin>
          {visPopup && (
            <WarningPopup
              caseNumber={popupCase}
              setClose={() => {
                setVisPopup(false)
              }}
            />
          )}
          {visWrongPopup && !visPopup && (
            <Popup505
              setClose={() => {
                setVisWrongPopup(false)
              }}
            />
          )}
        </Form>
      </Content>
      <PaymentFooter />
    </>
  )
}

export default Payment
