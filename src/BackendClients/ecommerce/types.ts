import { Response } from "../types"

export type AuthorizedProps = {
  token: string
}

export type Login = {
  auth_token: string
}

export type LoginProps = AuthorizedProps

export type LoginResponse = Response<Login>

export type Profile = {
  id: number
  public_key: string
  issuer: string
  lastLogin: string
  widget_id: number
  email: string
  phone: string | null
  widget: {
    id: number
    backgroundCompany: string | null
    logoCompany: string | null
    nameCompany: string | null
  }
}

export type GetProfileProps = AuthorizedProps

export type GetProfileResponse = Response<{ user: Profile }>

export type ChangeWalletProps = AuthorizedProps & {
  wallet: string
}

export type ChangeWalletResponse = Response<unknown, { message: string }>

export type ChangeCompanyProps = AuthorizedProps & {
  nameCompany: string | null
  logoCompany: string | null
  backgroundCompany: string | null
}

export type ChangeCompanyResponse = Response

export type LogoutProps = AuthorizedProps
