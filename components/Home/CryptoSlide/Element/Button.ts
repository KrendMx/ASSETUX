import styled from "styled-components"
import { mobile } from "@/src/constants"

export const Button = styled.button`
  flex: 1 1 auto;
  display: flex;
  height: 49px;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.843em;
  background: var(--white);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.79em;
  }
`

export const BuyButton = styled(Button)`
  color: var(--green);
`

export const SellButton = styled(Button)`
  color: var(--red);
`
