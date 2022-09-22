import styled from 'styled-components'

type RowProps = {
  centerContent?: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: ${(props) =>
    props.centerContent ? 'center' : 'space-between'};
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 12px;
  }
`

type ButtonProps = {
  active?: boolean
  nonClickable?: boolean
}

export const Button = styled.button<ButtonProps>`
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.active ? 'var(--blue)' : 'var(--lightgray)')};
  border-radius: 7px;
  font-size: 13px;
  color: ${(props) => (props.active ? '#ffffff' : 'var(--gray)')};
  cursor: ${(props) => (props.nonClickable ? 'arrow' : 'pointer')};

  &:disabled {
    opacity: var(--opacity);
  }
`

type ArrowContainerProps = {
  mirror?: boolean
}

export const ArrowContainer = styled.span<ArrowContainerProps>`
  display: flex;
  font-size: 20px;

  transform: rotate(${(props) => (props.mirror ? '180deg' : '0')});
`
