import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import HeadingRow from "@/components/Profile/shared/HeadingRow"
import FormGroup from "@/components/Profile/Main/FormGroup"

import type { GetStaticProps } from "next"

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  padding: 3.15em var(--paddings);
`

function Main() {
  const { t } = useTranslation("profile")

  return (
    <Container>
      <HeadingRow heading={t("profile")} id="M-0000001" />
      <FormGroup />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile",
        "routes"
      ]))
    }
    // notFound: true
  }
}

export default Main
