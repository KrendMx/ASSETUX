import React from "react"

import Background from "@/shared/Background"
import Email from "./Modals/Email"

import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"

function Orders() {
  const dispatch = useAppDispatch()

  const ordersActive = useAppSelector((state) => state.ui.ordersActive)

  if (!ordersActive) {
    return null
  }

  return (
    <Background>
      <Email onCancel={() => dispatch(setOrdersActive(false))} />
    </Background>
  )
}

export default Orders
