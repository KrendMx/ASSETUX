import React, { useState } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import BaseContainer from "@/shared/BaseContainer"
import { Magic } from "magic-sdk"

import config from "@/src/config"
import BackendClient from "@/src/BackendClient"
import { useAppSelector } from "@/src/redux/hooks"

import CryptoManager from "@/components/CryptoManager"
import { Form, Input, Button } from "../shared/FormComponents"

const Container = styled(BaseContainer)`
  display: grid;
`

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.36rem;
`

const Note = styled.p`
  margin-bottom: 1.36rem;
  font-size: 0.94rem;
`

const Section = styled.section``

const LoginWrapper = styled.div`
  max-width: 469px;
  margin: auto;
`

function LoginContainer() {
  const { t } = useTranslation("profile-login")
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )

  const [email, setEmail] = useState("")

  const login = async () => {
    if (selectedBlockchain) {
      const token = await new Magic(
        config.magicKey as string
      ).auth.loginWithMagicLink({ email })

      console.log(token)
      if (token) {
        const test = await BackendClient.login({
          token,
          apiHost: selectedBlockchain.url
        })
        console.log("test", test)
      }
    }
  }

  return (
    <Container>
      <Section>
        <CryptoManager />
        <LoginWrapper>
          <Title>{t("greetings")}</Title>
          <Note>{t("explanation")}</Note>
          <Form gap={"30px"}>
            <Input
              id="email"
              title="E-Mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button onClick={login}>{t("logIn")}</Button>
          </Form>
        </LoginWrapper>
      </Section>
    </Container>
  )
}

export default LoginContainer
