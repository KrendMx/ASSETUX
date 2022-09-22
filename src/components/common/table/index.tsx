import React, { useMemo, useState, useCallback } from 'react'
import { paginate } from './paginate'
import { IoIosArrowDown } from 'react-icons/io'

import type { SortInfo, TableProps, RowData } from './types.table'
import {
  Row,
  Element,
  HeadElement,
  SortableHeading,
  ArrowContainer,
  Head,
  Body,
  Container
} from './styles'

const Table = ({
  customHeadings,
  data,
  collapseLastCols,
  withoutShadow = false,
  displayPerPage = 5,
  displayIndexes = false,
  currentPage = 1,
  withPagination = false,
  collapseCols,
  customPaddings,
  tablePaddings
}: TableProps) => {
  const [sortInfo, setSortInfo] = useState<SortInfo | null>(null)

  const mapRows = useCallback(
    (data: RowData[][] | null) =>
      data?.map((rowData, pageRowIndex) => {
        const currentIndex = (currentPage - 1) * displayPerPage + pageRowIndex

        return (
          <Row key={`row-${currentIndex}`}>
            {displayIndexes && (
              <Element paddings={customPaddings}>{currentIndex + 1}</Element>
            )}
            {rowData.map((item, cellIndex) => (
              <Element
                paddings={customPaddings}
                key={`cell-${currentIndex}-${cellIndex}_${item?.toString()}`}
              >
                {item.value}
              </Element>
            ))}
          </Row>
        )
      }),
    [currentPage, displayIndexes, displayPerPage, customPaddings]
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

    return [...data].sort((a, b) => {
      const firstCol = a[sortInfo.nColumn]
      const secondCol = b[sortInfo.nColumn]

      const first = firstCol.sortValue ? firstCol.sortValue : firstCol.value
      const second = secondCol.sortValue ? secondCol.sortValue : secondCol.value

      return sortInfo.ascending
        ? -1 * sortFn(first, second)
        : sortFn(first, second)
    })
  }, [data, sortInfo, customHeadings])

  const paginatedData = useMemo(
    () => sortedData && paginate(sortedData, displayPerPage),
    [sortedData, displayPerPage]
  )

  const processedHeadings = useMemo(
    () =>
      customHeadings &&
      customHeadings.map((customHeading, columnIndex) => (
        <HeadElement key={`col-${columnIndex}-${customHeading.value}`}>
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
                shouldRotate={
                  sortInfo?.nColumn == columnIndex && sortInfo.ascending
                }
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
        : mapRows(sortedData)),

    [paginatedData, currentPage, sortedData, withPagination, mapRows]
  )

  return (
    <Container withShadow={!withoutShadow} customPaddings={tablePaddings}>
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
