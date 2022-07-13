import LoginComponent from "@/components/Profile/Login"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { getDefaultMetaTags } from "@/lib/utils/seo"
import { getEcommercePrefix } from "@/lib/utils/helpers"

import type { GetStaticProps } from "next"

function Login() {
  const { t } = useTranslation("profile-login")

  return (
    <>
      <NextSeo
        {...getDefaultMetaTags({
          ecommerce: true,
          title: t("title"),
          description: t("description"),
          pathname: `${getEcommercePrefix()}/login`
        })}
      />
      <LoginComponent />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile-login",
        "routes"
      ]))
    }
  }
}

export default Login
