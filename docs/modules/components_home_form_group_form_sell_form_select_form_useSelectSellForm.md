[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/form-group/form/sell-form/select-form/useSelectSellForm

# Module: components/home/form-group/form/sell-form/select-form/useSelectSellForm

## Table of contents

### Functions

- [default](components_home_form_group_form_sell_form_select_form_useSelectSellForm.md#default)

## Functions

### default

▸ **default**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SelectFormProps`](components_home_form_group_form_sell_form_select_form_types_select_form.md#selectformprops) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `checkedBlockchains` | `undefined` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `checkedCurrencies` | `undefined` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `checkedTokens` | `undefined` \| [`Option`](components_common_input_select_types_input_select.md#option)[] |
| `creditedGetAmount` | `string` |
| `currentPaymentOption` | `undefined` \| [`PaymentOption`](components_home_form_group_form_types_form.md#paymentoption) |
| `getAmount` | `string` |
| `handleNextStep` | () => `void` |
| `handleRefund` | () => `void` |
| `inputError` | [`Error`](components_home_form_group_form_sell_form_select_form_types_select_form.md#error) |
| `isLoading` | `boolean` |
| `piecedDetails` | `string` |
| `refundData` | `MutableRefObject`<{ `code`: ``null`` \| `string` ; `wallet`: ``null`` \| `string`  }\> |
| `serviceUnavailable` | `boolean` |
| `setShowExchangeModal` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowExchangeResultModal` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowExchangeUnknownModal` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowRefundCodeInvalid` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowRefundCodeModal` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowRefundInsufficient` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowRefundModal` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowRefundModalResult` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `setShowRefundWalletModal` | `Dispatch`<`SetStateAction`<`boolean`\>\> |
| `showExchangeModal` | `boolean` |
| `showExchangeResultModal` | `boolean` |
| `showExchangeUnknownModal` | `boolean` |
| `showRefundCodeInvalid` | `boolean` |
| `showRefundCodeModal` | `boolean` |
| `showRefundInsufficient` | `boolean` |
| `showRefundModal` | `boolean` |
| `showRefundModalResult` | `boolean` |
| `showRefundWalletModal` | `boolean` |

#### Defined in

[src/components/home/form-group/form/sell-form/select-form/useSelectSellForm.ts:12](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/sell-form/select-form/useSelectSellForm.ts#L12)
