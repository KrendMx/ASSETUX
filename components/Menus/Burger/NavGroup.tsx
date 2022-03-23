import React, { useState } from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import NavButton from "../NavButton"
import NavLink from "../NavLink"

import type { Route } from "@/src/routes"

type NavGroupProps = {
  title: string
  routes: Route[]
}

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
