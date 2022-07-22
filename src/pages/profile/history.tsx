import React from "react"
import styled from "styled-components"
import { NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import HeadingRow from "@/components/profile/common/heading-row"
import HistoryComponent from "@/components/profile/history"

import { EcommerceClient } from "@/lib/backend/clients"
import { checkAuthorization, getEcommercePrefix } from "@/lib/utils/helpers"

import type { GetServerSideProps } from "next"
import type { HistoryProps } from "@/components/profile/history"

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 3.15em var(--paddings);
  min-height: calc(100vh - var(--header-height));
`

function History(props: HistoryProps) {
  const { t } = useTranslation("profile-history")

  return (
    <>
      <NextSeo title={t("title")} />
      <Container>
        <HeadingRow heading={t("history")} id={`M-${props.profile.userId}`} />
        <HistoryComponent {...props} />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HistoryProps> = async ({
  locale,
  req
}) => {
  const errorProps = {
    props: {},
    redirect: {
      destination: `${getEcommercePrefix()}/login`,
      permanent: false
    }
  }

  const token = checkAuthorization(req)

  if (!token) {
    return errorProps
  }

  const responses = await Promise.all([
    EcommerceClient.getProfile({ token }),
    EcommerceClient.getHistory({ token })
  ])

  const profileResponse = responses[0]
  const historyResponse = responses[1]

  if (profileResponse.state != "success") {
    return errorProps
  }

  const history =
    historyResponse.state == "success"
      ? historyResponse.data.payments
      : historyResponse.state == "error" && historyResponse.status == 404
      ? []
      : null

  if (!history) {
    return errorProps
  }

  const mappedHistory = []
  for (const item of history) {
    for (const payment of item.ecommerce_payments) {
      mappedHistory.push({
        id: payment.id,
        timestamp: payment.timestamp,
        email: payment.email,
        creditCard: payment.creditCard,
        blockchain: item.chains.title,
        currency: item.currency,
        token: item.tokens.symbol,
        amount: item.amountIn,
        method: payment.paymentMethod
      })
    }
  }

  return {
    props: {
      profile: profileResponse.data.user,
      history: mappedHistory.sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp)
      ),
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile-history",
        "routes"
      ]))
    }
  }
}

export default History
