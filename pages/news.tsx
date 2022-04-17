import React from "react"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import MainBlock from "@/components/News/MainBlock"

import BackendClient from "@/src/BackendClient"

import type { GetStaticProps } from "next"
import type { NewsData } from "@/src/BackendClient/types"

const Container = styled(BaseContainer)`
  padding: 5.57em 0 13.47em 0;
`

type NewsProps = {
  news: NewsData[] | null
}

function News({ news }: NewsProps) {
  return (
    <Container>
      <MainBlock />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<NewsProps> = async ({ locale }) => {
  const response = await BackendClient.getNews()

  return {
    props: {
      news: response.data ? response.data : null,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "news",
        "news",
        "routes"
      ]))
    }
  }
}

export default News
