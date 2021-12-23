import React, { useState } from "react"
import styled from "styled-components"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Image from "next/image"
import { mobile, optimizeRemoteImages } from "@/src/constants"

type ContainerProps = {
  active: boolean
}

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1,
  tabletFactor: 1
})<ContainerProps>`
  width: 100%;
  height: ${(props) => (props.active ? "245px" : "177px")};
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  transition: height 0.2s linear;
  padding: 27px 29px;

  &:not(:last-child) {
    margin-right: 21px;
  }
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #373737;
  font-weight: 500;
  font-size: 1em;
`

const SymbolIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.42em;

  & > * + * {
    margin-left: 15px;
  }
`

const IconContainer = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  padding: 9px;
  border-radius: 8px;
  background-color: var(--bgColor);
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.12);
`

type ElementProps = {
  icon?: string
  symbol?: string
}

function Element({ icon, symbol }: ElementProps) {
  const [active, setActive] = useState(false)

  return (
    <Container
      active={active}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <InfoRow>
        <SymbolIconContainer>
          <IconContainer>
            {icon && (
              <Image
                src={icon}
                width={42}
                height={42}
                layout="responsive"
                unoptimized={!optimizeRemoteImages}
                alt="Icon"
              />
            )}
          </IconContainer>
          <span>{symbol}</span>
        </SymbolIconContainer>
        <span>490$</span>
      </InfoRow>
    </Container>
  )
}

export default Element
