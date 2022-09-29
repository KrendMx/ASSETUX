[Assetux-Frontend](../README.md) / [Exports](../modules.md) / [lib/backend/ecommerce](../modules/lib_backend_ecommerce.md) / default

# Class: default

[lib/backend/ecommerce](../modules/lib_backend_ecommerce.md).default

## Table of contents

### Constructors

- [constructor](lib_backend_ecommerce.default.md#constructor)

### Methods

- [calcFee](lib_backend_ecommerce.default.md#calcfee)
- [changeCompany](lib_backend_ecommerce.default.md#changecompany)
- [changeWallet](lib_backend_ecommerce.default.md#changewallet)
- [createBill](lib_backend_ecommerce.default.md#createbill)
- [createPayment](lib_backend_ecommerce.default.md#createpayment)
- [getBill](lib_backend_ecommerce.default.md#getbill)
- [getHistory](lib_backend_ecommerce.default.md#gethistory)
- [getMerchantToken](lib_backend_ecommerce.default.md#getmerchanttoken)
- [getProfile](lib_backend_ecommerce.default.md#getprofile)
- [login](lib_backend_ecommerce.default.md#login)
- [logout](lib_backend_ecommerce.default.md#logout)

## Constructors

### constructor

• **new default**()

## Methods

### calcFee

▸ **calcFee**(`amount`, `currency`, `method`, `reverseCalc`): `Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |
| `method` | [`ActionType`](../modules/lib_redux_crypto_types_crypto.md#actiontype) |
| `reverseCalc` | `boolean` |

#### Returns

`Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:115](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L115)

___

### changeCompany

▸ **changeCompany**(`__namedParameters`): `Promise`<[`ChangeCompanyResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#changecompanyresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ChangeCompanyProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#changecompanyprops) |

#### Returns

`Promise`<[`ChangeCompanyResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#changecompanyresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:61](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L61)

___

### changeWallet

▸ **changeWallet**(`__namedParameters`): `Promise`<[`ChangeWalletResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#changewalletresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ChangeWalletProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#changewalletprops) |

#### Returns

`Promise`<[`ChangeWalletResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#changewalletresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:44](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L44)

___

### createBill

▸ **createBill**(`__namedParameters`): `Promise`<[`CreateBillResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#createbillresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CreateBillProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#createbillprops) |

#### Returns

`Promise`<[`CreateBillResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#createbillresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:90](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L90)

___

### createPayment

▸ **createPayment**(`data`): `Promise`<[`CreatePaymentResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#createpaymentresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ICreatePaymentProps`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.ICreatePaymentProps.md) |

#### Returns

`Promise`<[`CreatePaymentResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#createpaymentresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:105](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L105)

___

### getBill

▸ **getBill**(`id`): `Promise`<[`GetBillResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#getbillresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`GetBillResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#getbillresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:101](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L101)

___

### getHistory

▸ **getHistory**(`__namedParameters`): `Promise`<[`GetHistoryResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#gethistoryresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AuthorizedProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) |

#### Returns

`Promise`<[`GetHistoryResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#gethistoryresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:80](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L80)

___

### getMerchantToken

▸ **getMerchantToken**(`token`): `Promise`<[`MerchantBillResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#merchantbillresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`MerchantBillResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#merchantbillresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:111](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L111)

___

### getProfile

▸ **getProfile**(`__namedParameters`): `Promise`<[`GetProfileResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#getprofileresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AuthorizedProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) |

#### Returns

`Promise`<[`GetProfileResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#getprofileresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L34)

___

### login

▸ **login**(`__namedParameters`): `Promise`<[`LoginResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#loginresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AuthorizedProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) |

#### Returns

`Promise`<[`LoginResponse`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#loginresponse)\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:26](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L26)

___

### logout

▸ **logout**(`__namedParameters`): `Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AuthorizedProps`](../modules/lib_backend_ecommerce_types_backend_ecommerce.md#authorizedprops) |

#### Returns

`Promise`<`AxiosResponse`<`any`, `any`\>\>

#### Defined in

[src/lib/backend/ecommerce/index.ts:72](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/backend/ecommerce/index.ts#L72)
