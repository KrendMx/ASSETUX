import styled from "styled-components"

import { mobile } from "@/src/constants"

export const Button = styled.button`
  outline: none;
  border: 1px solid #d2d2d7;
  box-shadow: none;
  border-radius: 10px;
  padding: 0 20px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 65px;
  width: 100%;
  background: var(--white);
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 0.00000001px 3px #8bb0fa;
  }

  & > * + * {
    margin-top: 4px;
  }

  @media only screen and (max-width: ${mobile}px) {
    padding: 0 15px;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export const Label = styled.span`
  font-size: 0.79em;
  font-weight: 400;
  color: var(--gray);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

export const Value = styled.span`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`
