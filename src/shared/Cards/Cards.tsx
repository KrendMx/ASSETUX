import React, { useMemo } from "react"

import { paginate } from "@/src/shared/Table/paginate"

import { cardsPerPage } from "@/src/utils/constants"

import {
  Container,
  Card,
  Row,
  RowSpacer,
  RowName,
  RowValue,
  ButtonsContainer
} from "./styles"

import type { CardsProps, CardData, ActionElement } from "./types"

const mapCards = (
  rowNames: string[],
  currentPage: number,
  cardData?: CardData[][],
  buttons?: ActionElement[]
) => {
  return cardData?.map((data, paginatedDataIndex) => {
    const currentIndex = (currentPage - 1) * cardsPerPage + paginatedDataIndex

    const buttonComponents =
      buttons && buttons.map((button) => button(currentIndex))

    return (
      <Card key={`card-${currentIndex}`}>
        <RowSpacer>
          {rowNames?.map((name, index) => {
            const item = data[index].value

            return (
              <Row key={`cardRow-${name}-${index}`} withSpace={name != ""}>
                <RowName>{name}</RowName>
                <RowValue>{item}</RowValue>
              </Row>
            )
          })}
        </RowSpacer>
        {buttonComponents &&
          buttonComponents.some((element) => element != null) && (
            <ButtonsContainer>{buttonComponents}</ButtonsContainer>
          )}
      </Card>
    )
  })
}

function Cards({
  data,
  withPagination = false,
  rowNames,
  mobile,
  buttons,
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
            paginatedData[currentPage - 1],
            buttons
          )
        : mapCards(rowNames, currentPage, data, buttons)),
    [data, paginatedData, currentPage, rowNames, buttons, withPagination]
  )

  return <Container>{processedCards}</Container>
}

export default Cards
