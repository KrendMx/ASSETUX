import React, { useMemo } from "react"
import styled from "styled-components"
import { paginate } from "../helpers"

import type { TableProps } from "./types"

const Container = styled.table`
  width: 100%;
  background-color: var(--bgColor);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 43px 21px;
  border-spacing: 10px 0;
`

const Head = styled.thead``

const HeadElement = styled.th`
  font-size: 15px;
  color: var(--gray);
  text-align: center;
  font-weight: 500;
`

const Row = styled.tr`
  & > *:last-child,
  & > *:nth-last-child(2) {
    width: 1px;
  }
`

const Body = styled.tbody``

const Element = styled.td`
  font-size: 15px;
  color: var(--black);
  text-align: center;
  font-weight: 500;
  padding: 14px 0;
`

function Table({
  customHeadings,
  data,
  displayPerPage = 5,
  displayIndexes = false,
  currentPage = 1
}: TableProps) {
  const paginatedData = useMemo(
    () => data && paginate(data, displayPerPage),
    [data, displayPerPage]
  )

  const processedHeadings = useMemo(
    () =>
      customHeadings &&
      customHeadings.map((customHeading) => (
        <HeadElement key={customHeading}>{customHeading}</HeadElement>
      )),
    [customHeadings]
  )

  const processedTableData = useMemo(
    () =>
      paginatedData &&
      paginatedData[currentPage - 1]?.map((rowData, pageRowIndex) => {
        const currentIndex = (currentPage - 1) * displayPerPage + pageRowIndex

        return (
          <Row key={`row-${currentIndex}`}>
            {displayIndexes && <Element>{currentIndex + 1}</Element>}
            {rowData.map((value, cellIndex) => (
              <Element key={`cell-${cellIndex}_${value.toString()}`}>
                {value}
              </Element>
            ))}
          </Row>
        )
      }),
    [paginatedData, displayIndexes, currentPage, displayPerPage]
  )

  return (
    <Container>
      <Head>
        <Row>
          {displayIndexes && <HeadElement>№</HeadElement>}
          {processedHeadings}
        </Row>
      </Head>
      <Body>{processedTableData}</Body>
    </Container>
  )
}

export default Table
