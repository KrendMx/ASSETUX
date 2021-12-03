import React from "react"
import styled from "styled-components"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import FormGroup from "@/components/Home/FormGroup"
import CryptoSlide from "@/components/Home/CryptoSlide"
import CryptoExplorer from "@/components/Home/CryptoExplorer"
import NewsRoom from "@/components/Home/NewsRoom"
import AboutUs from "@/components/Home/AboutUs"
import type { GetStaticProps } from "next"

const Container = styled.div`
  width: 100%;
  padding: 74px 0;
  font-size: 1rem;

  h1,
  h2 {
    font-size: 2.6em;
    color: var(--black);
  }

  section:not(:last-child) {
    margin-bottom: 130px;
  }

  section:nth-last-child(2) {
    margin-bottom: 87px;
  }

  @media only screen and (max-width: 1100px) {
    font-size: 0.85rem;
  }

  @media only screen and (max-width: 960px) {
    section:not(:last-child),
    section:nth-last-child(2) {
      margin-bottom: 98px;
    }
  }

  @media only screen and (max-width: 550px) {
    padding: 24px 0;
  }

  @media only screen and (max-width: 410px) {
    font-size: 0.73rem;
  }

  @media only screen and (max-width: 355px) {
    font-size: 0.6rem;
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
