import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { mapCurrency } from "@/utils/currencies"
import {
  allowSkeletons,
  cardsPerPage,
  perPageValues,
  cardsWidth
} from "@/utils/constants"

import { selectShowSkeleton } from "@/redux/uiSlice/selectors"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { swapAction, setSelectedToken } from "@/redux/cryptoSlice"

import { useIsomorphicLayoutEffect } from "@/utils/hooks"

import Table from "@/shared/Table"
import Cards from "@/shared/Cards"
import ControlRow from "@/shared/ControlRow"
import Pages from "@/shared/Pages"

import {
  Container,
  TitleRow,
  AllLink,
  ControlRowContainer,
  ChangeField,
  ActionButton
} from "./styles"

import type { ActionType } from "@/redux/cryptoSlice/types"
import type { Token } from "@/backend/main/types"
import type { ExplorerData } from "../../CryptoManager/types"
import type { TFunction } from "next-i18next"

const tableHeadings = (t: TFunction) => [
  {
    value: t("home:explorer_ticker"),
    sortFn: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)
  },
  {
    value: t("home:explorer_buy"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:explorer_sell"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:explorer_change"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("home:explorer_volume"),
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  { value: t("home:explorer_trade") },
  { value: t("home:explorer_pool") }
]

const cardRowNames = (t: TFunction) => [
  t("home:explorer_ticker"),
  t("home:explorer_buy"),
  t("home:explorer_sell"),
  t("home:explorer_change"),
  t("home:explorer_volume")
]

const checkExplorerDataByContext = (
  explorerData: ExplorerData,
  context: string
): boolean => {
  const lowerCasedCtx = context.toLowerCase()
  const valuesToCheck = explorerData.token.name.toLowerCase().split(" ")
  valuesToCheck.push(explorerData.token.symbol.toLowerCase())

  let good = false

  for (const value of valuesToCheck) {
    if (value.startsWith(lowerCasedCtx)) {
      good = true
      break
    }
  }

  return good
}

function CryptoExplorer() {
  const { t } = useTranslation("home")

  const dispatch = useAppDispatch()

  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const showSkeleton = useAppSelector(selectShowSkeleton)
  const explorerData = useAppSelector((state) => state.crypto.explorerData)
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)

  const [searchContext, setSearchContext] = useState("")
  const [desktopPerPage, setDesktopPerPage] = useState(perPageValues[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [displayCards, setDisplayCards] = useState(false)

  const handleSearch = (value: string) => {
    setSearchContext(value)
    setCurrentPage(1)
  }

  const handleAction = useCallback(
    (action: ActionType, token: Token) => {
      dispatch(swapAction(action))
      dispatch(setSelectedToken(token))
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    },
    [dispatch]
  )

  const handleCardAction = useCallback(
    (action: ActionType, dataIndex: number) => {
      const token = explorerData
        ? explorerData?.filter(
            (element) => element.currency == currentCurrency
          )[dataIndex]?.token
        : null

      if (token) {
        handleAction(action, token)
      }
    },
    [handleAction, explorerData, currentCurrency]
  )

  const processedExplorerData = useMemo(
    () =>
      explorerData
        ?.filter(
          (element) =>
            element.token.enabled &&
            element.currency == currentCurrency &&
            checkExplorerDataByContext(element, searchContext)
        )
        .map((element) => [
          {
            value: element.ticker
          },
          {
            value: `${element.buy} ${mapCurrency(currentCurrency)}`,
            sortValue: element.buy
          },
          {
            value: `${element.sell} ${mapCurrency(currentCurrency)}`,
            sortValue: element.sell
          },
          {
            value: (
              <ChangeField
                key={`change24h_${element.id}`}
                up={element.change24 >= 0}
              >
                {`${element.change24 >= 0 ? "+" : ""}${element.change24.toFixed(
                  2
                )}%`}
              </ChangeField>
            ),
            sortValue: element.change24
          },
          {
            value: element.volume24
          },
          {
            value: (
              <ActionButton
                key={`buy_${element.id}`}
                action="buy"
                onClick={() => handleAction("BUY", element.token)}
              >
                {t("home:explorer_buy")}
              </ActionButton>
            )
          },
          {
            value: (
              <ActionButton
                key={`sell_${element.id}`}
                action="sell"
                onClick={() => handleAction("SELL", element.token)}
              >
                {t("home:explorer_sell")}
              </ActionButton>
            )
          }
        ]),
    [explorerData, handleAction, currentCurrency, searchContext, t]
  )

  const pages = useMemo(
    () =>
      processedExplorerData &&
      Math.ceil(
        processedExplorerData.length /
          (displayCards
            ? isMobile
              ? cardsPerPage
              : cardsPerPage * 2
            : desktopPerPage)
      ),
    [processedExplorerData, desktopPerPage, displayCards, isMobile]
  )

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      setDisplayCards(width < cardsWidth)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [displayCards])

  const isLoading =
    allowSkeletons && (showSkeleton || processedExplorerData == null)

  return (
    <Container>
      <TitleRow>
        <h3>{!isLoading ? t("home:explorer_title") : <Skeleton />}</h3>
        {/* {!isLoading && (
          <AllLink as="a" href="#">
            {isMobile
              ? t("home:explorer_viewAll")
              : t("home:explorer_viewAllFull")}
          </AllLink>
        )} */}
      </TitleRow>
      <ControlRowContainer>
        {!isLoading ? (
          <ControlRow
            context={searchContext}
            searchPlaceholder={t("home:search")}
            onContextChange={handleSearch}
          />
        ) : (
          <Skeleton height={49} />
        )}
      </ControlRowContainer>
      {isLoading ? (
        <Skeleton height={490} />
      ) : displayCards ? (
        <Cards
          mobile={isMobile}
          data={processedExplorerData}
          currentPage={currentPage}
          rowNames={cardRowNames(t)}
          buttons={[
            (dataIndex) => (
              <ActionButton
                action="buy"
                onClick={() => handleCardAction("BUY", dataIndex)}
              >
                {t("home:explorer_buy")}
              </ActionButton>
            ),
            (dataIndex) => (
              <ActionButton
                action="sell"
                onClick={() => handleCardAction("SELL", dataIndex)}
              >
                {t("home:explorer_sell")}
              </ActionButton>
            )
          ]}
          withPagination
        />
      ) : (
        <Table
          customHeadings={tableHeadings(t)}
          data={processedExplorerData}
          currentPage={currentPage}
          displayPerPage={desktopPerPage}
          collapseLastCols={2}
          withPagination
          displayIndexes
        />
      )}
      <Pages
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
        perPageValues={perPageValues}
        hidePerPageValues={displayCards}
        currentPerPageValue={desktopPerPage}
        setPerPageValue={setDesktopPerPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  )
}

export default CryptoExplorer
