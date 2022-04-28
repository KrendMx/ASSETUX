import React from "react"
import styled from "styled-components"
import QRCode from "qrcode.react"

const Button = styled.button`
  border: none;
  background: transparent;
  width: 100px;
  height: 100px;

  @media only screen and (max-width: 370px) {
    font-size: 1em;
    width: 6.75em;
    height: 6.75em;
  }
`

const Container = styled.div`
  width: 100%;
  text-align: center;
`

type CopyProps = {
  valueToCopy: string
}

function QRcode({ valueToCopy }: CopyProps) {
  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (valueToCopy && "clipboard" in navigator) {
      navigator.clipboard.writeText(valueToCopy)
    }
  }

  return (
    <Container>
      <Button onClick={handleCopy}>
        <QRCode
          value={valueToCopy}
          level="Q"
          renderAs="canvas"
          includeMargin={false}
          style={{ width: "100%", height: "100%" }}
        />
      </Button>
    </Container>
  )
}

export default QRcode
