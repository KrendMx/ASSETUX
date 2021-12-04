import styled from "styled-components"

type AdaptiveFontProps = {
  mobileFactor: number
  tabletFactor: number
}

const AdaptiveFont = styled.div<AdaptiveFontProps>`
  font-size: 1em;

  @media only screen and (max-width: 1340px) {
    font-size: ${(props) => `${props.tabletFactor}em`};
  }

  @media only screen and (max-width: 495px) {
    font-size: ${(props) => `${props.mobileFactor}em`};
  }
`

export default AdaptiveFont
