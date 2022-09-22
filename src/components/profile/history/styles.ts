import styled from 'styled-components'
import AdaptiveFont from '@/components/common/adaptive-font'

export const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  & > * + * {
    margin-top: 2.105em;
  }
`

export const ControlsRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const NoAssets = styled.p`
  box-shadow: 1px 4px 19px rgb(0 0 0 / 12%);
  background-color: var(--bgColor);
  font-size: 1em;
  color: var(--black);
  text-align: center;
  padding: 2em 0;
  border-radius: 10px;
`
