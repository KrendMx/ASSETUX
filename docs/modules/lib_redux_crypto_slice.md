[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/crypto/slice

# Module: lib/redux/crypto/slice

## Table of contents

### References

- [default](lib_redux_crypto_slice.md#default)

### Variables

- [slice](lib_redux_crypto_slice.md#slice)

## References

### default

Renames and re-exports [slice](lib_redux_crypto_slice.md#slice)

## Variables

### slice

• `Const` **slice**: `Slice`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate), { `setCurrentRate`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: ``null`` \| `number` ; `type`: `string`  }) => `void` ; `setExplorerData`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: ``null`` \| [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata)[] ; `type`: `string`  }) => `void` ; `setSelectedBlockchain`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain) ; `type`: `string`  }) => `void` ; `setSelectedSellToken`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: [`Token`](lib_backend_main_types_backend_main.md#token) ; `type`: `string`  }) => `void` ; `setSelectedToken`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: [`Token`](lib_backend_main_types_backend_main.md#token) ; `type`: `string`  }) => `void` ; `setSellOrderId`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: ``null`` \| `string` ; `type`: `string`  }) => `void` ; `swapAction`: (`state`: `WritableDraft`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate)\>, `action`: { `payload`: `undefined` \| [`ActionType`](lib_redux_crypto_types_crypto.md#actiontype) ; `type`: `string`  }) => `void`  }, ``"crypto"``\>

#### Defined in

[src/lib/redux/crypto/slice.ts:31](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/crypto/slice.ts#L31)
