import { MerchantMode } from "@/lib/backend/ecommerce/types"
import { TFunction } from "next-i18next"

const ternarSort = (a: string, b: string) => (a > b ? -1 : a < b ? 1 : 0)
const minusSort = (a: number, b: number) => b - a

const tableHeadings = (
  t: TFunction,
  merchantMode: MerchantMode = "RETENTION"
) =>
  merchantMode === "RETENTION"
    ? [
        {
          value: t("dateTime"),
          sortFn: minusSort
        },
        {
          value: t("email"),
          sortFn: ternarSort
        },
        {
          value: t("creditCard")
        },
        {
          value: t("received"),
          sortFn: ternarSort
        },
        {
          value: t("amount"),
          sortFn: minusSort
        }
      ]
    : [
        {
          value: t("dateTime"),
          sortFn: minusSort
        },
        {
          value: t("email"),
          sortFn: ternarSort
        },
        {
          value: t("creditCard")
        },
        {
          value: t("blockchain"),
          sortFn: ternarSort
        },
        {
          value: t("paid"),
          sortFn: ternarSort
        },
        {
          value: t("received"),
          sortFn: ternarSort
        },
        {
          value: t("amount"),
          sortFn: minusSort
        }
      ]

const cardNames = (t: TFunction, merchantMode: MerchantMode = "RETENTION") =>
  merchantMode === "RETENTION"
    ? [t("dateTime"), t("email"), t("creditCard"), t("received"), t("amount")]
    : [
        t("dateTime"),
        t("email"),
        t("creditCard"),
        t("blockchain"),
        t("paid"),
        t("received"),
        t("amount")
      ]

export { tableHeadings, cardNames }
