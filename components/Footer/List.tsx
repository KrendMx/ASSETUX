import React from "react"
import styled from "styled-components"
import Link from "next/link"
import type { Route } from "@/src/routes"
import { useTranslation } from "next-i18next"
import StyledList from "./StyledList"

const StyledLink = styled.a`
  display: block;
  text-decoration: none;
  color: var(--white);
  padding: 7px 0;
  font-weight: 400;
  font-size: 0.8em;

  @media only screen and (max-width: 550px) {
    font-size: 1em;
  }
`

type ListProps = {
  routes: Route[]
}

function List({ routes }: ListProps) {
  const { t } = useTranslation("routes")

  return (
    <StyledList>
      {routes.map((route, index) => (
        <li key={index}>
          <Link href={route.href} passHref>
            <StyledLink>{t(route.key)}</StyledLink>
          </Link>
        </li>
      ))}
    </StyledList>
  )
}

export default List
