import styled from "styled-components"

type ElementProps = {
  basis: number
}

const Element = styled.div.attrs<ElementProps>(({ basis }) => ({
  style: {
    flex: `0 0 ${basis}px`
  }
}))<ElementProps>``

export default Element
