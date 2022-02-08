import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { mobile } from "@/src/constants"

const Button = styled.button`
  flex: 0 0 auto;
  color: var(--blue);
  font-size: 0.79em;
  font-weight: 500;
  border: none;
  background: transparent;
  cursor: pointer;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

type CopyProps = {
  label?: string
  valueToCopy?: string
}

function Copy({ label, valueToCopy }: CopyProps) {
  const [labelValue, setLabelValue] = useState(label)
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLabelValue("Copied")

    if (valueToCopy && "clipboard" in navigator) {
      navigator.clipboard.writeText(valueToCopy)
    }

    setTimeout(() => {
      isMounted.current && setLabelValue(label)
    }, 1000)
  }

  return <Button onClick={handleCopy}>{labelValue}</Button>
}

export default Copy