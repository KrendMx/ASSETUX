import cryptoSlice from "./slice"

export const {
  setSelectedToken,
  setSelectedBlockchain,
  swapAction,
  setCurrentRate,
  setExplorerData
} = cryptoSlice.actions

export default cryptoSlice.reducer
