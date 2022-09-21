import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setOrdersActive } from "@/lib/redux/ui"
import Configure from "../configure"
import TextLogo from "@/components/common/text-logo"

import { commerce } from "@/lib/routes"
import { logout, getEcommercePrefix } from "@/lib/utils/helpers"
import { env } from "@/lib/env/client.mjs"
import {
  DesktopContainer,
  NavContainer,
  NavLink,
  RightContainer
} from "./style"

const Desktop = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const merchantMode = useAppSelector((state) => state.ui.merchantMode)
  const { t } = useTranslation("header")

  const isMainPage = router.pathname == "/"
  const isCommercePage =
    router.pathname.startsWith("/profile") &&
    router.pathname != "/profile/login"
  const isCommerceLogin = router.pathname == "/profile/login"

  return (
    <DesktopContainer>
      <TextLogo />
      <RightContainer>
        <NavContainer>
          {/* <Link href="/404" passHref>
            <NavLink>{t("swap")}</NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>{t("farms")}</NavLink>
          </Link>
          <Link href="/404" passHref>
            <NavLink>{t("blog")}</NavLink>
          </Link> */}
          {isCommercePage && merchantMode && (
            <>
              {commerce(merchantMode).map((route) => (
                <Link href={route.href} key={route.href} passHref>
                  <NavLink>{t(route.key)}</NavLink>
                </Link>
              ))}
              <NavLink
                as="button"
                onClick={() => {
                  logout()
                  router.push(`${getEcommercePrefix()}/login`)
                }}
              >
                {t("exit")}
              </NavLink>
            </>
          )}
          {isMainPage && (
            <NavLink
              as="button"
              onClick={() => dispatch(setOrdersActive(true))}
            >
              {t("header:operations")}
            </NavLink>
          )}
          {!isCommercePage &&
            !isCommerceLogin &&
            (env.isStage ? (
              <Link
                href={
                  process.env.NODE_ENV == "development"
                    ? "/profile"
                    : "https://commerce.dev.assetux.com/profile"
                }
                passHref
              >
                <NavLink>{t("commerce")}</NavLink>
              </Link>
            ) : (
              <NavLink href="https://commerce.assetux.com/profile">
                {t("commerce")}
              </NavLink>
            ))}
        </NavContainer>
        <Configure />
      </RightContainer>
    </DesktopContainer>
  )
}

export default Desktop
