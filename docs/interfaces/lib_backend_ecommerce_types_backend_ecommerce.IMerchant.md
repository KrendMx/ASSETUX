[Assetux-Frontend](../README.md) / [Exports](../modules.md) / [lib/backend/ecommerce/types.backend.ecommerce](../modules/lib_backend_ecommerce_types_backend_ecommerce.md) / IMerchant

# Interface: IMerchant

[lib/backend/ecommerce/types.backend.ecommerce](../modules/lib_backend_ecommerce_types_backend_ecommerce.md).IMerchant

## Table of contents

### Properties

- [tokens](lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md#tokens)
- [user](lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md#user)
- [widget](lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md#widget)

## Properties

### tokens

• **tokens**: { `address`: `string` ; `chain`: [`IChain`](lib_backend_ecommerce_types_backend_ecommerce.IChain.md) ; `id`: `number` ; `logo_uri`: `string` ; `name`: `string` ; `symbol`: `string`  }[]

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:50](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L50)

___

### user

• **user**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balance` | `number` |
| `email` | `string` |
| `mode` | [`MerchantMode`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) |
| `public_key` | `string` |
| `type` | `string` |
| `userId` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:37](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L37)

___

### widget

• **widget**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundCompanyName` | `string` |
| `logoCompanyName` | `string` |
| `nameCompany` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:45](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L45)
