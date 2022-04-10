import React from "react"
import dynamic from "next/dynamic"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import FormGroup from "@/components/Home/FormGroup"
import Investments from "@/components/Home/Investments"
import NewsRoom from "@/shared/NewsRoom"
import AboutUs from "@/components/Home/AboutUs"
import CryptoManager from "@/components/Home/CryptoManager"
import QueryController from "@/components/Home/QueryController"
import Orders from "@/components/Home/Orders"

import { mobile, mobileLayoutForTablet } from "@/src/constants"

import BackendClient from "@/src/BackendClient"

import type { GetStaticProps } from "next"
import type { NewsData } from "@/src/BackendClient/types"

const CryptoSlide = dynamic(() => import("@/components/Home/CryptoSlide"))
const CryptoExplorer = dynamic(() => import("@/components/Home/CryptoExplorer"))

const Container = styled(BaseContainer)`
  & > section:not(:last-child) {
    margin-bottom: 130px;
  }

  & > section:first-child {
    margin-bottom: 150px;
  }

  & > section:nth-child(2) {
    margin-bottom: 139px;
  }

  & > section:nth-child(3) {
    margin-bottom: 164px;
  }

  & > section:nth-last-child(2) {
    margin-bottom: 68px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    & > section:not(:last-child),
    & > section:nth-last-child(2) {
      margin-bottom: 98px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > section:first-child {
      margin-bottom: 70px;
    }
  }
`

type IndexProps = {
  news: NewsData[] | null
}

function Index({ news }: IndexProps) {
  return (
    <Container>
      <FormGroup />
      <Investments />
      <CryptoSlide />
      <CryptoExplorer />
      {news && <NewsRoom news={news} />}
      <AboutUs />

      <Orders />

      <CryptoManager />
      <QueryController />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  locale
}) => {
  const response = await BackendClient.getNews()

  return {
    props: {
      news: response.data ? response.data : null,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "home",
        "news",
        "routes"
      ]))
    }
  }
}

export default Index
