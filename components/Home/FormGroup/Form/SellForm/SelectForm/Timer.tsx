import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { mobile } from "@/src/constants"

const Text = styled.span`
  color: gray;
  font-size: 0.79em;
  font-weight: 500;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

type TimerProps = {
  timestamp: number
  onExpired?: () => void
}

function Timer({ timestamp, onExpired }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.floor((timestamp - Date.now()) / 1000)
  )

  useEffect(() => {
    const interval = setInterval(
      () =>
        setSecondsLeft((secondsLeft) => {
          if (secondsLeft == 1 || secondsLeft < 0) {
            clearInterval(interval)
            onExpired && onExpired()
          }

          if (secondsLeft < 0) {
            return 0
          }

          return secondsLeft - 1
        }),
      1000
    )

    return () => clearInterval(interval)
  }, [onExpired])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <Text>
      Timer: {minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </Text>
  )
}

export default Timer
