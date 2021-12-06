import styled from "styled-components"
import { mobile, tablet } from "@/src/constats"

type AdaptiveFontProps = {
  mobileFactor: number
  tabletFactor: number
}

const AdaptiveFont = styled.div<AdaptiveFontProps>`
  font-size: 1em;

  @media only screen and (max-width: ${tablet}px) {
    font-size: ${(props) => `${props.tabletFactor}em`};
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => `${props.mobileFactor}em`};
  }
`

export default AdaptiveFont
