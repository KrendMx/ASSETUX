import styled from "styled-components"
import { mobileLayoutForTablet } from "@/src/constants"

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 30px;

  @media only screen and (max-width: 1230px) {
    padding-top: 34px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    padding-top: 20px;
  }
`

export default GraphContainer
