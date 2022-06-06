import { mobile, mobileLayoutForTablet } from "@/src/utils/constants"

function useSliderConfig() {
  const toShow = 3
  const gap = 19
  const vertPadding = 19
  const horizPadding = 0

  const responsive = [
    {
      resolution: mobileLayoutForTablet,
      toShow: 2,
      gap: 19
    },
    {
      resolution: mobile,
      toShow: 1,
      gap: 15
    }
  ]

  return {
    gap,
    toShow,
    vertPadding,
    horizPadding,
    responsive
  }
}

export default useSliderConfig
