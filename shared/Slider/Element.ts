import styled from "styled-components"

type ElementProps = {
  basis: number
}

const Element = styled.div<ElementProps>`
  flex: 0 0 ${(props) => `${props.basis}px`};
`

export default Element
