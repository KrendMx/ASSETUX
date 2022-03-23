import styled from "styled-components";


type HeaderProps = {
    heading: string;
    id: string
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  margin-bottom: 55px;
`

const Heading = styled.h1`
  line-height: .7em;
`

const Identificator = styled.div`
  font-weight: 400;
  color: var(--gray);
  font-size: .78rem;
  text-align: right;

  & span {
    color: var(--black);
    font-size: 1rem;
  }
`

function HeaderContainer({heading, id}: HeaderProps) {
    return (
        <Header>
            <Heading>{heading}</Heading>
            <Identificator>
                ID<br/>
                <span>{id}</span>
            </Identificator>
        </Header>
    )
}

export default HeaderContainer;
