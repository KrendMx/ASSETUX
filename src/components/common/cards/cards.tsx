import React, { useMemo } from 'react'
import { paginate } from '@/components/common/table/paginate'
import { cardsPerPage } from '@/lib/data/constants'
import { Container } from './styles'
import { CardsProps } from './types.cards'
import { mapCards } from './helpers.cards'

const Cards = ({
  data,
  withPagination = false,
  rowNames,
  mobile,
  buttons,
  currentPage = 1
}: CardsProps) => {
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
