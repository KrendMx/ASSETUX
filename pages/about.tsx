import React from "react"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import Intro from "@/components/About/Intro"
import Info from "@/components/About/Info"

import BackendClient from "@/src/BackendClient"

import type { GetStaticProps } from "next"
import type { NewsData } from "@/src/BackendClient/types"

const Container = styled(BaseContainer)`
  & > section:first-child {
    margin-bottom: 167px;
  }

  & > section::nth-child(2) {
    margin-bottom: 155px;
  }

  & > section:nth-child(3) {
    margin-bottom: 196px;
  }

  & > section:nth-child(4) {
    margin-bottom: 135px;
  }

  & > section:nth-child(5) {
    margin-bottom: 130px;
  }
`

type AboutProps = {
  news: NewsData[] | null
}

function About({ news }: AboutProps) {
  return (
    <Container>
      <Intro />
      <Info />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async ({
  locale
}) => {
  const response = await BackendClient.getNews()

  return {
    props: {
      news: response.data ? response.data : null,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "about",
        "routes"
      ]))
    }
  }
}

export default About
