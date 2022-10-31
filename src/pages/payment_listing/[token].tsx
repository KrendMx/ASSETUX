import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EcommerceClient, BackendClient } from '@/lib/backend/clients'
import { getDefaultMetaTags } from '@/lib/utils/seo'
import { getEcommercePrefix } from '@/lib/utils/helpers.utils'

import type { GetServerSideProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { PaymentProps } from '@/components/profile/payment'
import { MerchantData } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import ListingPayment from '@/components/profile/payment/listing_payment'
import { FiatRate } from '@/lib/backend/main/types.backend.main'
import { genericURL } from '@/lib/data/constants'
import locales from 'locales'

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
                url: genericURL + widget.backgroundCompany,
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
> = async ({ locale, params, query }) => {
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

  const balanceOfToken = await EcommerceClient.checkBalanceOfToken(id)

  if (balanceOfToken.state != 'success') {
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
      paths: locales.map((el: any) => ({ params: query, locales: el })),
      blockchainURL: blockchains.data[0].url,
      fiatrate: currentFiatrate,
      balanceOfToken: balanceOfToken.data,
      ...(await serverSideTranslations(locale!, [
        'common',
        'profile-payment',
        'profile-listing',
        'inputSelect',
        'footer',
        'routes',
        'home'
      ]))
    }
  }
}

export default Payment
