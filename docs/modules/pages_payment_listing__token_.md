[Assetux-Frontend](../README.md) / [Exports](../modules.md) / pages/payment\_listing/[token]

# Module: pages/payment\_listing/[token]

## Table of contents

### Functions

- [default](pages_payment_listing__token_.md#default)
- [getServerSideProps](pages_payment_listing__token_.md#getserversideprops)

## Functions

### default

▸ **default**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PaymentProps`](components_profile_payment_payment.md#paymentprops)<[`MerchantData`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.MerchantData.md), [`FiatRate`](lib_backend_main_types_backend_main.md#fiatrate)\> |

#### Returns

`Element`

#### Defined in

[src/pages/payment_listing/[token].tsx:16](https://github.com/ASSETUX/frontend/blob/9a68660/src/pages/payment_listing/[token].tsx#L16)

___

### getServerSideProps

▸ **getServerSideProps**(`context`): `Promise`<`GetServerSidePropsResult`<[`PaymentProps`](components_profile_payment_payment.md#paymentprops)<[`MerchantData`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.MerchantData.md), [`FiatRate`](lib_backend_main_types_backend_main.md#fiatrate)\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `GetServerSidePropsContext`<`Params`, `PreviewData`\> |

#### Returns

`Promise`<`GetServerSidePropsResult`<[`PaymentProps`](components_profile_payment_payment.md#paymentprops)<[`MerchantData`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.MerchantData.md), [`FiatRate`](lib_backend_main_types_backend_main.md#fiatrate)\>\>\>

#### Defined in

node_modules/next/types/index.d.ts:174
