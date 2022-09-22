import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import { mobile, optimizeRemoteImages } from '@/lib/data/constants'

type BalanceProps = {
  amount: string
  symbol: string
  fiat?: boolean
  icon: string
  style?: React.CSSProperties | undefined
}

const Container = styled.div`
  border: 1px solid #d2d2d7;
  padding: 0.632em 1.21em;
  font-size: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${mobile}px) {
    padding: 0.867em 1em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
    border-radius: 0.675em;
  }
`

const Amount = styled.span`
  font-weight: 400;
  color: var(--black);
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * + * {
    margin-left: 0.894em;
  }
`

const Symbol = styled.span`
  font-weight: 500;
  color: var(--gray);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.0666em;
  }
`

const Shadow = styled.div`
  width: 40px;
  height: 40px;
  background: var(--white);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${mobile}px) {
    width: 37px;
    height: 37px;
  }

  @media only screen and (max-width: 370px) {
    width: 2.5em;
    height: 2.5em;
    border-radius: 0.675em;
  }
`

const Icon = styled.div`
  position: relative;
  width: 60%;
  height: 60%;
  font-size: 1em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.0666em;
  }
`
// need refactor
const Balance = ({ amount, symbol, fiat, icon, style }: BalanceProps) => {
  return (
    <Container style={style}>
      <Amount>{amount}</Amount>
      <Info>
        <Symbol>{symbol}</Symbol>
        <Shadow>
          {fiat ? (
            icon
          ) : (
            <Icon>
              <Image
                src={icon}
                layout="fill"
                objectFit="contain"
                objectPosition="center center"
                alt={symbol}
                unoptimized={!optimizeRemoteImages}
              />
            </Icon>
          )}
        </Shadow>
      </Info>
    </Container>
  )
}

export default Balance
