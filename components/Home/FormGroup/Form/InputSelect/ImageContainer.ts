import styled from "styled-components"

const ImageContainer = styled.div`
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);

  @media only screen and (max-width: 370px) {
    width: 30px;
    height: 30px;
  }
`

export default ImageContainer
