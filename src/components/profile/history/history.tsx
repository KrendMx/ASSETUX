import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'

import { useImmediateMobile } from '@/lib/hooks'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { selectShowSkeleton } from '@/lib/redux/ui/selectors'
import { perPageValues, cardsPerPage, cardsWidth } from '@/lib/data/constants'
import { getFormattedDate } from '@/lib/utils/date'

import Table from '@/components/common/table'
import Cards from '@/components/common/cards'
import Search from '@/components/common/search'
import Pages from '@/components/common/pagination'
import { Container, NoAssets, ControlsRow } from './styles'

import type { IMerchant } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import { setMerchantMode } from '@/lib/redux/ui'
import { PayProviders, QIWI } from '@/core/backend/types'
import { cardNames, tableHeadings } from './mock'

export type HistoryType = {
  id: number
  timestamp?: string
  email?: string
  creditCard?: string
  currency: string
  amount?: number
  method?: PayProviders
  blockchain?: string | null
  token?: string | null
}

export type HistoryProps = {
  profile: IMerchant
  history: HistoryType[]
}

const History = ({
  history,
  profile: {
    user: { mode }
  }
}: HistoryProps) => {
  const isMobile = useImmediateMobile()
  const displayCards = useImmediateMobile(cardsWidth)
  const { t } = useTranslation('profile-history')
  const router = useRouter()
  const isTRANSFER = mode == 'TRANSFER'
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMerchantMode(mode))
  }, [dispatch, mode])
  const showSkeleton = useAppSelector(selectShowSkeleton)

  const [searchContext, setSearchContext] = useState('')
  const [desktopPerPage, setDesktopPerPage] = useState(perPageValues[0])
  const [currentPage, setCurrentPage] = useState(1)

  const processedHistory = useMemo(
    () =>
      history
        .filter(
          ({ email, creditCard, amount, token }) =>
            email?.includes(searchContext) ||
            creditCard?.includes(searchContext) ||
            amount?.toString() == searchContext ||
            token?.toLowerCase()?.includes(searchContext.toLowerCase())
        )
        .map((item) =>
          isTRANSFER
            ? [
                {
                  value: (
                    <span key={item.id + 'datetime'}>
                      {getFormattedDate(Number(item.timestamp), router.locale!)}
                    </span>
                  ),
                  sortValue: Number(item.timestamp)
                },

                { value: item.email },
                {
                  value:
                    item.method == QIWI
                      ? `** (***) *** ${item.creditCard}`
                      : `**** **** **** ${item.creditCard}`
                },
                { value: item.blockchain },
                { value: item.currency },
                { value: item.token },
                { value: item.amount }
              ]
            : [
                {
                  value: (
                    <span key={item.id + 'datetime'}>
                      {getFormattedDate(Number(item.timestamp), router.locale!)}
                    </span>
                  ),
                  sortValue: Number(item.timestamp)
                },

                { value: item.email },
                {
                  value:
                    item.method == QIWI
                      ? `** (***) *** ${item.creditCard}`
                      : `**** **** **** ${item.creditCard}`
                },
                // { value: item.blockchain },
                { value: item.currency },
                // { value: item.token },
                { value: item.amount }
              ]
        ),
    [history, isTRANSFER, router.locale, searchContext]
  )

  const pages = useMemo(
    () =>
      processedHistory &&
      Math.ceil(
        processedHistory.length /
          (displayCards
            ? isMobile
              ? cardsPerPage
              : cardsPerPage * 2
            : desktopPerPage)
      ),
    [processedHistory, desktopPerPage, displayCards, isMobile]
  )

  return (
    <Container>
      {showSkeleton ? (
        <Skeleton height="5.21em" />
      ) : history.length == 0 ? (
        <NoAssets>{t('noAssets')}</NoAssets>
      ) : (
        <>
          <ControlsRow>
            <Search
              placeholder={t('search')}
              value={searchContext}
              onChange={setSearchContext}
            />
          </ControlsRow>
          {displayCards ? (
            <Cards
              rowNames={cardNames(t, mode)}
              mobile={isMobile}
              data={processedHistory}
              currentPage={currentPage}
              withPagination
            />
          ) : (
            <Table
              customHeadings={tableHeadings(t, mode)}
              currentPage={currentPage}
              displayPerPage={desktopPerPage}
              data={processedHistory}
              customPaddings="22px"
              displayIndexes
              withPagination
            />
          )}

          <Pages
            pages={pages}
            currentPage={currentPage}
            perPageValues={perPageValues}
            hidePerPageValues={displayCards}
            currentPerPageValue={desktopPerPage}
            setPerPageValue={setDesktopPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  )
}

export default History
