import { mobile } from '@/lib/data/constants'
import styled from 'styled-components'
import AdaptiveFont from '../common/adaptive-font'

export const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.33,
  tabletFactor: 1
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - var(--header-height));
`

export const LogoWrapper = styled.div`
  width: 15.5em;
  height: 11em;
`

export const Title = styled.h1`
  font-size: 2.578em;
  font-weight: 500;
  color: var(--black);
  margin: 0.92em 0 0.225em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 2em;
  }
`

export const SubTitle = styled.h2`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  white-space: pre-line;
  text-align: center;
`
