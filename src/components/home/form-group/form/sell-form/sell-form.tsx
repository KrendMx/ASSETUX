import React from 'react'
import SelectForm from './select-form'
import { SellFormProps } from './types.sell-form'
import useSellForm from './useSellForm'

const SellForm = (props: SellFormProps) => {
  // all useEffects && useStates and other logic for this component
  const newProps = useSellForm(props)

  return <SelectForm {...newProps} />
}

export default SellForm
