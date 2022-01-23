import React, { useMemo } from "react"
import styled from "styled-components"
import { paginate } from "../helpers"
import { cardsPerPage } from "../constants"
import type { CardsProps } from "./types"

const Container = styled.div`
  & > * + * {
    margin-top: 15px;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

function Cards({ data, rowNames, currentPage = 1 }: CardsProps) {
  const paginatedData = useMemo(
    () => data && paginate(data, cardsPerPage),
    [data]
  )

  const processedCards = useMemo(
    () =>
      paginatedData &&
      paginatedData[currentPage - 1]?.map((data, paginatedDataIndex) => {
        const currentIndex =
          (currentPage - 1) * cardsPerPage + paginatedDataIndex

        return (
          <Card key={`card-${currentIndex}`}>
            <RowSpacer>
              {rowNames?.map((name, index) => (
                <Row key={`cardRow-${name}`}>
                  <RowName>{name}</RowName>
                  <RowValue>{data[index]}</RowValue>
                </Row>
              ))}
            </RowSpacer>
            <ButtonsContainer>
              <Button action="buy">Buy</Button>
              <Button action="sell">Sell</Button>
            </ButtonsContainer>
          </Card>
        )
      }),
    [paginatedData, currentPage, rowNames]
  )

  return <Container>{processedCards}</Container>
}

export default Cards
