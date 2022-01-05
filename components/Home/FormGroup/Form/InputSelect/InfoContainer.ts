import styled from "styled-components"
import { mobile } from "@/src/constants"

type InfoContainerProps = {
  onlyImage?: boolean
  selectable: boolean
}

const InfoContainer = styled.div<InfoContainerProps>`
  flex: 0 0 ${(props) => (!props.selectable ? "50px" : "80px")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > *:first-child {
    margin-bottom: ${(props) => (props.onlyImage ? 0 : "4px")};
  }

  @media only screen and (max-width: ${mobile}px) {
    flex-basis: 75px;
  }

  @media only screen and (max-width: 370px) {
    flex-basis: 60px;
  }
`

export default InfoContainer
