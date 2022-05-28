import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import PaymentComponent from "@/components/Profile/Payment"

import { EcommerceClient, BackendClient } from "@/src/BackendClients"

import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { PaymentProps } from "@/components/Profile/Payment"

function Payment(props: PaymentProps) {
  const { t } = useTranslation("profile-payment")

  return (
    <>
      <NextSeo title={t("title")} />
      <PaymentComponent {...props} />
    </>
  )
}

type Params = ParsedUrlQuery & {
  id: string
}

export const getServerSideProps: GetServerSideProps<
  Partial<PaymentProps>,
  Params
> = async ({ locale, params }) => {
  const errorProps = {
    notFound: true,
    props: {
      bill: undefined
    }
  }

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

  const buyProviders = fiatProviders.data.filter(
    (provider) => provider.type == "BUY"
  )

  return {
    props: {
      bill: bill.data.bill,
      providers: buyProviders,
      blockchainURL: blockchain.url,
      ...(await serverSideTranslations(locale!, [
        "profile-payment",
        "inputSelect"
      ]))
    }
  }
}

export default Payment
