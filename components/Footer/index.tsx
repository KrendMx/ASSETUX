import React from "react"
import styled from "styled-components"
import { company, partners, popular, legal } from "@/src/routes"
import { useTranslation } from "next-i18next"
import List from "./List"

type WrapperProps = {
  hide: boolean
}

const Wrapper = styled.footer<WrapperProps>`
  background-color: var(--black);
  display: ${(props) => (props.hide ? "none" : "block")};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 97px var(--paddings);

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    padding: 26px var(--paddings);
    row-gap: 25px;
  }
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--white);
  font-size: 1rem;
  gap: 23px;

  & > h3 {
    color: #6e6e73;
    font-weight: 600;
    font-size: 1em;
  }

  @media only screen and (max-width: 800px) {
    gap: 5px;
  }
`

type FooterProps = {
  hide: boolean
}

function Footer({ hide }: FooterProps) {
  const { t } = useTranslation("footer")

  return (
    <Wrapper hide={hide}>
      <Container>
        <Group>
          <h3>{t("company")}</h3>
          <List routes={company} />
        </Group>
        <Group>
          <h3>{t("forPartners")}</h3>
          <List routes={partners} />
        </Group>
        <Group>
          <h3>{t("popular")}</h3>
          <List routes={popular} />
        </Group>
        <Group>
          <h3>{t("legal")}</h3>
          <List routes={legal} />
        </Group>
        <Group>
          <h3>{t("social")}</h3>
        </Group>
        <Group>
          <h3>{t("support")}</h3>
        </Group>
      </Container>
    </Wrapper>
  )
}

export default Footer
