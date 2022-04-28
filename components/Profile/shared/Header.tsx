import styled from "styled-components"

type HeaderProps = {
  heading: string
  id: string
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  margin-bottom: 55px;
`

const Heading = styled.h1`
  line-height: 0.7em;
`

const Identificator = styled.div`
  font-weight: 400;
  color: var(--gray);
  text-align: right;
  font-size: 0.79em;

  & span {
    color: var(--black);
    font-size: 1.265em;
    font-weight: 500;
  }
`

function HeaderContainer({ heading, id }: HeaderProps) {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Identificator>
        ID
        <br />
        <span>{id}</span>
      </Identificator>
    </Container>
  )
}

export default HeaderContainer
