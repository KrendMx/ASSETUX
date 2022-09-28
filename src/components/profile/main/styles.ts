import AdaptiveFont from '@/components/common/adaptive-font'
import { mobile, tablet } from '@/lib/data/constants'
import styled from 'styled-components'
import { Paragraph } from '../common/form-components'

export const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  width: 100%;
  max-width: 574px;
  display: grid;
  row-gap: 2.1em;

  @media only screen and (max-width: ${mobile}px) {
    gap: 1.466em;
  }
`

export const Flex = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  /* max-width: 574px; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;

  @media only screen and (max-width: ${tablet}px) {
    flex-direction: column-reverse;
  }
`

export const Label = styled(Paragraph)`
  margin-top: 16px;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 20px;
  word-break: break-all;
`
