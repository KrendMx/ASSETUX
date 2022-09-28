import AdaptiveFont from '@/components/common/adaptive-font'
import { mobile } from '@/lib/data/constants'
import styled from 'styled-components'

export const Container = styled(AdaptiveFont).attrs({
  as: 'section',
  mobileFactor: 1.28,
  tabletFactor: 1.25
})`
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--paddings);
`

export const Title = styled.h1`
  font-size: 1.25em;
  font-weight: 700;
  margin-bottom: 1.36em;
  color: #2b2b2b;

  @media only screen and (max-width: ${mobile}px) {
    white-space: pre-line;
  }
`

export const Note = styled.h2`
  margin: 0;
  margin-bottom: 1.36em;
  font-size: 0.94em;
  font-weight: 400;
  color: #2b2b2b;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.042em;
  }
`

export const LoginWrapper = styled.div`
  max-width: 469px;
  width: 100%;
  margin-bottom: 10vh;

  @media only screen and (max-height: 500px) {
    margin-bottom: 0;
  }
`
