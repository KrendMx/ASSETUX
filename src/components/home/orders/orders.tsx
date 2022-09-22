import React, { useState, useEffect } from 'react'

import Background from '@/components/common/background'
import Email from './modals/email'
import Code from './modals/code'
import CodeInvalid from './modals/code-invalid'
import OrderModal from './order-modal'

import { BackendClient } from '@/lib/backend/clients'

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { setOrdersActive } from '@/lib/redux/ui'

import type { OrderInfo } from './order-modal/types'
import type { OrdersData } from '@/lib/backend/main/types.backend.main'
import type { RequestState } from '@/core/backend/types'

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
      status: sellOrder.status.split(':')[0],
      tokenLogo: sellOrder.cur_in.logo_uri,
      buy: false,
      orderId: sellOrder.order_id,
      date: sellOrder.date
    })
  }

  const allBuyOrders = [
    ...orders.buy.error.map((order) => ({ ...order, status: 'expired' })),
    ...orders.buy.request.map((order) => ({ ...order, status: 'pending' })),
    ...orders.buy.success.map((order) => ({ ...order, status: 'closed' }))
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
      tokenLogo: buyOrder.token.logo_uri,
      buy: true,
      orderId: null,
      date: buyOrder.created
    })
  }

  return allOrders.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  )
}

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
      const controller = new AbortController()

      const interval = setInterval(async () => {
        const response = await BackendClient.getEmailOrders({
          apiHost: currentBlockchain.url,
          email: userEmail,
          code: userCode,
          signal: controller.signal
        })

        if (response.state != 'success') {
          return
        }

        setGetOrdersResponse({
          state: 'success',
          result: mapOrderInfo(response.data)
        })
      }, 10000)

      return () => {
        clearInterval(interval)
        controller.abort()
      }
    }
  }, [ordersActive, showOrdersModal, currentBlockchain, userCode, userEmail])

  const handleEmail = async (email: string) => {
    setUserEmail(email)

    if (currentBlockchain) {
      setCodeRequestResponse({
        state: 'pending'
      })

      const response = await BackendClient.requestOrdersEmail({
        apiHost: currentBlockchain.url,
        email
      })

      if (response.state == 'success') {
        setShowCodeModal(true)

        setCodeRequestResponse({
          state: 'success',
          result: true
        })
      } else if (response.state == 'error') {
        setCodeRequestResponse({
          state: 'error',
          error: response.data.message
        })
      }
    }
  }

  const handleCode = async (code: string) => {
    setUserCode(code)

    if (currentBlockchain && userEmail) {
      setGetOrdersResponse({
        state: 'pending'
      })

      const response = await BackendClient.getEmailOrders({
        apiHost: currentBlockchain.url,
        email: userEmail,
        code
      })

      if (response.state == 'error') {
        setShowCodeInvalidModal(true)
        setShowCodeModal(false)

        setGetOrdersResponse({
          state: 'error',
          error: response.data.message
        })

        return
      }

      if (response.state != 'success') {
        return
      }

      setGetOrdersResponse({
        state: 'success',
        result: mapOrderInfo(response.data)
      })

      setShowOrdersModal(true)
      setShowCodeModal(false)
    }
  }

  const clearData = () => {
    setUserEmail(null)
    setUserCode(null)
    setCodeRequestResponse(null)
    setGetOrdersResponse(null)
  }

  if (!ordersActive) {
    return null
  }

  return (
    <Background>
      {!showCodeModal && !showOrdersModal && !showCodeInvalidModal && (
        <Email
          onCancel={() => {
            dispatch(setOrdersActive(false))
            clearData()
          }}
          onAccept={handleEmail}
          isLoading={codeRequestResponse?.state == 'pending'}
          errorMessage={
            codeRequestResponse
              ? 'error' in codeRequestResponse
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
          isLoading={getOrdersResponse?.state == 'pending'}
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

      {showOrdersModal && getOrdersResponse?.state == 'success' && (
        <OrderModal
          email={userEmail}
          orders={getOrdersResponse.result}
          onClose={() => {
            dispatch(setOrdersActive(false))
            setShowOrdersModal(false)
            clearData()
          }}
        />
      )}
    </Background>
  )
}

export default Orders
