import React, { useEffect } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import FormGroup from "@/components/Home/FormGroup"
import CryptoSlide from "@/components/Home/CryptoSlide"
import CryptoExplorer from "@/components/Home/CryptoExplorer"
import NewsRoom from "@/components/Home/NewsRoom"
import AboutUs from "@/components/Home/AboutUs"
import { mobile, mobileLayoutForTablet } from "@/src/constants"
import { getBlockchains, getTokens } from "@/src/redux/cryptoSlice"
import type { GetStaticProps } from "next"

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

    padding: 44px 0 30px;
  }
`

function CryptoManager() {
  const dispatch = useAppDispatch()
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )

  useEffect(() => {
    dispatch(getBlockchains())
  }, [dispatch])

  useEffect(() => {
    if (selectedBlockchain) {
      dispatch(getTokens())
    }
  }, [selectedBlockchain, dispatch])

  return null
}

function Index() {
  return (
    <Container>
      <FormGroup />
      <CryptoSlide />
      <CryptoExplorer />
      <NewsRoom />
      <AboutUs />

      <CryptoManager />
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
