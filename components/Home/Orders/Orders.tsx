import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

import Background from "@/shared/Background"
import Email from "./Modals/Email"
import Code from "./Modals/Code"
import CodeInvalid from "./Modals/CodeInvalid"

import BackendClient from "@/src/BackendClient"

import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setOrdersActive } from "@/src/redux/uiSlice"

import type { OrderInfo } from "./OrderModal/types"
import type { OrdersData, RequestState } from "@/src/BackendClient/types"

const mapOrderInfo = (orders: OrdersData): OrderInfo[] => {
  const allOrders: OrderInfo[] = []

  for (const sellOrder of orders.sell) {
    allOrders.push({
      id: sellOrder.id,
      chainId: sellOrder.chain_id,
      amountIn: sellOrder.amount_in,
      amountOut: sellOrder.cur_out.amount,
      curIn: sellOrder.cur_in.symbol,
      curOut: sellOrder.cur_out.currency,
      status: sellOrder.status,
      email: sellOrder.email,
      tokenLogo: sellOrder.cur_in.logo_uri,
      buy: false,
      orderId: sellOrder.order_id
    })
  }

  const allBuyOrders = [
    ...orders.buy.error.map((order) => ({ ...order, status: "Error" })),
    ...orders.buy.request.map((order) => ({ ...order, status: "Request" })),
    ...orders.buy.success.map((order) => ({ ...order, status: "Success" }))
  ]

  for (const buyOrder of allBuyOrders) {
    allOrders.push({
      id: buyOrder.id,
      chainId: buyOrder.chain_id,
      amountIn: buyOrder.amount_in,
      amountOut: buyOrder.send_amount ? buyOrder.send_amount : 0,
      curIn: buyOrder.currency,
      curOut: buyOrder.token.symbol,
      status: buyOrder.status,
      email: buyOrder.email,
      tokenLogo: buyOrder.token.logo_uri,
      buy: true,
      orderId: null
    })
  }

  return allOrders.sort((a, b) => a.amountIn - b.amountIn)
}

const OrderModal = dynamic(() => import("./OrderModal"))

function Orders() {
  const dispatch = useAppDispatch()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userCode, setUserCode] = useState<string | null>(null)

  const [showCodeModal, setShowCodeModal] = useState(false)
  const [showCodeInvalidModal, setShowCodeInvalidModal] = useState(false)

  const [codeRequestResponse, setCodeRequestResponse] = useState<RequestState<
    boolean,
    string | null
  > | null>(null)

  const [getOrdersResponse, setGetOrdersResponse] = useState<RequestState<
    OrderInfo[],
    string | null
  > | null>(null)

  const [showOrdersModal, setShowOrdersModal] = useState(false)

  const ordersActive = useAppSelector((state) => state.ui.ordersActive)
  const currentBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )

  useEffect(() => {
    if (
      ordersActive &&
      showOrdersModal &&
      currentBlockchain &&
      userEmail &&
      userCode
    ) {
      const interval = setInterval(async () => {
        const response = await BackendClient.getEmailOrders({
          apiHost: currentBlockchain.url,
          email: userEmail,
          code: userCode
        })

        if (response.state != "success") {
          return
        }

        setGetOrdersResponse({
          state: "success",
          result: mapOrderInfo(response.data)
        })
      }, 10000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [ordersActive, showOrdersModal, currentBlockchain, userCode, userEmail])

  const handleEmail = async (email: string) => {
    setUserEmail(email)

    if (currentBlockchain) {
      setCodeRequestResponse({
        state: "pending"
      })

      const response = await BackendClient.requestOrdersEmail({
        apiHost: currentBlockchain.url,
        email
      })

      if (response.state == "success") {
        setShowCodeModal(true)

        setCodeRequestResponse({
          state: "success",
          result: true
        })
      } else if (response.state == "error") {
        setCodeRequestResponse({
          state: "error",
          error: response.data.message
        })
      }
    }
  }

  const handleCode = async (code: string) => {
    setUserCode(code)

    if (currentBlockchain && userEmail) {
      setGetOrdersResponse({
        state: "pending"
      })

      const response = await BackendClient.getEmailOrders({
        apiHost: currentBlockchain.url,
        email: userEmail,
        code
      })

      if (response.state == "error") {
        setShowCodeInvalidModal(true)
        setShowCodeModal(false)

        setGetOrdersResponse({
          state: "error",
          error: response.data.message
        })

        return
      }

      if (response.state != "success") {
        return
      }

      setGetOrdersResponse({
        state: "success",
        result: mapOrderInfo(response.data)
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
          isLoading={codeRequestResponse?.state == "pending"}
          errorMessage={
            codeRequestResponse
              ? "error" in codeRequestResponse
                ? codeRequestResponse.error
                : null
              : null
          }
        />
      )}

      {showCodeModal && (
        <Code
          onCancel={() => setShowCodeModal(false)}
          onAccept={handleCode}
          isLoading={getOrdersResponse?.state == "pending"}
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

      {showOrdersModal && getOrdersResponse?.state == "success" && (
        <OrderModal orders={getOrdersResponse.result} />
      )}
    </Background>
  )
}

export default Orders
