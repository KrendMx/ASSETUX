[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/form-group/form/sell-form/types.sell-form

# Module: components/home/form-group/form/sell-form/types.sell-form

## Table of contents

### Type Aliases

- [SellFormProps](components_home_form_group_form_sell_form_types_sell_form.md#sellformprops)

## Type Aliases

### SellFormProps

Ƭ **SellFormProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockchains` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |
| `currencies` | [`Option`](components_common_input_select_types_input_select.md#option)[] \| ``null`` |
| `currentBlockchain` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain) \| ``null`` |
| `currentCurrency` | [`CurrenciesType`](lib_data_currencies.md#currenciestype) |
| `currentToken` | [`Token`](lib_backend_main_types_backend_main.md#token) \| ``null`` |
| `onTokenChange` | (`token`: `string`) => `void` |
| `payments` | [`FiatProvider`](lib_backend_main_types_backend_main.md#fiatprovider)[] \| ``null`` |
| `rates` | [`FiatRate`](lib_backend_main_types_backend_main.md#fiatrate)[] \| ``null`` |
| `serviceAvailable` | `boolean` \| ``null`` |
| `tokens` | [`TokenOption`](components_home_form_group_form_types_form.md#tokenoption)[] \| ``null`` |

#### Defined in

[src/components/home/form-group/form/sell-form/types.sell-form.ts:11](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/form-group/form/sell-form/types.sell-form.ts#L11)
