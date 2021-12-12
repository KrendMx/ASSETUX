import React, { useMemo, memo } from "react"
import styled from "styled-components"
import BurgerMenu from "@/components/Menus/Burger"
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

const MemoizedFooter = memo(Footer)

function ContentManager(props: ContentManagerProps) {
  const { Component, pageProps } = props.appProps
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const languageCurrencyActive = useAppSelector(
    (state) => state.ui.languageCurrencyActive
  )

  const MemoizedComponent = useMemo(
    () => <Component {...pageProps} />,
    [pageProps, Component]
  )

  return (
    <>
      <Wrapper hide={burgerActive || (languageCurrencyActive && isMobile)}>
        <Container>{MemoizedComponent}</Container>
      </Wrapper>
      <MemoizedFooter
        hide={burgerActive || (languageCurrencyActive && isMobile)}
      />
      {burgerActive && <BurgerMenu />}
    </>
  )
}

export default ContentManager
