import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
`

const LinkLogo = styled.a`
  text-decoration: none;
  color: var(--black);

  &:not(:last-child) {
    margin-right: 22px;
  }
`

const Social = () => {
  return (
    <Container>
      <LinkLogo href="#">
        <Image
          src="/social/facebook_dark.svg"
          width={21}
          height={21}
          alt="Facebook"
        />
      </LinkLogo>
      <LinkLogo href="#">
        <Image
          src="/social/instagram_dark.svg"
          width={21}
          height={21}
          alt="Instagram"
        />
      </LinkLogo>
      <LinkLogo href="#">
        <Image
          src="/social/telegram_dark.svg"
          width={21}
          height={21}
          alt="Telegram"
        />
      </LinkLogo>
    </Container>
  )
}

export default Social
