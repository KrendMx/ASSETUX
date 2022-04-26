import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { mapCurrency } from "@/src/currencies"
import {
  allowSkeletons,
  cardsPerPage,
  perPageValues,
  cardsWidth
} from "@/src/constants"

import { selectShowSkeleton } from "@/src/redux/uiSlice/selectors"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { swapAction, setSelectedToken } from "@/src/redux/cryptoSlice"

import { useIsomorphicLayoutEffect } from "@/src/hooks"

import Table from "@/shared/Table"
import Cards from "./Cards"
import Search from "@/shared/Search"
import Pages from "@/shared/Pages"

import {
  Container,
  TitleRow,
  AllLink,
  ControlsRow,
  Controls,
  ChangeField,
  ActionButton
} from "./styles"

import type { TAction } from "@/src/redux/cryptoSlice/types"
import type { Token } from "@/src/BackendClient/types"
import type { ExplorerData } from "../../CryptoManager/types"
import type { TFunction } from "next-i18next"

const tableHeadings = (t: TFunction) => [
  {
    value: t("home:explorer_ticker"),
    sortFn: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)
  },
  {
    value: t("home:explorer_buy"),
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  {
    value: t("home:explorer_sell"),
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  {
    value: t("home:explorer_change"),
    sortFn: (a: JSX.Element, b: JSX.Element) =>
      parseFloat(b.props.children) - parseFloat(a.props.children)
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
    (action: TAction, token: Token) => {
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
    (action: TAction, dataIndex: number) => {
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
          element.ticker,
          `${element.buy} ${mapCurrency(currentCurrency)}`,
          `${element.sell} ${mapCurrency(currentCurrency)}`,
          <ChangeField
            key={`change24h_${element.id}`}
            up={element.change24 >= 0}
          >
            {`${element.change24 >= 0 ? "+" : ""}${element.change24.toFixed(
              2
            )}%`}
          </ChangeField>,
          element.volume24,
          <ActionButton
            key={`buy_${element.id}`}
            action="buy"
            onClick={() => handleAction("BUY", element.token)}
          >
            {t("home:explorer_buy")}
          </ActionButton>,
          <ActionButton
            key={`sell_${element.id}`}
            action="sell"
            onClick={() => handleAction("SELL", element.token)}
          >
            {t("home:explorer_sell")}
          </ActionButton>
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
        {!isLoading && (
          <AllLink as="a" href="#">
            {isMobile
              ? t("home:explorer_viewAll")
              : t("home:explorer_viewAllFull")}
          </AllLink>
        )}
      </TitleRow>
      <ControlsRow>
        {!isLoading ? (
          <>
            <Controls></Controls>
            <Search onChange={handleSearch} />
          </>
        ) : (
          <Skeleton containerClassName="skeletonFlexContainer" height={49} />
        )}
      </ControlsRow>
      {isLoading ? (
        <Skeleton height={490} />
      ) : displayCards ? (
        <Cards
          mobile={isMobile}
          data={processedExplorerData}
          currentPage={currentPage}
          rowNames={cardRowNames(t)}
          handleAction={handleCardAction}
          withButtons
        />
      ) : (
        <Table
          customHeadings={tableHeadings(t)}
          data={processedExplorerData}
          currentPage={currentPage}
          displayPerPage={desktopPerPage}
          collapseLastCols={2}
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
