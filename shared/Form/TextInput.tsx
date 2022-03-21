import styled from "styled-components";
import React from "react";


const Wrapper = styled.div`
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D2D2D7;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
`

const Label = styled.label`
  color: var(--gray);
  font-size: .73rem;
  display: block;
  margin-bottom: 4px;
`

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
`

const TextInput: React.FC<{
    id: string;
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({id, title, onChange, value}) => (
    <Wrapper>
        <Label htmlFor={id}>{title}</Label>
        <Input value={value} onChange={onChange} id={id}/>
    </Wrapper>
)

export default TextInput;
