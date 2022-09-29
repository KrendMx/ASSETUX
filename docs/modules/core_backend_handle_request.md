[Assetux-Frontend](../README.md) / [Exports](../modules.md) / core/backend/handle-request

# Module: core/backend/handle-request

## Table of contents

### Functions

- [api](core_backend_handle_request.md#api)
- [devHandleSuccessRequest](core_backend_handle_request.md#devhandlesuccessrequest)

## Functions

### api

▸ **api**(`config`): `AxiosPromise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `AxiosRequestConfig`<`any`\> |

#### Returns

`AxiosPromise`<`any`\>

#### Defined in

node_modules/axios/index.d.ts:236

▸ **api**(`url`, `config?`): `AxiosPromise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `config?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`AxiosPromise`<`any`\>

#### Defined in

node_modules/axios/index.d.ts:237

___

### devHandleSuccessRequest

▸ **devHandleSuccessRequest**(`data`): `Promise`<[`Response`](core_backend_types_core_backend.md#response)<`any`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`<[`Response`](core_backend_types_core_backend.md#response)<`any`, `any`\>\>

#### Defined in

[src/core/backend/handle-request.ts:6](https://github.com/ASSETUX/frontend/blob/9a68660/src/core/backend/handle-request.ts#L6)
