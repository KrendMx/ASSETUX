import React from "react"
import styled from "styled-components"
import QRCode from "qrcode.react"

const Button = styled.button`
  border: none;
  background: transparent;
  // cursor: pointer;
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
          size={100}
          level="Q"
          renderAs="canvas"
          includeMargin={false}
        />
      </Button>
    </Container>
  )
}

export default QRcode
