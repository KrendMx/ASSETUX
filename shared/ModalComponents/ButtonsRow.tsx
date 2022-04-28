import styled from "styled-components"

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.789em;

  & > * + * {
    margin-left: 0.526em;
  }
`

export default ButtonsRow
