import React from "react"
import dynamic from "next/dynamic"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import FormGroup from "@/components/Home/FormGroup"
import NewsRoom from "@/components/Home/NewsRoom"
import AboutUs from "@/components/Home/AboutUs"
import CryptoManager from "@/components/Home/CryptoManager"
import QueryController from "@/components/Home/QueryController"
import Orders from "@/components/Home/Orders"
import WrapperContainer from "@/shared/WrapperContainer";

import { mobile, mobileLayoutForTablet } from "@/src/constants"

import type { GetStaticProps } from "next"

const CryptoSlide = dynamic(() => import("@/components/Home/CryptoSlide"))
const CryptoExplorer = dynamic(() => import("@/components/Home/CryptoExplorer"))

const Container = styled(WrapperContainer)`
  & > section:not(:last-child) {
    margin-bottom: 130px;
  }

  & > section:first-child {
    margin-bottom: 111px;
  }

  & > section:nth-child(2) {
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
      margin-bottom: 48px;
    }
  }
`

function Index() {
  return (
    <Container>
      <FormGroup />
      <CryptoSlide />
      <CryptoExplorer />
      <NewsRoom />
      <AboutUs />

      <Orders />

      <CryptoManager />
      <QueryController />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "home",
        "routes"
      ]))
    }
  }
}

export default Index
