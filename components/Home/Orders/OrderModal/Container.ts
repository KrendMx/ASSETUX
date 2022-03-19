import styled from "styled-components"
import { mobileLayoutForTablet } from "@/src/constants"

const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px 25px;
  background: var(--white);
  position: fixed;
  overflow-y: hidden;
  font-size: 1rem;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow-y: auto;
  }
`

export default Container
