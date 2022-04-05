import React from "react"
import dynamic from "next/dynamic"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import FormGroup from "@/components/Home/FormGroup"
import Investments from "@/components/Home/Investments"
import NewsRoom from "@/components/Home/NewsRoom"
import AboutUs from "@/components/Home/AboutUs"
import CryptoManager from "@/components/Home/CryptoManager"
import QueryController from "@/components/Home/QueryController"
import Orders from "@/components/Home/Orders"

import { mobile, mobileLayoutForTablet } from "@/src/constants"

import type { GetStaticProps } from "next"

const CryptoSlide = dynamic(() => import("@/components/Home/CryptoSlide"))
const CryptoExplorer = dynamic(() => import("@/components/Home/CryptoExplorer"))

const Container = styled.div`
  width: 100%;
  padding: 74px 0;
  font-size: 1em;

  & > section {
    padding: 0 var(--paddings);
  }

  h1,
  h3 {
    font-size: 2.6em;
    color: var(--black);
  }

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
      margin-bottom: 48px;
    }

    padding: 44px 0 30px;
  }
`

function Index() {
  return (
    <Container>
      <FormGroup />
      <Investments />
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
