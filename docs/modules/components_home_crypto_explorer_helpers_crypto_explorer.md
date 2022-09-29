[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/crypto-explorer/helpers.crypto-explorer

# Module: components/home/crypto-explorer/helpers.crypto-explorer

## Table of contents

### Functions

- [cardRowNames](components_home_crypto_explorer_helpers_crypto_explorer.md#cardrownames)
- [checkExplorerDataByContext](components_home_crypto_explorer_helpers_crypto_explorer.md#checkexplorerdatabycontext)
- [tableHeadings](components_home_crypto_explorer_helpers_crypto_explorer.md#tableheadings)

## Functions

### cardRowNames

▸ **cardRowNames**(`t`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `TFunction` |

#### Returns

`string`[]

#### Defined in

[src/components/home/crypto-explorer/helpers.crypto-explorer.ts:29](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/crypto-explorer/helpers.crypto-explorer.ts#L29)

___

### checkExplorerDataByContext

▸ **checkExplorerDataByContext**(`explorerData`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `explorerData` | [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata) |
| `context` | `string` |

#### Returns

`boolean`

#### Defined in

[src/components/home/crypto-explorer/helpers.crypto-explorer.ts:37](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/crypto-explorer/helpers.crypto-explorer.ts#L37)

___

### tableHeadings

▸ **tableHeadings**(`t`): ({ `sortFn`: (`a`: `number`, `b`: `number`) => `number` ; `value`: `string`  } \| { `sortFn`: (`a`: `string`, `b`: `string`) => `number` ; `value`: `string`  } \| { `sortFn`: `undefined` ; `value`: `string`  })[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `TFunction` |

#### Returns

({ `sortFn`: (`a`: `number`, `b`: `number`) => `number` ; `value`: `string`  } \| { `sortFn`: (`a`: `string`, `b`: `string`) => `number` ; `value`: `string`  } \| { `sortFn`: `undefined` ; `value`: `string`  })[]

#### Defined in

[src/components/home/crypto-explorer/helpers.crypto-explorer.ts:4](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/crypto-explorer/helpers.crypto-explorer.ts#L4)
