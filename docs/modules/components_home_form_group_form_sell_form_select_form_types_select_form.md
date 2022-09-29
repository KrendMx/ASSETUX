[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/form-group/form/sell-form/select-form/types.select-form

# Module: components/home/form-group/form/sell-form/select-form/types.select-form

## Table of contents

### Type Aliases

- [Error](components_home_form_group_form_sell_form_select_form_types_select_form.md#error)
- [ExchangeInfo](components_home_form_group_form_sell_form_select_form_types_select_form.md#exchangeinfo)
- [SelectFormProps](components_home_form_group_form_sell_form_select_form_types_select_form.md#selectformprops)

## Type Aliases

### Error

Ƭ **Error**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `undefined`

#### Defined in

[src/components/home/form-group/form/sell-form/select-form/types.select-form.ts:7](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/sell-form/select-form/types.select-form.ts#L7)

___

### ExchangeInfo

Ƭ **ExchangeInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `creditedAmount` | `number` |
| `curIn` | `string` |
| `curOut` | `string` |
| `min` | `number` |
| `orderId` | `string` |
| `timestamp` | `string` |
| `totalAmount` | `number` |
| `wallet` | `string` |

#### Defined in

[src/components/home/form-group/form/sell-form/select-form/types.select-form.ts:11](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/sell-form/select-form/types.select-form.ts#L11)

___

### SelectFormProps

Ƭ **SelectFormProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockchains` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |
| `currencies` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |
| `currentBlockchain` | `string` \| ``null`` |
| `currentCurrency` | `string` \| ``null`` |
| `currentDetails` | `string` |
| `currentEmail` | `string` |
| `currentHolder` | `string` |
| `currentPayment` | `string` \| ``null`` |
| `currentStep` | [`Step`](../enums/components_home_form_group_form_sell_form_select_form_steps.Step.md) |
| `currentToken` | `string` \| ``null`` |
| `depositInfo` | [`RequestState`](core_backend_types_core_backend.md#requeststate)<`string`\> \| ``null`` |
| `exchangeInfo` | [`ExchangeInfo`](components_home_form_group_form_sell_form_select_form_types_select_form.md#exchangeinfo) \| ``null`` |
| `getRefundAmounts` | () => `Promise`<`number` \| ``null``\> |
| `giveAmount` | `string` |
| `loadingOrder` | `boolean` |
| `onBlockchainChange` | (`blockchain`: `string`) => `void` |
| `onCurrencyChange` | (`currency`: `string`) => `void` |
| `onDetailsChange` | (`details`: `string`) => `void` |
| `onEmailChange` | (`email`: `string`) => `void` |
| `onExchange` | () => `void` |
| `onGiveAmountChange` | (`amount`: `string`) => `void` |
| `onHolderChange` | (`holder`: `string`) => `void` |
| `onPaymentChange` | (`payment`: `string`) => `void` |
| `onRefund` | (`code`: `string`, `wallet`: `string`) => `void` |
| `onRefundRequest` | () => `void` |
| `onReview` | (`review`: `string`) => `void` |
| `onSubmit` | () => `void` |
| `onTokenChange` | (`token`: `string`) => `void` |
| `payments` | [`PaymentOption`](components_home_form_group_form_types_form.md#paymentoption)[] \| ``null`` |
| `processingRequest` | `boolean` |
| `rate` | `number` \| ``null`` |
| `refundInfo` | [`RequestState`](core_backend_types_core_backend.md#requeststate)<`string`\> \| ``null`` |
| `refundRequestInfo` | [`RequestState`](core_backend_types_core_backend.md#requeststate)<`string`\> \| ``null`` |
| `serviceAvailable` | `boolean` \| ``null`` |
| `setCurrentStep` | (`step`: [`Step`](../enums/components_home_form_group_form_sell_form_select_form_steps.Step.md)) => `void` |
| `tokens` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |

#### Defined in

[src/components/home/form-group/form/sell-form/select-form/types.select-form.ts:22](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/sell-form/select-form/types.select-form.ts#L22)
