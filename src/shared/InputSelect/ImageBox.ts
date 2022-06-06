import styled from "styled-components"

const ImageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: var(--bgColor);

  @media only screen and (max-width: 370px) {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }
`

export default ImageBox
