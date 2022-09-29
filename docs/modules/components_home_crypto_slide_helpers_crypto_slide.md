[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/home/crypto-slide/helpers.crypto-slide

# Module: components/home/crypto-slide/helpers.crypto-slide

## Table of contents

### Functions

- [getSkeletons](components_home_crypto_slide_helpers_crypto_slide.md#getskeletons)
- [mapExplorerData](components_home_crypto_slide_helpers_crypto_slide.md#mapexplorerdata)

## Functions

### getSkeletons

▸ **getSkeletons**(): `Element`[]

#### Returns

`Element`[]

#### Defined in

[src/components/home/crypto-slide/helpers.crypto-slide.tsx:62](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/crypto-slide/helpers.crypto-slide.tsx#L62)

___

### mapExplorerData

▸ **mapExplorerData**(`explorerData`, `handleAction`, `currency`, `action`): `Element`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `explorerData` | [`ExplorerData`](components_common_crypto_manager_types_crypto_manager.md#explorerdata)[] |
| `handleAction` | (`action`: [`ActionType`](lib_redux_crypto_types_crypto.md#actiontype), `token`: [`Token`](lib_backend_main_types_backend_main.md#token)) => `void` |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |
| `action` | [`ActionType`](lib_redux_crypto_types_crypto.md#actiontype) |

#### Returns

`Element`[]

#### Defined in

[src/components/home/crypto-slide/helpers.crypto-slide.tsx:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/home/crypto-slide/helpers.crypto-slide.tsx#L34)
