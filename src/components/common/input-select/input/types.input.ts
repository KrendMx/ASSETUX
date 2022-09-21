import type { Option } from "../types"

export type InputSelectProps = {
  label?: string
  onSelect?: (selectedValue: string) => void
  onActiveChange?: (active: boolean) => void
  onEnterPress?: () => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onUpload?: (file: File) => void
  value?: string
  placeholder?: string
  options?: Option[]
  changeable?: boolean
  defaultValue?: string
  displayIcon?: boolean
  displayInSelect?: number
  selectLabel?: string
  onlyNumbers?: boolean
  file?: boolean
  fileLabel?: string
  accept?: string
  type?: React.HTMLInputTypeAttribute
  id?: string
  name?: string
  error?: string
  selectable?: boolean
  selectedValue?: string | null
  autocomplete?: string
  paleBorders?: boolean
  focused?: boolean
  visuallyDisabled?: boolean
  uploadedFileName?: string
  maxValue?: number
}
