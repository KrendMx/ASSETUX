import React from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "@/src/redux/hooks"
import { mapLanguage } from "./Popup/Languages"
import { mapCurrency } from "./Popup/Currencies"
import { isLocaleDeclared } from "@/src/locales"

function DynamicValue() {
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const router = useRouter()
  const { locale: currentLocale } = router

  return (
    <span>
      {currentLocale &&
        isLocaleDeclared(currentLocale) &&
        mapLanguage(currentLocale)}{" "}
      / {mapCurrency(currentCurrency)}
    </span>
  )
}

export default DynamicValue
