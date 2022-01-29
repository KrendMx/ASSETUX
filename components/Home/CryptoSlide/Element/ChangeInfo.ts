import styled from "styled-components"
import { mobile } from "@/src/constants"

type ChangeInfoProps = {
  up?: boolean
}

const ChangeInfo = styled.span<ChangeInfoProps>`
  color: ${(props) => (props.up ? "var(--green)" : "var(--red)")};
  font-size: 1em;
  font-weight: 500;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.79em;
  }
`

export default ChangeInfo
