import React, { useState, useMemo, useEffect, useCallback } from "react"
import styled from "styled-components"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Table from "./Table"
import Cards from "./Cards"
import Search from "./Search"
import Skeleton from "react-loading-skeleton"
import { mapCurrency } from "@/src/currencies"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { swapAction, setSelectedToken } from "@/src/redux/cryptoSlice"
import { cardsPerPage, perPageValues, cardsWidth } from "./constants"
import { IoIosArrowRoundBack } from "react-icons/io"
import { mobile } from "@/src/constants"
import { generatePageNumbers } from "./helpers"
import { useIsomorphicLayoutEffect } from "@/src/hooks"
import type { ActionType } from "@/src/redux/cryptoSlice"
import type { Token } from "@/src/BackendClient/types"
import type { ExplorerData } from "../CryptoManager/types"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  & > h3 {
    flex-grow: 1;
  }
`

const AllLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 39px 0;

  @media only screen and (max-width: ${mobile}px) {
    margin: 28px 0 20px;
  }
`

const Controls = styled.div``

const ControlButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--lightgray);
  color: var(--gray);
  font-size: 16px;
  border-radius: 10px;
  height: 49px;
  padding: 0 15px;
`

const PageRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;

  @media only screen and (max-width: ${cardsWidth}px) {
    justify-content: center;
  }

  @media only screen and (max-width: ${mobile}px) {
    margin-top: 31px;
  }
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 12px;
  }
`

type PageButtonProps = {
  active?: boolean
  nonClickable?: boolean
}

const PageButton = styled.button<PageButtonProps>`
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.active ? "var(--blue)" : "var(--lightgray)")};
  border-radius: 7px;
  font-size: 13px;
  color: ${(props) => (props.active ? "#ffffff" : "var(--gray)")};
  cursor: ${(props) => (props.nonClickable ? "arrow" : "pointer")};

  &:disabled {
    opacity: var(--opacity);
  }
`

type ArrowContainerProps = {
  mirror?: boolean
}

const ArrowContainer = styled.span<ArrowContainerProps>`
  display: flex;
  font-size: 20px;

  transform: rotate(${(props) => (props.mirror ? "180deg" : "0")});
`

type ChangeFieldProps = {
  up?: boolean
}

const ChangeField = styled.span<ChangeFieldProps>`
  color: ${(props) => (props.up ? "var(--green)" : "var(--red)")};
`

type ActionButtonProps = {
  action: "sell" | "buy"
}

const ActionButton = styled.button<ActionButtonProps>`
  border: 1px solid #d2d2d7;
  outline: none;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.07em;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 49px;

  color: ${(props) => (props.action == "sell" ? "var(--red)" : "var(--green)")};
`

const tableHeadings = [
  {
    value: "Ticker",
    sortFn: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)
  },
  {
    value: "ASSETUX Buy",
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  {
    value: "ASSETUX Sell",
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  {
    value: "Change 24h",
    sortFn: (a: JSX.Element, b: JSX.Element) =>
      parseFloat(b.props.children) - parseFloat(a.props.children)
  },
  {
    value: "Volume 24h",
    sortFn: (a: string, b: string) => parseFloat(b) - parseFloat(a)
  },
  { value: "Trade" },
  { value: "Pool" }
]

const cardRowNames = [
  "Ticker",
  "ASSETUX Buy",
  "ASSETUX Sell",
  "Change 24h",
  "Volume 24h"
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
            Buy
          </ActionButton>,
          <ActionButton
            key={`sell_${element.id}`}
            action="sell"
            onClick={() => handleAction("SELL", element.token)}
          >
            Sell
          </ActionButton>
        ]),
    [explorerData, handleAction, currentCurrency, searchContext]
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

  const pageButtons = useMemo(() => {
    const result: JSX.Element[] = []
    if (pages) {
      const pageNumbers = generatePageNumbers(pages, currentPage)

      for (let i = 0; i < pageNumbers.length; i++) {
        const pageNumber = pageNumbers[i]

        result.push(
          <PageButton
            key={pageNumber}
            active={pageNumber == currentPage}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        )

        const jumping =
          i != pageNumbers.length && pageNumbers[i + 1] - pageNumbers[i] > 1

        if (jumping) {
          result.push(
            <PageButton key={`jumpButton-${pageNumber}`} nonClickable>
              ...
            </PageButton>
          )
        }
      }
    }

    return result
  }, [currentPage, pages])

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

  const isLoading = showSkeleton || processedExplorerData == null

  return (
    <Container>
      <TitleRow>
        <h3>{!isLoading ? "Crypto Explorer" : <Skeleton />}</h3>
        {!isLoading && (
          <AllLink as="a" href="#">
            {isMobile ? "View all" : "View all supported currencies"}
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
          rowNames={cardRowNames}
          handleAction={handleCardAction}
        />
      ) : (
        <Table
          customHeadings={tableHeadings}
          data={processedExplorerData}
          currentPage={currentPage}
          displayPerPage={desktopPerPage}
          displayIndexes
        />
      )}
      <PageRow>
        {isLoading ? (
          <Skeleton containerClassName="skeletonFlexContainer" height={30} />
        ) : (
          <>
            {!displayCards && (
              <PageContainer>
                {perPageValues.map((value) => (
                  <PageButton
                    active={desktopPerPage == value}
                    key={`perPage-${value}`}
                    onClick={() => {
                      setDesktopPerPage(value)
                      setCurrentPage(1)
                    }}
                  >
                    {value}
                  </PageButton>
                ))}
              </PageContainer>
            )}
            <PageContainer>
              <PageButton
                disabled={currentPage == 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ArrowContainer>
                  <IoIosArrowRoundBack />
                </ArrowContainer>
              </PageButton>
              {pageButtons}
              <PageButton
                disabled={pages == null || pages == 0 || currentPage == pages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ArrowContainer mirror>
                  <IoIosArrowRoundBack />
                </ArrowContainer>
              </PageButton>
            </PageContainer>
          </>
        )}
      </PageRow>
    </Container>
  )
}

export default CryptoExplorer
