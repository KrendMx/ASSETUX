if (process.env.NODE_ENV === "development") {
  import("preact/devtools")
  // @ts-ignore
  import("preact/debug")
}

import React from "react"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import { appWithTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { SkeletonTheme } from "react-loading-skeleton"

import wrapper from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import {
  setMobile,
  setTablet,
  setDesktop,
  setBurgerActive,
  setMobileLayoutForTablet,
  setAppLoaded,
  setLanguageCurrencyActive
} from "@/src/redux/uiSlice"

import Header from "@/src/components/Header"
import ContentManager from "@/src/components/ContentManager"

import GlobalStyles from "@/src/styles/GlobalStyles"

import { mobile, tablet, mobileLayoutForTablet } from "@/src/utils/constants"
import { checkCurrency } from "@/src/utils/currencies"
import { useMount } from "@/src/utils/hooks"

import type { AppProps } from "next/app"

import "react-loading-skeleton/dist/skeleton.css"
import "core-js/features/array/at"
import "@/src/styles/fonts.css"

const ScrollButton = dynamic(() => import("@/src/components/ScrollButton"), {
  ssr: false
})

function MyApp(props: AppProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isCommercePayment = router.pathname == "/payment/[id]"

  useMount(() => {
    const closeMenus = () => {
      dispatch(setBurgerActive(false))
      dispatch(setLanguageCurrencyActive(false))
    }

    const handleRouteChange = () => {
      console.log("[App] Route change")
    }

    const handleRouteComplete = () => {
      console.log("[App] Route change complete")
      closeMenus()
    }

    const handleRouteError = () => {
      console.log("[App] Route change error")
      closeMenus()
    }

    const handleResize = () => {
      if (window.innerWidth <= mobile) {
        dispatch(setMobile())
      } else if (window.innerWidth <= mobileLayoutForTablet) {
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

    const handleOnLoad = () => {
      console.log("[App] Page loaded")
      dispatch(setAppLoaded())
    }

    const alreadyLoaded = document.readyState == "complete"

    if (alreadyLoaded) {
      handleOnLoad()
    } else {
      window.onload = handleOnLoad
    }

    window.addEventListener("resize", handleResize)

    handleResize()
    checkCurrency(dispatch)

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
  })

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="manifest" href={`/manifests/${router.locale}.json`} />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <DefaultSeo title="ASSETUX" />
      {!isCommercePayment && <Header />}
      <SkeletonTheme borderRadius={10}>
        <ContentManager appProps={props} />
      </SkeletonTheme>
      <ScrollButton />
      <GlobalStyles />
    </>
  )
}

export default appWithTranslation(wrapper.withRedux(MyApp))
