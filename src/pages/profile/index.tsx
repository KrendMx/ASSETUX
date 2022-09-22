import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BaseContainer from '@/components/common/base-container'
import HeadingRow from '@/components/profile/common/heading-row'
import FormGroup from '@/components/profile/main/form-group'

import { EcommerceClient } from '@/lib/backend/clients'
import { checkAuthorization, getEcommercePrefix } from '@/lib/utils/helpers'

import type { GetServerSideProps } from 'next'
import type { FormGroupProps } from '@/components/profile/main/form-group'

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  padding: 3.15em var(--paddings);
`

type MainProps = FormGroupProps

function Main(props: MainProps) {
  const { t } = useTranslation('profile')

  return (
    <>
      <NextSeo title={t('title')} />
      <Container style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <HeadingRow heading={t('profile')} id={`M-${props.user.userId}`} />
        <FormGroup {...props} />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  locale,
  req
}) => {
  const errorProps = {
    redirect: {
      destination: `${getEcommercePrefix()}/login`,
      permanent: false
    }
  }

  const token = checkAuthorization(req)

  if (!token) {
    return errorProps
  }

  const profile = await EcommerceClient.getProfile({ token })

  if (profile.state != 'success') {
    return errorProps
  }

  return {
    props: {
      ...profile.data,
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'profile',
        'routes',
        'home',
        'inputSelect'
      ]))
    }
  }
}

export default Main
