import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"

import Help from "./help"
import { Container, ExchangeHelp, ExchangeStat } from "./styles"
import { ExchangeInfoProps } from "./types.exchange-info"

const ExchangeInfo = ({
  token,
  currency,
  placeholder,
  text,
  rate,
  isLoading,
  margins
}: ExchangeInfoProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Container margins={margins}>
      {!isLoading ? (
        <>
          {!!token && !!currency && (
            <ExchangeStat>
              1 {token} ≈ {rate ?? "..."} {currency}
            </ExchangeStat>
          )}
          <ExchangeHelp onMouseEnter={() => {}} onMouseLeave={() => {}}>
            {placeholder}
          </ExchangeHelp>
          {hovered && <Help offsetY={14}>{text}</Help>}
        </>
      ) : (
        <Skeleton containerClassName="skeletonFlexContainer" />
      )}
    </Container>
  )
}

export default ExchangeInfo
