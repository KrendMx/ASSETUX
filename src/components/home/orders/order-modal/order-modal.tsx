import React, { useMemo, useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import { useRouter } from "next/router"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setOrdersActive } from "@/lib/redux/ui"
import { setSellOrderId, swapAction } from "@/lib/redux/crypto"

import { capitalizeString, ellipsisString } from "@/lib/utils/helpers"
import { getFormattedDate } from "@/lib/utils/date"
import { mapCurrency, isCurrencyDeclared } from "@/lib/data/currencies"

import Title from "@/components/common/modal-components/Title"
import Shadow from "@/components/common/modal-components/Shadow"
import Icon from "@/components/common/modal-components/Icon"
import Pages from "@/components/common/pagination"

import {
  PairIconsContainer,
  MobilePairIconsContainer,
  RelativeIcon,
  FrontIcon,
  BackgroundIcon,
  BlockchainIcon,
  BlockchainIconContainer
} from "./icons"
import {
  BlockchainContainer,
  Colored,
  PairContainer,
  Close,
  CloseBar,
  Container,
  StatusColored,
  Action,
  PagesContainer
} from "./styles"

import Table from "@/components/common/table"
import Cards from "@/components/common/cards"

import { optimizeRemoteImages, cardsPerPage } from "@/lib/data/constants"

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

const tableHeadings = (t: TFunction) => [
  {
    value: t("home:orders_request"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  { value: "" },
  {
    value: t("home:orders_pair"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: t("home:orders_network"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: t("home:orders_sent"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:orders_got"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:orders_date"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:orders_status"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: ""
  }
]

const cardNames = (t: TFunction) => [
  t("home:orders_request"),
  "",
  t("home:orders_pair"),
  t("home:orders_network"),
  t("home:orders_sent"),
  t("home:orders_got"),
  t("home:orders_date"),
  t("home:orders_status")
]

type OrderModalProps = {
  orders: OrderInfo[]
  email: string | null
  onClose?: () => void
}

function OrderModal({ orders, email, onClose }: OrderModalProps) {
  const { t } = useTranslation("home")
  const router = useRouter()

  const dispatch = useAppDispatch()
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const isMobileLayoutForTablet = useAppSelector(
    (state) => state.ui.isMobileLayoutForTablet
  )
  const availableBlockchains = useAppSelector(
    (state) => state.crypto.availableBlockchains
  )

  const [currentPage, setCurrentPage] = useState(1)

  const processedOrders = useMemo(
    () =>
      orders.map((order) => {
        const blockchain = availableBlockchains?.find(
          (blockchain) => blockchain.chain_id == order.chainId
        )

        return [
          {
            value: (
              <Colored
                key={order.id + "_request"}
                colorIn={order.buy ? "green" : "red"}
              >
                <span>{order.buy ? t("orders_buy") : t("orders_sell")}</span>
              </Colored>
            ),
            sortValue: order.buy ? "buy" : "sell"
          },
          {
            value: (
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
              </PairIconsContainer>
            )
          },
          {
            value: (
              <PairContainer key={order.id + "_pair"}>
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
              </PairContainer>
            ),
            sortValue: order.curIn + order.curOut
          },
          {
            value: blockchain ? (
              <BlockchainContainer
                title={blockchain.title}
                key={order.id + "_bc-title"}
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
            sortValue: blockchain ? blockchain.title : ""
          },
          {
            value: order.amountIn.toFixed(2) + " " + order.curIn,
            sortValue: order.amountIn
          },
          {
            value: order.amountOut.toFixed(2) + " " + order.curOut,
            sortValue: order.amountOut
          },
          {
            value: (
              <span key={order.id + "_date"}>
                {getFormattedDate(order.date, router.locale!)}
              </span>
            ),
            sortValue: new Date(order.date).valueOf()
          },
          {
            value: (
              <StatusColored status={order.status} key={order.id + "_status"}>
                {capitalizeString(t("orders_" + order.status))}
              </StatusColored>
            ),
            sortValue: order.status
          },
          {
            value:
              order.status == "pending" && !order.buy ? (
                <Action
                  key={order.id + "_action"}
                  as="button"
                  onClick={() => {
                    dispatch(setSellOrderId(order.orderId))
                    dispatch(setOrdersActive(false))
                    dispatch(swapAction("SELL"))
                  }}
                >
                  {t("orders_continue")}
                </Action>
              ) : null
          }
        ]
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      orders,
      availableBlockchains,
      isMobileLayoutForTablet,
      isMobile,
      router.locale
    ]
  )

  const pages = useMemo(
    () =>
      Math.ceil(
        processedOrders.length /
          (isMobileLayoutForTablet
            ? isMobile
              ? cardsPerPage
              : cardsPerPage * 2
            : 5)
      ),
    [processedOrders, isMobileLayoutForTablet, isMobile]
  )

  return (
    <Container
      onWheel={(event) =>
        (isMobileLayoutForTablet || isMobile) && wheelPreventer(event)
      }
      onTouchStart={(event) =>
        (isMobileLayoutForTablet || isMobile) && touchStart(event)
      }
      onTouchMove={(event) =>
        (isMobileLayoutForTablet || isMobile) && touchPreventer(event)
      }
    >
      <Close onClick={onClose}>
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
        <span>
          {t("home:orders_myOperations")} - {email}
        </span>
      </Title>

      {isMobileLayoutForTablet || isMobile ? (
        <Cards
          data={processedOrders}
          rowNames={cardNames(t)}
          mobile={isMobile}
          buttons={[
            (dataIndex) => {
              const order = orders[dataIndex]

              if (order.buy || order.status != "pending") {
                return null
              }

              return (
                <Action
                  onClick={() => {
                    dispatch(setSellOrderId(order.orderId))
                    dispatch(setOrdersActive(false))
                    dispatch(swapAction("SELL"))
                  }}
                >
                  {t("orders_continue")}
                </Action>
              )
            }
          ]}
          currentPage={currentPage}
          withPagination
        />
      ) : (
        <Table
          customHeadings={tableHeadings(t)}
          data={processedOrders}
          collapseCols={[3, 9]}
          currentPage={currentPage}
          tablePaddings="43px 21px 0"
          withPagination
          withoutShadow
        />
      )}

      <PagesContainer>
        <Pages
          pages={pages}
          currentPage={currentPage}
          hidePerPageValues={isMobileLayoutForTablet}
          setCurrentPage={setCurrentPage}
        />
      </PagesContainer>
    </Container>
  )
}

export default OrderModal
