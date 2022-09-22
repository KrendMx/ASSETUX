import styled from 'styled-components'

export const Button = styled.button`
  z-index: 9999;
  position: fixed;
  bottom: 18px;
  left: 18px;
  width: 49px;
  height: 49px;
  cursor: pointer;
  background: var(--blue);
  outline: none;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 22px;
    color: #ffffff;
  }
`
