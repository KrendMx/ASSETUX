import React from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import Container from "./Container"
import LanguageCurrencyChange from "./LanguageCurrencyChange"
import Link from "next/link"
import TextLogo from "@/shared/TextLogo"
import { mobile } from "@/src/constants"
import { useTranslation } from "next-i18next"
import { useAppSelector } from "@/src/redux/hooks"

const DesktopContainer = styled(Container)`
  @media only screen and (max-width: ${mobile}px) {
    display: none;
  }
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

const SkeletonContainer = styled.span`
  width: 80px;
`

function Desktop() {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)
  const { t } = useTranslation("header")

  return (
    <DesktopContainer>
      <TextLogo link />
      <RightContainer>
        <NavContainer>
          <Link href="/404" passHref>
            <NavLink>
              {appLoaded ? (
                t("swap")
              ) : (
                <SkeletonContainer>
                  <Skeleton />
                </SkeletonContainer>
              )}
            </NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>
              {appLoaded ? (
                t("farms")
              ) : (
                <SkeletonContainer>
                  <Skeleton />
                </SkeletonContainer>
              )}
            </NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>
              {appLoaded ? (
                t("blog")
              ) : (
                <SkeletonContainer>
                  <Skeleton />
                </SkeletonContainer>
              )}
            </NavLink>
          </Link>
        </NavContainer>
        <LanguageCurrencyChange />
      </RightContainer>
    </DesktopContainer>
  )
}

export default Desktop
