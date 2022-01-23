import React, { useState, useMemo, useEffect } from "react"
import styled from "styled-components"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Table from "./Table"
import Cards from "./Cards"
import Search from "./Search"
import Skeleton from "react-loading-skeleton"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import { cardsPerPage, perPageValues, cardsWidth } from "./constants"
import { IoIosArrowRoundBack } from "react-icons/io"
import { mobile } from "@/src/constants"
import { generatePageNumbers } from "./helpers"
import { useIsomorphicLayoutEffect } from "@/src/hooks"

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

const data = [
  [
    "LTE/RUB",
    "0.0000001",
    "0.0000001",
    <ChangeField key={1} up>
      +0.00%
    </ChangeField>,
    "$13.432",
    <ActionButton key={1} action="buy">
      Buy
    </ActionButton>,
    <ActionButton key={1} action="sell">
      Sell
    </ActionButton>
  ],
  [
    "LTE/RUB",
    "0.0000001",
    "0.0000001",
    <ChangeField key={2} up>
      +0.00%
    </ChangeField>,
    "$13.432",
    <ActionButton key={2} action="buy">
      Buy
    </ActionButton>,
    <ActionButton key={2} action="sell">
      Sell
    </ActionButton>
  ],
  [
    "LTE/RUB",
    "0.0000001",
    "0.0000001",
    <ChangeField key={3} up>
      +0.00%
    </ChangeField>,
    "$13.432",
    <ActionButton key={3} action="buy">
      Buy
    </ActionButton>,
    <ActionButton key={3} action="sell">
      Sell
    </ActionButton>
  ],
  [
    "LTE/RUB",
    "0.0000001",
    "0.0000001",
    <ChangeField key={4} up>
      +0.00%
    </ChangeField>,
    "$13.432",
    <ActionButton key={4} action="buy">
      Buy
    </ActionButton>,
    <ActionButton key={4} action="sell">
      Sell
    </ActionButton>
  ],
  [
    "LTE/RUB",
    "0.0000001",
    "0.0000001",
    <ChangeField key={5} up>
      +0.00%
    </ChangeField>,
    "$13.432",
    <ActionButton key={5} action="buy">
      Buy
    </ActionButton>,
    <ActionButton key={5} action="sell">
      Sell
    </ActionButton>
  ],
  [
    "LTE/RUB",
    "0.0000001",
    "0.0000001",
    <ChangeField key={6} up>
      +0.00%
    </ChangeField>,
    "$13.432",
    <ActionButton key={6} action="buy">
      Buy
    </ActionButton>,
    <ActionButton key={6} action="sell">
      Sell
    </ActionButton>
  ]
]

const tableHeadings = [
  "Ticker",
  "Last Price",
  "Assetux Price $",
  "Change 24h",
  "Volume 24h",
  "Trade",
  "Pool"
]

const cardRowNames = [
  "Ticker",
  "Last Price",
  "Assetux Price $",
  "Change 24h",
  "Volume 24h"
]

function CryptoExplorer() {
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const showSkeleton = useAppSelector(selectShowSkeleton)

  const [desktopPerPage, setDesktopPerPage] = useState(perPageValues[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [displayCards, setDisplayCards] = useState(false)

  const pages = useMemo(
    () =>
      Math.ceil(data.length / (displayCards ? cardsPerPage : desktopPerPage)),
    [data.length, desktopPerPage, displayCards]
  )

  const pageButtons = useMemo(() => {
    const result: JSX.Element[] = []
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

  return (
    <Container>
      <TitleRow>
        <h3>{!showSkeleton ? "Crypto Explorer" : <Skeleton />}</h3>
        {!showSkeleton && (
          <AllLink as="a" href="#">
            {isMobile ? "View all" : "View all supported currencies"}
          </AllLink>
        )}
      </TitleRow>
      <ControlsRow>
        {!showSkeleton ? (
          <>
            <Controls></Controls>
            <Search />
          </>
        ) : (
          <Skeleton containerClassName="skeletonFlexContainer" height={49} />
        )}
      </ControlsRow>
      {showSkeleton ? (
        <Skeleton height={530} />
      ) : displayCards ? (
        <Cards data={data} currentPage={currentPage} rowNames={cardRowNames} />
      ) : (
        <Table
          customHeadings={tableHeadings}
          data={data}
          currentPage={currentPage}
          displayPerPage={desktopPerPage}
          displayIndexes
        />
      )}
      <PageRow>
        {showSkeleton ? (
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
                disabled={currentPage == pages}
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
