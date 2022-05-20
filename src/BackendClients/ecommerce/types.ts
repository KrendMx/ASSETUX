import { Response } from "../types"

export type Login = {
  auth_token: string
}

export type LoginProps = {
  token: string
}

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

export type GetProfileProps = {
  tokenCookie: string
}

export type GetProfileResponse = Response<Profile>

export type ChangeWalletProps = {
  wallet: string
}

export type ChangeWalletResponse = Response<{ message: string }>

export type ChangeCompanyProps = {
  nameCompany: string | null
  logoCompany: string | null
  backgroundCompany: string | null
}

export type ChangeCompanyResponse = Response
