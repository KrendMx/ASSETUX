import React from "react"
import styled from "styled-components"
import Image from "next/image"

import { mobileLayoutForTablet, mobile } from "@/src/constants"

const breakPoint = 680

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-width);
  font-size: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    justify-items: center;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    display: block;

    & > * + * {
      margin-top: 55px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    & > * + * {
      margin-top: 3em;
    }
  }
`

const InfoBlock = styled.div`
  width: 76%;

  @media only screen and (max-width: 1360px) {
    width: 85%;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
  }
`

const Paragraph = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: #616161;
  margin: 31px 0;

  @media only screen and (max-width: ${mobile}px) {
    margin: 1.8em 0;
  }
`

const Media = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
    justify-content: center;
  }
`

const QRContainer = styled.div`
  width: 178px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 7px 19px rgba(0, 0, 0, 0.12);

  @media only screen and (min-width: 1131px) and (max-width: 1200px) {
    width: 150px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    display: none;
  }
`

const ImageBlock = styled.div`
  justify-self: end;

  @media only screen and (max-width: ${breakPoint}px) {
    display: flex;
    justify-content: center;
  }
`

const Stores = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  & > * + * {
    margin-top: 7px;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    flex-direction: row;
    align-self: flex-start;

    & > * + * {
      margin-top: 0;
      margin-left: 7px;
    }
  }
`

const Store = styled.div`
  width: 223px;

  @media only screen and (max-width: 1360px) {
    width: 200px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 160px;
  }

  @media only screen and (max-width: ${breakPoint}px) {
    width: 120px;
  }
`

const InvestmentsContainer = styled.div`
  position: relative;
  width: 469px;
  height: 533px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    max-width: 335px;
    height: 372px;
  }
`

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
                src="/assets/investments/appstore.png"
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
