export type Route = {
  href: string
  key: string
  absolute?: boolean
}

export const company: Route[] = [
  {
    key: "about",
    href: "/404"
  },
  {
    key: "news",
    href: "/404"
  }
]

export const popular: Route[] = [
  {
    key: "RUB/BNB",
    href: "/"
  },
  {
    key: "RUB/CAKE",
    href: "/"
  },
  {
    key: "RUB/USDT",
    href: "/"
  },
  {
    key: "UAH/BTCB",
    href: "/"
  },
  {
    key: "UAH/ETH",
    href: "/"
  },
  {
    key: "UAH/LTC",
    href: "/"
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
