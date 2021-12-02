import React from "react"
import styled from "styled-components"
import BurgerMenu from "@/components/Burger/Menu"
import Footer from "../Footer"
import { useAppSelector } from "@/src/redux/hooks"
import type { AppProps } from "next/app"

type ContainerProps = {
  burgerActive: boolean
}

const Container = styled.main<ContainerProps>`
  margin-top: var(--header-height);
  display: ${(props) => (props.burgerActive ? "none" : "block")};
`

type ComponentManagerProps = {
  appProps: AppProps
}

function ContentManager(props: ComponentManagerProps) {
  const { Component, pageProps } = props.appProps
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)

  return (
    <>
      <Container burgerActive={burgerActive}>
        <Component {...pageProps} />
        <Footer />
      </Container>
      {burgerActive && <BurgerMenu />}
    </>
  )
}

export default ContentManager
