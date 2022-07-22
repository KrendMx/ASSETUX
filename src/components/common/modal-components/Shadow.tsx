import styled from "styled-components"

const Shadow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: var(--white);
  flex-shrink: 0;

  @media only screen and (max-width: 370px) {
    width: 2.853em;
    height: 2.853em;
    border-radius: 0.72em;
  }
`

export default Shadow
