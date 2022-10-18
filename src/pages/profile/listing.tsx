import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BaseContainer from '@/components/common/base-container'
import HeadingRow from '@/components/profile/common/heading-row'

import { BackendClient, EcommerceClient } from '@/lib/backend/clients'
import {
  checkAuthorization,
  getEcommercePrefix
} from '@/lib/utils/helpers.utils'

import type { GetServerSideProps } from 'next'
import type { BillProps } from '@/components/profile/listing'
import ListingComponent from '@/components/profile/listing/listing'

const Container = styled(BaseContainer)`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 3.15em var(--paddings);
  min-height: calc(100vh - var(--header-height));
`

const Listing = (props: BillProps) => {
  const { t } = useTranslation('profile-listing')
  return (
    <>
      <NextSeo title={t('title')} />
      <Container>
        <HeadingRow heading={t('bill')} id={`M-${props.profile.user.userId}`} />
        <ListingComponent profile={props.profile} rate={props.rate} />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<BillProps> = async ({
  locale,
  req
}) => {
  const errorProps = {
    redirect: {
      destination: `${getEcommercePrefix()}/login`,
      permanent: false
    }
  }

  const notTransferProps = {
    redirect: {
      destination: `${getEcommercePrefix()}`,
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

  const rate = await BackendClient.getFiatRateByToken({
    token: profile.data.tokens[0].symbol
  })

  if (rate.state != 'success') {
    return notTransferProps
  }

  if (profile.data.user.mode !== 'TRANSFER') {
    return notTransferProps
  }

  return {
    props: {
      profile: profile.data,
      rate: rate.data,
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'profile-listing',
        'routes',
        'inputSelect'
      ]))
    }
  }
}

export default Listing
