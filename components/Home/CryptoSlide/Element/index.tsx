import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Container from "./Container"
import InfoRow from "./InfoRow"
import InfoContainer from "./InfoContainer"
import IconContainer from "./IconContainer"
import ButtonRow from "./ButtonRow"
import ChangeContainer from "./ChangeContainer"
import GraphContainer from "./GraphContainer"
import ChangeLabel from "./ChangeLabel"
import ChangeInfo from "./ChangeInfo"
import SymbolIconContainer from "./SymbolIconContainer"
import { SellButton, BuyButton } from "./Button"
import Image from "next/image"
import { useAppSelector } from "@/src/redux/hooks"
import { optimizeRemoteImages, allowSkeletons } from "@/src/constants"
import Skeleton from "react-loading-skeleton"
import Graph from "./Graph"

import type { GraphData } from "./Graph"

type ElementProps = {
  icon?: string
  symbol?: string
  price?: string
  change24h?: number
  marketHistory?: GraphData[]
  onBuy?: () => void
  onSell?: () => void
}

function Element({
  icon,
  symbol,
  price,
  change24h,
  marketHistory,
  onBuy,
  onSell
}: ElementProps) {
  const { t } = useTranslation("home")

  const appLoaded = useAppSelector((state) => state.ui.appLoaded)
  const [active, setActive] = useState(false)

  const isLoading =
    allowSkeletons &&
    (!appLoaded || !icon || !symbol || !price || change24h == undefined)

  return (
    <Container
      active={active}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <InfoContainer>
        <InfoRow>
          <SymbolIconContainer>
            <IconContainer isLoading={isLoading}>
              {icon && (
                <Image
                  src={icon}
                  width={42}
                  height={42}
                  layout="responsive"
                  unoptimized={!optimizeRemoteImages}
                  alt="Icon"
                />
              )}
            </IconContainer>
            {!isLoading && <span>{symbol}</span>}
            {isLoading && <Skeleton width={80} />}
          </SymbolIconContainer>
          {!isLoading && <span>{price}</span>}
          {isLoading && <Skeleton width={75} />}
        </InfoRow>
        <GraphContainer>
          <ChangeContainer>
            <ChangeInfo up={change24h ? change24h >= 0 : false}>
              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                `${change24h && change24h >= 0 ? "+" : ""}${change24h?.toFixed(
                  2
                )}%`
              )}
            </ChangeInfo>
            <ChangeLabel>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                t("home:cryptoSlide_change")
              )}
            </ChangeLabel>
          </ChangeContainer>
          {change24h && (
            <Graph
              coords={marketHistory}
              color={
                change24h > 0
                  ? "var(--green)"
                  : change24h < 0
                  ? "var(--red)"
                  : "var(--gray)"
              }
            />
          )}
        </GraphContainer>
      </InfoContainer>
      <ButtonRow active={active}>
        <BuyButton onClick={() => !isLoading && onBuy && onBuy()}>
          {!isLoading ? (
            `${t("home:cryptoSlide_buy")} ${symbol}`
          ) : (
            <Skeleton width={90} />
          )}
        </BuyButton>
        <SellButton onClick={() => !isLoading && onSell && onSell()}>
          {!isLoading ? (
            `${t("home:cryptoSlide_sell")} ${symbol}`
          ) : (
            <Skeleton width={90} />
          )}
        </SellButton>
      </ButtonRow>
    </Container>
  )
}

export default Element
