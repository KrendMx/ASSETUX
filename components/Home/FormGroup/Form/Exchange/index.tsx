import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import styled from "styled-components"
import ExchangeStat from "./ExchangeStat"
import ExchangeHelp from "./ExchangeHelp"
import Help from "../Help"
import { mobile } from "@/src/constants"
import Skeleton from "react-loading-skeleton"

type ContainerProps = {
  margins?: boolean
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${(props) => (props.margins ? "15px 0 14px" : "0px")};
  font-size: 0.8em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.865em;
    margin: ${(props) => (props.margins ? "11px 0" : "0px")};
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

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
