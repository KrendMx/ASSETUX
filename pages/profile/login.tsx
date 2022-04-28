import Login from "@/components/Profile/Login"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { GetStaticProps } from "next"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile-login",
        "routes"
      ]))
    },
    notFound: true
  }
}

export default Login
