import React from "react"
import styled from "styled-components"
import BurgerMenu from "@/components/Burger/Menu"
import Footer from "../Footer"
import { useAppSelector } from "@/src/redux/hooks"
import type { AppProps } from "next/app"

const Container = styled.main`
  margin: var(--header-height) auto 0;
  max-width: var(--max-width);
  width: 100%;
  padding: 0 var(--paddings);
`

type ComponentManagerProps = {
  appProps: AppProps
}

function ContentManager(props: ComponentManagerProps) {
  const { Component, pageProps } = props.appProps
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)

  if (burgerActive) {
    return <BurgerMenu />
  }

  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  )
}

export default ContentManager
