import styled from 'styled-components'

import { mobile } from '@/lib/data/constants'

import Step from './steps'

type ContainerProps = {
  formStep?: Step
  lastSelectorActive?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  /* height: ${(props) =>
    props.formStep == Step.Credentials
      ? '519px'
      : props.lastSelectorActive
      ? '649px'
      : '490px'}; */
  height: auto;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 34px 25px;

  .input-skeleton {
    line-height: 0;
    display: inline-block;
    width: 100%;

    & > span {
      height: 3.421em;

      @media only screen and (max-width: ${mobile}px) {
        height: 4.334em;
      }
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    height: auto;
    padding: 21px 17px;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`
