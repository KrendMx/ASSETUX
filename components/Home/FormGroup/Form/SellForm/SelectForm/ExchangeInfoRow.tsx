import React from "react"
import styled from "styled-components"

import Copy from "./Copy"
import Timer from "./Timer"

import { mobile } from "@/src/constants"

const Container = styled.div`
  font-size: 1rem;

  & > * + * {
    margin-top: 4px;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

const Label = styled.span`
  color: var(--gray);
  font-weight: 400;
  font-size: 0.79em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

const ValueRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > * + * {
    margin-left: 1.7em;
  }
`

type ValueProps = {
  small?: boolean
}

const Value = styled.span<ValueProps>`
  color: var(--dark);
  font-size: ${(props) => (props.small ? "0.85em" : "1em")};
  font-weight: 500;
  word-break: break-all;

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.small ? "0.9em" : "1.067em")};
  }
`

type ExchangeInfoRowProps = {
  label?: string
  value?: string
  copyLabel?: string
  valueToCopy?: string
  timestamp?: number
  onExpired?: () => void
}

function ExchangeInfoRow({
  label,
  value,
  copyLabel,
  valueToCopy,
  timestamp,
  onExpired
}: ExchangeInfoRowProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <ValueRow>
        <Value small={value ? value.length > 30 : false}>{value}</Value>
        {copyLabel && <Copy label={copyLabel} valueToCopy={valueToCopy} />}
        {timestamp && <Timer timestamp={timestamp} onExpired={onExpired} />}
      </ValueRow>
    </Container>
  )
}

export default ExchangeInfoRow
