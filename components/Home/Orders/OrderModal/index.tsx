import React, { useMemo } from "react"
import { useTranslation } from "next-i18next"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"
import Image from "next/image"
import { capitalizeString, ellipsisString } from "@/src/helpers"
import { mapCurrency, isCurrencyDeclared } from "@/src/currencies"

import Title from "@/shared/ModalComponents/Title"
import Shadow from "@/shared/ModalComponents/Shadow"
import Icon from "@/shared/ModalComponents/Icon"

import BlockchainContainer from "./BlockchainContainer"
import CloseBar from "./CloseBar"
import Close from "./Close"
import Colored from "./Colored"
import Container from "./Container"
import DataContainer from "./DataContainer"
import {
  PairIconsContainer,
  MobilePairIconsContainer,
  RelativeIcon,
  FrontIcon,
  BackgroundIcon,
  BlockchainIcon,
  BlockchainIconContainer
} from "./Icons"
import PairContainer from "./PairContainer"

import Table from "@/shared/Table"
import Cards from "../../CryptoExplorer/Cards"

import { optimizeRemoteImages } from "@/src/constants"

import type { OrderInfo } from "./types"
import type { TFunction } from "next-i18next"

const wheelPreventer = (event: React.WheelEvent<HTMLDivElement>) => {
  const target = event.currentTarget

  const scrolledToEnd =
    target.offsetHeight + target.scrollTop >= target.scrollHeight
  const scrolledToStart = target.scrollTop == 0

  const direction = event.deltaY < 0 ? "top" : "down"

  if (
    (direction == "down" && !scrolledToEnd) ||
    (direction == "top" && !scrolledToStart)
  ) {
    event.stopPropagation()
  }
}

let startY: number | null = null

const touchStart = (event: React.TouchEvent<HTMLDivElement>) => {
  startY = event.touches[0].clientY
}

const touchPreventer = (event: React.TouchEvent<HTMLDivElement>) => {
  if (!startY) {
    return
  }

  const target = event.currentTarget

  const direction = event.touches[0].clientY - startY > 0 ? "top" : "down"

  const scrolledToEnd =
    target.offsetHeight + target.scrollTop >= target.scrollHeight
  const scrolledToStart = target.scrollTop == 0

  if (
    (direction == "down" && !scrolledToEnd) ||
    (direction == "top" && !scrolledToStart)
  ) {
    event.stopPropagation()
  }
}

type OrderModalProps = {
  orders: OrderInfo[]
}

const tableHeadings = (t: TFunction) => [
  { value: "" },
  { value: "" },
  {
    value: t("home:orders_pair"),
    sortFn: (a: JSX.Element, b: JSX.Element) => {
      const sortInfo1 = a.props["data-sort"]
      const sortInfo2 = b.props["data-sort"]

      if (sortInfo1 && sortInfo2) {
        return sortInfo1 > sortInfo2 ? 1 : a < b ? -1 : 0
      }

      return 0
    }
  },
  {
    value: t("home:orders_network"),
    sortFn: (a: JSX.Element | string, b: JSX.Element | string) => {
      if (typeof a == "string" || typeof b == "string") {
        return 0
      }

      const sortInfo1 = a.props["data-sort"]
      const sortInfo2 = b.props["data-sort"]

      if (sortInfo1 && sortInfo2) {
        return sortInfo1 > sortInfo2 ? 1 : a < b ? -1 : 0
      }

      return 0
    }
  },
  {
    value: t("home:orders_email"),
    sortFn: (a: JSX.Element, b: JSX.Element) => {
      const sortInfo1 = a.props["data-sort"]
      const sortInfo2 = b.props["data-sort"]

      if (sortInfo1 && sortInfo2) {
        return sortInfo1 > sortInfo2 ? 1 : a < b ? -1 : 0
      }

      return 0
    }
  },
  {
    value: t("home:orders_sent"),
    sortFn: (a: string, b: string) => parseFloat(a) - parseFloat(b)
  },
  {
    value: t("home:orders_got"),
    sortFn: (a: string, b: string) => parseFloat(a) - parseFloat(b)
  }
]

const cardNames = (t: TFunction) => [
  "",
  "",
  t("home:orders_pair"),
  t("home:orders_network"),
  t("home:orders_email"),
  t("home:orders_sent"),
  t("home:orders_got")
]

function OrderModal({ orders }: OrderModalProps) {
  const { t } = useTranslation("home")

  const dispatch = useAppDispatch()
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const isMobileLayoutForTablet = useAppSelector(
    (state) => state.ui.isMobileLayoutForTablet
  )
  const availableBlockchains = useAppSelector(
    (state) => state.crypto.availableBlockchains
  )

  const processedOrders = useMemo(
    () =>
      orders.map((order) => {
        const blockchain = availableBlockchains?.find(
          (blockchain) => blockchain.chain_id == order.chainId
        )

        return [
          <Colored
            key={order.id + "_colored-status"}
            colorIn={order.buy ? "green" : "red"}
            split={!isMobileLayoutForTablet && !isMobile}
          >
            <span>
              {order.buy ? "Buy" : "Sell"}:
              {(isMobileLayoutForTablet || isMobile) && " "}
            </span>
            <span>{capitalizeString(order.status.split(":")[0])}</span>
          </Colored>,
          <PairIconsContainer key={order.id + "_pairIcons"}>
            <BackgroundIcon>
              {order.buy ? (
                isCurrencyDeclared(order.curIn) ? (
                  mapCurrency(order.curIn)
                ) : (
                  ""
                )
              ) : (
                <RelativeIcon>
                  <Image
                    src={order.tokenLogo}
                    layout="fill"
                    alt={order.curOut}
                    unoptimized={!optimizeRemoteImages}
                  />
                </RelativeIcon>
              )}
            </BackgroundIcon>
            <FrontIcon>
              {order.buy ? (
                <RelativeIcon>
                  <Image
                    src={order.tokenLogo}
                    layout="fill"
                    alt={order.curOut}
                    unoptimized={!optimizeRemoteImages}
                  />
                </RelativeIcon>
              ) : isCurrencyDeclared(order.curOut) ? (
                mapCurrency(order.curOut)
              ) : (
                ""
              )}
            </FrontIcon>
          </PairIconsContainer>,
          <PairContainer
            key={order.id + "_pair"}
            data-sort={order.curIn + order.curOut}
          >
            <span>{order.curIn + " / " + order.curOut}</span>
            <MobilePairIconsContainer>
              <BackgroundIcon>
                {order.buy ? (
                  isCurrencyDeclared(order.curIn) ? (
                    mapCurrency(order.curIn)
                  ) : (
                    ""
                  )
                ) : (
                  <RelativeIcon>
                    <Image
                      src={order.tokenLogo}
                      layout="fill"
                      alt={order.curOut}
                      unoptimized={!optimizeRemoteImages}
                    />
                  </RelativeIcon>
                )}
              </BackgroundIcon>
              <FrontIcon>
                {order.buy ? (
                  <RelativeIcon>
                    <Image
                      src={order.tokenLogo}
                      layout="fill"
                      alt={order.curOut}
                      unoptimized={!optimizeRemoteImages}
                    />
                  </RelativeIcon>
                ) : isCurrencyDeclared(order.curOut) ? (
                  mapCurrency(order.curOut)
                ) : (
                  ""
                )}
              </FrontIcon>
            </MobilePairIconsContainer>
          </PairContainer>,
          blockchain ? (
            <BlockchainContainer
              title={blockchain.title}
              key={order.id + "_bc-title"}
              data-sort={blockchain.title}
            >
              <span>{ellipsisString(blockchain.title, 14)}</span>
              <BlockchainIconContainer>
                <BlockchainIcon>
                  <Image
                    src={blockchain.logo}
                    layout="fill"
                    alt={blockchain.title}
                  />
                </BlockchainIcon>
              </BlockchainIconContainer>
            </BlockchainContainer>
          ) : (
            ""
          ),
          <span
            key={order.id + "_email"}
            title={order.email}
            data-sort={order.email}
          >
            {ellipsisString(order.email, 17)}
          </span>,
          order.amountIn.toFixed(2) + " " + order.curIn,
          order.amountOut.toFixed(2) + " " + order.curOut
        ]
      }),
    [orders, availableBlockchains, isMobileLayoutForTablet, isMobile]
  )

  return (
    <Container
      onWheel={(event) => {
        isMobileLayoutForTablet && wheelPreventer(event)
      }}
      onTouchStart={(event) => {
        isMobileLayoutForTablet && touchStart(event)
      }}
      onTouchMove={(event) => {
        isMobileLayoutForTablet && touchPreventer(event)
      }}
    >
      <Close onClick={() => dispatch(setOrdersActive(false))}>
        <CloseBar />
        <CloseBar />
      </Close>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Operations.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t("home:orders_myOperations")}</span>
      </Title>

      <DataContainer
        onWheel={(event) => {
          !isMobileLayoutForTablet && wheelPreventer(event)
        }}
        onTouchStart={(event) => {
          !isMobileLayoutForTablet && touchStart(event)
        }}
        onTouchMove={(event) => {
          !isMobileLayoutForTablet && touchPreventer(event)
        }}
      >
        {isMobileLayoutForTablet || isMobile ? (
          <Cards
            data={processedOrders}
            rowNames={cardNames(t)}
            mobile={isMobile}
            withPagination={false}
            withButtons={false}
          />
        ) : (
          <Table
            customHeadings={tableHeadings(t)}
            data={processedOrders}
            withPagination={false}
            collapseCols={[2]}
            withoutShadow
          />
        )}
      </DataContainer>
    </Container>
  )
}

export default OrderModal
