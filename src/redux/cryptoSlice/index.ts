import cryptoSlice from "./slice"

export const {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction,
  setCurrentRate,
  setExplorerData,
  setSellOrderId
} = cryptoSlice.actions

export default cryptoSlice.reducer
