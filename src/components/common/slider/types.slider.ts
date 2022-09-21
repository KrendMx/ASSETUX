export type ResponsiveProps = {
  resolution: number
  toShow: number
  gap: number
}

export type SliderProps = {
  children?: JSX.Element[] | JSX.Element
  toShow: number
  gap: number
  horizPadding: number
  vertPadding: number
  responsive?: ResponsiveProps[]
}
