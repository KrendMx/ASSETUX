import styled from 'styled-components'
import { mobile } from '@/lib/data/constants'

type SelectedWrapperProps = {
  selectable: boolean
}

export const SelectedWrapper = styled.button.attrs<SelectedWrapperProps>(
  (props) => ({
    type: props.selectable ? 'button' : undefined
  })
)<SelectedWrapperProps>`
  flex: 0 0 ${(props) => (!props.selectable ? '3.684em' : '5.263em')};
  background: transparent;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1em;
  cursor: ${(props) => (props.selectable ? 'pointer' : 'default')};

  @media only screen and (min-width: 371px) and (max-width: ${mobile}px) {
    flex: 0 0 ${(props) => (!props.selectable ? '3.684em' : '5.6em')};
  }
`

type LabelProps = {
  error?: boolean
  file?: boolean
  pointer?: boolean
}

export const Label = styled.label<LabelProps>`
  font-size: ${(props) => (props.file ? '1em' : '0.79em')};
  font-weight: ${(props) => (props.file ? '500' : '400')};
  color: ${(props) =>
    props.file ? 'var(--blue)' : props.error ? 'var(--red)' : 'var(--gray)'};
  text-decoration: ${(props) => (props.file ? 'underline' : 'none')};
  cursor: ${(props) => (props.file || props.pointer ? 'pointer' : 'default')};

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.file ? '1.066em' : '0.867em')};
  }
`

type InputWrapperProps = {
  active: boolean
  error: boolean
  paleBorders?: boolean
  visuallyDisabled?: boolean
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 3.421em;
  border: 1px solid
    ${(props) => (!props.paleBorders ? '#d2d2d7' : 'var(--lightgray)')};
  outline: none;
  box-shadow: ${(props) =>
    props.error
      ? '0px 0px 0.00000001px 3px #FF3333'
      : props.active
      ? '0px 0px 0.00000001px 3px #8bb0fa'
      : 'none'};
  border-radius: 10px;
  padding: 0 0 0 1.052em;
  background: ${(props) =>
    props.visuallyDisabled ? '#E0E0E0' : 'var(--white)'};

  & > * + * {
    margin-left: 0.789em;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: 4.334em;
  }

  @media only screen and (max-width: 370px) {
    border-radius: 0.675em;
  }
`

type InputContainerProps = {
  swap: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
  flex: 1 1 100%;
  display: flex;
  flex-direction: ${(props) => (props.swap ? 'row' : 'column')};
  align-items: ${(props) => (props.swap ? 'center' : 'stretch')};
  justify-content: flex-start;

  & > * + * {
    margin-top: ${(props) => (!props.swap ? '4px' : 0)};
    margin-left: ${(props) => (props.swap ? '19px' : 0)};
  }

  & > input[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  @media only screen and (max-width: 370px) {
    & > * + * {
      margin-left: ${(props) => (props.swap ? '10px' : 0)};
    }
  }
`

export const Input = styled.input`
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  border: none;
  background-color: transparent;
  outline: none;

  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: var(--black);
    font-size: 1em;
    font-weight: 500;
    color: var(--black);
  }

  &::placeholder {
    color: var(--black);
    opacity: 0.7;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
    -webkit-text-fill-color: var(--black);
    -webkit-box-shadow: 0 0 0px 1000px var(--white) inset;
    box-shadow: 0 0 0px 1000px var(--white) inset;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;

    &:disabled {
      font-size: 1.067em;
    }
  }
`

type InfoContainerProps = {
  onlyImage?: boolean
  active: boolean
  selectable: boolean
}

export const InfoContainer = styled.span<InfoContainerProps>`
  flex: 0 0 ${(props) => (!props.selectable ? '2.631em' : '4.21em')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > *:first-child {
    margin-bottom: ${(props) =>
      props.onlyImage || props.active ? 0 : '0.21em'};
  }
`

export const ImageContainer = styled.div`
  display: block;
  width: 24px;
  height: 24px;

  @media only screen and (max-width: 370px) {
    width: 14px;
    height: 14px;
  }
`

export const ImageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: var(--bgColor);

  @media only screen and (max-width: 370px) {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }
`

type ContainerProps = {
  resetFirstChild: boolean
}

export const Container = styled.div<ContainerProps>`
  font-size: 1rem;

  & > *:not(:last-child) {
    margin-bottom: 0.842em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export const ChangeFileContainer = styled.div`
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 0.5em;
  padding-right: 1em;

  @media only screen and (max-width: ${mobile}px) {
    padding-bottom: 0.85em;
    padding-right: 1em;
  }
`

export const Bold = styled.span`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`

type ArrowProps = {
  active: boolean
}

export const Arrow = styled.span<ArrowProps>`
  display: flex;
  padding: 0.526em;
  position: absolute;
  right: 0.5789em;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.active ? 'rotate(180deg)' : '')};
  font-size: 1em;
`
