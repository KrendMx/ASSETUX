import styled, { css } from 'styled-components'
import Hideable from '@/components/common/hideable'

type HideableWithMarginProps = {
  margins?: boolean | string
  space?: string
  marginBottom?: boolean
}

const HideableWithMargin = styled(Hideable)<HideableWithMarginProps>`
  margin-top: ${(props) =>
    typeof props.margins == 'string'
      ? props.margins
      : props.margins
      ? '0.842em'
      : '0px'};

  margin-bottom: ${(props) =>
    props.marginBottom
      ? typeof props.margins == 'string'
        ? props.margins
        : props.margins
        ? '0.842em'
        : '0px'
      : ''};

  ${(props) =>
    props.space &&
    css`
      & > * + * {
        margin-top: ${props.space};
      }
    `}
  position: relative;
`

export default HideableWithMargin
