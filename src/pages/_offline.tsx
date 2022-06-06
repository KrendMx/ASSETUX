import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import AdaptiveFont from "@/src/shared/AdaptiveFont"
import { mobile } from "@/src/utils/constants"

import type { GetStaticProps } from "next"

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.33,
  tabletFactor: 1
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - var(--header-height));
`

const LogoWrapper = styled.div`
  width: 15.5em;
  height: 11em;
`

const Title = styled.h1`
  font-size: 2.578em;
  font-weight: 500;
  color: var(--black);
  margin: 0.92em 0 0.225em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 2em;
  }
`

const SubTitle = styled.h2`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  white-space: pre-line;
  text-align: center;
`

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 800 565"
    fill="none"
  >
    <path
      d="M0.544922 165.386L73.2227 238.043C253.827 57.49 546.719 57.49 727.323 238.043L800.001 165.386C579.424 -55.1286 221.485 -55.1286 0.544922 165.386ZM291.256 456.014L400.273 565L509.29 456.014C449.33 395.709 351.579 395.709 291.256 456.014ZM145.901 310.7L218.578 383.357C318.874 283.09 481.672 283.09 581.967 383.357L654.645 310.7C514.377 170.472 286.532 170.472 145.901 310.7Z"
      fill="#3A3A3A"
    />
    <path
      d="M408.29 438.023L406.708 507.117H393.129L391.481 438.023H408.29ZM391.02 528.309C391.02 525.843 391.811 523.779 393.393 522.12C395.019 520.415 397.26 519.563 400.116 519.563C402.929 519.563 405.148 520.415 406.774 522.12C408.4 523.779 409.213 525.843 409.213 528.309C409.213 530.686 408.4 532.727 406.774 534.432C405.148 536.091 402.929 536.921 400.116 536.921C397.26 536.921 395.019 536.091 393.393 534.432C391.811 532.727 391.02 530.686 391.02 528.309Z"
      fill="white"
    />
  </svg>
)

function Error() {
  const { t } = useTranslation("offline")
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>{t("title")}</Title>
      <SubTitle>{t("subtitle")}</SubTitle>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "offline",
        "routes"
      ]))
    }
  }
}

export default Error
