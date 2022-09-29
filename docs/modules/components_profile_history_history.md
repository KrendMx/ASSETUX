[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/profile/history/history

# Module: components/profile/history/history

## Table of contents

### Type Aliases

- [HistoryProps](components_profile_history_history.md#historyprops)
- [HistoryType](components_profile_history_history.md#historytype)

### Functions

- [default](components_profile_history_history.md#default)

## Type Aliases

### HistoryProps

Ƭ **HistoryProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `history` | [`HistoryType`](components_profile_history_history.md#historytype)[] |
| `profile` | [`IMerchant`](../interfaces/lib_backend_ecommerce_types_backend_ecommerce.IMerchant.md) |

#### Defined in

[src/components/profile/history/history.tsx:35](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/history/history.tsx#L35)

___

### HistoryType

Ƭ **HistoryType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | `number` |
| `blockchain?` | `string` \| ``null`` |
| `creditCard?` | `string` |
| `currency` | `string` |
| `email?` | `string` |
| `id` | `number` |
| `method?` | [`PayProviders`](../enums/core_backend_types_core_backend.PayProviders.md) |
| `timestamp?` | `string` |
| `token?` | `string` \| ``null`` |

#### Defined in

[src/components/profile/history/history.tsx:23](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/history/history.tsx#L23)

## Functions

### default

▸ **default**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`HistoryProps`](components_profile_history_history.md#historyprops) |

#### Returns

`Element`

#### Defined in

[src/components/profile/history/history.tsx:40](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/profile/history/history.tsx#L40)
