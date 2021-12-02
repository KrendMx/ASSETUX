import React, { useEffect } from "react"
import Head from "next/head"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Provider } from "react-redux"
import store from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import { setMobile, setBurgerActive } from "@/src/redux/uiSlice"
import HeaderManager from "@/components/HeaderManager"
import ContentManager from "@/components/ContentManager"
import "@/styles/globals.css"

function MyApp(props: AppProps) {
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

    const handleResize = (event: UIEvent) => {
      if ((event.target as Window).innerWidth < 550) {
        dispatch(setMobile(true))
      } else {
        dispatch(setMobile(false))
      }
    }

    window.onload = () => {
      console.log("[App] Page loaded")
    }

    window.addEventListener("resize", handleResize)

    if (window.innerWidth < 550) {
      dispatch(setMobile(true))
    }

    router.events.on("routeChangeStart", handleRouteChange)
    router.events.on("routeChangeComplete", handleRouteComplete)
    router.events.on("routeChangeError", handleRouteError)

    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
      router.events.off("routeChangeComplete", handleRouteComplete)
      router.events.off("routeChangeError", handleRouteError)
      window.removeEventListener("resize", handleResize)
    }
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
    </>
  )
}

function Wrapper(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  )
}

export default Wrapper
