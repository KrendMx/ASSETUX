import styled from 'styled-components'

const BackgroundLocal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
`

const ScrolledBlock = styled.div<{ height: string }>`
  height: ${(props) => props.height}!important;
  width: 100%;
  overflow-y: scroll;
`

export { BackgroundLocal, ScrolledBlock }
