import React, { useMemo } from "react"

import { paginate } from "@/shared/Table/paginate"

import { cardsPerPage } from "@/src/constants"

import {
  Container,
  Card,
  Row,
  RowSpacer,
  RowName,
  RowValue,
  ButtonsContainer,
  Button
} from "./styles"

import type { CardsProps, CardData } from "./types"
import type { TAction } from "@/src/redux/cryptoSlice/types"

const mapCards = (
  rowNames: string[],
  currentPage: number,
  withButtons: boolean,
  cardData?: CardData[][],
  handleAction?: (action: TAction, dataIndex: number) => void
) => {
  return cardData?.map((data, paginatedDataIndex) => {
    const currentIndex = (currentPage - 1) * cardsPerPage + paginatedDataIndex

    return (
      <Card key={`card-${currentIndex}`}>
        <RowSpacer>
          {rowNames?.map((name, index) => (
            <Row key={`cardRow-${name}-${index}`} withSpace={name != ""}>
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
