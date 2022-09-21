export type ButtonProps = {
  name: string
  onClick?: () => void
  active: boolean
  link?: string
}

export type ControlRowProps = {
  searchPlaceholder: string
  buttons?: ButtonProps[]
  context: string
  onContextChange: (context: string) => void
}

export type ContainerStyledProps = {
  spaceBetween?: boolean
}
export type ButtonStyledProps = {
  active?: boolean
  spanWidth?: boolean
}
