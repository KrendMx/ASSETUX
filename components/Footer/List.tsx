import React from "react"
import styled from "styled-components"
import Link from "next/link"
import type { Route } from "@/src/routes"
import { useTranslation } from "next-i18next"

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`

const StyledLink = styled.a`
  display: block;
  text-decoration: none;
  color: var(--white);
  padding: 7px 0;
  font-weight: 400;
  font-size: 0.8em;
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
