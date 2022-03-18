import React, { useMemo } from "react"
import { useTranslation } from "next-i18next"
import styled, { css } from "styled-components"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"
import Image from "next/image"
import { capitalizeString, ellipsisString } from "@/src/helpers"

import Title from "@/shared/ModalComponents/Title"
import Shadow from "@/shared/ModalComponents/Shadow"
import Icon from "@/shared/ModalComponents/Icon"

import Table from "@/shared/Table"
import Cards from "../../CryptoExplorer/Cards"

import { mobileLayoutForTablet } from "@/src/constants"

import type { OrderInfo } from "./types"
import type { TFunction } from "next-i18next"

const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px 25px;
  background: var(--white);
  position: fixed;
  overflow-y: hidden;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow-y: auto;
  }
`

const DataContainer = styled.div`
  max-height: 550px;
  overflow-y: auto;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    max-height: none;
    overflow-y: visible;
  }
`

type ColoredProps = {
  colorIn: "red" | "green"
  split?: boolean
}

const Colored = styled.span<ColoredProps>`
  color: ${(props) => (props.colorIn == "red" ? "var(--red)" : "var(--green)")};
  text-align: left;
  font-weight: 500;

  ${(props) =>
    props.split &&
    css`
      & > span {
        display: block;
      }
    `}

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 1.07em;
    display: block;
    margin-bottom: 0.5em;
  }
`

const Close = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 15px;
  top: 15px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;

  & > span:first-child {
    transform: rotate(-135deg);
  }

  & > span:last-child {
    transform: rotate(-45deg);
  }
`

const CloseBar = styled.span`
  position: absolute;
  left: 5px;
  top: 14px;
  width: 19px;
  height: 2px;
  display: block;
  background: var(--black);
`

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
  { value: t("home:orders_pair") },
  { value: t("home:orders_network") },
  { value: t("home:orders_email") },
  { value: t("home:orders_sent") },
  { value: t("home:orders_got") }
]

const cardNames = (t: TFunction) => [
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
          order.curIn + " / " + order.curOut,
          blockchain ? (
            <span title={blockchain.title} key={order.id + "_bc-title"}>
              {ellipsisString(blockchain.title, 14)}
            </span>
          ) : (
            ""
          ),
          <span key={order.id + "_email"} title={order.email}>
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
            withoutShadow
          />
        )}
      </DataContainer>
    </Container>
  )
}

export default OrderModal
