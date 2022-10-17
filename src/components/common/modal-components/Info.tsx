import styled from 'styled-components'

type InfoProps = {
  misc?: boolean
  margin?: string
}

const Info = styled.p<InfoProps>`
  margin: ${(props) => props.margin || '0.786em 0;'};
  padding: 0;
  font-size: 0.87em;
  color: var(--black);
  font-weight: ${(props) => (props.misc ? 400 : 500)};

  &:last-child {
    margin-bottom: 0;
  }
`

export default Info
