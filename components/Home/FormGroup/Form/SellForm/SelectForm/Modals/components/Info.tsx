import styled from "styled-components"

type InfoProps = {
  misc?: boolean
}

const Info = styled.p<InfoProps>`
  margin: 13px 0;
  padding: 0;
  font-size: 0.87em;
  color: var(--black);
  font-weight: ${(props) => (props.misc ? 400 : 500)};
`

export default Info
