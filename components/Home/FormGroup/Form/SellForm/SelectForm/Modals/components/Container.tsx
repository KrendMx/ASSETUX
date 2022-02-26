import styled from "styled-components"
import { mobile } from "@/src/constants"

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: calc(100% - 40px);
  background: var(--white);
  margin: 0 20px;
  z-index: 10000;
  border-radius: 10px;
  font-size: 1rem;
  padding: 20px 25px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);

  @media only screen and (max-width: ${mobile}px) {
    margin: 0;
    width: 100%;
    padding: 14px;
  }
`

export default Container
