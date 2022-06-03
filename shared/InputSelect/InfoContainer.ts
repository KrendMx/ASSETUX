import styled from "styled-components"

type InfoContainerProps = {
  onlyImage?: boolean
  active: boolean
  selectable: boolean
}

const InfoContainer = styled.span<InfoContainerProps>`
  flex: 0 0 ${(props) => (!props.selectable ? "2.631em" : "4.21em")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > *:first-child {
    margin-bottom: ${(props) =>
      props.onlyImage || props.active ? 0 : "0.21em"};
  }
`

export default InfoContainer
