import React, { useMemo, useState, useCallback } from "react"
import styled, { css } from "styled-components"
import { paginate } from "./paginate"
import { IoIosArrowDown } from "react-icons/io"

import type { SortInfo, TableProps, RowData } from "./types"

type ContainerProps = {
  withShadow?: boolean
}

const Container = styled.table<ContainerProps>`
  width: 100%;
  background-color: var(--bgColor);
  box-shadow: ${(props) =>
    props.withShadow ? "1px 4px 19px rgba(0, 0, 0, 0.12)" : "none"};
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

const SortableHeading = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-weight: 500;
  font-size: 15px;
  color: var(--gray);
  cursor: pointer;
  display: inline-block;
  position: relative;
`

type ArrowContainerProps = {
  rotate?: boolean
}

const ArrowContainer = styled.span<ArrowContainerProps>`
  display: flex;
  position: absolute;
  top: 50%;
  transform: ${(props) =>
    props.rotate ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};
  right: -1.1em;
  font-size: 1em;
`

type RowProps = {
  nRows?: number
  collapseCols?: number[]
}

const Row = styled.tr<RowProps>`
  ${(props) =>
    props.nRows &&
    css`
      & > *:nth-last-child(-n + ${props.nRows}) {
        width: 1px;
      }
    `}

  ${(props) =>
    props.collapseCols &&
    props.collapseCols.map(
      (col) => css`
        & > *:nth-child(${col}) {
          width: 1px;
        }
      `
    )}
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
  collapseLastCols,
  withoutShadow = false,
  displayPerPage = 5,
  displayIndexes = false,
  currentPage = 1,
  withPagination = true,
  collapseCols
}: TableProps) {
  const [sortInfo, setSortInfo] = useState<SortInfo | null>(null)

  const mapRows = useCallback(
    (data?: RowData[][]) =>
      data?.map((rowData, pageRowIndex) => {
        const currentIndex = (currentPage - 1) * displayPerPage + pageRowIndex

        return (
          <Row key={`row-${currentIndex}`}>
            {displayIndexes && <Element>{currentIndex + 1}</Element>}
            {rowData.map((value, cellIndex) => (
              <Element key={`cell-${cellIndex}_${value?.toString()}`}>
                {value}
              </Element>
            ))}
          </Row>
        )
      }),
    [currentPage, displayIndexes, displayPerPage]
  )

  const sortedData = useMemo(() => {
    if (!data) {
      return null
    }

    if (!sortInfo) {
      return data
    }

    const sortFn = sortInfo && customHeadings[sortInfo.nColumn].sortFn

    if (!sortFn) {
      return data
    }

    return [...data].sort((a, b) =>
      sortInfo.ascending
        ? -1 * sortFn(a[sortInfo.nColumn], b[sortInfo.nColumn])
        : sortFn(a[sortInfo.nColumn], b[sortInfo.nColumn])
    )
  }, [data, sortInfo, customHeadings])

  const paginatedData = useMemo(
    () => sortedData && paginate(sortedData, displayPerPage),
    [sortedData, displayPerPage]
  )

  const processedHeadings = useMemo(
    () =>
      customHeadings &&
      customHeadings.map((customHeading, columnIndex) => (
        <HeadElement key={customHeading.value}>
          {customHeading.sortFn ? (
            <SortableHeading
              onClick={() =>
                setSortInfo({
                  nColumn: columnIndex,
                  ascending:
                    sortInfo && columnIndex == sortInfo.nColumn
                      ? !sortInfo.ascending
                      : true
                })
              }
            >
              <span>{customHeading.value}</span>
              <ArrowContainer
                rotate={sortInfo?.nColumn == columnIndex && sortInfo.ascending}
              >
                <IoIosArrowDown />
              </ArrowContainer>
            </SortableHeading>
          ) : (
            customHeading.value
          )}
        </HeadElement>
      )),
    [customHeadings, sortInfo]
  )

  const processedTableData = useMemo(
    () =>
      paginatedData &&
      (withPagination
        ? mapRows(paginatedData[currentPage - 1])
        : mapRows(data)),

    [paginatedData, currentPage, data, withPagination, mapRows]
  )

  return (
    <Container withShadow={!withoutShadow}>
      <Head>
        <Row nRows={collapseLastCols} collapseCols={collapseCols}>
          {displayIndexes && <HeadElement>№</HeadElement>}
          {processedHeadings}
        </Row>
      </Head>
      <Body>{processedTableData}</Body>
    </Container>
  )
}

export default Table
