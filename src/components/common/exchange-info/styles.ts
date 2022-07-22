import styled from "styled-components"

import { mobile } from "@/lib/data/constants"

export const ExchangeStat = styled.span`
  color: #6e6e73;
  font-size: 1em;
  font-weight: 500;
`

export const ExchangeHelp = styled.span`
  color: var(--blue);
  font-size: 1em;
  font-weight: 500;
  text-align: right;
`

type ContainerProps = {
  margins?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${(props) => (props.margins ? "15px 0 14px" : "0px")};
  font-size: 0.8em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.865em;
    margin: ${(props) => (props.margins ? "11px 0" : "0px")};
  }

  @media only screen and (max-width: 370px) {
    font-size: 3.5vw;
  }
`
