import React from "react"
import styled from "styled-components"
import { mobile } from "@/src/constants"

const Button = styled.button`
  flex: 0 0 auto;
  color: var(--blue);
  font-size: 0.79em;
  font-weight: 500;
  border: none;
  background: transparent;
  cursor: pointer;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

type CopyProps = {
  label?: string
  valueToCopy?: string
}

function Copy({ label, valueToCopy }: CopyProps) {
  return <Button>{label}</Button>
}

export default Copy
