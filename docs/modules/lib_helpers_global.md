[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/helpers.global

# Module: lib/helpers.global

## Table of contents

### Functions

- [constructURL](lib_helpers_global.md#constructurl)
- [mapBlockchains](lib_helpers_global.md#mapblockchains)
- [mapTokens](lib_helpers_global.md#maptokens)
- [validatePhone](lib_helpers_global.md#validatephone)

## Functions

### constructURL

▸ **constructURL**(`apiHost`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiHost` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/helpers.global.ts:35](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/helpers.global.ts#L35)

___

### mapBlockchains

▸ **mapBlockchains**(`blockchains`): [`Option`](components_common_input_select_types_input_select.md#option)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockchains` | [`Blockchain`](lib_backend_main_types_backend_main.md#blockchain)[] \| [`IChain`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IChain.md)[] |

#### Returns

[`Option`](components_common_input_select_types_input_select.md#option)[]

#### Defined in

[src/lib/helpers.global.ts:21](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/helpers.global.ts#L21)

___

### mapTokens

▸ **mapTokens**(`tokens`): [`TokenOption`](components_home_form_group_form_types_form.md#tokenoption)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | [`Token`](lib_backend_main_types_backend_main.md#token)[] \| [`IMerchantToken`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IMerchantToken.md)[] |

#### Returns

[`TokenOption`](components_home_form_group_form_types_form.md#tokenoption)[]

#### Defined in

[src/lib/helpers.global.ts:10](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/helpers.global.ts#L10)

___

### validatePhone

▸ **validatePhone**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/helpers.global.ts:39](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/helpers.global.ts#L39)
