import styled from "styled-components"

type FormProps = {
  gap?: string
}

const Form = styled.section<FormProps>`
  width: 100%;
  display: grid;
  padding: 19px 25px;
  gap: ${(props) => props.gap || "15px"};
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`

export default Form
