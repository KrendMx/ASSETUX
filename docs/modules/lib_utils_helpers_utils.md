[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/utils/helpers.utils

# Module: lib/utils/helpers.utils

## Table of contents

### Type Aliases

- [Nullable](lib_utils_helpers_utils.md#nullable)
- [QueryObject](lib_utils_helpers_utils.md#queryobject)

### Functions

- [capitalizeString](lib_utils_helpers_utils.md#capitalizestring)
- [checkAuthorization](lib_utils_helpers_utils.md#checkauthorization)
- [ellipsisString](lib_utils_helpers_utils.md#ellipsisstring)
- [getEcommercePrefix](lib_utils_helpers_utils.md#getecommerceprefix)
- [logout](lib_utils_helpers_utils.md#logout)
- [mapQueryObject](lib_utils_helpers_utils.md#mapqueryobject)
- [sanitize](lib_utils_helpers_utils.md#sanitize)
- [stringToPieces](lib_utils_helpers_utils.md#stringtopieces)
- [toBase64](lib_utils_helpers_utils.md#tobase64)
- [updateURL](lib_utils_helpers_utils.md#updateurl)
- [validateDecimal](lib_utils_helpers_utils.md#validatedecimal)

## Type Aliases

### Nullable

Ƭ **Nullable**<`T`\>: { [K in keyof T]: T[K] \| null }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/utils/helpers.utils.ts:111](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L111)

___

### QueryObject

Ƭ **QueryObject**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `undefined`

#### Defined in

[src/lib/utils/helpers.utils.ts:49](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L49)

## Functions

### capitalizeString

▸ **capitalizeString**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/utils/helpers.utils.ts:33](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L33)

___

### checkAuthorization

▸ **checkAuthorization**(`req`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` & { `cookies`: `Partial`<{ `[key: string]`: `string`;  }\>  } |

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/utils/helpers.utils.ts:79](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L79)

___

### ellipsisString

▸ **ellipsisString**(`value`, `maxLength`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `maxLength` | `number` |

#### Returns

`string`

#### Defined in

[src/lib/utils/helpers.utils.ts:11](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L11)

___

### getEcommercePrefix

▸ **getEcommercePrefix**(): ``""`` \| ``"/profile"``

#### Returns

``""`` \| ``"/profile"``

#### Defined in

[src/lib/utils/helpers.utils.ts:113](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L113)

___

### logout

▸ **logout**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/utils/helpers.utils.ts:69](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L69)

___

### mapQueryObject

▸ **mapQueryObject**(`query`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`QueryObject`](lib_utils_helpers_utils.md#queryobject) |

#### Returns

`string`

#### Defined in

[src/lib/utils/helpers.utils.ts:53](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L53)

___

### sanitize

▸ **sanitize**(`html`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/utils/helpers.utils.ts:106](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L106)

___

### stringToPieces

▸ **stringToPieces**(`string`, `pieceLength`, `delimeter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |
| `pieceLength` | `number` |
| `delimeter` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/utils/helpers.utils.ts:19](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L19)

___

### toBase64

▸ **toBase64**(`file`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/utils/helpers.utils.ts:59](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L59)

___

### updateURL

▸ **updateURL**(`newUrl`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newUrl` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/utils/helpers.utils.ts:41](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L41)

___

### validateDecimal

▸ **validateDecimal**(`value`): [`boolean`, `string`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`boolean`, `string`]

#### Defined in

[src/lib/utils/helpers.utils.ts:98](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/utils/helpers.utils.ts#L98)
