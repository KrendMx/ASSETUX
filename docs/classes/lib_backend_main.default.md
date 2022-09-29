[Assetux-Frontend](../README.md) / [Exports](../modules.md) / [lib/backend/main](../modules/lib_backend_main.md) / default

# Class: default

[lib/backend/main](../modules/lib_backend_main.md).default

## Table of contents

### Constructors

- [constructor](lib_backend_main.default.md#constructor)

### Methods

- [checkLiquidity](lib_backend_main.default.md#checkliquidity)
- [checkSellOrder](lib_backend_main.default.md#checksellorder)
- [closeSellOrder](lib_backend_main.default.md#closesellorder)
- [createFeedback](lib_backend_main.default.md#createfeedback)
- [createSellTokenOrder](lib_backend_main.default.md#createselltokenorder)
- [findPost](lib_backend_main.default.md#findpost)
- [getBlockchains](lib_backend_main.default.md#getblockchains)
- [getEmailOrders](lib_backend_main.default.md#getemailorders)
- [getFiatProviders](lib_backend_main.default.md#getfiatproviders)
- [getFiatRates](lib_backend_main.default.md#getfiatrates)
- [getNews](lib_backend_main.default.md#getnews)
- [getPaymentUrl](lib_backend_main.default.md#getpaymenturl)
- [getRefundAmounts](lib_backend_main.default.md#getrefundamounts)
- [getTokens](lib_backend_main.default.md#gettokens)
- [refund](lib_backend_main.default.md#refund)
- [refundRequest](lib_backend_main.default.md#refundrequest)
- [requestOrdersEmail](lib_backend_main.default.md#requestordersemail)
- [requestOrdersWithEmail](lib_backend_main.default.md#requestorderswithemail)

## Constructors

### constructor

• **new default**()

## Methods

### checkLiquidity

▸ **checkLiquidity**(`__namedParameters`): `Promise`<[`CheckLiquidityResponse`](../modules/lib_backend_main_types_backend_main.md#checkliquidityresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & { `chainId`: `number`  } & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<[`CheckLiquidityResponse`](../modules/lib_backend_main_types_backend_main.md#checkliquidityresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:175](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L175)

___

### checkSellOrder

▸ **checkSellOrder**(`__namedParameters`): `Promise`<[`CheckSellOrder`](../modules/lib_backend_main_types_backend_main.md#checksellorder)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & { `orderId`: `string`  } & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<[`CheckSellOrder`](../modules/lib_backend_main_types_backend_main.md#checksellorder)\>

#### Defined in

[src/lib/backend/main/index.ts:92](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L92)

___

### closeSellOrder

▸ **closeSellOrder**(`__namedParameters`): `Promise`<[`CloseSellOrder`](../modules/lib_backend_main_types_backend_main.md#closesellorder)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CloseSellOrderProps`](../modules/lib_backend_main_types_backend_main.md#closesellorderprops) |

#### Returns

`Promise`<[`CloseSellOrder`](../modules/lib_backend_main_types_backend_main.md#closesellorder)\>

#### Defined in

[src/lib/backend/main/index.ts:102](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L102)

___

### createFeedback

▸ **createFeedback**(`__namedParameters`): `Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & { `content`: `string` ; `orderId`: `string`  } & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Defined in

[src/lib/backend/main/index.ts:224](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L224)

___

### createSellTokenOrder

▸ **createSellTokenOrder**(`__namedParameters`): `Promise`<[`SellTokenCreate`](../modules/lib_backend_main_types_backend_main.md#selltokencreate)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SellTokenCreateProps`](../modules/lib_backend_main_types_backend_main.md#selltokencreateprops) |

#### Returns

`Promise`<[`SellTokenCreate`](../modules/lib_backend_main_types_backend_main.md#selltokencreate)\>

#### Defined in

[src/lib/backend/main/index.ts:85](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L85)

___

### findPost

▸ **findPost**(`__namedParameters`): `Promise`<[`FindPostResponse`](../modules/lib_backend_main_types_backend_main.md#findpostresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`FindPostProps`](../modules/lib_backend_main_types_backend_main.md#findpostprops) & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<[`FindPostResponse`](../modules/lib_backend_main_types_backend_main.md#findpostresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:211](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L211)

___

### getBlockchains

▸ **getBlockchains**(`signal?`): `Promise`<[`GetBlockchains`](../modules/lib_backend_main_types_backend_main.md#getblockchains)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal?` | `AbortSignal` |

#### Returns

`Promise`<[`GetBlockchains`](../modules/lib_backend_main_types_backend_main.md#getblockchains)\>

#### Defined in

[src/lib/backend/main/index.ts:69](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L69)

___

### getEmailOrders

▸ **getEmailOrders**(`__namedParameters`): `Promise`<[`GetEmailOrdersResponse`](../modules/lib_backend_main_types_backend_main.md#getemailordersresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & { `code`: `string` ; `email`: `string`  } & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<[`GetEmailOrdersResponse`](../modules/lib_backend_main_types_backend_main.md#getemailordersresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:160](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L160)

___

### getFiatProviders

▸ **getFiatProviders**(`__namedParameters`): `Promise`<[`GetFiatProviders`](../modules/lib_backend_main_types_backend_main.md#getfiatproviders)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<[`GetFiatProviders`](../modules/lib_backend_main_types_backend_main.md#getfiatproviders)\>

#### Defined in

[src/lib/backend/main/index.ts:60](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L60)

___

### getFiatRates

▸ **getFiatRates**(`__namedParameters`): `Promise`<[`GetFiatRates`](../modules/lib_backend_main_types_backend_main.md#getfiatrates)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) |

#### Returns

`Promise`<[`GetFiatRates`](../modules/lib_backend_main_types_backend_main.md#getfiatrates)\>

#### Defined in

[src/lib/backend/main/index.ts:41](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L41)

___

### getNews

▸ **getNews**(`__namedParameters`): `Promise`<[`GetNewsResponse`](../modules/lib_backend_main_types_backend_main.md#getnewsresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GetNewsProps`](../modules/lib_backend_main_types_backend_main.md#getnewsprops) |

#### Returns

`Promise`<[`GetNewsResponse`](../modules/lib_backend_main_types_backend_main.md#getnewsresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:198](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L198)

___

### getPaymentUrl

▸ **getPaymentUrl**(`__namedParameters`): `Promise`<[`GetPaymentUrl`](../modules/lib_backend_main_types_backend_main.md#getpaymenturl)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GetPaymentUrlProps`](../modules/lib_backend_main_types_backend_main.md#getpaymenturlprops) |

#### Returns

`Promise`<[`GetPaymentUrl`](../modules/lib_backend_main_types_backend_main.md#getpaymenturl)\>

#### Defined in

[src/lib/backend/main/index.ts:75](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L75)

___

### getRefundAmounts

▸ **getRefundAmounts**(`__namedParameters`): `Promise`<[`GetRefundAmountsResponse`](../modules/lib_backend_main_types_backend_main.md#getrefundamountsresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GetRefundAmountsProps`](../modules/lib_backend_main_types_backend_main.md#getrefundamountsprops) |

#### Returns

`Promise`<[`GetRefundAmountsResponse`](../modules/lib_backend_main_types_backend_main.md#getrefundamountsresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:138](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L138)

___

### getTokens

▸ **getTokens**(`__namedParameters`): `Promise`<[`GetTokens`](../modules/lib_backend_main_types_backend_main.md#gettokens)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UrlRequest`](../modules/core_backend_types_core_backend.md#urlrequest) & [`Abortable`](../modules/core_backend_types_core_backend.md#abortable) & [`GetTokensProps`](../modules/lib_backend_main_types_backend_main.md#gettokensprops) |

#### Returns

`Promise`<[`GetTokens`](../modules/lib_backend_main_types_backend_main.md#gettokens)\>

#### Defined in

[src/lib/backend/main/index.ts:50](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L50)

___

### refund

▸ **refund**(`__namedParameters`): `Promise`<[`RefundResponse`](../modules/lib_backend_main_types_backend_main.md#refundresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RefundProps`](../modules/lib_backend_main_types_backend_main.md#refundprops) |

#### Returns

`Promise`<[`RefundResponse`](../modules/lib_backend_main_types_backend_main.md#refundresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:120](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L120)

___

### refundRequest

▸ **refundRequest**(`__namedParameters`): `Promise`<[`RefundRequestResponse`](../modules/lib_backend_main_types_backend_main.md#refundrequestresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RefundRequestProps`](../modules/lib_backend_main_types_backend_main.md#refundrequestprops) |

#### Returns

`Promise`<[`RefundRequestResponse`](../modules/lib_backend_main_types_backend_main.md#refundrequestresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:109](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L109)

___

### requestOrdersEmail

▸ **requestOrdersEmail**(`__namedParameters`): `Promise`<[`RequestOrdersEmailResponse`](../modules/lib_backend_main_types_backend_main.md#requestordersemailresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RequestOrdersEmailProps`](../modules/lib_backend_main_types_backend_main.md#requestordersemailprops) |

#### Returns

`Promise`<[`RequestOrdersEmailResponse`](../modules/lib_backend_main_types_backend_main.md#requestordersemailresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:149](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L149)

___

### requestOrdersWithEmail

▸ **requestOrdersWithEmail**(`__namedParameters`): `Promise`<[`RequestOrdersResponse`](../modules/lib_backend_main_types_backend_main.md#requestordersresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RequestOrdersProps`](../modules/lib_backend_main_types_backend_main.md#requestordersprops) |

#### Returns

`Promise`<[`RequestOrdersResponse`](../modules/lib_backend_main_types_backend_main.md#requestordersresponse)\>

#### Defined in

[src/lib/backend/main/index.ts:127](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/main/index.ts#L127)
