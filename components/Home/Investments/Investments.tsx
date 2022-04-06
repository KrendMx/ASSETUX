import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

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
  return (
    <Container>
      <InfoBlock>
        <h3>Инвестиции</h3>
        <Paragraph>
          Инвестируй в тренды с помощью портфелей, упакованных валютами
          финансовых сервисов, криптоигр, топ коинов и метавселенных. Портфели
          созданы для легкости инвестирования в целые сферы с потенциалами
          многократного роста.
        </Paragraph>
        <Paragraph>Скачать приложение:</Paragraph>
        <Media>
          <Stores>
            <Store>
              <Image
                src="/assets/investments/googleplay.png"
                width={223}
                height={73}
                alt="appstore"
              />
            </Store>
            <Store>
              <Image
                src="/assets/investments/appstore.png"
                width={223}
                height={73}
                alt="appstore"
              />
            </Store>
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
