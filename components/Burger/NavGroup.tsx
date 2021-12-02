import React, { useState } from "react"
import NavButton from "./NavButton"
import styled from "styled-components"
import Link from "next/link"
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
  font-size: 1.3rem;
`

function NavGroup({ title, routes }: NavGroupProps) {
  const [active, setActive] = useState(false)

  return (
    <>
      <NavButton
        active={active}
        title={title}
        onClick={() => setActive(!active)}
      />
      {active && (
        <ul>
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href} passHref>
                <NavLink>{route.title}</NavLink>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default NavGroup
