import styled from "styled-components"

import { mobile } from "@/src/utils/constants"

export const Container = styled.div`
  width: 100%;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  font-size: 1rem;
  padding: 34px 25px;

  @media only screen and (max-width: ${mobile}px) {
    padding: 21px 17px;
  }
`

export const InfoContainer = styled.div`
  & > * + * {
    margin-top: 16px;
  }
`

export const TransactionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 500;
  font-size: 0.79em;
`

export const TransactionInfo = styled.span`
  color: var(--gray);
`

export const TransactionHash = styled.span`
  color: var(--blue);
`

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 65px;
  font-weight: 500;
  font-size: 1em;
  border-radius: 10px;
  background-color: #68cc4533;
  color: var(--green);
`

export const Status = styled.span``

export const TransactionID = styled.span``

export const Assistance = styled.a`
  text-align: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 0.845em;
  font-weight: 500;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.87em;
  }
`
