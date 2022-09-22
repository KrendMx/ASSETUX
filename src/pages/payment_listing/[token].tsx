import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EcommerceClient, BackendClient } from '@/lib/backend/clients'
import { getDefaultMetaTags } from '@/lib/utils/seo'
import { getEcommercePrefix } from '@/lib/utils/helpers'

import type { GetServerSideProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { PaymentProps } from '@/components/profile/payment'
import { MerchantData } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import ListingPayment from '@/components/profile/payment/listing_payment'
import { FiatRate } from '@/lib/backend/main/types.backend.main'

const Payment = (props: PaymentProps<MerchantData, FiatRate>) => {
  const { t } = useTranslation('profile-payment')
  const { token, widget } = props.bill

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          ecommerce: true,
          title: t('title'),
          description: 'Powered by ASSETUX.',
          pathname: `${getEcommercePrefix()}/payment_listing/${token.symbol}`,
          siteName: widget.nameCompany || undefined,
          seoImage: widget.backgroundCompany
            ? {
                url: BackendClient.genericURL + widget.backgroundCompany,
                alt: 'Company Preview',
                type: 'image/png'
              }
            : undefined
        })}
      />
      <ListingPayment {...props} />
    </>
  )
}

type Params = ParsedUrlQuery & {
  id: string
}

export const getServerSideProps: GetServerSideProps<
  PaymentProps<MerchantData, FiatRate>,
  Params
> = async ({ locale, params }) => {
  const errorProps = {
    notFound: true
  } as const
  const id = params!.token

  if (!id || Array.isArray(id)) {
    return errorProps
  }

  const bill = await EcommerceClient.getMerchantToken(id)

  if (bill.state != 'success') {
    return errorProps
  }
  // need refactor
  const merchantBill = bill.data

  const blockchains = await BackendClient.getBlockchains()

  if (blockchains.state != 'success') {
    return errorProps
  }

  const fiatProviders = await BackendClient.getFiatProviders({
    apiHost: blockchains.data[0].url
  })

  const fiatrates = await BackendClient.getFiatRates({
    apiHost: merchantBill.chain.url
  })

  if (fiatProviders.state != 'success' || fiatrates.state != 'success') {
    return errorProps
  }

  const buyProviders = fiatProviders.data.filter(
    (provider) => provider.type == 'BUY'
  )

  const currentFiatrate = fiatrates.data.find(
    (fiatrate) => fiatrate.name === merchantBill.token.symbol
  )

  if (buyProviders.length == 0 || !currentFiatrate) {
    return errorProps
  }

  return {
    props: {
      bill: merchantBill,
      providers: buyProviders,
      blockchainURL: blockchains.data[0].url,
      fiatrate: currentFiatrate,
      ...(await serverSideTranslations(locale!, [
        'profile-payment',
        'inputSelect',
        'footer',
        'routes',
        'home'
      ]))
    }
  }
}

export default Payment
