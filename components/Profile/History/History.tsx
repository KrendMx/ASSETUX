import React, { useState } from "react"
import { useTranslation } from "next-i18next"

import { useImmediateMobile } from "@/src/hooks"
import { perPageValues } from "@/src/constants"

import Table from "@/shared/Table"
import Cards from "@/shared/Cards"
import Search from "@/shared/Search"
import Pages from "@/shared/Pages"
import { Container, NoAssets, ControlsRow } from "./styles"

import type { Profile, Bill } from "@/src/BackendClients/ecommerce/types"
import type { TFunction } from "next-i18next"

export type HistoryProps = {
  profile: Profile
  history: Bill[]
}

const tableHeadings = (t: TFunction) => [
  {
    value: t("dateTime"),
    sortFn: (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0)
  },
  {
    value: t("email"),
    sortFn: (a: string, b: string) => parseFloat(a) - parseFloat(b)
  },
  {
    value: t("creditCard")
  },
  {
    value: t("blockchain")
  },
  {
    value: t("paid")
  },
  {
    value: t("received")
  },
  {
    value: t("amount")
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
  const { t } = useTranslation("profile-history")

  const [searchContext, setSearchContext] = useState("")
  const [filteredHistory, setFilteredHistory] = useState(history)

  return (
    <Container>
      {history.length == 0 ? (
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
          {isMobile ? (
            <Cards rowNames={cardNames(t)} />
          ) : (
            <Table customHeadings={tableHeadings(t)} displayIndexes />
          )}

          <Pages
            pages={10}
            perPageValues={perPageValues}
            hidePerPageValues={isMobile}
          />
        </>
      )}
    </Container>
  )
}

export default History
