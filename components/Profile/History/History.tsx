import React from "react"
import styled from "styled-components"

import { useImmediateMobile } from "@/src/hooks"
import { perPageValues } from "@/src/constants"

import Table from "@/shared/Table"
import Cards from "@/shared/Cards"
import Search from "@/shared/Search"
import Pages from "@/shared/Pages"

import type { Profile } from "@/src/BackendClients/ecommerce/types"

const Container = styled.div`
  & > * + * {
    margin-top: 2.105em;
  }
`

const ControlsRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

export type HistoryProps = Profile

function History({}: HistoryProps) {
  const isMobile = useImmediateMobile()

  return (
    <Container>
      <ControlsRow>
        <Search placeholder="asdsD" value="" onChange={() => {}} />
      </ControlsRow>
      {isMobile ? <Cards /> : <Table customHeadings={[]} />}

      <Pages
        pages={10}
        perPageValues={perPageValues}
        hidePerPageValues={isMobile}
      />
    </Container>
  )
}

export default History
