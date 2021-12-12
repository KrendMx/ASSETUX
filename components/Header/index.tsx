import React from "react"
import styled from "styled-components"
import Link from "next/link"
import LanguageCurrencyChange from "@/shared/Headers/LanguageCurrencyChange"
import Wrapper from "@/shared/Headers/Wrapper"
import TextLogo from "@/shared/TextLogo"
import { useTranslation } from "next-i18next"

const OuterContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  margin: 0 auto;
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 var(--paddings);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const RightContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`

const NavContainer = styled.nav`
  display: flex;
  height: 100%;
  flex-direction: row;
  margin-right: 32px;

  @media only screen and (max-width: 800px) {
    margin-right: 10px;
  }
`

const NavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40px;
  font-size: 0.95em;
  font-weight: 500;
  text-decoration: none;
  color: var(--black);

  @media only screen and (max-width: 800px) {
    padding: 0 15px;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 12px;
  }
`

function Header() {
  const { t } = useTranslation("header")

  return (
    <Wrapper>
      <OuterContainer>
        <InnerContainer>
          <TextLogo link />
          <RightContainer>
            <NavContainer>
              <Link href="/404" passHref>
                <NavLink>{t("swap")}</NavLink>
              </Link>
              <Link href="/404" passHref>
                <NavLink>{t("farms")}</NavLink>
              </Link>
              <Link href="/404" passHref>
                <NavLink>{t("blog")}</NavLink>
              </Link>
            </NavContainer>
            <LanguageCurrencyChange />
          </RightContainer>
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  )
}

export default Header
