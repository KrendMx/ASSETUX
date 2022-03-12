import React, { useState } from "react"

import Background from "@/shared/Background"
import Email from "./Modals/Email"
import Code from "./Modals/Code"
import CodeInvalid from "./Modals/CodeInvalid"
import OrderModal from "./OrderModal"

import BackendClient from "@/src/BackendClient"

import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"

import type { OrderInfo } from "@/src/BackendClient/types"

function Orders() {
  const dispatch = useAppDispatch()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userCode, setUserCode] = useState<string | null>(null)

  const [showCodeModal, setShowCodeModal] = useState(false)
  const [showCodeInvalidModal, setShowCodeInvalidModal] = useState(false)

  const [codeRequestResponse, setCodeRequestResponse] = useState<{
    isLoading: boolean
    error: string | null
  }>({
    isLoading: false,
    error: null
  })

  const [getOrdersResponse, setGetOrdersResponse] = useState<{
    isLoading: boolean
    data: OrderInfo[] | null
    error: string | null
  }>({
    isLoading: false,
    data: null,
    error: null
  })

  const [showOrdersModal, setShowOrdersModal] = useState(false)

  const ordersActive = useAppSelector((state) => state.ui.ordersActive)
  const currentBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )

  const handleEmail = async (email: string) => {
    setUserEmail(email)

    if (currentBlockchain) {
      setCodeRequestResponse({
        isLoading: true,
        error: null
      })

      const response = await BackendClient.requestOrdersEmail({
        apiHost: currentBlockchain.url,
        email
      })

      if (!response.data) {
        return
      }

      if (response.data == true) {
        setShowCodeModal(true)

        setCodeRequestResponse({
          isLoading: false,
          error: null
        })
      } else {
        setCodeRequestResponse({
          isLoading: false,
          error: response.data.message
        })
      }
    }
  }

  const handleCode = async (code: string) => {
    setUserCode(code)

    if (currentBlockchain && userEmail) {
      setGetOrdersResponse({
        isLoading: true,
        data: null,
        error: null
      })

      const response = await BackendClient.getEmailOrders({
        apiHost: currentBlockchain.url,
        email: userEmail,
        code
      })

      if (!response.data) {
        return
      }

      if ("message" in response.data) {
        setShowCodeInvalidModal(true)
        setShowCodeModal(false)

        setGetOrdersResponse({
          isLoading: false,
          data: null,
          error: response.data.message
        })

        return
      }

      setGetOrdersResponse({
        isLoading: false,
        data: response.data,
        error: null
      })

      setShowOrdersModal(true)
      setShowCodeModal(false)
    }
  }

  if (!ordersActive) {
    return null
  }

  return (
    <Background>
      {!showCodeModal && !showOrdersModal && !showCodeInvalidModal && (
        <Email
          onCancel={() => dispatch(setOrdersActive(false))}
          onAccept={handleEmail}
          isLoading={codeRequestResponse.isLoading}
          errorMessage={codeRequestResponse.error}
        />
      )}

      {showCodeModal && (
        <Code
          onCancel={() => setShowCodeModal(false)}
          onAccept={handleCode}
          isLoading={getOrdersResponse.isLoading}
        />
      )}

      {showCodeInvalidModal && (
        <CodeInvalid
          onAccept={() => {
            setShowCodeInvalidModal(false)
            setShowCodeModal(true)
          }}
        />
      )}

      {showOrdersModal && getOrdersResponse.data && (
        <OrderModal orders={getOrdersResponse.data} />
      )}
    </Background>
  )
}

export default Orders
