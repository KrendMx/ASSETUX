type CalculateBasisProps = {
  contentWidth: number
  toShow?: number
  basis?: number
  gap: number
  padding: number
}

const calculateBasis = ({
  contentWidth,
  toShow,
  basis,
  gap,
  padding
}: CalculateBasisProps): number => {
  if (basis) {
    return basis
  }

  if (!toShow) {
    return 0
  }

  return (contentWidth - gap * (toShow - 1) - padding * 2) / toShow
}

export { calculateBasis }
