import styled from "styled-components"
import { mobile } from "@/lib/data/constants"

const Container = styled.div`
  position: fixed;
  max-width: 469px;
  width: calc(100% - 40px);
  padding: 0.7368em 1.315em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  border-radius: 0.526em;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  font-size: 1rem;

  @media only screen and (max-width: ${mobile}px) {
    border-radius: 0.666em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export default Container
