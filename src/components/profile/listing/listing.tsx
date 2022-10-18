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
    selectedCurrency,
    ranges,
    currencies,
    handleSend,
    send,
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
        {/* <Paragraph>{t("p1")}</Paragraph>
        <List>
          <Item>{t("item1")}</Item>
          <Item>{t("item2")}</Item>
          <Item>{t("item3")}</Item>
        </List>
        <Paragraph>{t("p2")}</Paragraph> */}
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
                    options={currencies ? currencies : undefined}
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
              <HideableWithMargin hide={getCurrencyActive} margins>
                <ExchangeInfoWrapper>
                  <ExchangeInfo
                    isLoading={loading}
                    placeholder={t('allIncluded')}
                    text=""
                  />
                </ExchangeInfoWrapper>
              </HideableWithMargin>
              <HideableWithMargin hide={getCurrencyActive} margins>
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
                    id={inputIds.send}
                    options={
                      isRETENTION && currencies
                        ? currencies
                        : isTRANSFER && !!mappedTokens
                        ? mappedTokens
                        : undefined
                    }
                    onChange={handleGet}
                    value={get.visible}
                    selectedValue={
                      isRETENTION ? selectedCurrency : selectedToken
                    }
                    selectable={false}
                    error={outputError == '' ? undefined : outputError}
                    changeable={isTRANSFER}
                    onlyNumbers
                    onSelect={(val) =>
                      setSelectedCurrency(val as CurrenciesType)
                    }
                    onActiveChange={setGetCurrencyActive}
                    displayInSelect={1}
                    visuallyDisabled={isRETENTION}
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
                    get.visible == '' ||
                    send == '' ||
                    waitingResponse ||
                    !ranges ||
                    get.actual > ranges?.max ||
                    +send < ranges?.min
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
                  disabled={get.visible == '' || send == '' || waitingResponse}
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
