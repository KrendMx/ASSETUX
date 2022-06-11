import { getEcommercePrefix, getEcommerceRoot } from "./helpers"

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

export const commerce = [
  {
    key: "profile",
    href: `${getEcommercePrefix()}/profile`
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
