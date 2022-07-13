import React from "react"
import Skeleton from "react-loading-skeleton"
import { useTranslation } from "next-i18next"

import { selectShowSkeleton } from "@/lib/redux/ui/selectors"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { swapAction } from "@/lib/redux/crypto"

import { Container, SkeletonContainer, SellButton, BuyButton } from "./styles"

function Buttons() {
  const { t } = useTranslation("home")

  const dispatch = useAppDispatch()
  const showSkeleton = useAppSelector(selectShowSkeleton)
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const action = useAppSelector((state) => state.crypto.action)

  const isBuy = action == "BUY"

  return (
    <Container>
      <BuyButton
        active={isBuy}
        onClick={() => !showSkeleton && dispatch(swapAction("BUY"))}
      >
        {!showSkeleton ? (
          isMobile ? (
            t("form_buyCompact")
          ) : (
            t("form_buy")
          )
        ) : (
          <SkeletonContainer>
            <Skeleton />
          </SkeletonContainer>
        )}
      </BuyButton>
      <SellButton
        active={!isBuy}
        onClick={() => !showSkeleton && dispatch(swapAction("SELL"))}
      >
        {!showSkeleton ? (
          isMobile ? (
            t("form_sellCompact")
          ) : (
            t("form_sell")
          )
        ) : (
          <SkeletonContainer>
            <Skeleton />
          </SkeletonContainer>
        )}
      </SellButton>
    </Container>
  )
}

export default Buttons
