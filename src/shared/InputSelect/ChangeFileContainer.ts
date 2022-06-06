import styled from "styled-components"
import { mobile } from "@/src/utils/constants"

const ChangeFileContainer = styled.div`
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 0.5em;
  padding-right: 1em;

  @media only screen and (max-width: ${mobile}px) {
    padding-bottom: 0.85em;
    padding-right: 1em;
  }
`

export default ChangeFileContainer
