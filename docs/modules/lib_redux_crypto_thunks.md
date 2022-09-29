[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/crypto/thunks

# Module: lib/redux/crypto/thunks

## Table of contents

### Functions

- [getBlockchains](lib_redux_crypto_thunks.md#getblockchains)
- [getBuyTokens](lib_redux_crypto_thunks.md#getbuytokens)
- [getSellTokens](lib_redux_crypto_thunks.md#getselltokens)

## Functions

### getBlockchains

▸ **getBlockchains**(`arg?`): `AsyncThunkAction`<[`GetBlockchains`](lib_backend_main_types_backend_main.md#getblockchains), `undefined` \| `AbortSignal`, { `state`: `Object`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg?` | `AbortSignal` |

#### Returns

`AsyncThunkAction`<[`GetBlockchains`](lib_backend_main_types_backend_main.md#getblockchains), `undefined` \| `AbortSignal`, { `state`: `Object`  }\>

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAsyncThunk.d.ts:107

___

### getBuyTokens

▸ **getBuyTokens**(`arg`): `AsyncThunkAction`<``null`` \| [`GetTokens`](lib_backend_main_types_backend_main.md#gettokens), { `signal`: `undefined` \| `AbortSignal`  }, { `state`: `Object`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.signal` | `undefined` \| `AbortSignal` |

#### Returns

`AsyncThunkAction`<``null`` \| [`GetTokens`](lib_backend_main_types_backend_main.md#gettokens), { `signal`: `undefined` \| `AbortSignal`  }, { `state`: `Object`  }\>

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAsyncThunk.d.ts:107

___

### getSellTokens

▸ **getSellTokens**(`arg`): `AsyncThunkAction`<``null`` \| [`GetTokens`](lib_backend_main_types_backend_main.md#gettokens), { `signal`: `undefined` \| `AbortSignal`  }, { `state`: `Object`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.signal` | `undefined` \| `AbortSignal` |

#### Returns

`AsyncThunkAction`<``null`` \| [`GetTokens`](lib_backend_main_types_backend_main.md#gettokens), { `signal`: `undefined` \| `AbortSignal`  }, { `state`: `Object`  }\>

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAsyncThunk.d.ts:107
