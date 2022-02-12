import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import StyledList from "./StyledList"
import { mobile } from "@/src/constants"

import type { Route } from "@/src/routes"

type StyledLinkProps = {
  mobileSmall?: boolean
}

const StyledLink = styled.a<StyledLinkProps>`
  display: block;
  text-decoration: none;
  color: var(--white);
  padding: 7px 0;
  font-weight: 400;
  font-size: 0.8em;

  @media only screen and (max-width: 750px) {
    font-size: ${(props) => (props.mobileSmall ? "0.7em" : "0.8em")};
    padding: ${(props) => (props.mobileSmall ? "6px 0" : "7px 0")};
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.mobileSmall ? "0.86em" : "1em")};
  }
`

type ListProps = {
  routes: Route[]
  mobileSmall?: boolean
  onClick?: (route: Route) => void
}

function List({ routes, mobileSmall, onClick }: ListProps) {
  const { t } = useTranslation("routes")

  return (
    <StyledList>
      {routes.map((route, index) => (
        <li key={index}>
          <Link href={route.href} passHref>
            <StyledLink
              mobileSmall={mobileSmall}
              onClick={(event) => {
                if (onClick) {
                  event.preventDefault()
                  onClick(route)
                }
              }}
            >
              {t(route.key)}
            </StyledLink>
          </Link>
        </li>
      ))}
    </StyledList>
  )
}

export default List
