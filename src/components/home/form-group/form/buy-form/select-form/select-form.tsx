import React, { useState, useMemo, useEffect } from 'react'
import { useIsomorphicLayoutEffect } from '@/lib/hooks'
import { useTranslation } from 'next-i18next'
import Skeleton from 'react-loading-skeleton'
import { isValidPhoneNumber } from 'libphonenumber-js'

import InputSelect from '@/components/common/input-select'

import InputSelectButton from '../../input-select-button'
import NextButton from '../../common/next-button'
import ExchangeRow from '@/components/common/exchange-info'
import NetworkRow from '../../common/network-row'
import HideableWithMargin from '../../common/hideable-with-margin'
import Maintenance from '../../common/maintenance'

import { Container, FormContainer } from './styles'

import Step from './steps'

import { emailRegexp, allowSkeletons, walletRegexp } from '@/lib/data/constants'
import { useAppSelector } from '@/lib/redux/hooks'

import { stringToPieces, validateDecimal } from '@/lib/utils/helpers.utils'

import type { Error, SelectFormProps } from './types.select-buy'
import type { Option } from '@/components/common/input-select/types.input-select'
import { QIWI } from '@/core/backend/types.core.backend'

const inputIds = {
  get: 'get',
  give: 'give',
  wallet: 'wallet',
  email: 'email',
  blockchains: 'blockchains',
  payments: 'payments',
  details: 'cardnumber',
  phoneNumber: 'phone'
}

const SelectForm = ({
  currentStep,
  currentBlockchain,
  blockchains,
  currentCurrency,
  currencies,
  currentToken,
  tokens,
  currentPayment,
  currentDetails,
  currentPhoneNumber,
  payments,
  currentWallet,
  giveAmount,
  getAmount,
  email,
  rate,
  processingRequest,
  cardError,
  serviceAvailable,
  setCurrentStep,
  setGetAmount,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange,
  onDetailsChange,
  onPhoneChange,
  onWalletChange,
  onGiveAmountChange,
  onEmailChange,
  onSubmit
}: SelectFormProps) => {
  const { t } = useTranslation('home')

  const [inputError, setInputError] = useState<Error>({})
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  const piecedDetails = useMemo(
    () => stringToPieces(currentDetails, 4, ' '),
    [currentDetails]
  )

  useEffect(() => {
    if (rate && giveAmount != '') {
      setGetAmount((Number(giveAmount) / rate).toFixed(2))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate])

  useIsomorphicLayoutEffect(() => {
    const errorRanges = checkRanges(Number(giveAmount))

    if (errorRanges) {
      setInputError({
        ...inputError,
        [inputIds.give]: errorRanges
      })
    } else {
      setInputError({
        ...inputError,
        [inputIds.give]: undefined
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPayment])

  let checkedBlockchains: Option[] | undefined
  if (blockchains) checkedBlockchains = blockchains
  let checkedCurrencies: Option[] | undefined
  if (currencies) checkedCurrencies = currencies
  let checkedTokens: Option[] | undefined
  if (tokens) checkedTokens = tokens
  let checkedPayments: Option[] | undefined
  if (payments) checkedPayments = payments

  const serviceUnavailable = serviceAvailable == null || !serviceAvailable

  const currentPaymentOption = payments?.find(
    (payment) => payment.value == currentPayment
  )

  const isLoading =
    allowSkeletons &&
    (!appLoaded ||
      !checkedBlockchains ||
      !checkedTokens ||
      !checkedCurrencies ||
      !rate ||
      serviceAvailable == null)

  const checkRanges = (value: number): string | null => {
    if (!currentPaymentOption) {
      return null
    }

    if (value < currentPaymentOption.min || value > currentPaymentOption.max) {
      if (value > currentPaymentOption.max) {
        return t('home:buy_maximumIs') + ' ' + currentPaymentOption.max
      } else {
        return t('home:buy_minimumIs') + ' ' + currentPaymentOption.min
      }
    } else {
      return null
    }
  }

  const handleGiveInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    const errorRanges = checkRanges(Number(result))

    if (errorRanges) {
      setInputError({
        ...inputError,
        [inputIds.give]: errorRanges
      })
    } else {
      setInputError({
        ...inputError,
        [inputIds.give]: undefined
      })
    }

    if (rate != null) {
      setGetAmount((Number(result) / rate).toFixed(2))
    }

    onGiveAmountChange(result)
  }

  const handleGetInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    let estimatedGiveAmount = ''

    if (rate != null && result != '') {
      estimatedGiveAmount = (Number(result) * rate).toFixed(2)
    }

    const errorRanges = checkRanges(Number(estimatedGiveAmount))

    if (errorRanges) {
      setInputError({
        ...inputError,
        [inputIds.give]: errorRanges
      })
    } else {
      setInputError({
        ...inputError,
        [inputIds.give]: undefined
      })
    }

    onGiveAmountChange(estimatedGiveAmount)

    setGetAmount(result)
  }

  const handleWalletInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onWalletChange(value)
  }

  const handleEmailInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onEmailChange(value)
  }

  const handleDetailsInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value.replaceAll(' ', '')
    const validated = /^[0-9]*$/.test(value)
    validated && onDetailsChange(value)
  }

  const handleNumberInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    onPhoneChange(value)
  }

  const handleNextStep = () => {
    if (serviceUnavailable) {
      return
    }

    // validation

    let errorObject: Error = {}

    const errorRanges = checkRanges(Number(giveAmount))

    if (errorRanges) {
      errorObject[inputIds.give] = errorRanges
    }

    if (currentStep == Step.Credentials) {
      if (email == '' || !emailRegexp.test(email)) {
        errorObject[inputIds.email] = t('home:buy_invalidEmail')
      }

      if (currentWallet == '' || !walletRegexp.test(currentWallet)) {
        errorObject[inputIds.wallet] = t('home:buy_invalidWallet')
      }

      if (currentPayment == 'QIWI') {
        if (
          currentPhoneNumber == '' ||
          !isValidPhoneNumber(currentPhoneNumber, 'RU')
        ) {
          errorObject[inputIds.phoneNumber] = t('home:buy_invalidPhoneNumber')
        }
      } else {
        if (currentDetails == '') {
          errorObject[inputIds.details] = t('home:buy_invalidCard')
        }
      }
    }

    setInputError(errorObject)

    // actions

    if (Object.keys(errorObject).length == 0) {
      if (currentStep == Step.Details) {
        setCurrentStep(Step.Credentials)
      } else if (currentStep == Step.Credentials) {
        onSubmit()
      }
    }
  }

  const renderFields = () => {
    if (currentStep == Step.Details) {
      return (
        <FormContainer>
          {!isLoading ? (
            <InputSelect
              label={t('home:buy_blockchain')}
              id={inputIds.blockchains}
              selectLabel={t('home:buy_blockchainLabel')}
              options={checkedBlockchains}
              displayInSelect={3}
              onActiveChange={(active) => setChainActive(active)}
              onSelect={onBlockchainChange}
              selectedValue={currentBlockchain}
              selectable={false}
              displayIcon
            />
          ) : (
            <Skeleton containerClassName="input-skeleton" />
          )}
          <HideableWithMargin hide={chainActive} margins>
            {!isLoading ? (
              <InputSelect
                label={`${t('home:buy_give')}: ${currentPaymentOption?.min} - ${
                  currentPaymentOption?.max
                }`}
                id={inputIds.give}
                value={giveAmount}
                onChange={handleGiveInput}
                options={checkedCurrencies}
                onActiveChange={(active) => setGiveActive(active)}
                onSelect={onCurrencyChange}
                error={inputError[inputIds.give]}
                selectedValue={currentCurrency}
                selectable={!!checkedCurrencies && checkedCurrencies.length > 1}
                onlyNumbers
                changeable
              />
            ) : (
              <Skeleton containerClassName="input-skeleton" />
            )}
            <HideableWithMargin hide={giveActive} margins>
              {!isLoading ? (
                <InputSelect
                  label={t('home:buy_payment')}
                  id={inputIds.payments}
                  options={checkedPayments}
                  onSelect={onPaymentChange}
                  onActiveChange={(active) => setPaymentActive(active)}
                  selectedValue={currentPayment}
                  displayInSelect={1}
                  displayIcon
                />
              ) : (
                <Skeleton containerClassName="input-skeleton" />
              )}
              <HideableWithMargin hide={paymentActive}>
                <ExchangeRow
                  token={currentToken}
                  currency={currentCurrency}
                  rate={rate}
                  isLoading={isLoading}
                  placeholder={t('home:exchange_fees')}
                  text="asd"
                  margins
                />
                {!isLoading ? (
                  <InputSelect
                    label={t('home:buy_get')}
                    id={inputIds.get}
                    options={checkedTokens}
                    displayInSelect={2}
                    onActiveChange={(active) => setGetActive(active)}
                    onSelect={onTokenChange}
                    onChange={handleGetInput}
                    value={getAmount}
                    selectedValue={currentToken}
                    onlyNumbers
                    changeable
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
              </HideableWithMargin>
            </HideableWithMargin>
          </HideableWithMargin>
        </FormContainer>
      )
    } else if (currentStep == Step.Credentials) {
      return (
        <FormContainer>
          <InputSelectButton
            label={t('home:buy_backTo')}
            value={t('home:buy_orderDetails')}
            onClick={() => setCurrentStep(Step.Details)}
          />
          <NetworkRow isLoading={isLoading} />
          <InputSelect
            label={t('home:buy_wallet')}
            id={inputIds.wallet}
            onChange={handleWalletInput}
            value={currentWallet}
            error={inputError[inputIds.wallet]}
            placeholder={
              inputError[inputIds.wallet]
                ? ''
                : '0x04A6eDc2Cd603D7a1D875479444A8ad2CEDf6d5f'
            }
            changeable
          />
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label={t('home:buy_email')}
              id={inputIds.email}
              value={email}
              error={inputError[inputIds.email]}
              onChange={handleEmailInput}
              autocomplete="email"
              type="email"
              changeable
            />
            <HideableWithMargin hide={false} margins>
              {currentPayment == QIWI ? (
                <InputSelect
                  label={t('home:buy_phoneNumber')}
                  id={inputIds.phoneNumber}
                  onChange={handleNumberInput}
                  value={currentPhoneNumber}
                  error={cardError || inputError[inputIds.phoneNumber]}
                  autocomplete="tel"
                  type="tel"
                  changeable
                />
              ) : (
                <InputSelect
                  label={t('home:buy_cardNumber')}
                  id={inputIds.details}
                  onChange={handleDetailsInput}
                  value={piecedDetails}
                  error={cardError || inputError[inputIds.details]}
                  autocomplete="cc-number"
                  changeable
                />
              )}
            </HideableWithMargin>
          </HideableWithMargin>
        </FormContainer>
      )
    }
  }

  return (
    <Container formStep={currentStep} lastSelectorActive={getActive}>
      {renderFields()}

      {!isLoading && serviceUnavailable && <Maintenance />}

      {!chainActive && !giveActive && !getActive && !paymentActive && (
        <NextButton
          onClick={handleNextStep}
          disabled={processingRequest || isLoading || serviceUnavailable}
          isLoading={isLoading}
        >
          {isLoading ? (
            <Skeleton
              height="3.035em"
              containerClassName="skeletonFlexContainer skeletonZeroLineHeight"
            />
          ) : processingRequest ? (
            t('home:buy_wait')
          ) : (
            t('home:buy_next')
          )}
        </NextButton>
      )}
    </Container>
  )
}

export default SelectForm
