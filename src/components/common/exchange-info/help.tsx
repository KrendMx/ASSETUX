import React from 'react'
import { HelpContainer } from './styles'

type HelpProps = {
  offsetY?: number
  children: string
}

function Help({ offsetY = 10, children }: HelpProps) {
  return <HelpContainer offsetY={offsetY}>{children}</HelpContainer>
}

export default Help
