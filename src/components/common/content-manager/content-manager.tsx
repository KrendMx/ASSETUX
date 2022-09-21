import React, { useMemo, memo, useEffect, useRef } from "react"
import { useRouter } from "next/router"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setBurgerActive, setConfigureActive } from "@/lib/redux/ui"

import BurgerMenu from "@/components/menus/burger"
import ConfigureMenu from "@/components/menus/configure"
import Footer from "@/components/common/footer"
import { ContentManagerProps } from "./types.content-manager"
import { Container, Wrapper } from "./styles"

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
