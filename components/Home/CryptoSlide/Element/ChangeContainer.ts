import styled from "styled-components"

const ChangeContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 4px;
  }
`

export default ChangeContainer
