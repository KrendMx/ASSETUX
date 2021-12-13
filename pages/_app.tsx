import React, { useEffect, useState } from "react"
import Head from "next/head"
import { appWithTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import wrapper from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import {
  setMobile,
  setTablet,
  setDesktop,
  setBurgerActive,
  setMobileLayoutForTablet
} from "@/src/redux/uiSlice"
import HeaderManager from "@/components/HeaderManager"
import ContentManager from "@/components/ContentManager"
import { mobile, tablet, mobileLaoyutForTablet } from "@/src/constants"
import { checkCurrency } from "@/src/currencies"
import { checkLocale } from "@/src/locales"
import "@/styles/globals.css"

// TODO:
// 1) Add preloader to prevent the LCP warning

const ScrollButton = dynamic(() => import("@/components/ScrollButton"), {
  ssr: false
})

function MyApp(props: AppProps) {
  const [appLoaded, setAppLoaded] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleRouteChange = () => {
      console.log("[App] Route change")
      dispatch(setBurgerActive(false))
    }

    const handleRouteComplete = () => {
      console.log("[App] Route change complete")
    }

    const handleRouteError = () => {
      console.log("[App] Route change error")
    }

    const handleResize = () => {
      if (window.innerWidth <= mobile) {
        dispatch(setMobile())
      } else if (window.innerWidth <= mobileLaoyutForTablet) {
        dispatch(setMobileLayoutForTablet())
        dispatch(setBurgerActive(false))
      } else if (window.innerWidth <= tablet) {
        dispatch(setTablet())
        dispatch(setBurgerActive(false))
      } else {
        dispatch(setDesktop())
        dispatch(setBurgerActive(false))
      }
    }

    window.onload = () => {
      console.log("[App] Page loaded")
      setAppLoaded(true)
    }

    window.addEventListener("resize", handleResize)

    handleResize()
    checkCurrency(dispatch)
    checkLocale(router)

    router.events.on("routeChangeStart", handleRouteChange)
    router.events.on("routeChangeComplete", handleRouteComplete)
    router.events.on("routeChangeError", handleRouteError)

    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
      router.events.off("routeChangeComplete", handleRouteComplete)
      router.events.off("routeChangeError", handleRouteError)
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Assetux</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <HeaderManager />
      <ContentManager appProps={props} />
      <ScrollButton />
    </>
  )
}

export default appWithTranslation(wrapper.withRedux(MyApp))
