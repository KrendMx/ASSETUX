[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/form-group/form/sell-form/useSellForm

# Module: components/home/form-group/form/sell-form/useSellForm

## Table of contents

### Functions

- [default](components_home_form_group_form_sell_form_useSellForm.md#default)

## Functions

### default

▸ **default**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SellFormProps`](components_home_form_group_form_sell_form_types_sell_form.md#sellformprops) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `blockchains` | ``null`` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `currencies` | ``null`` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `currentBlockchain` | ``null`` \| `string` |
| `currentCurrency` | ``null`` \| `string` |
| `currentDetails` | `string` |
| `currentEmail` | `string` |
| `currentHolder` | `string` |
| `currentPayment` | ``null`` \| `string` |
| `currentStep` | [`Step`](../enums/components_home_form_group_form_sell_form_select_form_steps.Step.md) |
| `currentToken` | ``null`` \| `string` |
| `depositInfo` | ``null`` \| [`RequestState`](core_backend_types_core_backend.md#requeststate)<`string`, `unknown`\> |
| `exchangeInfo` | ``null`` \| [`ExchangeInfo`](components_home_form_group_form_sell_form_select_form_types_select_form.md#exchangeinfo) |
| `getRefundAmounts` | () => `Promise`<``null`` \| `number`\> |
| `giveAmount` | `string` |
| `loadingOrder` | `boolean` |
| `onBlockchainChange` | (`blockchain`: `any`) => `void` |
| `onCurrencyChange` | `Dispatch`<`SetStateAction`<``null`` \| `string`\>\> |
| `onDetailsChange` | `Dispatch`<`SetStateAction`<`string`\>\> |
| `onEmailChange` | `Dispatch`<`SetStateAction`<`string`\>\> |
| `onExchange` | () => `Promise`<`void`\> |
| `onGiveAmountChange` | `Dispatch`<`SetStateAction`<`string`\>\> |
| `onHolderChange` | `Dispatch`<`SetStateAction`<`string`\>\> |
| `onPaymentChange` | `Dispatch`<`SetStateAction`<``null`` \| `string`\>\> |
| `onRefund` | (`code`: `string`, `wallet`: `string`) => `Promise`<`void`\> |
| `onRefundRequest` | () => `Promise`<`void`\> |
| `onReview` | (`review`: `string`) => `void` |
| `onSubmit` | () => `Promise`<`void`\> |
| `onTokenChange` | (`token`: `string`) => `void` |
| `payments` | ``null`` \| [`PaymentOption`](components_home_form_group_form_types_form.md#paymentoption)[] |
| `processingRequest` | `boolean` |
| `rate` | ``null`` \| `number` |
| `refundInfo` | ``null`` \| [`RequestState`](core_backend_types_core_backend.md#requeststate)<`string`, `unknown`\> |
| `refundRequestInfo` | ``null`` \| [`RequestState`](core_backend_types_core_backend.md#requeststate)<`string`, `unknown`\> |
| `serviceAvailable` | ``null`` \| `boolean` |
| `setCurrentStep` | (`step`: [`Step`](../enums/components_home_form_group_form_sell_form_select_form_steps.Step.md)) => `void` |
| `tokens` | ``null`` \| [`TokenOption`](components_home_form_group_form_types_form.md#tokenoption)[] |

#### Defined in

[src/components/home/form-group/form/sell-form/useSellForm.ts:13](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/sell-form/useSellForm.ts#L13)
