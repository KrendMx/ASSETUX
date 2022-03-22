import React from "react";
import styled from "styled-components";

type CurrencyInputType = {
    value: string;
    currency: string;
    Icon: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 20px;
  border: 1px solid #D2D2D7;
  border-radius: 10px;
  gap: 16px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  font-size: 1rem;
  color: var(--black);
  border: none;
  outline: none;
  width: 100%;
`

const Currency = styled.label`
  color: var(--gray);
  font-size: 1rem;
  font-weight: 500;
`

const IconWrapper = styled.div`
  min-width: 40px;
  height: 40px;
  display: flex;
  background-color: #fff;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  
  & > * {
    height: 25px;
    min-width: 25px;
    margin: auto;
  }
`

function CurrencyInput({value, currency, Icon, onChange}: CurrencyInputType) {

    return (
        <Wrapper>
            <Input id={currency} onChange={onChange} value={value}/>
            <Currency htmlFor={currency}>{currency}</Currency>
            <IconWrapper>
                { Icon }
            </IconWrapper>
        </Wrapper>
    )
}

export default CurrencyInput;
