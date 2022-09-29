[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/profile/bill/useListing

# Module: components/profile/bill/useListing

## Table of contents

### Functions

- [default](components_profile_bill_useListing.md#default)

## Functions

### default

▸ **default**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BillProps`](components_profile_bill_listing.md#billprops) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `currencies` | ``null`` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `get` | { `actual`: `number` = 0; `visible`: `string` = '' } |
| `get.actual` | `number` |
| `get.visible` | `string` |
| `getActive` | `boolean` |
| `getCurrencyActive` | `boolean` |
| `handleGet` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `handleSend` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `handleSubmit` | `FormEventHandler`<`HTMLButtonElement` \| `HTMLFormElement`\> |
| `inputError` | `string` |
| `isRETENTION` | `boolean` |
| `isTRANSFER` | `boolean` |
| `linkModalProps` | { `link`: `string` ; `open`: ``true``  } \| { `open`: ``false``  } |
| `loading` | `boolean` |
| `outputError` | `string` |
| `ranges` | ``null`` \| { `max`: `number` ; `min`: `number`  } |
| `selectedCurrency` | ``null`` \| `string` |
| `send` | `string` |
| `setGetCurrencyActive` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setLinkModalProps` | `Dispatch`<`SetStateAction`<{ `link`: `string` ; `open`: ``true``  } \| { `open`: ``false``  }\>\> |
| `setSelectedCurrency` | `Dispatch`<`SetStateAction`<``null`` \| `string`\>\> |
| `submitValue` | `string` |
| `t` | `TFunction`<``"profile-bill"`` \| ``"profile-listing"``, `undefined`\> |
| `waitingResponse` | `boolean` |

#### Defined in

[src/components/profile/bill/useListing.ts:22](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/bill/useListing.ts#L22)
