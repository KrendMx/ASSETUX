import slice from "./slice"

export const {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction,
  setCurrentRate,
  setExplorerData,
  setSellOrderId
} = slice.actions

export default slice.reducer
