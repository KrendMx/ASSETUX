import styled from 'styled-components'

type HideableProps = {
  hide: boolean
}

const Hideable = styled.div<HideableProps>`
  display: ${(props) => (props.hide ? 'none' : 'block')};
`

export default Hideable
