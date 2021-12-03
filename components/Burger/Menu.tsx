import React from "react"
import styled from "styled-components"
import NavGroup from "./NavGroup"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import { company, partners, legal, popular } from "@/src/routes"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px var(--paddings);
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 100%;
  min-height: calc(101vh - var(--header-height));
  background-color: var(--bgColor);
  font-size: 1rem;

  ul {
    list-style: none;
  }
`

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
`

const LinkLogo = styled.a`
  text-decoration: none;
  color: var(--black);

  &:not(:last-child) {
    margin-right: 22px;
  }
`

function Menu() {
  const { t } = useTranslation("header")

  return (
    <Container>
      <ul>
        <li>
          <NavGroup title={t("company")} routes={company} />
        </li>
        <li>
          <NavGroup title={t("forPartners")} routes={partners} />
        </li>
        <li>
          <NavGroup title={t("popular")} routes={popular} />
        </li>
        <li>
          <NavGroup title={t("legal")} routes={legal} />
        </li>
      </ul>
      <SocialContainer>
        <LinkLogo href="#">
          <Image
            src="/facebook_dark.svg"
            width={21}
            height={21}
            alt="Facebook"
          />
        </LinkLogo>
        <LinkLogo href="#">
          <Image
            src="/instagram_dark.svg"
            width={21}
            height={21}
            alt="Instagram"
          />
        </LinkLogo>
        <LinkLogo href="#">
          <Image
            src="/telegram_dark.svg"
            width={21}
            height={21}
            alt="Telegram"
          />
        </LinkLogo>
      </SocialContainer>
    </Container>
  )
}

export default Menu
