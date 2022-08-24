import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "@/components/common/modal-components/Container"
import Title from "@/components/common/modal-components/Title"
import ButtonsRow from "@/components/common/modal-components/ButtonsRow"
import Button from "@/components/common/modal-components/Button"
import Icon from "@/components/common/modal-components/Icon"
import Shadow from "@/components/common/modal-components/Shadow"
import Info from "@/components/common/modal-components/Info"
import AdaptiveFont from "@/components/common/adaptive-font"
import styled from "styled-components"
import { Label } from "@/components/common/input-select/input/styles"
import styles from "./popup.module.css"
import Background from "@/components/common/background"
import CopyIcon from "../../../../public/assets/Copy.svg"
import ExclamationGreenIcon from "../../../../public/assets/Exclamation-green.svg"

const Bordered = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px 14px 20px;
  display: flex;
  flex-direction: column;
`
const Text = styled.span.attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
`

interface IProps {
  userId: string
  email: string
  setOpen: React.Dispatch<boolean>
}

const SupportPopup = ({ userId, email, setOpen }: IProps) => {
  const { t } = useTranslation("profile")

  const handleCopy = () => {
    if ("clipboard" in navigator && userId && email) {
      navigator.clipboard.writeText(
        `Withdraw\nMerchant Id: M-${userId}\nEmail: ${email}`
      )
    }
  }

  return (
    <Background>
      <Container fixed spanContent style={{ maxWidth: 469 }}>
        <Title>
          <Shadow>
            <Icon>
              <Image
                src={ExclamationGreenIcon}
                layout="fill"
                alt="Exclamation"
                objectFit="contain"
                objectPosition="center"
              />
            </Icon>
          </Shadow>
          <span>{t("dear")}</span>
        </Title>
        <Info misc style={{ fontWeight: 500 }}>
          {t("text")}
        </Info>
        <Bordered>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Label as="span">{t("userid")}</Label>
            <Text as="span">M-{userId}</Text>
          </div>
          <div className={styles.bottomBorderedBlock}>
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Label as="span">{t("email")}</Label>
              <Title as="span" style={{ margin: 0 }}>
                {email}
              </Title>
            </div>
            <button className={styles.copyButton} onClick={handleCopy}>
              <Shadow>
                <Icon>
                  <Image
                    src={CopyIcon}
                    layout="fill"
                    alt="copy"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </Icon>
              </Shadow>
            </button>
          </div>
        </Bordered>

        <Text as="div" style={{ marginTop: 24, marginBottom: 12 }}>
          <a className={styles.link} href="mailto:support@assetux.com">
            support@assetux.com
          </a>
        </Text>

        <Text as="div">
          <a
            className={styles.link}
            href="https://t.me/assetux_support"
            target={"_blank"}
            rel="noreferrer"
          >
            Telegram
          </a>
        </Text>

        <ButtonsRow>
          <Button onClick={() => setOpen(false)} main>
            OK
          </Button>
        </ButtonsRow>
      </Container>
    </Background>
  )
}

export default SupportPopup
