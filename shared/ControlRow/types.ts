export type ButtonProps = {
  name: string
  onClick?: () => void
  active: boolean
  link?: string
}

export type ControlRowProps = {
  searchPlaceholder: string
  buttons?: ButtonProps[]
  onContextChange?: (context: string) => void
}
