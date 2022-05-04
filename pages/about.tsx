import React from "react"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import Intro from "@/components/About/Intro"
import Info from "@/components/About/Info"
import Investments from "@/components/About/Investments"
import Contacts from "@/components/About/Contacts"
import NewsRoom from "@/shared/NewsRoom"

import BackendClient from "@/src/BackendClient"

import type { GetStaticProps } from "next"
import type { PostData } from "@/src/BackendClient/types"

const Container = styled(BaseContainer)`
  padding: 5.1em 0;

  & > section:first-child {
    margin-bottom: 8.78em;
  }

  & > section:nth-child(2) {
    margin-bottom: 8.15em;
  }

  & > section:nth-child(3) {
    margin-bottom: 10.31em;
  }

  & > section:nth-child(4) {
    margin-bottom: 7.1em;
  }

  & > section:nth-child(5) {
    margin-bottom: 6.84em;
  }
`

type AboutProps = {
  news: PostData[] | null
}

function About({ news }: AboutProps) {
  return (
    <Container>
      <Intro />
      <Info />
      <Investments />
      <Contacts />
      {news && <NewsRoom news={news} />}
    </Container>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async ({
  locale
}) => {
  const response = await BackendClient.getNews({ category: "news" })

  return {
    props: {
      news: response.data ? response.data.news : null,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "about",
        "news",
        "routes"
      ]))
    }
  }
}

export default About
