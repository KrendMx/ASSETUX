import React, { useMemo, memo, useEffect, useRef } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setBurgerActive, setConfigureActive } from "@/lib/redux/ui"

import { mobile } from "@/lib/data/constants"

import BurgerMenu from "@/components/menus/burger"
import ConfigureMenu from "@/components/menus/configure"
import Footer from "@/components/common/footer"

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

const ContentManager: React.FC<ContentManagerProps> = (props) => {
  const { Component, pageProps } = props.appProps
  const router = useRouter()
  const dispatch = useAppDispatch()
  const burgerActive = useAppSelector((state) => state.ui.burgerActive)
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const configureActive = useAppSelector((state) => state.ui.configureActive)
  const lastActive = useRef<"burger" | "languageCurrency" | null>(null)

  const isCommercePayment =
    router.pathname == "/payment/[id]" ||
    router.pathname == "/payment_listing/[token]"

  useEffect(() => {
    if (burgerActive && configureActive) {
      if (lastActive.current == "burger") {
        dispatch(setBurgerActive(false))
      } else {
        dispatch(setConfigureActive(false))
      }
    } else {
      if (burgerActive) {
        lastActive.current = "burger"
      } else if (configureActive) {
        lastActive.current = "languageCurrency"
      }
    }
  }, [burgerActive, configureActive, dispatch])

  const MemoizedComponent = useMemo(
    () => <Component {...pageProps} />,
    [pageProps, Component]
  )

  return (
    <>
      <Wrapper hide={burgerActive || (configureActive && isMobile)}>
        <Container resetMargins={isCommercePayment}>
          {MemoizedComponent}
        </Container>
      </Wrapper>
      <MemoizedFooter
        hide={
          burgerActive || (configureActive && isMobile) || isCommercePayment
        }
      />
      {burgerActive && <BurgerMenu />}
      {configureActive && isMobile && <ConfigureMenu />}
    </>
  )
}

export default ContentManager
