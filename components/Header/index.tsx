import React from "react"
import styled from "styled-components"
import Link from "next/link"
import LanguageChange from "@/shared/Headers/LanguageChange"
import Wrapper from "@/shared/Headers/Wrapper"
import TextLogo from "@/shared/TextLogo"

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
  gap: 32px;
  align-items: center;

  @media only screen and (max-width: 800px) {
    gap: 20px;
  }
`

const NavContainer = styled.nav`
  display: flex;
  height: 100%;
  flex-direction: row;
`

const NavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--black);

  @media only screen and (max-width: 800px) {
    padding: 0 15px;
  }
`

function Header() {
  return (
    <Wrapper>
      <OuterContainer>
        <InnerContainer>
          <TextLogo link />
          <RightContainer>
            <NavContainer>
              <Link href="/404" passHref>
                <NavLink>Swap</NavLink>
              </Link>
              <Link href="/404" passHref>
                <NavLink>Farms</NavLink>
              </Link>
              <Link href="/404" passHref>
                <NavLink>Assetux Blog</NavLink>
              </Link>
            </NavContainer>
            <LanguageChange>EN</LanguageChange>
          </RightContainer>
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  )
}

export default Header
