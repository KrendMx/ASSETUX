import styled from "styled-components"
import { mobile } from "@/src/constants"

type InfoContainerProps = {
  onlyImage?: boolean
  active: boolean
}

const InfoContainer = styled.div<InfoContainerProps>`
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;

  & > *:first-child {
    margin-bottom: ${(props) => (props.onlyImage || props.active ? 0 : "4px")};
  }

  @media only screen and (max-width: ${mobile}px) {
    flex-basis: 75px;
  }

  @media only screen and (max-width: 370px) {
    flex-basis: 60px;
  }
`

export default InfoContainer
