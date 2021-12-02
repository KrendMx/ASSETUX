import React from "react"
import styled from "styled-components"
import NavGroup from "./NavGroup"
import Image from "next/image"
import { Company, Partners, Legal, Popular } from "@/src/routes"

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

  ul {
    list-style: none;
  }
`

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 22px;
  margin-top: 30px;
`

const LinkLogo = styled.a`
  text-decoration: none;
  color: var(--black);
`

function Menu() {
  return (
    <Container>
      <ul>
        <li>
          <NavGroup title="Company" routes={Company} />
        </li>
        <li>
          <NavGroup title="For Partners" routes={Partners} />
        </li>
        <li>
          <NavGroup title="Popular" routes={Popular} />
        </li>
        <li>
          <NavGroup title="Legal" routes={Legal} />
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
