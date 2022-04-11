import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import Help from "../Help"
import { Container, ExchangeHelp, ExchangeStat } from "./styles"

type ExchangeProps = {
  token: string | null
  currency: string | null
  rate: number | null
  isLoading: boolean
  margins?: boolean
}

function Exchange({
  token,
  currency,
  rate,
  isLoading,
  margins
}: ExchangeProps) {
  const { t } = useTranslation("home")

  const [hovered, setHovered] = useState(false)

  return (
    <Container margins={margins}>
      {!isLoading ? (
        <>
          <ExchangeStat>
            1 {token} = {rate} {currency}
          </ExchangeStat>
          <ExchangeHelp onMouseEnter={() => {}} onMouseLeave={() => {}}>
            {t("home:exchange_fees")}
          </ExchangeHelp>
          {hovered && <Help offsetY={14}>{t("home:exchange_help")}</Help>}
        </>
      ) : (
        <Skeleton containerClassName="skeletonFlexContainer" />
      )}
    </Container>
  )
}

export default Exchange
