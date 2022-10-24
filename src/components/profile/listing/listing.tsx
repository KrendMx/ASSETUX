import Skeleton from 'react-loading-skeleton'

import CryptoManager from '@/components/common/crypto-manager'
import InputSelect from '@/components/common/input-select'
import ExchangeInfo from '@/components/common/exchange-info'
import HideableWithMargin from '@/components/home/form-group/form/common/hideable-with-margin'
import { FormHeading, Button } from '../common/form-components'
import {
  FormContainer,
  Form,
  FormContent,
  ExchangeInfoWrapper,
  ContainerForListing
} from './styles'
import LinkModal from './link-modal'

import type { IMerchant } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import useListing from './useListing'
import { CurrenciesType } from '@/lib/data/currencies'
import { FiatRate } from '@/lib/backend/main/types.backend.main'

const inputIds = {
  get: 'get',
  send: 'send',
  blockchains: 'blockchains'
}

export type BillProps = { profile: IMerchant; rate?: FiatRate }

const ListingComponent = (props: BillProps) => {
  const {
    linkModalProps,
    setLinkModalProps,
    getActive,
    getCurrencyActive,
    handleSubmit,
    loading,
    isTRANSFER,
    handleGet,
    get,
    send,
    selectedCurrency,
    ranges,
    currencies,
    handleSend,
    inputError,
    setSelectedCurrency,
    setGetCurrencyActive,
    waitingResponse,
    submitValue,
    t,
    outputError,
    isRETENTION,
    selectedToken,
    mappedTokens
  } = useListing(props)

  return (
    <>
      {linkModalProps.open && (
        <LinkModal
          link={linkModalProps.link}
          onAccept={() => setLinkModalProps({ open: false })}
        />
      )}
      <CryptoManager getToken />
      <ContainerForListing>
        <FormContainer>
          <Form
            getActive={getActive || getCurrencyActive}
            onSubmit={handleSubmit}
            style={isTRANSFER ? { minHeight: 300 } : {}}
          >
            <FormContent>
              <FormHeading>
                {loading ? <Skeleton /> : t('formHeading')}
              </FormHeading>
              <HideableWithMargin hide={false} margins>
                {!loading ? (
                  <InputSelect
                    label={t('get', {
                      min: ranges?.min,
                      max: ranges?.max
                    })}
                    id={inputIds.send}
                    options={
                      isRETENTION && currencies
                        ? currencies
                        : isTRANSFER && !!mappedTokens
                        ? mappedTokens
                        : undefined
                    }
                    onChange={handleSend}
                    value={send}
                    selectedValue={selectedCurrency}
                    selectable={!!currencies && currencies.length > 1}
                    error={inputError == '' ? undefined : inputError}
                    changeable
                    onlyNumbers
                    onSelect={(val) =>
                      setSelectedCurrency(val as CurrenciesType)
                    }
                    onActiveChange={setGetCurrencyActive}
                    displayInSelect={2}
                    maxValue={ranges?.max}
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
              </HideableWithMargin>
              <HideableWithMargin hide={false} margins>
                <ExchangeInfoWrapper>
                  <ExchangeInfo
                    isLoading={loading}
                    placeholder={t('allIncluded')}
                    text=""
                  />
                </ExchangeInfoWrapper>
              </HideableWithMargin>
              <HideableWithMargin hide={false} margins>
                {!loading ? (
                  <InputSelect
                    label={
                      isRETENTION
                        ? t('send', {
                            min: ranges?.min,
                            max: ranges?.max
                          })
                        : t('give')
                    }
                    value={get}
                    id={inputIds.send}
                    options={
                      isRETENTION && currencies
                        ? currencies
                        : isTRANSFER && !!mappedTokens
                        ? mappedTokens
                        : undefined
                    }
                    onChange={handleGet}
                    selectedValue={
                      isRETENTION ? selectedCurrency : selectedToken
                    }
                    error={outputError == '' ? undefined : outputError}
                    changeable={true}
                    onlyNumbers
                    onSelect={(val) =>
                      setSelectedCurrency(val as CurrenciesType)
                    }
                    onActiveChange={setGetCurrencyActive}
                    displayInSelect={1}
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
              </HideableWithMargin>
            </FormContent>
            {loading && isRETENTION ? (
              <Skeleton containerClassName="button-skeleton" />
            ) : (
              !getActive &&
              isRETENTION && (
                <Button
                  type="submit"
                  disabled={
                    waitingResponse ||
                    !ranges ||
                    inputError != '' ||
                    outputError != ''
                  }
                >
                  {submitValue}
                </Button>
              )
            )}
          </Form>
        </FormContainer>
        {isTRANSFER && (
          <FormContainer>
            {loading ? (
              <Skeleton containerClassName="button-skeleton" />
            ) : (
              !getActive && (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={waitingResponse}
                >
                  {submitValue}
                </Button>
              )
            )}
          </FormContainer>
        )}
      </ContainerForListing>
    </>
  )
}

export default ListingComponent
