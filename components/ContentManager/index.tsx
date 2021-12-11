import React from "react"
import styled from "styled-components"
import BurgerMenu from "@/components/Burger/Menu"
import Footer from "../Footer"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile } from "@/src/constants"
import type { AppProps } from "next/app"

type WrapperProps = {
  hide: boolean
}

const Wrapper = styled.main<WrapperProps>`
  width: 100%;
  background-color: var(--bgColor);
  display: ${(props) => (props.hide ? "none" : "block")};
`

const Container = styled.div`
  margin-top: var(--header-height);
  width: 100%;
  font-size: 1rem;

  @media only screen and (max-width: 1340px) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 1230px) {
    font-size: 0.7rem;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 3vw;
  }
`

type ContentManagerProps = {
  appProps: AppProps
}

function ContentManager(props: ContentManagerProps) {
  const { Component, pageProps } = props.appProps
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)

  return (
    <>
      <Wrapper hide={burgerActive}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Wrapper>
      <Footer hide={burgerActive} />
      {burgerActive && <BurgerMenu />}
    </>
  )
}

export default ContentManager
