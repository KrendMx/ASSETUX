import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { StyledList, StyledLink } from './styles'

import type { Route } from '@/lib/routes'

type ListProps = {
  routes: Route[]
  mobileSmall?: boolean
  onClick?: (route: Route) => void
}

const List = ({ routes, mobileSmall, onClick }: ListProps) => {
  const { t } = useTranslation('routes')

  return (
    <StyledList>
      {routes.map((route, index) => (
        <li key={index}>
          {route.absolute && (
            <StyledLink
              href={route.href}
              target="_blank"
              rel="noreferrer"
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
          )}
          {!route.absolute && (
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
          )}
        </li>
      ))}
    </StyledList>
  )
}

export default List
