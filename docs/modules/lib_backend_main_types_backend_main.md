[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/backend/main/types.backend.main

# Module: lib/backend/main/types.backend.main

## Table of contents

### Type Aliases

- [Blockchain](lib_backend_main_types_backend_main.md#blockchain)
- [BuyOrderInfo](lib_backend_main_types_backend_main.md#buyorderinfo)
- [CheckLiquidityProps](lib_backend_main_types_backend_main.md#checkliquidityprops)
- [CheckLiquidityResponse](lib_backend_main_types_backend_main.md#checkliquidityresponse)
- [CheckSellData](lib_backend_main_types_backend_main.md#checkselldata)
- [CheckSellOrder](lib_backend_main_types_backend_main.md#checksellorder)
- [CheckSellOrderProps](lib_backend_main_types_backend_main.md#checksellorderprops)
- [CloseSellOrder](lib_backend_main_types_backend_main.md#closesellorder)
- [CloseSellOrderProps](lib_backend_main_types_backend_main.md#closesellorderprops)
- [CreateFeedbackProps](lib_backend_main_types_backend_main.md#createfeedbackprops)
- [FiatProvider](lib_backend_main_types_backend_main.md#fiatprovider)
- [FiatRate](lib_backend_main_types_backend_main.md#fiatrate)
- [FindPostProps](lib_backend_main_types_backend_main.md#findpostprops)
- [FindPostResponse](lib_backend_main_types_backend_main.md#findpostresponse)
- [GetBlockchains](lib_backend_main_types_backend_main.md#getblockchains)
- [GetEmailOrdersProps](lib_backend_main_types_backend_main.md#getemailordersprops)
- [GetEmailOrdersResponse](lib_backend_main_types_backend_main.md#getemailordersresponse)
- [GetFiatProviders](lib_backend_main_types_backend_main.md#getfiatproviders)
- [GetFiatRates](lib_backend_main_types_backend_main.md#getfiatrates)
- [GetNewsProps](lib_backend_main_types_backend_main.md#getnewsprops)
- [GetNewsResponse](lib_backend_main_types_backend_main.md#getnewsresponse)
- [GetPaymentUrl](lib_backend_main_types_backend_main.md#getpaymenturl)
- [GetPaymentUrlProps](lib_backend_main_types_backend_main.md#getpaymenturlprops)
- [GetRefundAmountsProps](lib_backend_main_types_backend_main.md#getrefundamountsprops)
- [GetRefundAmountsResponse](lib_backend_main_types_backend_main.md#getrefundamountsresponse)
- [GetTokens](lib_backend_main_types_backend_main.md#gettokens)
- [GetTokensProps](lib_backend_main_types_backend_main.md#gettokensprops)
- [GeyPaymentUrlData](lib_backend_main_types_backend_main.md#geypaymenturldata)
- [LiquidityData](lib_backend_main_types_backend_main.md#liquiditydata)
- [MarketHistoryData](lib_backend_main_types_backend_main.md#markethistorydata)
- [NewsData](lib_backend_main_types_backend_main.md#newsdata)
- [OrdersData](lib_backend_main_types_backend_main.md#ordersdata)
- [PostCategory](lib_backend_main_types_backend_main.md#postcategory)
- [PostData](lib_backend_main_types_backend_main.md#postdata)
- [RefundProps](lib_backend_main_types_backend_main.md#refundprops)
- [RefundRequestProps](lib_backend_main_types_backend_main.md#refundrequestprops)
- [RefundRequestResponse](lib_backend_main_types_backend_main.md#refundrequestresponse)
- [RefundResponse](lib_backend_main_types_backend_main.md#refundresponse)
- [RequestOrdersEmailProps](lib_backend_main_types_backend_main.md#requestordersemailprops)
- [RequestOrdersEmailResponse](lib_backend_main_types_backend_main.md#requestordersemailresponse)
- [RequestOrdersProps](lib_backend_main_types_backend_main.md#requestordersprops)
- [RequestOrdersResponse](lib_backend_main_types_backend_main.md#requestordersresponse)
- [SellOrderInfo](lib_backend_main_types_backend_main.md#sellorderinfo)
- [SellTokenCreate](lib_backend_main_types_backend_main.md#selltokencreate)
- [SellTokenCreateData](lib_backend_main_types_backend_main.md#selltokencreatedata)
- [SellTokenCreateProps](lib_backend_main_types_backend_main.md#selltokencreateprops)
- [Token](lib_backend_main_types_backend_main.md#token)

### Variables

- [postCategories](lib_backend_main_types_backend_main.md#postcategories)

### Functions

- [isPostCategoryDeclared](lib_backend_main_types_backend_main.md#ispostcategorydeclared)

## Type Aliases

### Blockchain

Ƭ **Blockchain**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |
| `chain_id` | `number` |
| `id` | `string` |
| `logo` | `string` |
| `title` | `string` |
| `url` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:47](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L47)

___

### BuyOrderInfo

Ƭ **BuyOrderInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount_in` | `number` |
| `chain_id` | `number` |
| `closed` | `boolean` |
| `created` | `string` |
| `crypto_address` | `string` |
| `currency` | `string` |
| `email` | `string` |
| `id` | `number` |
| `provider` | `string` |
| `send_amount?` | `number` |
| `token` | [`Token`](lib_backend_main_types_backend_main.md#token) |
| `token_id` | `number` |
| `type` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:265](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L265)

___

### CheckLiquidityProps

Ƭ **CheckLiquidityProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `chainId`: `number`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:332](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L332)

___

### CheckLiquidityResponse

Ƭ **CheckLiquidityResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`LiquidityData`](lib_backend_main_types_backend_main.md#liquiditydata)\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:341](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L341)

___

### CheckSellData

Ƭ **CheckSellData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amountIn` | `number` |
| `chainId` | `string` |
| `curIn` | [`Token`](lib_backend_main_types_backend_main.md#token) |
| `curOut` | { `amount`: `number` ; `currency`: `string` ; `holder`: `string` ; `id`: `number` ; `pan`: `string` ; `type`: `string`  } |
| `curOut.amount` | `number` |
| `curOut.currency` | `string` |
| `curOut.holder` | `string` |
| `curOut.id` | `number` |
| `curOut.pan` | `string` |
| `curOut.type` | `string` |
| `date` | `string` |
| `email` | `string` |
| `endTimestamp` | `string` |
| `orderId` | `string` |
| `status` | `string` |
| `timestamp` | `string` |
| `totalAmount` | `number` |
| `wallet` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:127](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L127)

___

### CheckSellOrder

Ƭ **CheckSellOrder**: [`Response`](core_backend_types_core_backend.md#response)<{ `error`: ``false`` ; `result`: [`CheckSellData`](lib_backend_main_types_backend_main.md#checkselldata)  }, { `error`: ``true`` ; `result`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:149](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L149)

___

### CheckSellOrderProps

Ƭ **CheckSellOrderProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `orderId`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:160](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L160)

___

### CloseSellOrder

Ƭ **CloseSellOrder**: [`Response`](core_backend_types_core_backend.md#response)<{ `error`: ``false`` ; `result`: `string`  }, { `error`: ``true`` ; `result`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:168](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L168)

___

### CloseSellOrderProps

Ƭ **CloseSellOrderProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `orderId`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:164](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L164)

___

### CreateFeedbackProps

Ƭ **CreateFeedbackProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `content`: `string` ; `orderId`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:387](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L387)

___

### FiatProvider

Ƭ **FiatProvider**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `currency` | `string` |
| `id` | `number` |
| `logo?` | `string` |
| `max` | `number` |
| `method` | `string` |
| `min` | `number` |
| `provider` | `string` |
| `type` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:56](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L56)

___

### FiatRate

Ƭ **FiatRate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buy` | { `[key: string]`: `number`;  } |
| `chain_id` | `string` |
| `name` | `string` |
| `sell` | { `[key: string]`: `number`;  } |
| `token_address` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:4](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L4)

___

### FindPostProps

Ƭ **FindPostProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `category` | [`PostCategory`](lib_backend_main_types_backend_main.md#postcategory) |
| `lang` | `string` |
| `query` | `string` |
| `strict?` | `boolean` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:378](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L378)

___

### FindPostResponse

Ƭ **FindPostResponse**: [`Response`](core_backend_types_core_backend.md#response)<{ `news`: [`PostData`](lib_backend_main_types_backend_main.md#postdata) \| ``null``  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:385](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L385)

___

### GetBlockchains

Ƭ **GetBlockchains**: [`Response`](core_backend_types_core_backend.md#response)<[`Blockchain`](lib_backend_main_types_backend_main.md#blockchain)[]\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:73](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L73)

___

### GetEmailOrdersProps

Ƭ **GetEmailOrdersProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `code`: `string` ; `email`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:243](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L243)

___

### GetEmailOrdersResponse

Ƭ **GetEmailOrdersResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`OrdersData`](lib_backend_main_types_backend_main.md#ordersdata), { `error`: ``true`` ; `message`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:248](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L248)

___

### GetFiatProviders

Ƭ **GetFiatProviders**: [`Response`](core_backend_types_core_backend.md#response)<[`FiatProvider`](lib_backend_main_types_backend_main.md#fiatprovider)[]\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:71](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L71)

___

### GetFiatRates

Ƭ **GetFiatRates**: [`Response`](core_backend_types_core_backend.md#response)<[`FiatRate`](lib_backend_main_types_backend_main.md#fiatrate)[]\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:67](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L67)

___

### GetNewsProps

Ƭ **GetNewsProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `category` | [`PostCategory`](lib_backend_main_types_backend_main.md#postcategory) |
| `lang` | `string` |
| `page?` | `number` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:370](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L370)

___

### GetNewsResponse

Ƭ **GetNewsResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`NewsData`](lib_backend_main_types_backend_main.md#newsdata)\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:376](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L376)

___

### GetPaymentUrl

Ƭ **GetPaymentUrl**: [`Response`](core_backend_types_core_backend.md#response)<[`GeyPaymentUrlData`](lib_backend_main_types_backend_main.md#geypaymenturldata)\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:96](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L96)

___

### GetPaymentUrlProps

Ƭ **GetPaymentUrlProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `amount`: `number` ; `card`: `string` ; `chainId`: `number` ; `cryptoAddress`: `string` ; `email`: `string` ; `provider`: `string` ; `ticker`: `string` ; `tokenAddress`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:75](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L75)

___

### GetRefundAmountsProps

Ƭ **GetRefundAmountsProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `chainId`: `number`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:218](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L218)

___

### GetRefundAmountsResponse

Ƭ **GetRefundAmountsResponse**: [`Response`](core_backend_types_core_backend.md#response)<{ `KZT`: `number` ; `RUB`: `number` ; `UAH`: `number`  }, { `message`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:222](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L222)

___

### GetTokens

Ƭ **GetTokens**: [`Response`](core_backend_types_core_backend.md#response)<[`Token`](lib_backend_main_types_backend_main.md#token)[]\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:69](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L69)

___

### GetTokensProps

Ƭ **GetTokensProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"buy"`` \| ``"sell"`` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:86](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L86)

___

### GeyPaymentUrlData

Ƭ **GeyPaymentUrlData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `number` |
| `link?` | `string` |
| `message?` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:90](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L90)

___

### LiquidityData

Ƭ **LiquidityData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buy` | `boolean` |
| `sell` | `boolean` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:336](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L336)

___

### MarketHistoryData

Ƭ **MarketHistoryData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `price` | { `KZT`: `number` ; `RUB`: `number` ; `UAH`: `number`  } |
| `price.KZT` | `number` |
| `price.RUB` | `number` |
| `price.UAH` | `number` |
| `timestamp` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:38](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L38)

___

### NewsData

Ƭ **NewsData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `news` | [`PostData`](lib_backend_main_types_backend_main.md#postdata)[] \| ``null`` |
| `pin` | [`PostData`](lib_backend_main_types_backend_main.md#postdata) \| ``null`` |
| `total_pages` | `number` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:355](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L355)

___

### OrdersData

Ƭ **OrdersData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buy` | { `error`: [`BuyOrderInfo`](lib_backend_main_types_backend_main.md#buyorderinfo)[] ; `request`: [`BuyOrderInfo`](lib_backend_main_types_backend_main.md#buyorderinfo)[] ; `success`: [`BuyOrderInfo`](lib_backend_main_types_backend_main.md#buyorderinfo)[]  } |
| `buy.error` | [`BuyOrderInfo`](lib_backend_main_types_backend_main.md#buyorderinfo)[] |
| `buy.request` | [`BuyOrderInfo`](lib_backend_main_types_backend_main.md#buyorderinfo)[] |
| `buy.success` | [`BuyOrderInfo`](lib_backend_main_types_backend_main.md#buyorderinfo)[] |
| `sell` | [`SellOrderInfo`](lib_backend_main_types_backend_main.md#sellorderinfo)[] |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:256](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L256)

___

### PostCategory

Ƭ **PostCategory**: typeof [`postCategories`](lib_backend_main_types_backend_main.md#postcategories)[`number`]

#### Defined in

[src/lib/backend/main/types.backend.main.ts:362](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L362)

___

### PostData

Ƭ **PostData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `category` | `string` |
| `created` | `string` |
| `id` | `number` |
| `img` | `string` |
| `pinned` | `boolean` |
| `short_description` | `string` |
| `slug` | `string` |
| `text` | `string` |
| `title` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:343](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L343)

___

### RefundProps

Ƭ **RefundProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `code`: `number` ; `orderId`: `string` ; `wallet`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:193](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L193)

___

### RefundRequestProps

Ƭ **RefundRequestProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `orderId`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:179](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L179)

___

### RefundRequestResponse

Ƭ **RefundRequestResponse**: [`Response`](core_backend_types_core_backend.md#response)<{ `error`: ``false`` ; `result`: `string`  }, { `error`: ``true``  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:183](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L183)

___

### RefundResponse

Ƭ **RefundResponse**: [`Response`](core_backend_types_core_backend.md#response)<{ `error`: ``false`` ; `result`: `string`  }, { `error`: ``true``  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:199](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L199)

___

### RequestOrdersEmailProps

Ƭ **RequestOrdersEmailProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `email`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:231](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L231)

___

### RequestOrdersEmailResponse

Ƭ **RequestOrdersEmailResponse**: [`Response`](core_backend_types_core_backend.md#response)<`boolean`, { `error`: ``true`` ; `message`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:235](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L235)

___

### RequestOrdersProps

Ƭ **RequestOrdersProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `email`: `string`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:209](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L209)

___

### RequestOrdersResponse

Ƭ **RequestOrdersResponse**: [`Response`](core_backend_types_core_backend.md#response)<`boolean`, { `error`: ``true`` ; `result?`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:213](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L213)

___

### SellOrderInfo

Ƭ **SellOrderInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount_in` | `number` |
| `chain_id` | `number` |
| `cur_in` | { `address`: `string` ; `chain_id`: `number` ; `contract`: `string` ; `decimals`: `number` ; `enabled`: `boolean` ; `fee`: { `id`: `number` ; `pool`: `number` ; `service`: `number` ; `token`: `number`  } ; `fee_id`: `number` ; `id`: `number` ; `logo_uri`: `string` ; `name`: `string` ; `stable`: `boolean` ; `symbol`: `string`  } |
| `cur_in.address` | `string` |
| `cur_in.chain_id` | `number` |
| `cur_in.contract` | `string` |
| `cur_in.decimals` | `number` |
| `cur_in.enabled` | `boolean` |
| `cur_in.fee` | { `id`: `number` ; `pool`: `number` ; `service`: `number` ; `token`: `number`  } |
| `cur_in.fee.id` | `number` |
| `cur_in.fee.pool` | `number` |
| `cur_in.fee.service` | `number` |
| `cur_in.fee.token` | `number` |
| `cur_in.fee_id` | `number` |
| `cur_in.id` | `number` |
| `cur_in.logo_uri` | `string` |
| `cur_in.name` | `string` |
| `cur_in.stable` | `boolean` |
| `cur_in.symbol` | `string` |
| `cur_in_id` | `number` |
| `cur_out` | { `amount`: `number` ; `currency`: `string` ; `holder`: `string` ; `id`: `number` ; `pan`: `string` ; `type`: `string`  } |
| `cur_out.amount` | `number` |
| `cur_out.currency` | `string` |
| `cur_out.holder` | `string` |
| `cur_out.id` | `number` |
| `cur_out.pan` | `string` |
| `cur_out.type` | `string` |
| `cur_out_id` | `number` |
| `date` | `string` |
| `date_to_string` | `string` |
| `email` | `string` |
| `fee` | `number` |
| `id` | `number` |
| `interval_id` | `number` |
| `order_id` | `string` |
| `status` | `string` |
| `timestamp` | `string` |
| `total_amount` | `number` |
| `wallet` | { `address`: `string` ; `id`: `number` ; `private_key`: `string`  } |
| `wallet.address` | `string` |
| `wallet.id` | `number` |
| `wallet.private_key` | `string` |
| `wallet_id` | `number` |
| `withdraw` | `boolean` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:281](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L281)

___

### SellTokenCreate

Ƭ **SellTokenCreate**: [`Response`](core_backend_types_core_backend.md#response)<{ `error`: ``false`` ; `result`: [`SellTokenCreateData`](lib_backend_main_types_backend_main.md#selltokencreatedata)  }, { `error`: ``true`` ; `result`: `string`  }\>

#### Defined in

[src/lib/backend/main/types.backend.main.ts:122](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L122)

___

### SellTokenCreateData

Ƭ **SellTokenCreateData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `end` | `string` |
| `orderId` | `number` |
| `totalAmount` | `number` |
| `wallet` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:115](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L115)

___

### SellTokenCreateProps

Ƭ **SellTokenCreateProps**: [`UrlRequest`](core_backend_types_core_backend.md#urlrequest) & { `cur_in`: { `address`: `string` ; `chain_id`: `number` ; `decimals`: `number` ; `symbol`: `string`  } ; `cur_out`: { `currency`: `string` ; `holder`: `string` ; `pan`: `string` ; `type`: `string`  } ; `email`: `string` ; `totalAmount`: `number`  }

#### Defined in

[src/lib/backend/main/types.backend.main.ts:98](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L98)

___

### Token

Ƭ **Token**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chain` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain) |
| `chain_id` | `number` |
| `contract` | `string` |
| `decimals` | `number` |
| `enabled` | `boolean` |
| `fee?` | { `id`: `number` ; `pool`: `number` ; `service`: `number` ; `token`: `number`  } |
| `fee.id` | `number` |
| `fee.pool` | `number` |
| `fee.service` | `number` |
| `fee.token` | `number` |
| `fee_id` | `number` |
| `id` | `number` |
| `logo_uri` | `string` |
| `market_history?` | [`MarketHistoryData`](lib_backend_main_types_backend_main.md#markethistorydata)[] |
| `name` | `string` |
| `stable` | `boolean` |
| `symbol` | `string` |

#### Defined in

[src/lib/backend/main/types.backend.main.ts:16](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L16)

## Variables

### postCategories

• `Const` **postCategories**: readonly [``"all"``, ``"news"``, ``"articles"``, ``"actual"``]

#### Defined in

[src/lib/backend/main/types.backend.main.ts:361](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L361)

## Functions

### isPostCategoryDeclared

▸ **isPostCategoryDeclared**(`value`): value is "all" \| "news" \| "articles" \| "actual"

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

value is "all" \| "news" \| "articles" \| "actual"

#### Defined in

[src/lib/backend/main/types.backend.main.ts:364](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/types.backend.main.ts#L364)
