import styled from "styled-components"

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: var(--header-height);
  background-color: var(--bgColor);
  box-shadow: 1px 4px 32px rgba(0, 0, 0, 0.06);
  font-size: 1rem;
`

export default Wrapper
