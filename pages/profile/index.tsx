import React from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BaseContainer from "@/shared/BaseContainer"
import HeadingRow from "@/components/Profile/shared/HeadingRow"
import FormGroup from "@/components/Profile/Main/FormGroup"

import { EcommerceClient } from "@/src/BackendClients"
import { checkAuthorization } from "@/src/helpers"

import type { GetServerSideProps } from "next"
import type { FormGroupProps } from "@/components/Profile/Main/FormGroup"

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  padding: 3.15em var(--paddings);
`

type MainProps = FormGroupProps

function Main(props: MainProps) {
  const { t } = useTranslation("profile")

  return (
    <Container>
      <HeadingRow heading={t("profile")} id="M-0000001" />
      <FormGroup {...props} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<
  Partial<MainProps>
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
      ...profile.data.user,
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
