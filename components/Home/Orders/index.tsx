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
import type { OrdersData } from "@/src/BackendClient/types"

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
      buy: false
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
      buy: true
    })
  }

  return allOrders
}

const OrderModal = dynamic(() => import("./OrderModal"))

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
    data: [
      {
        id: 168,
        chainId: 56,
        amountIn: 0,
        amountOut: 0,
        curIn: "BUSD",
        curOut: "UAH",
        status: "expired",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: false
      },
      {
        id: 200,
        chainId: 56,
        amountIn: 0,
        amountOut: 0,
        curIn: "BUSD",
        curOut: "UAH",
        status: "closed:zero",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: false
      },
      {
        id: 201,
        chainId: 56,
        amountIn: 0,
        amountOut: 0,
        curIn: "BUSD",
        curOut: "UAH",
        status: "expired",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: false
      },
      {
        id: 2,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BTCB",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/btcb_32.png",
        buy: true
      },
      {
        id: 3,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BTCB",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/btcb_32.png",
        buy: true
      },
      {
        id: 4,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 5,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 6,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 7,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 8,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 9,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 10,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2051,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2052,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2053,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2054,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2055,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2056,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2057,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2058,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2061,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "UAH",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2069,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2070,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2071,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2072,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2187,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2188,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2207,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      },
      {
        id: 2260,
        chainId: 56,
        amountIn: 10000,
        amountOut: 0,
        curIn: "RUB",
        curOut: "BUSD",
        status: "Request",
        email: "igorlfmartins@mail.ru",
        tokenLogo: "https://bscscan.com/token/images/busd_32.png",
        buy: true
      }
    ],
    error: null
  })

  const [showOrdersModal, setShowOrdersModal] = useState(true)

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

        if (!response.data) {
          return
        }

        if ("message" in response.data) {
          return
        }

        setGetOrdersResponse({
          isLoading: false,
          data: mapOrderInfo(response.data),
          error: null
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
        data: mapOrderInfo(response.data),
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
