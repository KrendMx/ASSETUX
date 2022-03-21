import styled from "styled-components";
import React from "react";


const Button = styled.button`
  width: 100%;
  background: #0066CC;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 13px 20px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  font-size: .84rem;
  font-weight: 500;
  cursor: pointer;
`

const FormButton: React.FC<{
    title: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}> = ({title, onClick}) => {
    return <Button onClick={onClick}>{title}</Button>
}


export default FormButton
