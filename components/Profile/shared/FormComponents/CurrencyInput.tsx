import React from "react"
import styled from "styled-components"
import { BaseInputWrapper } from "./Input"

type CurrencyInputType = {
  value: string
  currency: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactChild
}

const Wrapper = styled(BaseInputWrapper)`
  gap: 16px;
  display: flex;
  align-items: center;
`

const Input = styled.input``

const Currency = styled.label`
  font-size: 1rem;
  font-weight: 500;
`

const IconWrapper = styled.div`
  min-width: 40px;
  position: relative;
  height: 40px;
  display: flex;
  background-color: #fff;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;

  & > div {
    position: relative;
    text-align: center;
    line-height: 25px;
    width: 25px;
    height: 25px;
  }
`

function CurrencyInput({
  value,
  currency,
  children,
  onChange
}: CurrencyInputType) {
  return (
    <Wrapper>
      <Input id={currency} onChange={onChange} value={value} />
      <Currency htmlFor={currency}>{currency}</Currency>
      <IconWrapper>
        <div>{children}</div>
      </IconWrapper>
    </Wrapper>
  )
}

export default CurrencyInput
