[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/form-group/form/buy-form/select-form/types.select-buy

# Module: components/home/form-group/form/buy-form/select-form/types.select-buy

## Table of contents

### Type Aliases

- [Error](components_home_form_group_form_buy_form_select_form_types_select_buy.md#error)
- [SelectFormProps](components_home_form_group_form_buy_form_select_form_types_select_buy.md#selectformprops)

## Type Aliases

### Error

Ƭ **Error**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `undefined`

#### Defined in

[src/components/home/form-group/form/buy-form/select-form/types.select-buy.ts:6](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/buy-form/select-form/types.select-buy.ts#L6)

___

### SelectFormProps

Ƭ **SelectFormProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockchains` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |
| `cardError` | `string` |
| `currencies` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |
| `currentBlockchain` | `string` \| ``null`` |
| `currentCurrency` | `string` \| ``null`` |
| `currentDetails` | `string` |
| `currentPayment` | `string` \| ``null`` |
| `currentPhoneNumber` | `string` |
| `currentStep` | [`default`](../enums/components_home_form_group_form_buy_form_select_form_steps.default.md) |
| `currentToken` | `string` \| ``null`` |
| `currentWallet` | `string` |
| `email` | `string` |
| `getAmount` | `string` |
| `giveAmount` | `string` |
| `onBlockchainChange` | (`blockchain`: `string`) => `void` |
| `onCurrencyChange` | (`currency`: `string`) => `void` |
| `onDetailsChange` | (`details`: `string`) => `void` |
| `onEmailChange` | (`email`: `string`) => `void` |
| `onGiveAmountChange` | (`amount`: `string`) => `void` |
| `onPaymentChange` | (`payment`: `string`) => `void` |
| `onPhoneChange` | (`phone`: `string`) => `void` |
| `onSubmit` | () => `void` |
| `onTokenChange` | (`token`: `string`) => `void` |
| `onWalletChange` | (`wallet`: `string`) => `void` |
| `payments` | [`PaymentOption`](components_home_form_group_form_types_form.md#paymentoption)[] \| ``null`` |
| `processingRequest` | `boolean` |
| `rate` | `number` \| ``null`` |
| `serviceAvailable` | `boolean` \| ``null`` |
| `setCurrentStep` | (`step`: [`default`](../enums/components_home_form_group_form_buy_form_select_form_steps.default.md)) => `void` |
| `setGetAmount` | (`getAmount`: `string`) => `void` |
| `tokens` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |

#### Defined in

[src/components/home/form-group/form/buy-form/select-form/types.select-buy.ts:10](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/buy-form/select-form/types.select-buy.ts#L10)
