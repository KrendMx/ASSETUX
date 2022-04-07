import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"

import {
  Container,
  InfoBlock,
  Paragraph,
  Media,
  Stores,
  Store,
  QRContainer,
  ImageBlock,
  InvestmentsContainer
} from "./styles"

function Investments() {
  const { t } = useTranslation("home")

  return (
    <Container>
      <InfoBlock>
        <h3>{t("investments_title")}</h3>
        <Paragraph>{t("investments_paragraph")}</Paragraph>
        <Paragraph>{t("investments_download")}:</Paragraph>
        <Media>
          <Stores>
            <Link href="#" passHref>
              <Store>
                <Image
                  src="/assets/investments/googleplay.png"
                  width={223}
                  height={73}
                  alt="appstore"
                />
              </Store>
            </Link>
            <Link href="#" passHref>
              <Store>
                <Image
                  src="/assets/investments/appstore.png"
                  width={223}
                  height={73}
                  alt="appstore"
                />
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
          </QRContainer>
        </Media>
      </InfoBlock>
      <ImageBlock>
        <InvestmentsContainer>
          <Image
            src="/assets/investments/portfolio.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center center"
            alt="Portfolio"
          />
        </InvestmentsContainer>
      </ImageBlock>
    </Container>
  )
}

export default Investments
