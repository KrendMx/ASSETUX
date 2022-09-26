import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PaymentComponent from '@/components/profile/payment'

import { EcommerceClient, BackendClient } from '@/lib/backend/clients'
import { getDefaultMetaTags } from '@/lib/utils/seo'
import { getEcommercePrefix } from '@/lib/utils/helpers'

import type { GetServerSideProps } from 'next'
import type { PaymentProps } from '@/components/profile/payment'
import { IEcommerceBill } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import { FiatRate } from '@/lib/backend/main/types.backend.main'
import { genericURL } from '@/lib/data/constants'

const Payment = (props: PaymentProps<IEcommerceBill, FiatRate[]>) => {
  const { t } = useTranslation('profile-payment')

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          ecommerce: true,
          title: t('title'),
          description: 'Powered by ASSETUX.',
          pathname: `${getEcommercePrefix()}/payment/${props.bill.bill.hash}`,
          siteName: props.bill.widget.nameCompany || undefined,
          seoImage: props.bill.widget.backgroundCompany
            ? {
                url: genericURL + props.bill.widget.backgroundCompany,
                alt: 'Company Preview',
                type: 'image/png'
              }
            : undefined
        })}
      />
      <PaymentComponent {...props} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params
}) => {
  const errorProps = {
    notFound: true
  } as const

  const id = params!.id

  if (!id || Array.isArray(id)) {
    return errorProps
  }

  const bill = await EcommerceClient.getBill(id)

  if (bill.state != 'success') {
    return errorProps
  }

  const blockchains = await BackendClient.getBlockchains()

  if (blockchains.state != 'success') {
    return errorProps
  }

  const blockchain = blockchains.data[0]

  if (!blockchain) {
    return errorProps
  }

  const fiatProviders = await BackendClient.getFiatProviders({
    apiHost: blockchain.url
  })

  if (fiatProviders.state != 'success') {
    return errorProps
  }

  const toPay = bill.data.bill.sendAmount

  const buyProviders = fiatProviders.data.filter(
    (provider) =>
      provider.type == 'BUY' && toPay <= provider.max && toPay >= provider.min
  )

  if (buyProviders.length == 0) {
    return errorProps
  }

  return {
    props: {
      bill: bill.data,
      providers: buyProviders,
      blockchainURL: blockchain.url,
      fiatrate: null,
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
