import styled from "styled-components"
import { mobile } from "@/src/constants"

type InputWrapperProps = {
  active: boolean
  error: boolean
  paleBorders?: boolean
  visuallyDisabled?: boolean
}

const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 3.421em;
  border: 1px solid
    ${(props) => (!props.paleBorders ? "#d2d2d7" : "var(--lightgray)")};
  outline: none;
  box-shadow: ${(props) =>
    props.error
      ? "0px 0px 0.00000001px 3px #FF3333"
      : props.active
      ? "0px 0px 0.00000001px 3px #8bb0fa"
      : "none"};
  border-radius: 10px;
  padding: 0 0 0 1.052em;
  background: ${(props) =>
    props.visuallyDisabled ? "#E0E0E0" : "var(--white)"};

  & > * + * {
    margin-left: 0.789em;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: 4.334em;
  }

  @media only screen and (max-width: 370px) {
    border-radius: 0.675em;
  }
`

export default InputWrapper
