import styled from "styled-components"

const Title = styled.h5`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.935em;
  font-weight: 500;
  color: var(--black);
  margin-bottom: 24px;

  & > * + * {
    margin-left: 10px;
  }
`

export default Title
