import styled from 'styled-components'
import NavLink from '../../common/nav-link'

type ActiveNavLinkProps = {
  active: boolean
}

export const ActiveNavLink = styled(NavLink)<ActiveNavLinkProps>`
  color: ${(props) => (!props.active ? 'var(--gray)' : 'var(--blue)')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & > * + * {
    margin-left: 12px;
  }
`
