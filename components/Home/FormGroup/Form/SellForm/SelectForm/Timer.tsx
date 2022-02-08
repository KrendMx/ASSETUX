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
  timer: number
}

function Timer({ timer }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.floor((timer - Date.now()) / 1000)
  )

  useEffect(() => {
    const interval = setInterval(() => setSecondsLeft(secondsLeft - 1), 1000)

    return () => clearInterval(interval)
  }, [secondsLeft])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <Text>
      Timer: {minutes}:{seconds == 0 ? "00" : seconds}
    </Text>
  )
}

export default Timer
