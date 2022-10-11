import { EcommerceClient as _EcommerceClient } from './ecommerce'
import { BackendClient as _BackendClient } from './main'

export const BackendClient = new _BackendClient()
export const EcommerceClient = new _EcommerceClient()
