import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"
import { Form as SharedForm } from "../shared/FormComponents"

import { mobile, tablet } from "@/utils/constants"

export const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})``

export const Paragraph = styled.p`
  margin: 1em 0;
  color: #2b2b2b;
`

export const List = styled.ol`
  padding-left: 1.1em;
`

export const Item = styled.li`
  color: #2b2b2b;
`

export const FormContainer = styled.div`
  max-width: 574px;
  width: 100%;
  margin-top: 1.5em;
`

type FormProps = {
  getActive?: boolean
}

export const Form = styled(SharedForm)<FormProps>`
  height: ${(props) => (props.getActive ? "570px" : "427px")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .button-skeleton {
    line-height: 0;
    display: block;
    width: 100%;

    & > span {
      height: 49px;

      @media only screen and (max-width: 370px) {
        height: 3.308em;
      }
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) => (props.getActive ? "550px" : "407px")};
  }

  @media only screen and (max-width: 370px) {
    height: ${(props) => (props.getActive ? "36em" : "27em")};
  }
`

export const FormContent = styled.div`
  font-size: 1rem;

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }

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
`

export const ExchangeInfoWrapper = styled.div`
  @media only screen and (max-width: ${mobile}px) {
    font-size: 1rem;
  }
`
