import { useEffect } from "react"
import io from "socket.io-client"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import {
  getBlockchains,
  getTokens,
  setExplorerData
} from "@/src/redux/cryptoSlice"
import type { Socket } from "socket.io-client"
import type { ExplorerData } from "./types"

type ServerToClientEvents = {
  chart: (data: ExplorerData[]) => void
}

type ClientToServerEvents = {}

function CryptoManager() {
  const dispatch = useAppDispatch()
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )

  useEffect(() => {
    dispatch(getBlockchains())
  }, [dispatch])

  useEffect(() => {
    if (selectedBlockchain) {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        `https://${selectedBlockchain.url}`,
        {
          path: "/websocket"
        }
      )

      socket.on("chart", (data) => {
        dispatch(setExplorerData(data))
      })

      return () => {
        socket.connected && socket.disconnect()
      }
    }
  }, [selectedBlockchain, dispatch])

  useEffect(() => {
    if (selectedBlockchain) {
      dispatch(getTokens())
    }
  }, [selectedBlockchain, dispatch])

  return null
}

export default CryptoManager
