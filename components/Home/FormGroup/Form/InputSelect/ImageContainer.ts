import styled from "styled-components"

const ImageContainer = styled.div`
  position: relative;
  display: block;
  width: 24px;
  height: 24px;

  @media only screen and (max-width: 370px) {
    width: 14px;
    height: 14px;
  }
`

export default ImageContainer
