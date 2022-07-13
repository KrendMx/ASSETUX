import config from "./config"
import { getEcommercePrefix } from "./utils/helpers"

const host = config.hostProtocol + "://" + config.host

export type Route = {
  href: string
  key: string
  absolute?: boolean
}

export const company: Route[] = [
  {
    key: "about",
    href: "/about"
  },
  {
    key: "news",
    href: "/blog"
  }
]

export const companyAbsolute: Route[] = [
  {
    key: "about",
    href: `${host}/about`,
    absolute: true
  },
  {
    key: "news",
    href: `${host}/blog`,
    absolute: true
  }
]

export const popular: Route[] = [
  {
    key: "RUBtoBTCB",
    href: "/"
  },
  {
    key: "RUBtoETH",
    href: "/"
  },
  {
    key: "RUBtoBNB",
    href: "/"
  },
  {
    key: "RUBtoCAKE",
    href: "/"
  },
  {
    key: "RUBtoUSDT",
    href: "/"
  },
  {
    key: "RUBtoBUSD",
    href: "/"
  }
]

export const popularAbsolute: Route[] = [
  {
    key: "RUBtoBTCB",
    href: `${host}/?action=buy&currency=rub&token=btcb`,
    absolute: true
  },
  {
    key: "RUBtoETH",
    href: `${host}/?action=buy&currency=rub&token=eth`,
    absolute: true
  },
  {
    key: "RUBtoBNB",
    href: `${host}/?action=buy&currency=rub&token=bnb`,
    absolute: true
  },
  {
    key: "RUBtoCAKE",
    href: `${host}/?action=buy&currency=rub&token=cake`,
    absolute: true
  },
  {
    key: "RUBtoUSDT",
    href: `${host}/?action=buy&currency=rub&token=usdt`,
    absolute: true
  },
  {
    key: "RUBtoBUSD",
    href: `${host}/?action=buy&currency=rub&token=busd`,
    absolute: true
  }
]

export const commerce = [
  {
    key: "profile",
    href: "/profile"
  },
  {
    key: "history",
    href: `${getEcommercePrefix()}/history`
  },
  {
    key: "bill",
    href: `${getEcommercePrefix()}/bill`
  }
]

export const legal: Route[] = [
  {
    key: "privacy",
    href: "https://bsc.assetux.com/public/docs/PrivacyPolicy.pdf",
    absolute: true
  },
  {
    key: "cookies",
    href: "https://bsc.assetux.com/public/docs/CookiesPolicy.pdf",
    absolute: true
  },
  {
    key: "term",
    href: "https://bsc.assetux.com/public/docs/TermsConditions.pdf",
    absolute: true
  }
]
