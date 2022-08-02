import React from "react"
import { NextSeo } from "next-seo"
import dynamic from "next/dynamic"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/components/common/base-container"
import FormGroup from "@/components/home/form-group"
import Investments from "@/components/home/investments"
import NewsRoom from "@/components/common/news"
import AboutUs from "@/components/home/about-us"
import CryptoManager from "@/components/common/crypto-manager"
import QueryController from "@/components/home/query-controller"
import Orders from "@/components/home/orders"

import { mobile, mobileLayoutForTablet } from "@/lib/data/constants"
import { getDefaultMetaTags } from "@/lib/utils/seo"

import { BackendClient } from "@/lib/backend/clients"

import type { GetStaticProps } from "next"
import type { PostData } from "@/lib/backend/main/types"

const CryptoSlide = dynamic(() => import("@/components/home/crypto-slide"))
const CryptoExplorer = dynamic(
  () => import("@/components/home/crypto-explorer")
)

const Container = styled(BaseContainer)`
  & > section:not(:last-child) {
    margin-bottom: 6.84em;
  }

  & > section:first-child {
    margin-bottom: 7.89em;
  }

  & > section:nth-child(2) {
    margin-bottom: 7.31em;
  }

  & > section:nth-child(3) {
    margin-bottom: 8.63em;
  }

  & > section:nth-last-child(2) {
    margin-bottom: 3.57em;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    & > section:not(:last-child),
    & > section:nth-last-child(2) {
      margin-bottom: 7.4em;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > section:first-child {
      margin-bottom: 7em;
    }
  }
`

type IndexProps = {
  news: PostData[] | null
}

function Index({ news }: IndexProps) {
  const { t } = useTranslation("home")

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: t("title"),
          description: t("description"),
          pathname: ""
        })}
      />
      <Container>
        <FormGroup />
        {/* <Investments /> */}
        <CryptoSlide />
        <CryptoExplorer />
        {news && <NewsRoom news={news} />}
        <AboutUs />

        <Orders />

        <CryptoManager getToken getChart />
        <QueryController />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  locale
}) => {
  const response = await BackendClient.getNews({
    category: "news",
    lang: locale!
  })

  return {
    props: {
      news: response.state == "success" ? response.data.news : null,
      ...(await serverSideTranslations(locale!, [
        "common",
        "header",
        "footer",
        "home",
        "news",
        "routes",
        "inputSelect"
      ]))
    },
    revalidate: 3600
  }
}

export default Index
