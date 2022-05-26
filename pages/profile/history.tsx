import React from "react"
import styled from "styled-components"
import { NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import HeadingRow from "@/components/Profile/shared/HeadingRow"
import HistoryComponent from "@/components/Profile/History"

import { EcommerceClient } from "@/src/BackendClients"
import { checkAuthorization } from "@/src/helpers"

import type { GetServerSideProps } from "next"
import type { HistoryProps } from "@/components/Profile/History/History"

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
        <HeadingRow heading={t("history")} id="M-0000001" />
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
      destination: "/profile/login",
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

  if (
    profileResponse.state != "success" ||
    historyResponse.state != "success"
  ) {
    return errorProps
  }

  return {
    props: {
      profile: profileResponse.data.user,
      history: historyResponse.data.payments,
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
