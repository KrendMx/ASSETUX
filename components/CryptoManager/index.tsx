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

let prevSelectedBlockchainId: number | null = null

type ServerToClientEvents = {
  chart: (data: ExplorerData[]) => void
}

type ClientToServerEvents = {}

type CryptoManagerProps = {
  getToken?: boolean;
  getChart?: boolean;

}

function CryptoManager({ getToken, getChart }: CryptoManagerProps) {
  const dispatch = useAppDispatch()
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )

  useEffect(() => {
    if (!selectedBlockchain) {
      dispatch(getBlockchains())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedBlockchain && getChart) {
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
        socket.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockchain])

  useEffect(() => {
    if (
      selectedBlockchain &&
      getToken &&
      (prevSelectedBlockchainId == null || prevSelectedBlockchainId != selectedBlockchain.chain_id)
    ) {
      dispatch(getTokens())
      prevSelectedBlockchainId = selectedBlockchain.chain_id
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockchain])

  return null
}

export default CryptoManager
