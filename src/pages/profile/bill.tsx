import React from "react"
import styled from "styled-components"
import { NextSeo } from "next-seo"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/src/shared/BaseContainer"
import HeadingRow from "@/src/components/Profile/shared/HeadingRow"
import BillComponent from "@/src/components/Profile/Bill"

import { EcommerceClient } from "@/src/BackendClients"
import { checkAuthorization } from "@/src/utils/helpers"

import type { GetServerSideProps } from "next"
import type { BillProps } from "@/src/components/Profile/Bill/Bill"

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 3.15em var(--paddings);
  min-height: calc(100vh - var(--header-height));
`

function Bill(props: BillProps) {
  const { t } = useTranslation("profile-bill")

  return (
    <>
      <NextSeo title={t("title")} />
      <Container>
        <HeadingRow heading={t("bill")} id={`M-${props.profile.userId}`} />
        <BillComponent />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  Partial<BillProps>
> = async ({ locale, req }) => {
  const errorProps = {
    props: {},
    redirect: {
      destination: "/profile/login",
      permanent: false
    }
  }

  const token = checkAuthorization(req)

  if (!token) {
    return errorProps
  }

  const profile = await EcommerceClient.getProfile({ token })

  if (profile.state != "success") {
    return errorProps
  }

  return {
    props: {
      profile: profile.data.user,
      ...(await serverSideTranslations(locale!, [
        "header",
        "footer",
        "profile-bill",
        "routes",
        "inputSelect"
      ]))
    }
  }
}

export default Bill
