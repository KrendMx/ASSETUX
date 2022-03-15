import React, { useMemo, useEffect } from "react"
import styled, { css } from "styled-components"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"
import Image from "next/image"

import Title from "@/shared/ModalComponents/Title"
import Shadow from "@/shared/ModalComponents/Shadow"
import Icon from "@/shared/ModalComponents/Icon"

import Table from "@/shared/Table"
import Cards from "../../CryptoExplorer/Cards"

import { mobileLayoutForTablet } from "@/src/constants"

import type { SellOrderInfo } from "@/src/BackendClient/types"

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

const getPair = (order: SellOrderInfo) => {
  return `${order.cur_in.symbol} / ${order.cur_out.currency}`
}

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
  orders: SellOrderInfo[]
}

const tableHeadings = [
  { value: "" },
  { value: "Пара" },
  { value: "Сеть" },
  { value: "Почта" },
  { value: "Отправлено" },
  { value: "Получено" }
]

const cardNames = ["", "Пара", "Сеть", "Почта", "Отправлено", "Получено"]

function OrderModal({ orders }: OrderModalProps) {
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
      orders.map((order) => [
        <Colored
          key={order.order_id + "_colored-status"}
          colorIn="red"
          split={!isMobileLayoutForTablet && !isMobile}
        >
          <span>Sell:{(isMobileLayoutForTablet || isMobile) && " "}</span>
          <span>{order.status}</span>
        </Colored>,
        getPair(order),
        availableBlockchains?.find(
          (blockchain) => blockchain.chain_id == order.chain_id
        )?.title,
        order.email,
        order.amount_in.toString(),
        order.cur_out.amount.toString()
      ]),
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
        <span>My Operations</span>
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
            rowNames={cardNames}
            mobile={isMobile}
            withPagination={false}
            withButtons={false}
          />
        ) : (
          <Table
            customHeadings={tableHeadings}
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
