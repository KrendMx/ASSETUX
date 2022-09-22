import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px var(--paddings);
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 100%;
  min-height: calc(101vh - var(--header-height));
  background-color: var(--bgColor);
  font-size: 1rem;

  ul {
    list-style: none;
  }

  @media only screen and (max-width: 310px) {
    font-size: 0.85rem;
  }
`

export default Container
