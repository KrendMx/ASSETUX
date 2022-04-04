import React, { useState } from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import NavButton from "../NavButton"
import NavLink from "../NavLink"

import type { Route } from "@/src/routes"

type NavGroupProps = {
  title: string
  routes: Route[]
  onClick?: (route: Route) => void
}

function NavGroup({ title, routes, onClick }: NavGroupProps) {
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
              {route.absolute && (
                <NavLink
                  href={route.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                    if (onClick) {
                      event.preventDefault()
                      onClick(route)
                    }
                  }}
                >
                  {t(route.key)}
                </NavLink>
              )}
              {!route.absolute && (
                <Link href={route.href} passHref>
                  <NavLink
                    onClick={(event) => {
                      if (onClick) {
                        event.preventDefault()
                        onClick(route)
                      }
                    }}
                  >
                    {t(route.key)}
                  </NavLink>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default NavGroup
