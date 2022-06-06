import React from "react"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@/src/redux/hooks"
import { selectShowSkeleton } from "@/src/redux/uiSlice/selectors"

import {
  Container,
  Title,
  Content,
  News,
  Paragraph,
  ButtonLink,
  Support,
  SupportButtonsRow,
  ButtonLinkSkeleton
} from "./styles"

import { Telegram, Email } from "./icons"

function Contacts() {
  const { t } = useTranslation("about")

  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <Container>
      <Title>
        {showSkeleton ? <Skeleton count={2} /> : t("contacts_title")}
      </Title>
      <Content>
        <News>
          <Paragraph>
            {showSkeleton ? <Skeleton count={2} /> : t("contacts_news_p")}
          </Paragraph>
          {showSkeleton ? (
            <ButtonLinkSkeleton>
              <Skeleton width="100%" height="100%" />
            </ButtonLinkSkeleton>
          ) : (
            <ButtonLink>
              <Telegram />
              <span>{t("contacts_news_link")}</span>
            </ButtonLink>
          )}
        </News>
        <Support>
          <Paragraph alignRight>
            {showSkeleton ? <Skeleton count={2} /> : t("contacts_support_p")}
          </Paragraph>
          <SupportButtonsRow>
            {showSkeleton ? (
              <ButtonLinkSkeleton>
                <Skeleton width="100%" height="100%" />
              </ButtonLinkSkeleton>
            ) : (
              <ButtonLink>
                <Telegram />
                <span>{t("contacts_support_link1")}</span>
              </ButtonLink>
            )}
            {showSkeleton ? (
              <ButtonLinkSkeleton>
                <Skeleton width="100%" height="100%" />
              </ButtonLinkSkeleton>
            ) : (
              <ButtonLink>
                <Email />
                <span>{t("contacts_support_link2")}</span>
              </ButtonLink>
            )}
          </SupportButtonsRow>
        </Support>
      </Content>
    </Container>
  )
}

export default Contacts
