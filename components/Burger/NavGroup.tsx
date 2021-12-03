import React, { useState } from "react"
import NavButton from "./NavButton"
import styled from "styled-components"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import type { Route } from "@/src/routes"

type NavGroupProps = {
  title: string
  routes: Route[]
}

const NavLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px 0;
  text-decoration: none;
  color: var(--gray);
  font-weight: 400;
  font-size: 1.3em;
`

function NavGroup({ title, routes }: NavGroupProps) {
  const [active, setActive] = useState(false)
  const { t } = useTranslation("routes")

  return (
    <>
      <NavButton
        active={active}
        title={title}
        onClick={() => setActive(!active)}
      />
      {active && (
        <ul>
          {routes.map((route, index) => (
            <li key={index}>
              <Link href={route.href} passHref>
                <NavLink>{t(route.key)}</NavLink>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default NavGroup
