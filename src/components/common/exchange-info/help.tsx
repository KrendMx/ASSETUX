import React from 'react'
import { HelpContainer } from './styles'

type HelpProps = {
  offsetY?: number
  children: string
}

const Help = ({ offsetY = 10, children }: HelpProps) => {
  return <HelpContainer offsetY={offsetY}>{children}</HelpContainer>
}

export default Help
