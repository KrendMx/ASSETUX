import styled from "styled-components"

import { mobile } from "@/utils/constants"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media only screen and (max-width: ${mobile}px) {
    display: flex;
    gap: 0;
    flex-direction: column;

    & > * + * {
      margin-top: 15px;
    }
  }
`

export const Card = styled.div`
  width: 100%;
  padding: 22px 21px;
  background: var(--white);
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`

export const RowSpacer = styled.div`
  & > * + * {
    margin-top: 5px;
  }
`

type RowProps = {
  withSpace?: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.withSpace ? "space-between" : "flex-start"};
  align-items: center;
`

export const RowName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #6e6e73;
`

export const RowValue = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: var(--black);
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 19px;

  & > * + * {
    margin-left: 12px;
  }
`
