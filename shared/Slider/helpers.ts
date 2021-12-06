type CalculateBasisProps = {
  contentWidth: number
  toShow: number
  gap: number
  padding: number
  startOffset: number
}

const calculateBasis = ({
  contentWidth,
  toShow,
  gap,
  padding,
  startOffset
}: CalculateBasisProps): number => {
  return (contentWidth - gap * (toShow - 1) - padding * 2 - startOffset * 2) / toShow
}

export { calculateBasis }
