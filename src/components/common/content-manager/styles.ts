import { mobile } from '@/lib/data/constants'
import styled from 'styled-components'
import { ContainerProps, WrapperProps } from './types.content-manager'

export const Wrapper = styled.main<WrapperProps>`
  width: 100%;
  background-color: var(--bgColor);
  display: ${(props) => (props.hide ? 'none' : 'block')};
`

export const Container = styled.div<ContainerProps>`
  width: 100%;
  font-size: 1rem;

  @media only screen and (max-width: 1340px) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 1230px) {
    font-size: 0.7rem;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 3vw;
  }
`
