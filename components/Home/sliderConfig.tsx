import { useAppSelector } from "@/src/redux/hooks"

type UseSliderConfigProps = {
  desktopOffset: number
}

function useSliderConfig({ desktopOffset }: UseSliderConfigProps) {
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

  let startOffset = desktopOffset
  if (isMobile) {
    startOffset = 38
  } else if (isTablet || isMobileLayoutForTablet) {
    startOffset = 18
  }

  const vertPadding = 19
  const horizPadding = 0

  return {
    gap,
    startOffset,
    toShow,
    vertPadding,
    horizPadding
  }
}

export default useSliderConfig
