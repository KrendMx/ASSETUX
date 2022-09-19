import { MerchantMode } from "./backend/ecommerce/types.js"
import { CurrenciesType } from "./data/currencies.js"
import { env } from "./env/client.mjs"
import { getEcommercePrefix } from "./utils/helpers"

const host = env.hostProtocol + "://" + env.host

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

export const popular = (currency: CurrenciesType): Route[] => [
  {
    key: `${currency} to BTCB`,
    href: "/"
  },
  {
    key: `${currency} to ETH`,
    href: "/"
  },
  {
    key: `${currency} to BNB`,
    href: "/"
  },
  {
    key: `${currency} to CAKE`,
    href: "/"
  },
  {
    key: `${currency} to USDT`,
    href: "/"
  },
  {
    key: `${currency} to BUSD`,
    href: "/"
  }
]

export const popularAbsolute = (currency: CurrenciesType): Route[] => [
  {
    key: `${currency} to BTCB`,
    href: `${host}/?action=buy&currency=${currency}&token=btcb`,
    absolute: true
  },
  {
    key: `${currency} to ETH`,
    href: `${host}/?action=buy&currency=${currency}&token=eth`,
    absolute: true
  },
  {
    key: `${currency} to BNB`,
    href: `${host}/?action=buy&currency=${currency}&token=bnb`,
    absolute: true
  },
  {
    key: `${currency} to CAKE`,
    href: `${host}/?action=buy&currency=${currency}&token=cake`,
    absolute: true
  },
  {
    key: `${currency} to USDT`,
    href: `${host}/?action=buy&currency=${currency}&token=usdt`,
    absolute: true
  },
  {
    key: `${currency} to BUSD`,
    href: `${host}/?action=buy&currency=${currency}&token=busd`,
    absolute: true
  }
]

export const commerce = (merchantMode: MerchantMode) => {
  const routes = [
    {
      key: "profile",
      href: "/profile"
    },
    {
      key: "history",
      href: `${getEcommercePrefix()}/history`
    }
  ]

  if (!(merchantMode === "CONNECT")) {
    routes.push({
      key: merchantMode === "TRANSFER" ? "listing" : "bill",
      href: `${getEcommercePrefix()}/${
        merchantMode === "TRANSFER" ? "listing" : "bill"
      }`
    })
  }

  return routes
}

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
