import styled from "styled-components"
import { mobile } from "@/src/utils/constants"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.894em;
`

const Heading = styled.h1`
  line-height: 1;
`

const Identificator = styled.div`
  font-weight: 400;
  color: var(--gray);
  text-align: right;
  font-size: 16px;

  & > span:first-child {
    line-height: 1.5;
  }

  & > span:last-child {
    color: var(--black);
    font-size: 19px;
    font-weight: 500;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.155em;

    & > span:last-child {
      font-size: 1.23em;
    }
  }
`

type HeadingRowProps = {
  heading: string
  id: string
}

function HeadingRow({ heading, id }: HeadingRowProps) {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Identificator>
        <span>ID</span>
        <br />
        <span>{id}</span>
      </Identificator>
    </Container>
  )
}

export default HeadingRow
