import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import HeadingRow from "@/components/Profile/shared/HeadingRow"
import HistoryComponent from "@/components/Profile/History"

import type { GetStaticProps } from "next"

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 3.15em var(--paddings);
  min-height: calc(100vh - var(--header-height));
`

function History() {
  const { t } = useTranslation("profile-history")

  return (
    <Container>
      <HeadingRow heading={t("history")} id="M-0000001" />
      <HistoryComponent />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile-history",
        "routes"
      ]))
    }
    // notFound: true
  }
}

export default History
