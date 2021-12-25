import styled from "styled-components"
import { mobile } from "@/src/constants"

type InputWrapperProps = {
  active: boolean
  error: boolean
  selectable: boolean
}

const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 65px;
  border: 1px solid
    ${(props) => (props.selectable ? "#d2d2d7" : "var(--lightgray)")};
  outline: none;
  box-shadow: ${(props) =>
    props.error
      ? "0px 0px 0.00000001px 3px #FF3333"
      : props.active
      ? "0px 0px 0.00000001px 3px #8bb0fa"
      : "none"};
  border-radius: 10px;
  padding: 0 20px;
  font-size: 1rem;

  & > * + * {
    margin-left: 15px;
  }

  @media only screen and (max-width: ${mobile}px) {
    padding: 0 15px;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export default InputWrapper
