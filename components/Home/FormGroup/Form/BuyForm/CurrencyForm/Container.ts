import styled from "styled-components"
import { mobile } from "@/src/constants"

const Container = styled.div`
  width: 100%;
  height: 465px;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: ${mobile}px) {
    height: 425px;
  }
`

export default Container
