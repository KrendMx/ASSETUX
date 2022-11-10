import styled from 'styled-components'
import { mobile } from '@/lib/data/constants'

type AdaptiveFontProps = {
  mobileFactor: number
  tabletFactor: number
  desktopFactor?: number
}

const AdaptiveFont = styled.div<AdaptiveFontProps>`
  font-size: ${(props) =>
    props.desktopFactor ? `${props.desktopFactor}em` : '1em'};

  @media only screen and (max-width: 1340px) {
    font-size: ${(props) => `${props.tabletFactor}em`};
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => `${props.mobileFactor}em`};
  }
`

export default AdaptiveFont
