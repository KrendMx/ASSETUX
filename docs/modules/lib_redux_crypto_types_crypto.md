[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/crypto/types.crypto

# Module: lib/redux/crypto/types.crypto

## Table of contents

### Type Aliases

- [ActionType](lib_redux_crypto_types_crypto.md#actiontype)
- [CryptoState](lib_redux_crypto_types_crypto.md#cryptostate)

## Type Aliases

### ActionType

Ƭ **ActionType**: ``"BUY"`` \| ``"SELL"``

#### Defined in

[src/lib/redux/crypto/types.crypto.ts:4](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/crypto/types.crypto.ts#L4)

___

### CryptoState

Ƭ **CryptoState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | [`ActionType`](lib_redux_crypto_types_crypto.md#actiontype) |
| `availableBlockchains` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain)[] \| ``null`` |
| `availableTokens` | [`Token`](lib_backend_main_types_backend_main.md#token)[] \| ``null`` |
| `currentRate` | `number` \| ``null`` |
| `explorerData` | [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata)[] \| ``null`` |
| `selectedBlockchain` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain) \| ``null`` |
| `selectedSellToken` | [`Token`](lib_backend_main_types_backend_main.md#token) \| ``null`` |
| `selectedToken` | [`Token`](lib_backend_main_types_backend_main.md#token) \| ``null`` |
| `sellOrderId` | `string` \| ``null`` |
| `sellTokens` | [`Token`](lib_backend_main_types_backend_main.md#token)[] \| ``null`` |

#### Defined in

[src/lib/redux/crypto/types.crypto.ts:6](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/crypto/types.crypto.ts#L6)
