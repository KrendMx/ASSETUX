import styled from "styled-components"
import { mobileLayoutForTablet } from "@/src/constants"

const DataContainer = styled.div`
  max-height: 550px;
  overflow-y: auto;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    max-height: none;
    overflow-y: visible;
  }
`

export default DataContainer
