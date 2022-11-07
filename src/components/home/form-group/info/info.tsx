import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

import { selectShowSkeleton } from '@/lib/redux/ui/selectors'
import { useAppSelector } from '@/lib/redux/hooks'

import AbsoluteSkeletonContainer from '@/components/common/absolute-skeleton-container'
import {
  Container,
  TextColumn,
  ColoredSpan,
  SponsorsContainer,
  SkeletonContainer,
  SponsorContainer,
  Sponsors,
  SubHeading
} from './styles'

const Info = () => {
  const router = useRouter()
  const showSkeleton = useAppSelector(selectShowSkeleton)
  const { t } = useTranslation('home')

  return (
    <Container>
      <TextColumn>
        {!showSkeleton && (
          <h1>
            {t('titleBeforeBuy')}{' '}
            <ColoredSpan colorIn="green">{t('buy')}</ColoredSpan>
            {router.locale != 'ru' ? <br /> : ' '}
            {t('titleAfterBuy')}{' '}
            <ColoredSpan colorIn="red">{t('sell')}</ColoredSpan>{' '}
            {t('titleAfterSell')}
          </h1>
        )}
        {showSkeleton && (
          <SkeletonContainer>
            <Skeleton count={3} />
          </SkeletonContainer>
        )}
        {!showSkeleton && <SubHeading>{t('info')}</SubHeading>}
        {showSkeleton && (
          <SkeletonContainer as="h2">
            <Skeleton count={2} />
          </SkeletonContainer>
        )}
      </TextColumn>
      <SponsorsContainer>
        <Sponsors isLoading={showSkeleton}>
          <Image
            src="/sponsors/binance.png"
            width={183}
            height={39}
            alt="BINANCE CHAIN"
          />
        </Sponsors>
        {showSkeleton && (
          <AbsoluteSkeletonContainer>
            <Skeleton height={20} />
          </AbsoluteSkeletonContainer>
        )}
      </SponsorsContainer>
    </Container>
  )
}

export default Info
