[Assetux-Frontend](../README.md) / [Exports](../modules.md) / pages/payment/[id]

# Module: pages/payment/[id]

## Table of contents

### Functions

- [default](pages_payment__id_.md#default)
- [getServerSideProps](pages_payment__id_.md#getserversideprops)

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

[src/pages/payment/[id].tsx:17](https://github.com/ASSETUX/frontend/blob/9a68660/src/pages/payment/[id].tsx#L17)

___

### getServerSideProps

▸ **getServerSideProps**(`context`): `Promise`<`GetServerSidePropsResult`<{ `[key: string]`: `any`;  }\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `GetServerSidePropsContext`<`ParsedUrlQuery`, `PreviewData`\> |

#### Returns

`Promise`<`GetServerSidePropsResult`<{ `[key: string]`: `any`;  }\>\>

#### Defined in

node_modules/next/types/index.d.ts:174
