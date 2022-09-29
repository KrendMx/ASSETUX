[Assetux-Frontend](../README.md) / [Exports](../modules.md) / core/backend/types.core.backend

# Module: core/backend/types.core.backend

## Table of contents

### Enumerations

- [PayProviders](../enums/core_backend_types_core_backend.PayProviders.md)

### Type Aliases

- [Abortable](core_backend_types_core_backend.md#abortable)
- [CancelledResponse](core_backend_types_core_backend.md#cancelledresponse)
- [ErrorRequest](core_backend_types_core_backend.md#errorrequest)
- [ErrorResponse](core_backend_types_core_backend.md#errorresponse)
- [PendingRequest](core_backend_types_core_backend.md#pendingrequest)
- [RequestState](core_backend_types_core_backend.md#requeststate)
- [Response](core_backend_types_core_backend.md#response)
- [SuccessfulRequest](core_backend_types_core_backend.md#successfulrequest)
- [SuccessfulResponse](core_backend_types_core_backend.md#successfulresponse)
- [UnavailableResponse](core_backend_types_core_backend.md#unavailableresponse)
- [UrlRequest](core_backend_types_core_backend.md#urlrequest)

### Variables

- [QIWI](core_backend_types_core_backend.md#qiwi)
- [VISAMASTER](core_backend_types_core_backend.md#visamaster)

## Type Aliases

### Abortable

Ƭ **Abortable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signal?` | `AbortSignal` |

#### Defined in

[src/core/backend/types.core.backend.ts:52](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L52)

___

### CancelledResponse

Ƭ **CancelledResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `state` | ``"cancelled"`` |

#### Defined in

[src/core/backend/types.core.backend.ts:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L34)

___

### ErrorRequest

Ƭ **ErrorRequest**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | `T` |
| `state` | ``"error"`` |

#### Defined in

[src/core/backend/types.core.backend.ts:10](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L10)

___

### ErrorResponse

Ƭ **ErrorResponse**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `message` | `string` |
| `state` | ``"error"`` |
| `status` | `number` |

#### Defined in

[src/core/backend/types.core.backend.ts:27](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L27)

___

### PendingRequest

Ƭ **PendingRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `state` | ``"pending"`` |

#### Defined in

[src/core/backend/types.core.backend.ts:1](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L1)

___

### RequestState

Ƭ **RequestState**<`S`, `E`\>: [`PendingRequest`](core_backend_types_core_backend.md#pendingrequest) \| [`SuccessfulRequest`](core_backend_types_core_backend.md#successfulrequest)<`S`\> \| [`ErrorRequest`](core_backend_types_core_backend.md#errorrequest)<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |
| `E` | `unknown` |

#### Defined in

[src/core/backend/types.core.backend.ts:15](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L15)

___

### Response

Ƭ **Response**<`S`, `E`\>: [`SuccessfulResponse`](core_backend_types_core_backend.md#successfulresponse)<`S`\> \| [`ErrorResponse`](core_backend_types_core_backend.md#errorresponse)<`E`\> \| [`CancelledResponse`](core_backend_types_core_backend.md#cancelledresponse) \| [`UnavailableResponse`](core_backend_types_core_backend.md#unavailableresponse)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |
| `E` | `unknown` |

#### Defined in

[src/core/backend/types.core.backend.ts:42](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L42)

___

### SuccessfulRequest

Ƭ **SuccessfulRequest**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `result` | `T` |
| `state` | ``"success"`` |

#### Defined in

[src/core/backend/types.core.backend.ts:5](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L5)

___

### SuccessfulResponse

Ƭ **SuccessfulResponse**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `message` | `string` |
| `state` | ``"success"`` |
| `status` | `number` |

#### Defined in

[src/core/backend/types.core.backend.ts:20](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L20)

___

### UnavailableResponse

Ƭ **UnavailableResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `state` | ``"unavailable"`` |

#### Defined in

[src/core/backend/types.core.backend.ts:38](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L38)

___

### UrlRequest

Ƭ **UrlRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apiHost` | `string` |

#### Defined in

[src/core/backend/types.core.backend.ts:48](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L48)

## Variables

### QIWI

• **QIWI**: [`QIWI`](../enums/core_backend_types_core_backend.PayProviders.md#qiwi)

#### Defined in

[src/core/backend/types.core.backend.ts:61](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L61)

___

### VISAMASTER

• **VISAMASTER**: [`VISAMASTER`](../enums/core_backend_types_core_backend.PayProviders.md#visamaster)

#### Defined in

[src/core/backend/types.core.backend.ts:61](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/types.core.backend.ts#L61)
