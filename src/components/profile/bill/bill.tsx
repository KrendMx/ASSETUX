import { useTranslation } from 'next-i18next'
import Skeleton from 'react-loading-skeleton'
import CryptoManager from '@/components/common/crypto-manager'
import InputSelect from '@/components/common/input-select'
import ExchangeInfo from '@/components/common/exchange-info'
import HideableWithMargin from '@/components/home/form-group/form/common/hideable-with-margin'
import { FormHeading, Button } from '../common/form-components'
import {
  Container,
  Paragraph,
  List,
  Item,
  FormContainer,
  Form,
  FormContent,
  ExchangeInfoWrapper
} from './styles'
import LinkModal from './link-modal'

import type { IMerchant } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import useBill from './useBill'

const inputIds = {
  get: 'get',
  send: 'send',
  blockchains: 'blockchains'
}

export type BillProps = { profile: IMerchant }

const Bill = ({ profile }: BillProps) => {
  const { t } = useTranslation('profile-bill')

  const {
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
  } = useBill({ profile })

  return (
    <>
      {linkModalProps.open && (
        <LinkModal
          link={linkModalProps.link}
          onAccept={() => setLinkModalProps({ open: false })}
        />
      )}
      <CryptoManager getToken />
      <Container>
        <Paragraph>{t('p1')}</Paragraph>
        <List>
          <Item>{t('item1')}</Item>
          <Item>{t('item2')}</Item>
          <Item>{t('item3')}</Item>
        </List>
        <Paragraph>{t('p2')}</Paragraph>
        <FormContainer>
          <Form
            getActive={getActive || getCurrencyActive}
            onSubmit={handleSubmit}
          >
            <FormContent>
              <FormHeading>
                {loading ? <Skeleton /> : t('formHeading')}
              </FormHeading>
              {!loading ? (
                <InputSelect
                  label={t('blockchain')}
                  id={inputIds.blockchains}
                  options={
                    blockchains && !isTRANSFER
                      ? blockchains
                      : !!selectedChain && isTRANSFER
                      ? [selectedChain]
                      : undefined
                  }
                  displayIcon
                  selectable={false}
                />
              ) : (
                <Skeleton containerClassName="input-skeleton" />
              )}
              <HideableWithMargin hide={false} margins>
                {!loading ? (
                  <InputSelect
                    label={isTRANSFER ? t('give') : t('get')}
                    id={inputIds.get}
                    options={tokens ? tokens : undefined}
                    onChange={handleGet}
                    value={get.visible}
                    onSelect={setSelectedToken}
                    selectedValue={selectedToken}
                    onActiveChange={setGetActive}
                    displayInSelect={3}
                    changeable
                    onlyNumbers
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
                <HideableWithMargin hide={getActive} margins>
                  <ExchangeInfoWrapper>
                    <ExchangeInfo
                      token={selectedToken}
                      currency={selectedCurrency}
                      rate={currentRate}
                      isLoading={loading}
                      placeholder={t('allIncluded')}
                      text=""
                    />
                  </ExchangeInfoWrapper>
                  <HideableWithMargin hide={false} margins>
                    {!loading ? (
                      <InputSelect
                        label={t('send', {
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
                        onSelect={(val) => setSelectedCurrency(val)}
                        onActiveChange={setGetCurrencyActive}
                        displayInSelect={1}
                      />
                    ) : (
                      <Skeleton containerClassName="input-skeleton" />
                    )}
                  </HideableWithMargin>
                </HideableWithMargin>
              </HideableWithMargin>
            </FormContent>
            {loading ? (
              <Skeleton containerClassName="button-skeleton" />
            ) : (
              !getActive && (
                <Button
                  type="submit"
                  disabled={get.visible == '' || send == '' || waitingResponse}
                >
                  {submitValue}
                </Button>
              )
            )}
          </Form>
        </FormContainer>
      </Container>
    </>
  )
}

export default Bill
