import React from "react"
import { useAppSelector } from "@/src/redux/hooks"

function useSliderConfig() {
  const isMobileLayoutForTablet = useAppSelector(
    (state) => state.ui.isMobileLayoutForTablet
  )
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const isTablet = useAppSelector((state) => state.ui.isTablet)

  let toShow = 3
  if (isMobileLayoutForTablet) {
    toShow = 2
  } else if (isMobile) {
    toShow = 1
  }

  let gap = 19
  if (isMobile) {
    gap = 15
  }

  let startOffset = 125
  if (isMobile) {
    startOffset = 38
  } else if (isTablet || isMobileLayoutForTablet) {
    startOffset = 18
  }

  return {
    gap,
    startOffset,
    toShow
  }
}

export default useSliderConfig
