import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { GetStaticProps } from "next"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - var(--header-height));
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: var(--black);
  text-align: center;
  font-weight: 400;
`

function Error() {
  const { t } = useTranslation("404")
  return <Container>{t("404")}</Container>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["header", "footer", "404"]))
    }
  }
}

export default Error
