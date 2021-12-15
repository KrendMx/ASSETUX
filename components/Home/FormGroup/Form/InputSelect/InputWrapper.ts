import styled from "styled-components"
import { mobile } from "@/src/constants"

type InputWrapperProps = {
  active: boolean
  bigger: boolean
}

const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid #d2d2d7;
  outline: none;
  box-shadow: ${(props) =>
    props.active ? "0px 0px 0.00000001px 3px #8bb0fa" : "none"};
  border-radius: 10px;
  padding: ${(props) => (props.bigger ? "12px" : "10px")} 20px;
  font-size: 1rem;

  & > * + * {
    margin-left: 15px;
  }

  @media only screen and (max-width: ${mobile}px) {
    padding: 11px 15px;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export default InputWrapper
