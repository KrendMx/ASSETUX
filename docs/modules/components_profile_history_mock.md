[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/profile/history/mock

# Module: components/profile/history/mock

## Table of contents

### Functions

- [cardNames](components_profile_history_mock.md#cardnames)
- [tableHeadings](components_profile_history_mock.md#tableheadings)

## Functions

### cardNames

▸ **cardNames**(`t`, `merchantMode?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `TFunction` | `undefined` |
| `merchantMode` | [`MerchantMode`](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) | `'RETENTION'` |

#### Returns

`string`[]

#### Defined in

[src/components/profile/history/mock.ts:63](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/history/mock.ts#L63)

___

### tableHeadings

▸ **tableHeadings**(`t`, `merchantMode?`): ({ `sortFn`: (`a`: `number`, `b`: `number`) => `number` = minusSort; `value`: `string`  } \| { `sortFn`: (`a`: `string`, `b`: `string`) => ``0`` \| ``1`` \| ``-1`` = ternarSort; `value`: `string`  } \| { `sortFn`: `undefined` ; `value`: `string`  })[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `TFunction` | `undefined` |
| `merchantMode` | [`MerchantMode`](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) | `'RETENTION'` |

#### Returns

({ `sortFn`: (`a`: `number`, `b`: `number`) => `number` = minusSort; `value`: `string`  } \| { `sortFn`: (`a`: `string`, `b`: `string`) => ``0`` \| ``1`` \| ``-1`` = ternarSort; `value`: `string`  } \| { `sortFn`: `undefined` ; `value`: `string`  })[]

#### Defined in

[src/components/profile/history/mock.ts:7](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/history/mock.ts#L7)
