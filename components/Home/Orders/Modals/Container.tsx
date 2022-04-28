import styled from "styled-components"

const Container = styled.div`
  position: fixed;
  max-width: 469px;
  width: calc(100% - 40px);
  padding: 14px 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  font-size: 1rem;

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export default Container
