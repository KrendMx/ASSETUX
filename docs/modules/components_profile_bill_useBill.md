[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/profile/bill/useBill

# Module: components/profile/bill/useBill

## Table of contents

### Functions

- [default](components_profile_bill_useBill.md#default)

## Functions

### default

▸ **default**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BillProps`](components_profile_bill_bill.md#billprops) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `blockchains` | ``null`` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `currencies` | ``null`` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `currentRate` | ``null`` \| `number` |
| `get` | { `actual`: `number` = 0; `visible`: `string` = '' } |
| `get.actual` | `number` |
| `get.visible` | `string` |
| `getActive` | `boolean` |
| `getCurrencyActive` | `boolean` |
| `handleGet` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `handleSend` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `handleSubmit` | `FormEventHandler`<`HTMLFormElement`\> |
| `inputError` | `string` |
| `isTRANSFER` | `boolean` |
| `linkModalProps` | { `link`: `string` ; `open`: ``true``  } \| { `open`: ``false``  } |
| `loading` | `boolean` |
| `ranges` | ``null`` \| { `max`: `number` ; `min`: `number`  } |
| `selectedChain` | `undefined` \| [`Option`](components_common_input_select_types_input_select.md#option) |
| `selectedCurrency` | ``null`` \| `string` |
| `selectedToken` | ``null`` \| `string` |
| `send` | `string` |
| `setGetActive` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setGetCurrencyActive` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setLinkModalProps` | `Dispatch`<`SetStateAction`<{ `link`: `string` ; `open`: ``true``  } \| { `open`: ``false``  }\>\> |
| `setSelectedCurrency` | `Dispatch`<`SetStateAction`<``null`` \| `string`\>\> |
| `setSelectedToken` | `Dispatch`<`SetStateAction`<``null`` \| `string`\>\> |
| `submitValue` | `string` |
| `tokens` | ``null`` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `waitingResponse` | `boolean` |

#### Defined in

[src/components/profile/bill/useBill.ts:21](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/bill/useBill.ts#L21)
