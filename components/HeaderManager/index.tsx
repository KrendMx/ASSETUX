import React from "react"
import { useAppSelector } from "@/src/redux/hooks"
import Header from "../Header"
import MobileHeader from "../MobileHeader"

function HeaderManager() {
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  if (isMobile) {
    return <MobileHeader />
  }

  return <Header />
}

export default HeaderManager
