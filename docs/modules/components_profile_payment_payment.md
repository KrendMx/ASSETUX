[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/profile/payment/payment

# Module: components/profile/payment/payment

## Table of contents

### Type Aliases

- [PaymentProps](components_profile_payment_payment.md#paymentprops)

### Functions

- [default](components_profile_payment_payment.md#default)

## Type Aliases

### PaymentProps

Ƭ **PaymentProps**<`T`, `B`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |
| `B` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bill` | `T` |
| `blockchainURL` | `string` |
| `fiatrate` | `B` |
| `providers` | [`FiatProvider`](lib_backend_main_types_backend_main.md#fiatprovider)[] |

#### Defined in

[src/components/profile/payment/payment.tsx:50](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/payment/payment.tsx#L50)

## Functions

### default

▸ **default**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PaymentProps`](components_profile_payment_payment.md#paymentprops)<[`IEcommerceBill`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IEcommerceBill.md), [`FiatRate`](lib_backend_main_types_backend_main.md#fiatrate)[]\> |

#### Returns

`Element`

#### Defined in

[src/components/profile/payment/payment.tsx:57](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/payment/payment.tsx#L57)
