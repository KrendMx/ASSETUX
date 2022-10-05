import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Magic } from 'magic-sdk'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { env } from '@/lib/env/client'
import { EcommerceClient } from '@/lib/backend/clients'
import { emailRegexp, mappedCookies } from '@/lib/data/constants'
import { isLocaleDeclared } from '@/lib/data/locales'

import InputSelect from '@/components/common/input-select'
import { Form, Button } from '../common/form-components'
import { Container, LoginWrapper, Note, Title } from './styles'

const LoginContainer = () => {
  const router = useRouter()
  const { t } = useTranslation('profile-login')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [waiting, setWaiting] = useState(false)

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    setEmail(value)
    setEmailError(emailRegexp.test(value) ? '' : t('emailInvalid'))
  }

  const login: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    setWaiting(true)

    try {
      const token = await new Magic(env.magicKey, {
        locale: isLocaleDeclared(router.locale!) ? router.locale : undefined
      }).auth.loginWithMagicLink({
        email
      })

      setEmailError('')

      if (token) {
        const login = await EcommerceClient.login({
          token
        })

        if (login.state == 'success') {
          const authToken = login.data.auth_token

          Cookies.set(mappedCookies.authToken, authToken, {
            path: '/',
            sameSite: 'strict',
            secure: true,
            expires: 365
          })

          router.push('/profile')
        } else {
          setEmailError(t('smthHappened'))
        }
      }
    } catch (_) {
      setEmailError(t('emailInvalid'))
    }

    setWaiting(false)
  }

  return (
    <Container>
      <LoginWrapper>
        <Title>{t('greetings')}</Title>
        <Note>{t('explanation')}</Note>
        <Form gap="1.578em" onSubmit={login} noValidate>
          <InputSelect
            id="email"
            label={t('email')}
            value={email}
            onChange={handleEmail}
            type="email"
            autocomplete="email"
            placeholder="coolemail@gmail.com"
            error={emailError != '' ? emailError : undefined}
            changeable
          />
          <Button
            type="submit"
            isLoading={waiting}
            disabled={emailError != '' || email == '' || waiting}
          >
            {waiting ? t('loading') : t('logIn')}
          </Button>
        </Form>
      </LoginWrapper>
    </Container>
  )
}

export default LoginContainer
