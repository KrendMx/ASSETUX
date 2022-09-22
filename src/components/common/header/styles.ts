import styled from 'styled-components'

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: var(--header-height);
  background-color: var(--bgColor);
  box-shadow: 1px 4px 32px rgba(0, 0, 0, 0.06);
  font-size: 1rem;
`

export const OuterContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  margin: 0 auto;
`
