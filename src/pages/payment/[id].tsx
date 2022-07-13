import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import PaymentComponent from "@/components/Profile/Payment"

import { EcommerceClient, BackendClient } from "@/lib/backend/clients"
import { getDefaultMetaTags } from "@/lib/utils/seo"
import { getEcommercePrefix } from "@/lib/utils/helpers"

import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { PaymentProps } from "@/components/Profile/Payment"

function Payment(props: PaymentProps) {
  const { t } = useTranslation("profile-payment")

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          ecommerce: true,
          title: t("title"),
          description: "Powered by ASSETUX.",
          pathname: `${getEcommercePrefix()}/payment/${props.bill.hash}`,
          siteName: props.bill.ecommerceUser.widget.nameCompany || undefined,
          seoImage: props.bill.ecommerceUser.widget.backgroundCompany
            ? {
                url:
                  BackendClient.genericURL +
                  props.bill.ecommerceUser.widget.backgroundCompany,
                alt: "Company Preview",
                type: "image/png"
              }
            : undefined
        })}
      />
      <PaymentComponent {...props} />
    </>
  )
}

type Params = ParsedUrlQuery & {
  id: string
}

export const getServerSideProps: GetServerSideProps<
  PaymentProps,
  Params
> = async ({ locale, params }) => {
  const errorProps = {
    notFound: true,
    revalidate: 3600
  } as const

  const id = params!.id

  if (!id || Array.isArray(id)) {
    return errorProps
  }

  const bill = await EcommerceClient.getBill(id)

  if (bill.state != "success") {
    return errorProps
  }

  const blockchains = await BackendClient.getBlockchains()

  if (blockchains.state != "success") {
    return errorProps
  }

  const blockchain = blockchains.data.find(
    (blockchain) => blockchain.chain_id == bill.data.bill.chainId
  )

  if (!blockchain) {
    return errorProps
  }

  const fiatProviders = await BackendClient.getFiatProviders({
    apiHost: blockchain.url
  })

  if (fiatProviders.state != "success") {
    return errorProps
  }

  const toPay = bill.data.bill.amountIn

  const buyProviders = fiatProviders.data.filter(
    (provider) =>
      provider.type == "BUY" && toPay <= provider.max && toPay >= provider.min
  )

  if (buyProviders.length == 0) {
    return errorProps
  }

  return {
    props: {
      bill: bill.data.bill,
      providers: buyProviders,
      blockchainURL: blockchain.url,
      ...(await serverSideTranslations(locale!, [
        "profile-payment",
        "inputSelect"
      ]))
    },
    revalidate: 3600
  }
}

export default Payment
