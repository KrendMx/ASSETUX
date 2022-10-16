import React from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import HeadingRow from '@/components/profile/common/heading-row'

import { EcommerceClient } from '@/lib/backend/clients'
import {
  checkAuthorization,
  getEcommercePrefix
} from '@/lib/utils/helpers.utils'

import type { GetServerSideProps } from 'next'
import type { BillProps } from '@/components/profile/listing'
import ListingComponent from '@/components/profile/listing/listing'
import { Wrapper } from '@/components/profile/listing/styles'

const Bill = (props: BillProps) => {
  const { t } = useTranslation('profile-bill')

  return (
    <>
      <NextSeo title={t('title')} />
      <Wrapper>
        <HeadingRow heading={t('bill')} id={`M-${props.profile.user.userId}`} />
        <ListingComponent profile={props.profile} />
      </Wrapper>
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

  const transferProps = {
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

  if (profile.data.user.mode !== 'RETENTION') {
    return transferProps
  }

  return {
    props: {
      profile: profile.data,
      ...(await serverSideTranslations(locale!, [
        'header',
        'footer',
        'profile-bill',
        'routes',
        'inputSelect',
        'profile-listing'
      ]))
    }
  }
}

export default Bill
