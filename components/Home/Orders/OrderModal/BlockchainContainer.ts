import styled from "styled-components"

const BlockchainContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * + * {
    margin-left: 8px;
  }
`

export default BlockchainContainer
