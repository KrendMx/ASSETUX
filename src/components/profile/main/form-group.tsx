import { Form, Button, FormHeading, Balance } from '../common/form-components'
import InputSelect from '@/components/common/input-select'
import Image from 'next/image'
import Icon from '@/components/common/modal-components/Icon'
import Shadow from '@/components/common/modal-components/Shadow'
import CryptoManager from '@/components/common/crypto-manager'
import SupportPopup from './support-popup'
import styles from './popup.module.css'
import OutIcon from '../../../../public/assets/Out.svg'
import { Container, Flex, Label } from './styles'
import { currenciesSymbol, FormGroupProps, inputId } from './types.main'
import useFormGroup from './useFormGroup'
import { CurrenciesType, mapCurrency } from '@/lib/data/currencies'
import { AnyMap } from 'immer/dist/internal'

const FormGroup = (props: FormGroupProps) => {
  const {
    balance,
    setSupportOpen,
    t,
    email,
    isCONNECT,
    handlePaymentSubmit,
    handleSetWallet,
    wallet,
    inputError,
    requests,
    prevPublicKey,
    handleWidgetSubmit,
    company,
    handleSetCompany,
    handleFile,
    logo,
    background,
    updatedWidget,
    prevCompany,
    prevLogo,
    prevBackground,
    isTRANSFER,
    tokens,
    avaliableChains,
    onBlockchainChange,
    selectedChain,
    selectedToken,
    supportOpen,
    userId
  } = useFormGroup(props)

  return (
    <Flex>
      <CryptoManager />
      <Container>
        <Form as="section">
          <FormHeading>{t('balance')}</FormHeading>
          {Object.keys(balance).map((el: string, i: number) => (
            <>
              <div
                style={{
                  display: 'flex',
                  gap: 17
                }}
                key={i}
              >
                <Balance
                  amount={balance[el].toFixed(2)}
                  icon={mapCurrency(el as CurrenciesType)}
                  symbol={el}
                  fiat
                  style={{ width: '100%' }}
                />
                <button
                  className={styles.copyButton}
                  onClick={() => setSupportOpen(true)}
                >
                  <Shadow>
                    <Icon>
                      <Image
                        src={OutIcon}
                        layout="fill"
                        alt="copy"
                        objectFit="contain"
                        objectPosition="center"
                      />
                    </Icon>
                  </Shadow>
                </button>
              </div>
            </>
          ))}
          {/* ) : (
            <Paragraph>{t("assets")}</Paragraph>
          )} */}
        </Form>
        <Form as="section">
          <FormHeading>{t('personalInfo')}</FormHeading>
          <InputSelect
            id={inputId.email}
            label="E-Mail"
            autocomplete="email"
            value={email}
            selectable={false}
          />
        </Form>
        {!isCONNECT && (
          <>
            <Form onSubmit={handlePaymentSubmit}>
              <FormHeading>{t('payment')}</FormHeading>
              <InputSelect
                id={inputId.wallet}
                label={t('wallet')}
                selectable={false}
                onChange={handleSetWallet}
                value={wallet}
                error={inputError[inputId.wallet]}
                changeable
              />
              <Button
                type="submit"
                isLoading={requests.wallet?.state == 'pending'}
                disabled={
                  wallet == prevPublicKey.current ||
                  (requests.wallet != null &&
                    requests.wallet.state != 'success') ||
                  inputError[inputId.wallet] != undefined
                }
              >
                {requests.wallet?.state == 'pending'
                  ? t('loading')
                  : t('change')}
              </Button>
            </Form>
            <Form onSubmit={handleWidgetSubmit}>
              <FormHeading>{t('widgetPersonalization')}</FormHeading>
              <InputSelect
                id={inputId.companyName}
                error={
                  requests.company?.state == 'error'
                    ? t('smthHappened')
                    : undefined
                }
                label={t('nameYourCompany')}
                value={company}
                onChange={handleSetCompany}
                selectable={false}
                changeable
              />
              <InputSelect
                id={inputId.companyLogo}
                error={
                  requests.company?.state == 'error'
                    ? t('smthHappened')
                    : inputError[inputId.companyLogo]
                }
                label={t('logo')}
                onUpload={handleFile(inputId.companyLogo)}
                fileLabel={t('upload')}
                accept=".png,.jpg,.jpeg"
                selectable={false}
                uploadedFileName={logo.name ? logo.name : undefined}
                changeable
                file
              />
              <InputSelect
                id={inputId.companyBackground}
                error={
                  requests.company?.state == 'error'
                    ? t('smthHappened')
                    : inputError[inputId.companyBackground]
                }
                label={t('background')}
                onUpload={handleFile(inputId.companyBackground)}
                fileLabel={t('upload')}
                accept=".png,.jpg,.jpeg"
                selectable={false}
                uploadedFileName={background.name ? background.name : undefined}
                changeable
                file
              />
              <Button
                type="submit"
                isLoading={requests.company?.state == 'pending'}
                disabled={
                  !updatedWidget ||
                  (company == prevCompany.current &&
                    logo.name == prevLogo.current &&
                    background.name == prevBackground.current) ||
                  inputError[inputId.companyLogo] != undefined ||
                  inputError[inputId.companyBackground] != undefined ||
                  (requests.company != null &&
                    requests.company.state != 'success')
                }
              >
                {requests.company?.state == 'pending'
                  ? t('loading')
                  : t('change')}
              </Button>
            </Form>
          </>
        )}
      </Container>
      {isTRANSFER && !!tokens?.length && (
        <Container>
          <Form as="section">
            <FormHeading>{t('token')}</FormHeading>
            <InputSelect
              label={t('home:buy_blockchain')}
              id={'blockchains'}
              selectLabel={t('home:buy_blockchainLabel')}
              options={avaliableChains}
              displayInSelect={2}
              onActiveChange={(active) => {}}
              onSelect={onBlockchainChange}
              selectedValue={selectedChain?.value}
              selectable={!!avaliableChains && avaliableChains.length > 1}
              displayIcon
            />
            <Label>
              {!!selectedToken?.address ? selectedToken.address : ''}
            </Label>
          </Form>
        </Container>
      )}
      {supportOpen && (
        <SupportPopup userId={userId} email={email} setOpen={setSupportOpen} />
      )}
    </Flex>
  )
}

export default FormGroup
