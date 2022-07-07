import React from "react"
import { NextSeo } from "next-seo"
import dynamic from "next/dynamic"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import FormGroup from "@/components/Home/FormGroup"
import Investments from "@/components/Home/Investments"
import NewsRoom from "@/shared/NewsRoom"
import AboutUs from "@/components/Home/AboutUs"
import CryptoManager from "@/components/CryptoManager"
import QueryController from "@/components/Home/QueryController"
import Orders from "@/components/Home/Orders"

import { mobile, mobileLayoutForTablet } from "@/utils/constants"
import { getDefaultMetaTags } from "@/utils/seo"

import { BackendClient } from "@/backend/clients"

import type { GetStaticProps } from "next"
import type { PostData } from "@/backend/main/types"

const CryptoSlide = dynamic(() => import("@/components/Home/CryptoSlide"))
const CryptoExplorer = dynamic(() => import("@/components/Home/CryptoExplorer"))

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
        <Investments />
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
  const response = await BackendClient.getNews({ category: "news" })

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