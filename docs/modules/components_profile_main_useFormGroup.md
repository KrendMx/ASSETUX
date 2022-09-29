[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/profile/main/useFormGroup

# Module: components/profile/main/useFormGroup

## Table of contents

### Functions

- [default](components_profile_main_useFormGroup.md#default)

## Functions

### default

▸ **default**(`props`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IMerchant`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `avaliableChains` | `undefined` \| [`Option`](components_profile_main_types_main.md#option)[] |
| `background` | { `img`: ``null`` \| `string` ; `name`: `string` = backgroundCompanyName } |
| `background.img` | ``null`` \| `string` |
| `background.name` | `string` |
| `balance` | `number` |
| `company` | `string` |
| `email` | `string` |
| `handleFile` | (`image`: [`ImageString`](components_profile_main_types_main.md#imagestring)) => (`file`: `File`) => `Promise`<`void`\> |
| `handlePaymentSubmit` | `FormEventHandler`<`HTMLFormElement`\> |
| `handleSetCompany` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `handleSetWallet` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `handleWidgetSubmit` | `FormEventHandler`<`HTMLFormElement`\> |
| `inputError` | `Record`<`string`, `undefined` \| `string`\> |
| `isCONNECT` | `boolean` |
| `isTRANSFER` | `boolean` |
| `logo` | { `img`: ``null`` \| `string` ; `name`: `string` = logoCompanyName } |
| `logo.img` | ``null`` \| `string` |
| `logo.name` | `string` |
| `onBlockchainChange` | (`blockchainTitle`: `string`) => `void` |
| `prevBackground` | `MutableRefObject`<`string`\> |
| `prevCompany` | `MutableRefObject`<`string`\> |
| `prevLogo` | `MutableRefObject`<`string`\> |
| `prevPublicKey` | `MutableRefObject`<`string`\> |
| `requests` | `Record`<[`Widgets`](components_profile_main_types_main.md#widgets), ``null`` \| [`RequestState`](core_backend_types_core_backend.md#requeststate)<`unknown`, `unknown`\>\> |
| `selectedChain` | `undefined` \| [`Option`](components_profile_main_types_main.md#option) |
| `selectedToken` | `undefined` \| { `address`: `string` ; `chain`: [`IChain`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IChain.md) ; `id`: `number` ; `logo_uri`: `string` ; `name`: `string` ; `symbol`: `string`  } |
| `setSupportOpen` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `supportOpen` | `boolean` |
| `t` | `TFunction`<``"profile"``, `undefined`\> |
| `tokens` | { `address`: `string` ; `chain`: [`IChain`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IChain.md) ; `id`: `number` ; `logo_uri`: `string` ; `name`: `string` ; `symbol`: `string`  }[] |
| `updatedWidget` | `boolean` |
| `userId` | `string` |
| `wallet` | `string` |

#### Defined in

[src/components/profile/main/useFormGroup.ts:21](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/main/useFormGroup.ts#L21)
