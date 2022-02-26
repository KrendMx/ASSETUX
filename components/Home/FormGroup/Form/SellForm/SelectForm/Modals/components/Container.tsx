import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: calc(100% - 40px);
  background: var(--white);
  margin: 0 20px;
  z-index: 10000;
  border-radius: 10px;
  font-size: 1rem;
  padding: 14px;
`

export default Container
