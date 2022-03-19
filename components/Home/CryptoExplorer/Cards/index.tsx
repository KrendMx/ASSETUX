import React, { useMemo } from "react"
import styled from "styled-components"

import { paginate } from "@/shared/Table/paginate"

import { cardsPerPage } from "../constants"
import { mobile } from "@/src/constants"

import type { CardsProps, CardData } from "./types"
import type { ActionType } from "@/src/redux/cryptoSlice"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media only screen and (max-width: ${mobile}px) {
    display: flex;
    gap: 0;
    flex-direction: column;

    & > * + * {
      margin-top: 15px;
    }
  }
`

const Card = styled.div`
  width: 100%;
  padding: 22px 21px;
  background: var(--white);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`

const RowSpacer = styled.div`
  & > * + * {
    margin-top: 5px;
  }
`

type RowProps = {
  withSpace?: boolean
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.withSpace ? "space-between" : "flex-start"};
  align-items: center;
`

const RowName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #6e6e73;
`

const RowValue = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: var(--black);
`

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 19px;

  & > * + * {
    margin-left: 12px;
  }
`

type ButtonProps = {
  action: "buy" | "sell"
}

const Button = styled.button<ButtonProps>`
  outline: none;
  border: 1px solid #d2d2d7;
  background: none;
  border-radius: 10px;
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.action == "buy" ? "var(--green)" : "var(--red)")};
`

const mapCards = (
  rowNames: string[],
  currentPage: number,
  withButtons: boolean,
  cardData?: CardData[][],
  handleAction?: (action: ActionType, dataIndex: number) => void
) => {
  return cardData?.map((data, paginatedDataIndex) => {
    const currentIndex = (currentPage - 1) * cardsPerPage + paginatedDataIndex

    return (
      <Card key={`card-${currentIndex}`}>
        <RowSpacer>
          {rowNames?.map((name, index) => (
            <Row key={`cardRow-${name}`} withSpace={name != ""}>
              <RowName>{name}</RowName>
              <RowValue>{data[index]}</RowValue>
            </Row>
          ))}
        </RowSpacer>
        {withButtons && (
          <ButtonsContainer>
            <Button
              action="buy"
              onClick={() => handleAction && handleAction("BUY", currentIndex)}
            >
              Buy
            </Button>
            <Button
              action="sell"
              onClick={() => handleAction && handleAction("SELL", currentIndex)}
            >
              Sell
            </Button>
          </ButtonsContainer>
        )}
      </Card>
    )
  })
}

function Cards({
  data,
  withButtons = true,
  withPagination = true,
  rowNames,
  handleAction,
  mobile,
  currentPage = 1
}: CardsProps) {
  const paginatedData = useMemo(
    () => data && paginate(data, mobile ? cardsPerPage : cardsPerPage * 2),
    [data, mobile]
  )

  const processedCards = useMemo(
    () =>
      paginatedData &&
      rowNames &&
      (withPagination
        ? mapCards(
            rowNames,
            currentPage,
            withButtons,
            paginatedData[currentPage - 1],
            handleAction
          )
        : mapCards(rowNames, currentPage, withButtons, data, handleAction)),
    [
      data,
      paginatedData,
      currentPage,
      rowNames,
      handleAction,
      withButtons,
      withPagination
    ]
  )

  return <Container>{processedCards}</Container>
}

export default Cards
