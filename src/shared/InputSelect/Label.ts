import styled, { css } from "styled-components"
import { mobile } from "@/lib/data/constants"

type LabelProps = {
  error?: boolean
  file?: boolean
  pointer?: boolean
}

const Label = styled.label<LabelProps>`
  font-size: ${(props) => (props.file ? "1em" : "0.79em")};
  font-weight: ${(props) => (props.file ? "500" : "400")};
  color: ${(props) =>
    props.file ? "var(--blue)" : props.error ? "var(--red)" : "var(--gray)"};
  text-decoration: ${(props) => (props.file ? "underline" : "none")};
  cursor: ${(props) => (props.file || props.pointer ? "pointer" : "default")};

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.file ? "1.066em" : "0.867em")};
  }
`

export default Label
