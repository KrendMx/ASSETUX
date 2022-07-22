import React from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "@/lib/redux/hooks"
import { mapLanguage } from "./popup/languages"
import { mapCurrency } from "@/lib/data/currencies"
import { isLocaleDeclared } from "@/lib/data/locales"

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
