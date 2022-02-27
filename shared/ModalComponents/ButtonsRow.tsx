import styled from "styled-components"

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;

  & > * + * {
    margin-left: 10px;
  }
`

export default ButtonsRow
