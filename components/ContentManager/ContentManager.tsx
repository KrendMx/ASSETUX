import React, { useMemo, memo, useEffect, useRef } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setBurgerActive, setLanguageCurrencyActive } from "@/src/redux/uiSlice"

import { mobile } from "@/src/constants"

import BurgerMenu from "@/components/Menus/Burger"
import LanguageCurrencyMenu from "@/components/Menus/LanguageCurrency"
import Footer from "@/components/Footer"

import type { AppProps } from "next/app"

type WrapperProps = {
  hide: boolean
}

const Wrapper = styled.main<WrapperProps>`
  width: 100%;
  background-color: var(--bgColor);
  display: ${(props) => (props.hide ? "none" : "block")};
`

type ContainerProps = {
  resetMargins?: boolean
}

const Container = styled.div<ContainerProps>`
  margin-top: ${(props) => (props.resetMargins ? 0 : "var(--header-height)")};
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
  const router = useRouter()
  const dispatch = useAppDispatch()
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const languageCurrencyActive = useAppSelector(
    (state) => state.ui.languageCurrencyActive
  )
  const lastActive = useRef<"burger" | "languageCurrency" | null>(null)

  const isCommercePayment = router.pathname == "/payment/[id]"

  useEffect(() => {
    if (burgerActive && languageCurrencyActive) {
      if (lastActive.current == "burger") {
        dispatch(setBurgerActive(false))
      } else {
        dispatch(setLanguageCurrencyActive(false))
      }
    } else {
      if (burgerActive) {
        lastActive.current = "burger"
      } else if (languageCurrencyActive) {
        lastActive.current = "languageCurrency"
      }
    }
  }, [burgerActive, languageCurrencyActive, dispatch])

  const MemoizedComponent = useMemo(
    () => <Component {...pageProps} />,
    [pageProps, Component]
  )

  return (
    <>
      <Wrapper hide={burgerActive || (languageCurrencyActive && isMobile)}>
        <Container resetMargins={isCommercePayment}>
          {MemoizedComponent}
        </Container>
      </Wrapper>
      <MemoizedFooter
        hide={
          burgerActive ||
          (languageCurrencyActive && isMobile) ||
          isCommercePayment
        }
      />
      {burgerActive && <BurgerMenu />}
      {languageCurrencyActive && isMobile && <LanguageCurrencyMenu />}
    </>
  )
}

export default ContentManager
