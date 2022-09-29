[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/common/crypto-manager/types.crypto-manager

# Module: components/common/crypto-manager/types.crypto-manager

## Table of contents

### Type Aliases

- [ClientToServerEvents](components_common_crypto_manager_types_crypto_manager.md#clienttoserverevents)
- [CryptoManagerProps](components_common_crypto_manager_types_crypto_manager.md#cryptomanagerprops)
- [ExplorerData](components_common_crypto_manager_types_crypto_manager.md#explorerdata)
- [ServerToClientEvents](components_common_crypto_manager_types_crypto_manager.md#servertoclientevents)

## Type Aliases

### ClientToServerEvents

Ƭ **ClientToServerEvents**: `Object`

#### Defined in

[src/components/common/crypto-manager/types.crypto-manager.ts:19](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/crypto-manager/types.crypto-manager.ts#L19)

___

### CryptoManagerProps

Ƭ **CryptoManagerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getChart?` | `boolean` |
| `getToken?` | `boolean` |

#### Defined in

[src/components/common/crypto-manager/types.crypto-manager.ts:21](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/crypto-manager/types.crypto-manager.ts#L21)

___

### ExplorerData

Ƭ **ExplorerData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buy` | `number` |
| `change24` | `number` |
| `currency` | `string` |
| `id` | `number` |
| `sell` | `number` |
| `ticker` | `string` |
| `token` | [`Token`](lib_backend_main_types_backend_main.md#token) |
| `token_address` | `string` |
| `volume24` | `number` |

#### Defined in

[src/components/common/crypto-manager/types.crypto-manager.ts:3](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/crypto-manager/types.crypto-manager.ts#L3)

___

### ServerToClientEvents

Ƭ **ServerToClientEvents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chart` | (`data`: [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata)[]) => `void` |

#### Defined in

[src/components/common/crypto-manager/types.crypto-manager.ts:15](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/crypto-manager/types.crypto-manager.ts#L15)
