import styled from "styled-components"

type PopupItemProps = {
  active: boolean
}

const PopupItem = styled.span<PopupItemProps>`
  color: ${(props) => (props.active ? "var(--blue)" : "var(--black)")};
`

export default PopupItem
