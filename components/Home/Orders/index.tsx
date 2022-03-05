import React, { useState } from "react"

import Background from "@/shared/Background"
import Email from "./Modals/Email"
import Code from "./Modals/Code"
import OrderModal from "./OrderModal"

import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"

function Orders() {
  const dispatch = useAppDispatch()
  const [showCodeModal, setShowCodeModal] = useState(false)

  const [showOrdersModal, setShowOrdersModal] = useState(false)

  const ordersActive = useAppSelector((state) => state.ui.ordersActive)

  if (!ordersActive) {
    return null
  }

  return (
    <Background>
      {!showCodeModal && !showOrdersModal && (
        <Email
          onCancel={() => dispatch(setOrdersActive(false))}
          onAccept={() => setShowCodeModal(true)}
        />
      )}
      {showCodeModal && (
        <Code
          onCancel={() => setShowCodeModal(false)}
          onAccept={() => {
            setShowOrdersModal(true)
            setShowCodeModal(false)
          }}
        />
      )}
      {showOrdersModal && <OrderModal />}
    </Background>
  )
}

export default Orders
