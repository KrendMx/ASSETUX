import React, { useState } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { Magic } from "magic-sdk"

import config from "@/src/config"
import BackendClient from "@/src/BackendClient"
import { mobile } from "@/src/constants"

import InputSelect from "@/shared/InputSelect"
import AdaptiveFont from "@/shared/AdaptiveFont"
import { Form, Button } from "../shared/FormComponents"

const Container = styled(AdaptiveFont).attrs({
  as: "section",
  mobileFactor: 1.28,
  tabletFactor: 1.25
})`
  width: 100%;
  height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--paddings);
`

const Title = styled.h1`
  font-size: 1.25em;
  font-weight: 700;
  margin-bottom: 1.36em;
  color: #2b2b2b;

  @media only screen and (max-width: ${mobile}px) {
    white-space: pre-line;
  }
`

const Note = styled.h2`
  margin: 0;
  margin-bottom: 1.36em;
  font-size: 0.94em;
  font-weight: 400;
  color: #2b2b2b;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.042em;
  }
`

const LoginWrapper = styled.div`
  max-width: 469px;
  width: 100%;
  margin-bottom: 10vh;

  @media only screen and (max-height: 500px) {
    margin-bottom: 0;
  }
`

function LoginContainer() {
  const { t } = useTranslation("profile-login")

  const [email, setEmail] = useState("")

  const login: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    console.log(email)

    // const token = await new Magic(config.magicKey).auth.loginWithMagicLink({
    //   email
    // })
    // console.log(token)
    // if (token) {
    //   const test = await BackendClient.login({
    //     token,
    //     apiHost: selectedBlockchain.url
    //   })
    //   console.log("test", test)
    // }
  }

  return (
    <Container>
      <LoginWrapper>
        <Title>{t("greetings")}</Title>
        <Note>{t("explanation")}</Note>
        <Form gap="1.578em" onSubmit={login} noValidate>
          <InputSelect
            id="email"
            label={t("email")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="coolemail@gmail.com"
            changeable
          />
          <Button type="submit">{t("logIn")}</Button>
        </Form>
      </LoginWrapper>
    </Container>
  )
}

export default LoginContainer
