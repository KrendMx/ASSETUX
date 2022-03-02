import styled from "styled-components"

type InputContainerProps = {
  swap: boolean
}

const InputContainer = styled.div<InputContainerProps>`
  flex: 1 1 100%;
  display: flex;
  flex-direction: ${(props) => (props.swap ? "row" : "column")};
  align-items: ${(props) => (props.swap ? "center" : "stretch")};
  justify-content: flex-start;

  & > * + * {
    margin-top: ${(props) => (!props.swap ? "4px" : 0)};
    margin-left: ${(props) => (props.swap ? "19px" : 0)};
  }

  @media only screen and (max-width: 370px) {
    & > * + * {
      margin-left: ${(props) => (props.swap ? "10px" : 0)};
    }
  }
`

export default InputContainer
