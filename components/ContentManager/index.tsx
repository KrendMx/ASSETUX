import React from "react"
import styled from "styled-components"
import BurgerMenu from "@/components/Burger/Menu"
import Footer from "../Footer"
import { useAppSelector } from "@/src/redux/hooks"
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
  max-width: var(--max-width);
  width: 100%;
  margin: var(--header-height) auto 0;
  padding: 0 var(--paddings);
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
