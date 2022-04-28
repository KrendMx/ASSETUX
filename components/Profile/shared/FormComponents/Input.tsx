import React from "react"
import styled from "styled-components"

type InputWrapperProps = {
  id: string
  title: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BaseInputWrapper = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #d2d2d7;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 15px 10px 20px;

  & > label {
    color: var(--gray);
  }

  & > input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1em;
    font-weight: 500;
    color: var(--black);
  }
`

const Label = styled.label``

const Input = styled.input``

function InputWrapper({ id, title, value, onChange }: InputWrapperProps) {
  return (
    <BaseInputWrapper>
      <Label htmlFor={id}>{title}</Label>
      <Input value={value} onChange={onChange} id={id} />
    </BaseInputWrapper>
  )
}

export default InputWrapper
