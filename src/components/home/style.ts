import { mobile, mobileLayoutForTablet } from '@/lib/data/constants'
import styled from 'styled-components'
import BaseContainer from '../common/base-container'

export const Container = styled(BaseContainer)`
  & > section:not(:last-child) {
    margin-bottom: 6.84em;
  }

  & > section:first-child {
    margin-bottom: 7.89em;
  }

  & > section:nth-child(2) {
    margin-bottom: 7.31em;
  }

  & > section:nth-child(3) {
    margin-bottom: 8.63em;
  }

  & > section:nth-last-child(2) {
    margin-bottom: 3.57em;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    & > section:not(:last-child),
    & > section:nth-last-child(2) {
      margin-bottom: 7.4em;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > section:first-child {
      margin-bottom: 7em;
    }
  }
`
