import React, { useState, useMemo } from "react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"

import { useImmediateMobile } from "@/lib/hooks"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectShowSkeleton } from "@/lib/redux/ui/selectors"
import { perPageValues, cardsPerPage, cardsWidth } from "@/lib/data/constants"
import { getFormattedDate } from "@/lib/utils/date"

import Table from "@/components/common/table"
import Cards from "@/components/common/cards"
import Search from "@/components/common/search"
import Pages from "@/components/common/pagination"
import { Container, NoAssets, ControlsRow } from "./styles"

import type { Profile } from "@/lib/backend/ecommerce/types"
import type { TFunction } from "next-i18next"

export type HistoryType = {
  id: number
  timestamp: string
  email: string
  creditCard: string
  blockchain: string
  currency: string
  token: string
  amount: number
  method: "QIWI" | "QIWIVISAMASTER"
}

export type HistoryProps = {
  profile: Profile
  history: HistoryType[]
}

const tableHeadings = (t: TFunction) => [
  {
    value: t("dateTime"),
    sortFn: (a: number, b: number) => b - a
  },
  {
    value: t("email"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: t("creditCard")
  },
  {
    value: t("blockchain"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: t("paid"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: t("received"),
    sortFn: (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
  },
  {
    value: t("amount"),
    sortFn: (a: number, b: number) => b - a
  }
]

const cardNames = (t: TFunction) => [
  t("dateTime"),
  t("email"),
  t("creditCard"),
  t("blockchain"),
  t("paid"),
  t("received"),
  t("amount")
]

function History({ history }: HistoryProps) {
  const isMobile = useImmediateMobile()
  const displayCards = useImmediateMobile(cardsWidth)
  const { t } = useTranslation("profile-history")
  const router = useRouter()

  const showSkeleton = useAppSelector(selectShowSkeleton)

  const [searchContext, setSearchContext] = useState("")
  const [desktopPerPage, setDesktopPerPage] = useState(perPageValues[0])
  const [currentPage, setCurrentPage] = useState(1)

  const processedHistory = useMemo(
    () =>
      history
        .filter(
          (item) =>
            item.email.includes(searchContext) ||
            item.creditCard.includes(searchContext) ||
            item.amount.toString() == searchContext
        )
        .map((item) => [
          {
            value: (
              <span key={item.id + "datetime"}>
                {getFormattedDate(Number(item.timestamp), router.locale!)}
              </span>
            ),
            sortValue: Number(item.timestamp)
          },

          { value: item.email },
          {
            value:
              item.method == "QIWI"
                ? `** (***) *** ${item.creditCard}`
                : `**** **** **** ${item.creditCard}`
          },
          { value: item.blockchain },
          { value: item.currency },
          { value: item.token },
          { value: item.amount }
        ]),
    [history, router.locale, searchContext]
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
        <NoAssets>{t("noAssets")}</NoAssets>
      ) : (
        <>
          <ControlsRow>
            <Search
              placeholder={t("search")}
              value={searchContext}
              onChange={setSearchContext}
            />
          </ControlsRow>
          {displayCards ? (
            <Cards
              rowNames={cardNames(t)}
              mobile={isMobile}
              data={processedHistory}
              currentPage={currentPage}
              withPagination
            />
          ) : (
            <Table
              customHeadings={tableHeadings(t)}
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
