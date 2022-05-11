import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"

import Help from "./Help"
import { Container, ExchangeHelp, ExchangeStat } from "./styles"

type ExchangeInfoProps = {
  token: string | null
  currency: string | null
  placeholder: string
  text: string
  rate: number | null
  isLoading: boolean
  margins?: boolean
}

function ExchangeInfo({
  token,
  currency,
  placeholder,
  text,
  rate,
  isLoading,
  margins
}: ExchangeInfoProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Container margins={margins}>
      {!isLoading ? (
        <>
          <ExchangeStat>
            1 {token} = {rate} {currency}
          </ExchangeStat>
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
