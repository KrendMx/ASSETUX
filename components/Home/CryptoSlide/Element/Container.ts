import styled from "styled-components"
import AdaptiveFont from "@/shared/AdaptiveFont"
import { mobileLayoutForTablet, mobile } from "@/src/constants"

type ContainerProps = {
  active: boolean
}

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1,
  tabletFactor: 1.25
})<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: ${(props) => (props.active ? "245px" : "177px")};
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  transition: height 0.2s linear;
  padding: 27px 29px;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 21px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    height: 199px;
    padding: 15px 14px;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 375px) {
    font-size: 1.8em;
  }
`

export default Container
