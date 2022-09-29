[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/backend/ecommerce/types.backend.ecommerce

# Module: lib/backend/ecommerce/types.backend.ecommerce

## Table of contents

### Interfaces

- [IChain](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IChain.md)
- [ICreatePaymentProps](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.ICreatePaymentProps.md)
- [IEcommerceBill](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IEcommerceBill.md)
- [IMerchant](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md)
- [IMerchantToken](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IMerchantToken.md)
- [Info](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.Info.md)
- [MerchantData](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.MerchantData.md)
- [Profile](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.Profile.md)
- [TokenInfo](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.TokenInfo.md)
- [Widget](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.Widget.md)

### Type Aliases

- [AuthorizedProps](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops)
- [Bill](lib_backend_ecommerce_types_backend_ecommerce.md#bill)
- [ChangeCompanyProps](lib_backend_ecommerce_types_backend_ecommerce.md#changecompanyprops)
- [ChangeCompanyResponse](lib_backend_ecommerce_types_backend_ecommerce.md#changecompanyresponse)
- [ChangeWalletProps](lib_backend_ecommerce_types_backend_ecommerce.md#changewalletprops)
- [ChangeWalletResponse](lib_backend_ecommerce_types_backend_ecommerce.md#changewalletresponse)
- [CreateBillProps](lib_backend_ecommerce_types_backend_ecommerce.md#createbillprops)
- [CreateBillResponse](lib_backend_ecommerce_types_backend_ecommerce.md#createbillresponse)
- [CreatePaymentResponse](lib_backend_ecommerce_types_backend_ecommerce.md#createpaymentresponse)
- [GetBillResponse](lib_backend_ecommerce_types_backend_ecommerce.md#getbillresponse)
- [GetHistoryProps](lib_backend_ecommerce_types_backend_ecommerce.md#gethistoryprops)
- [GetHistoryResponse](lib_backend_ecommerce_types_backend_ecommerce.md#gethistoryresponse)
- [GetProfileProps](lib_backend_ecommerce_types_backend_ecommerce.md#getprofileprops)
- [GetProfileResponse](lib_backend_ecommerce_types_backend_ecommerce.md#getprofileresponse)
- [Login](lib_backend_ecommerce_types_backend_ecommerce.md#login)
- [LoginProps](lib_backend_ecommerce_types_backend_ecommerce.md#loginprops)
- [LoginResponse](lib_backend_ecommerce_types_backend_ecommerce.md#loginresponse)
- [LogoutProps](lib_backend_ecommerce_types_backend_ecommerce.md#logoutprops)
- [MerchantBillResponse](lib_backend_ecommerce_types_backend_ecommerce.md#merchantbillresponse)
- [MerchantMode](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode)
- [Payment](lib_backend_ecommerce_types_backend_ecommerce.md#payment)
- [UserImage](lib_backend_ecommerce_types_backend_ecommerce.md#userimage)

## Type Aliases

### AuthorizedProps

Ƭ **AuthorizedProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:4](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L4)

___

### Bill

Ƭ **Bill**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amountIn` | `number` |
| `amount_in?` | `number` |
| `chain?` | { `title`: `string`  } |
| `chain.title` | `string` |
| `chainId` | `number` |
| `chains` | { `title`: `string`  } |
| `chains.title` | `string` |
| `client?` | `string` |
| `currency` | `string` |
| `ecommerceUser` | [`Profile`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.Profile.md) |
| `ecommerceUserId` | `number` |
| `email?` | `string` |
| `error` | ``null`` |
| `expiretTimestamp` | `string` |
| `fee` | ``null`` |
| `hash` | `string` |
| `id` | `number` |
| `order_id?` | `number` |
| `sendAmount` | `number` |
| `status` | `string` |
| `timestamp` | `string` |
| `token` | `any` |
| `tokens` | [`Token`](lib_backend_main_types_backend_main.md#token)[] |
| `tokensId` | `number` |
| `tx_hash` | ``null`` |
| `type?` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:97](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L97)

___

### ChangeCompanyProps

Ƭ **ChangeCompanyProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) & { `backgroundCompany?`: [`UserImage`](lib_backend_ecommerce_types_backend_ecommerce.md#userimage) ; `logoCompany?`: [`UserImage`](lib_backend_ecommerce_types_backend_ecommerce.md#userimage) ; `nameCompany?`: `string`  }

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:87](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L87)

___

### ChangeCompanyResponse

Ƭ **ChangeCompanyResponse**: [`Response`](core_backend_types_core_backend.md#response)

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:93](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L93)

___

### ChangeWalletProps

Ƭ **ChangeWalletProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) & { `wallet`: `string`  }

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:79](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L79)

___

### ChangeWalletResponse

Ƭ **ChangeWalletResponse**: [`Response`](core_backend_types_core_backend.md#response)<`unknown`, { `message`: `string`  }\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:85](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L85)

___

### CreateBillProps

Ƭ **CreateBillProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) & { `amountIn`: `number` ; `currency`: `string`  }

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:168](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L168)

___

### CreateBillResponse

Ƭ **CreateBillResponse**: [`Response`](core_backend_types_core_backend.md#response)<{ `hash`: `string`  }\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:173](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L173)

___

### CreatePaymentResponse

Ƭ **CreatePaymentResponse**: [`Response`](core_backend_types_core_backend.md#response)<{ `linkToPaymentString`: `string`  }\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:199](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L199)

___

### GetBillResponse

Ƭ **GetBillResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`IEcommerceBill`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IEcommerceBill.md)\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:177](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L177)

___

### GetHistoryProps

Ƭ **GetHistoryProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops)

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:137](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L137)

___

### GetHistoryResponse

Ƭ **GetHistoryResponse**: [`Response`](core_backend_types_core_backend.md#response)<`IHistory`[]\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:139](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L139)

___

### GetProfileProps

Ƭ **GetProfileProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops)

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:32](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L32)

___

### GetProfileResponse

Ƭ **GetProfileResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`IMerchant`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md)\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L34)

___

### Login

Ƭ **Login**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth_token` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:8](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L8)

___

### LoginProps

Ƭ **LoginProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops)

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:12](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L12)

___

### LoginResponse

Ƭ **LoginResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`Login`](lib_backend_ecommerce_types_backend_ecommerce.md#login)\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:14](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L14)

___

### LogoutProps

Ƭ **LogoutProps**: [`AuthorizedProps`](lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops)

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:95](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L95)

___

### MerchantBillResponse

Ƭ **MerchantBillResponse**: [`Response`](core_backend_types_core_backend.md#response)<[`MerchantData`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.MerchantData.md)\>

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:203](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L203)

___

### MerchantMode

Ƭ **MerchantMode**: ``"RETENTION"`` \| ``"TRANSFER"`` \| ``"CONNECT"``

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:60](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L60)

___

### Payment

Ƭ **Payment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `creditCard` | `string` |
| `email` | `string` |
| `id` | `number` |
| `paymentMethod` | ``"QIWI"`` \| ``"QIWIVISAMASTER"`` |
| `timestamp` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:129](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L129)

___

### UserImage

Ƭ **UserImage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `img` | `string` |
| `name` | `string` |

#### Defined in

[src/lib/backend/ecommerce/types.backend.ecommerce.ts:83](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/types.backend.ecommerce.ts#L83)
