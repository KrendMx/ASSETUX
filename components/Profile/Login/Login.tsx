import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { Magic } from "magic-sdk"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

import config from "@/src/config"
import { EcommerceClient } from "@/src/BackendClients"
import { mobile, emailRegexp, mappedCookies } from "@/src/constants"
import { isLocaleDeclared } from "@/src/locales"

import InputSelect from "@/shared/InputSelect"
import AdaptiveFont from "@/shared/AdaptiveFont"
import { Form, Button } from "../shared/FormComponents"

const Container = styled(AdaptiveFont).attrs({
  as: "section",
  mobileFactor: 1.28,
  tabletFactor: 1.25
})`
  width: 100%;
  min-height: calc(100vh - var(--header-height));
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
  const router = useRouter()
  const { t } = useTranslation("profile-login")

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [waiting, setWaiting] = useState(false)

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setEmail(value)
    setEmailError(emailRegexp.test(value) ? "" : t("emailInvalid"))
  }

  const login: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    setWaiting(true)

    try {
      const token = await new Magic(config.magicKey, {
        locale: isLocaleDeclared(router.locale!) ? router.locale : undefined
      }).auth.loginWithMagicLink({
        email
      })

      setEmailError("")

      if (token) {
        const login = await EcommerceClient.login({
          token
        })

        if (login.state == "success") {
          const authToken = login.data.auth_token

          Cookies.set(mappedCookies.authToken, authToken, {
            path: "/",
            sameSite: "strict",
            secure: true,
            expires: 365
          })

          router.push("/profile")
        } else {
          setEmailError(t("smthHappened"))
        }
      }
    } catch (_) {
      setEmailError(t("emailInvalid"))
    }

    setWaiting(false)
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
            onChange={handleEmail}
            type="email"
            autocomplete="email"
            placeholder="coolemail@gmail.com"
            error={emailError != "" ? emailError : undefined}
            changeable
          />
          <Button
            type="submit"
            isLoading={waiting}
            disabled={emailError != "" || email == "" || waiting}
          >
            {waiting ? t("loading") : t("logIn")}
          </Button>
        </Form>
      </LoginWrapper>
    </Container>
  )
}

export default LoginContainer
