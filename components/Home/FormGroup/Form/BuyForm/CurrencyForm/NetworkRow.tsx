import React, { useState } from "react"
import styled from "styled-components"
import Help from "../../Help"
import { mobile } from "@/src/constants"

const Container = styled.h5`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 27px 0 14px 0;
  position: relative;
  font-size: 1em;

  & > span {
    font-size: 0.8em;
    font-weight: 400;
    color: var(--gray);
  }

  @media only screen and (max-width: ${mobile}px) {
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
  }
`

const QuestionMark = styled.span`
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  background-color: #0066cc1a;
  font-size: 12px;
  cursor: pointer;

  &::before {
    content: "?";
    color: var(--blue);
  }

  @media only screen and (max-width: ${mobile}px) {
    position: static;
    top: 0;
    right: 0;
    transform: none;
  }
`

function NetworkRow() {
  const [hovered, setHovered] = useState(false)

  return (
    <Container>
      <span>Please make sure your wallet supports selected network</span>
      <QuestionMark
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {hovered && (
        <Help offsetY={14}>
          The network you selected is BSC, please confirm that your withdrawal
          address supports the Binance Smart Chain network. If the other
          platform does not support it, your assets may be lost.
        </Help>
      )}
    </Container>
  )
}

export default NetworkRow
