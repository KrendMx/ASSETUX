import styled from "styled-components"

type FormProps = {
  gap?: string
}

const Form = styled.form<FormProps>`
  width: 100%;
  display: grid;
  padding: 1em 1.631em 1.578em;
  gap: ${(props) => props.gap || "0.789em"};
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  border-radius: 10px;

  @media only screen and (max-width: ${370}px) {
    border-radius: 0.676em;
  }
`

export default Form
