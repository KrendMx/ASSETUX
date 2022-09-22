import React from 'react'
import { useTranslation } from 'next-i18next'
import Skeleton from 'react-loading-skeleton'

import { useAppSelector } from '@/lib/redux/hooks'
import { selectShowSkeleton } from '@/lib/redux/ui/selectors'

import {
  Container,
  Title,
  Colored,
  SubTitleParagraph,
  DescriptionSide,
  ExampleBlocks,
  BlockTitle,
  ExampleDescription,
  Paragraph,
  Bold,
  GoodBlock,
  BadBlock,
  BlockList,
  BlockItem,
  CheckMarkContainer,
  CloseMarkContainer
} from './styles'

import { CloseMark, CheckMark } from './icons'

type BlockData = {
  title: string
  items: string[]
}

const generateBlockItems = (
  data: BlockData,
  isLoading: boolean,
  good: boolean
) => (
  <>
    <BlockTitle>{isLoading ? <Skeleton /> : data.title}</BlockTitle>
    <BlockList decreaseMargins={good}>
      {data.items.map((item) => (
        <BlockItem key={item}>
          {isLoading ? (
            <Skeleton containerClassName="skeletonFlexContainer" />
          ) : (
            <>
              {good ? (
                <CheckMarkContainer>
                  <CheckMark />
                </CheckMarkContainer>
              ) : (
                <CloseMarkContainer>
                  <CloseMark />
                </CloseMarkContainer>
              )}
              <span>{item}</span>
            </>
          )}
        </BlockItem>
      ))}
    </BlockList>
  </>
)

const Info = () => {
  const { t } = useTranslation('about')

  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <Container>
      <Title>
        {showSkeleton ? (
          <Skeleton />
        ) : (
          <>
            <Colored colorIn="green">{t('info_buy')}</Colored>/
            <Colored colorIn="red">{t('info_sell')}</Colored> {t('info_easier')}
          </>
        )}
      </Title>
      <SubTitleParagraph>
        {showSkeleton ? <Skeleton /> : t('info_subTitleParagraph')}
      </SubTitleParagraph>
      <ExampleBlocks>
        <DescriptionSide>
          <ExampleDescription>
            <Paragraph>
              {showSkeleton ? <Skeleton count={2} /> : t('info_p1')}
            </Paragraph>
            <Paragraph preLine>
              {showSkeleton ? (
                <Skeleton count={3} />
              ) : (
                <>
                  <Bold>{t('info_exampleBold')}</Bold>
                  <br />
                  {t('info_exampleDesc')}
                </>
              )}
            </Paragraph>
          </ExampleDescription>
          <GoodBlock isLoading={showSkeleton}>
            {generateBlockItems(
              {
                title: t('info_goodBlockTitle'),
                items: [t('info_goodBlockItem1')]
              },
              showSkeleton,
              true
            )}
          </GoodBlock>
        </DescriptionSide>
        <BadBlock isLoading={showSkeleton}>
          {generateBlockItems(
            {
              title: t('info_badBlockTitle'),
              items: [
                t('info_badBlockItem1'),
                t('info_badBlockItem2'),
                t('info_badBlockItem3'),
                t('info_badBlockItem4')
              ]
            },
            showSkeleton,
            false
          )}
        </BadBlock>
      </ExampleBlocks>
    </Container>
  )
}

export default Info
