import React from "react"
import styled from "styled-components"
import { NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/components/common/base-container"
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
        <HeadingRow
          heading={t("history")}
          id={`M-${props.profile.user.userId}`}
        />
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

  const [profileResponse, historyResponse] = await Promise.all([
    EcommerceClient.getProfile({ token }),
    EcommerceClient.getHistory({ token })
  ])

  if (profileResponse.state != "success") {
    return errorProps
  }

  const history =
    historyResponse.state == "success"
      ? historyResponse.data
      : historyResponse.state == "error" && historyResponse.status == 404
      ? []
      : null

  if (!history) {
    return errorProps
  }
  const userHistory = history.filter((obj) =>
    obj.hasOwnProperty("ecommerce_payments")
  )
  const ecomerceHistory: any[] = history
    .filter((obj) => !obj.hasOwnProperty("ecommerce_payments"))
    .map((item) => ({
      id: item.id,
      timestamp: item.timestamp,
      email: item.email,
      creditCard: item.creditCard,
      currency: item.currency,
      amount: item.amount,
      method: item.method
    }))

  const mappedHistory: any[] = []

  for (const item of userHistory) {
    for (const payment of item.ecommerce_payments) {
      mappedHistory.push({
        id: payment.id,
        timestamp: item.timestamp,
        email: payment.email,
        creditCard: payment.creditCard,
        currency: item.currency,
        amount: item.amount,
        method: payment.method
      })
    }
  }

  return {
    props: {
      profile: profileResponse.data,
      history: mappedHistory
        .concat(ecomerceHistory)
        .sort((a, b) => Number(b.timestamp) - Number(a.timestamp)),
      jopa: history,
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
