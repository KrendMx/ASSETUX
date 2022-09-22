import React from 'react'

import { Button, Label, Value } from './styles'

type InputSelectButtonProps = {
  value?: string
  label?: string
  onClick?: () => void
}

function InputSelectButton({ value, label, onClick }: InputSelectButtonProps) {
  return (
    <Button onClick={onClick}>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Button>
  )
}

export default InputSelectButton
