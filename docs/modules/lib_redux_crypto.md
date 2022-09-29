[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/crypto

# Module: lib/redux/crypto

## Table of contents

### Properties

- [default](lib_redux_crypto.md#default)

### Functions

- [setCurrentRate](lib_redux_crypto.md#setcurrentrate)
- [setExplorerData](lib_redux_crypto.md#setexplorerdata)
- [setSelectedBlockchain](lib_redux_crypto.md#setselectedblockchain)
- [setSelectedSellToken](lib_redux_crypto.md#setselectedselltoken)
- [setSelectedToken](lib_redux_crypto.md#setselectedtoken)
- [setSellOrderId](lib_redux_crypto.md#setsellorderid)
- [swapAction](lib_redux_crypto.md#swapaction)

## Properties

### default

• **default**: `Reducer`<[`CryptoState`](lib_redux_crypto_types_crypto.md#cryptostate), `AnyAction`\>

The slice's reducer.

#### Defined in

node_modules/@reduxjs/toolkit/dist/createSlice.d.ts:27

## Functions

### setCurrentRate

▸ **setCurrentRate**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | ``null`` \| `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | ``null`` \| `number` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setExplorerData

▸ **setExplorerData**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | ``null`` \| [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | ``null`` \| [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata)[] |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setSelectedBlockchain

▸ **setSelectedBlockchain**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain) |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setSelectedSellToken

▸ **setSelectedSellToken**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`Token`](lib_backend_main_types_backend_main.md#token) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | [`Token`](lib_backend_main_types_backend_main.md#token) |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setSelectedToken

▸ **setSelectedToken**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`Token`](lib_backend_main_types_backend_main.md#token) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | [`Token`](lib_backend_main_types_backend_main.md#token) |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setSellOrderId

▸ **setSellOrderId**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | ``null`` \| `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | ``null`` \| `string` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### swapAction

▸ **swapAction**(`payload?`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`.
Calling it without an argument will return a PayloadAction with a payload of `undefined`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | [`ActionType`](lib_redux_crypto_types_crypto.md#actiontype) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` \| [`ActionType`](lib_redux_crypto_types_crypto.md#actiontype) |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:95
