import { Step } from './steps'
import InputSelect from '@/components/common/input-select'
import {
  FormContainer,
  ExchangeButtonsContainer,
  ExchangeButton,
  ExchangeInfoContainer,
  RefundButton
} from './styles'
import InputSelectButton from '../../input-select-button'
import HideableWithMargin from '../../common/hideable-with-margin'
import ExchangeInfoRow from '../../common/exchange-info-row'
import QRcode from '../../common/qr-code'
import ExchangeRow from '@/components/common/exchange-info'
import { mapCurrencyName, isCurrencyDeclared } from '@/lib/data/currencies'
import { useTranslation } from 'next-i18next'
import Skeleton from 'react-loading-skeleton'
import { SelectFormProps } from './types.select-form'
import { memo, useMemo } from 'react'
import { inputIds } from './select-form'
import { validateDecimal } from '@/lib/utils/helpers.utils'
import { PaymentOption } from '../../types.form'

const RenderFields = ({
  currentBlockchain,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange,
  getRefundAmounts,
  currentStep,
  isLoading,
  checkedBlockchains,
  setChainActive,
  chainActive,
  giveAmount,
  checkedTokens,
  setGiveActive,
  inputError,
  currentToken,
  rate,
  currentPayment,
  setCurrentStep,
  currentHolder,
  currentEmail,
  onGiveAmountChange,
  onDetailsChange,
  onHolderChange,
  onEmailChange,
  giveActive,
  currentCurrency,
  currentPaymentOption,
  checkedCurrencies,
  setGetActive,
  getAmount,
  getActive,
  setPaymentActive,
  piecedDetails,
  exchangeInfo,
  setShowExpiredModal,
  setShowExchangeUnknownModal,
  setMinimalRefundAmount,
  creditedGetAmount,
  setShowNotEnoughModal,
  setShowExchangeModal,
  setShowRefundModal,
  payments
}: SelectFormProps & any) => {
  const { t } = useTranslation('home')

  let checkedPayments: PaymentOption[] | undefined = useMemo(() => {
    return !!payments ? payments : undefined
  }, [payments])

  const handleGiveInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    onGiveAmountChange(result)
  }

  const handleDetailsInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value.replaceAll(' ', '')
    const validated = /^[0-9]*$/.test(value)
    validated && onDetailsChange(value)
  }

  const handleHolderInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    onHolderChange(value.toUpperCase())
  }

  const handleEmailInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onEmailChange(value)
  }

  if (currentStep == Step.Details) {
    return (
      <FormContainer>
        {!isLoading ? (
          <InputSelect
            label={t('home:sell_blockchain')}
            id={inputIds.blockchains}
            selectLabel={t('home:sell_blockchainLabel')}
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
              label={t('home:sell_give')}
              id={inputIds.give}
              value={giveAmount}
              options={checkedTokens}
              onChange={handleGiveInput}
              onActiveChange={(active) => setGiveActive(active)}
              onSelect={onTokenChange}
              error={inputError[inputIds.give]}
              selectedValue={currentToken}
              displayInSelect={2}
              onlyNumbers
              changeable
            />
          ) : (
            <Skeleton containerClassName="input-skeleton" />
          )}
          <HideableWithMargin hide={giveActive} margins>
            <ExchangeRow
              token={currentToken}
              currency={currentCurrency}
              rate={rate}
              isLoading={isLoading}
              placeholder={t('home:exchange_fees')}
              text="asdads"
              margins
            />
            {!isLoading ? (
              <InputSelect
                label={`${t('home:sell_get')}: ${currentPaymentOption?.min} - ${
                  currentPaymentOption?.max
                }`}
                id={inputIds.get}
                options={checkedCurrencies}
                displayInSelect={1}
                onActiveChange={(active) => setGetActive(active)}
                selectedValue={currentCurrency}
                error={inputError[inputIds.get]}
                onSelect={onCurrencyChange}
                selectable={false}
                onlyNumbers
                value={getAmount}
              />
            ) : (
              <Skeleton containerClassName="input-skeleton" />
            )}
            <HideableWithMargin hide={getActive} margins>
              {!isLoading ? (
                <InputSelect
                  label={t('home:sell_payment')}
                  id={inputIds.payments}
                  options={checkedPayments}
                  onSelect={onPaymentChange}
                  onActiveChange={(active) => setPaymentActive(active)}
                  selectedValue={currentPayment}
                  displayIcon
                />
              ) : (
                <Skeleton containerClassName="input-skeleton" />
              )}
            </HideableWithMargin>
          </HideableWithMargin>
        </HideableWithMargin>
      </FormContainer>
    )
  } else if (currentStep == Step.Payment) {
    return (
      <FormContainer>
        <InputSelectButton
          label={t('home:sell_backTo')}
          value={t('home:sell_orderDetails')}
          onClick={() => setCurrentStep(Step.Details)}
        />
        <HideableWithMargin hide={false} margins>
          <InputSelect
            label={t('home:sell_cardNumber')}
            id={inputIds.details}
            onChange={handleDetailsInput}
            value={piecedDetails}
            error={inputError[inputIds.details]}
            autocomplete="cc-number"
            changeable
          />
        </HideableWithMargin>
        <HideableWithMargin hide={false} margins>
          <InputSelect
            label={t('home:sell_cardHolder')}
            id={inputIds.holder}
            onChange={handleHolderInput}
            value={currentHolder}
            error={inputError[inputIds.holder]}
            autocomplete="cc-name"
            changeable
          />
        </HideableWithMargin>
        <HideableWithMargin hide={false} margins>
          <InputSelect
            label={t('home:sell_email')}
            id={inputIds.email}
            onChange={handleEmailInput}
            value={currentEmail}
            error={inputError[inputIds.email]}
            autocomplete="email"
            type="email"
            changeable
          />
        </HideableWithMargin>
      </FormContainer>
    )
  } else if (currentStep == Step.Exchange && exchangeInfo) {
    return (
      <>
        <FormContainer>
          <InputSelectButton
            label={t('home:sell_backTo')}
            value={t('home:sell_orderDetails')}
            onClick={() => setCurrentStep(Step.Details)}
          />
          <ExchangeInfoContainer>
            <QRcode valueToCopy={exchangeInfo.wallet} />
            <ExchangeInfoRow
              label={t('home:sell_wallet')}
              value={exchangeInfo.wallet}
              copyLabel={t('home:sell_copyAddress')}
              valueToCopy={exchangeInfo.wallet}
            />
            <ExchangeInfoRow
              label={t('home:sell_totalAmount')}
              value={`${
                !!exchangeInfo?.totalAmount
                  ? exchangeInfo?.totalAmount?.toString()
                  : '0'
              } ${exchangeInfo.curOut}`}
              copyLabel={t('home:sell_copyAmount')}
              valueToCopy={
                !!exchangeInfo?.totalAmount
                  ? exchangeInfo?.totalAmount?.toString()
                  : '0'
              }
            />
            <ExchangeInfoRow
              label={t('home:sell_creditedAmount')}
              value={`${exchangeInfo.creditedAmount} ${exchangeInfo.curOut}`}
              timestamp={Number(exchangeInfo.timestamp)}
              onExpired={async () => {
                const response = await getRefundAmounts()

                if (response) {
                  setShowExpiredModal(true)
                } else {
                  setShowExchangeUnknownModal(true)
                }

                setMinimalRefundAmount(response)
              }}
            />
            <ExchangeRow
              token={exchangeInfo.curOut}
              currency={exchangeInfo.curIn}
              rate={rate}
              isLoading={false}
              placeholder={t('home:exchange_fees')}
              text="asdads"
              margins
            />
            <ExchangeInfoRow
              label={t('home:sell_amountToGet')}
              value={`≈${creditedGetAmount || '...'} ${
                exchangeInfo.curIn &&
                isCurrencyDeclared(exchangeInfo.curIn) &&
                mapCurrencyName(exchangeInfo.curIn)
              } (${exchangeInfo.curIn})`}
            />
          </ExchangeInfoContainer>
        </FormContainer>
        <ExchangeButtonsContainer>
          <ExchangeButton
            onClick={() => {
              if (!currentPaymentOption) {
                return
              }

              if (Number(creditedGetAmount) < currentPaymentOption.min) {
                setShowNotEnoughModal(true)
              } else {
                setShowExchangeModal(true)
              }
            }}
          >
            {t('home:sell_exchange')}
          </ExchangeButton>
          <RefundButton onClick={() => setShowRefundModal(true)}>
            {t('home:sell_refund')}
          </RefundButton>
        </ExchangeButtonsContainer>
      </>
    )
  } else return <></>
}

export default memo(RenderFields)
