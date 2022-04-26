import Main from "@/components/Profile/Main"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { GetStaticProps } from "next"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile",
        "routes"
      ]))
    }
  }
}

export default Main
