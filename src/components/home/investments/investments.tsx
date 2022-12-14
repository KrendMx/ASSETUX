import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import { selectShowSkeleton } from '@/lib/redux/ui/selectors'
import { useAppSelector } from '@/lib/redux/hooks'

import {
  Container,
  InfoBlock,
  Paragraph,
  Media,
  Stores,
  Store,
  QRContainer
} from './styles'
import DefaultModal from '@/components/common/modals/default-modal'

import AbsoluteSkeletonContainer from '@/components/common/absolute-skeleton-container'
import InvestmentsSlider from '@/components/common/sliders/investments'

const Investments = () => {
  const { t } = useTranslation('home')

  const [displayModal, setDisplayModal] = useState(false)

  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <>
      {displayModal && (
        <DefaultModal
          title={t('investments_modal-title')}
          content={t('investments_modal-content')}
          onClose={() => setDisplayModal(false)}
        />
      )}
      <Container>
        <InfoBlock>
          <h3>{showSkeleton ? <Skeleton /> : t('investments_title')}</h3>
          <Paragraph>
            {showSkeleton ? <Skeleton count={5} /> : t('investments_paragraph')}
          </Paragraph>
          <Paragraph>
            {showSkeleton ? <Skeleton /> : t('investments_download') + ':'}
          </Paragraph>
          <Media>
            <Stores>
              <Link href="#" passHref>
                <Store
                  onClick={(event) => {
                    event.preventDefault()
                    setDisplayModal(true)
                  }}
                >
                  <Image
                    src="/assets/investments/googleplay.png"
                    width={227}
                    height={68}
                    alt="appstore"
                  />
                  {showSkeleton && (
                    <AbsoluteSkeletonContainer>
                      <Skeleton height="100%" borderRadius={0} />
                    </AbsoluteSkeletonContainer>
                  )}
                </Store>
              </Link>
              <Link href="#" passHref>
                <Store
                  onClick={(event) => {
                    event.preventDefault()
                    setDisplayModal(true)
                  }}
                >
                  <Image
                    src="/assets/investments/appstore.png"
                    width={223}
                    height={73}
                    alt="appstore"
                  />
                  {showSkeleton && (
                    <AbsoluteSkeletonContainer>
                      <Skeleton height="100%" borderRadius={0} />
                    </AbsoluteSkeletonContainer>
                  )}
                </Store>
              </Link>
            </Stores>
            <QRContainer>
              <Image
                src="/assets/investments/QR.png"
                width={177}
                height={170}
                alt="QRCODE"
              />
              {showSkeleton && (
                <AbsoluteSkeletonContainer>
                  <Skeleton height="100%" borderRadius={0} />
                </AbsoluteSkeletonContainer>
              )}
            </QRContainer>
          </Media>
        </InfoBlock>
        <InvestmentsSlider />
      </Container>
    </>
  )
}

export default Investments
