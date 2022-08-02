import React from "react"
import styled from "styled-components"
import { NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/components/common/base-container"
import Intro from "@/components/about/intro"
import Info from "@/components/about/info"
import Investments from "@/components/about/investments"
import Contacts from "@/components/about/contacts"
import NewsRoom from "@/components/common/news"

import { BackendClient } from "@/lib/backend/clients"
import { getDefaultMetaTags } from "@/lib/utils/seo"

import type { GetStaticProps } from "next"
import type { PostData } from "@/lib/backend/main/types"

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
  const { t } = useTranslation("about")

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          title: t("title"),
          description: t("description"),
          pathname: "/about"
        })}
      />
      <Container>
        <Intro />
        <Info />
        {/* <Investments /> */}
        <Contacts />
        {news && <NewsRoom news={news} />}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async ({
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
        "header",
        "footer",
        "about",
        "news",
        "routes"
      ]))
    },
    revalidate: 3600
  }
}

export default About
