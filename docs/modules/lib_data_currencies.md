[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/data/currencies

# Module: lib/data/currencies

## Table of contents

### Type Aliases

- [CurrenciesType](lib_data_currencies.md#currenciestype)

### Variables

- [currencies](lib_data_currencies.md#currencies)
- [localeToCurrencyTable](lib_data_currencies.md#localetocurrencytable)

### Functions

- [checkCurrency](lib_data_currencies.md#checkcurrency)
- [isCurrencyDeclared](lib_data_currencies.md#iscurrencydeclared)
- [mapCurrency](lib_data_currencies.md#mapcurrency)
- [mapCurrencyName](lib_data_currencies.md#mapcurrencyname)
- [mapShortCurrencyName](lib_data_currencies.md#mapshortcurrencyname)

## Type Aliases

### CurrenciesType

Ƭ **CurrenciesType**: typeof [`currencies`](lib_data_currencies.md#currencies)[`number`]

#### Defined in

[src/lib/data/currencies.ts:7](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L7)

## Variables

### currencies

• `Const` **currencies**: readonly [``"RUB"``, ``"UAH"``, ``"KZT"``]

#### Defined in

[src/lib/data/currencies.ts:5](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L5)

___

### localeToCurrencyTable

• `Const` **localeToCurrencyTable**: `Table` = `{}`

#### Defined in

[src/lib/data/currencies.ts:46](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L46)

## Functions

### checkCurrency

▸ **checkCurrency**(`dispatch`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dispatch` | `ThunkDispatch`<`Object`, `undefined`, `AnyAction`\> & `Dispatch`<`AnyAction`\> |

#### Returns

`void`

#### Defined in

[src/lib/data/currencies.ts:58](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L58)

___

### isCurrencyDeclared

▸ **isCurrencyDeclared**(`currency`): currency is "RUB" \| "UAH" \| "KZT"

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `string` |

#### Returns

currency is "RUB" \| "UAH" \| "KZT"

#### Defined in

[src/lib/data/currencies.ts:48](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L48)

___

### mapCurrency

▸ **mapCurrency**(`currency`): ``"₽"`` \| ``"₴"`` \| ``"₸"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |

#### Returns

``"₽"`` \| ``"₴"`` \| ``"₸"``

#### Defined in

[src/lib/data/currencies.ts:9](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L9)

___

### mapCurrencyName

▸ **mapCurrencyName**(`currency`): ``"Russian Ruble"`` \| ``"Ukrainian hryvnia"`` \| ``"Kazakhstani tenge"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |

#### Returns

``"Russian Ruble"`` \| ``"Ukrainian hryvnia"`` \| ``"Kazakhstani tenge"``

#### Defined in

[src/lib/data/currencies.ts:31](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L31)

___

### mapShortCurrencyName

▸ **mapShortCurrencyName**(`currency`): ``"Rus"`` \| ``"Ukr"`` \| ``"Kaz"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |

#### Returns

``"Rus"`` \| ``"Ukr"`` \| ``"Kaz"``

#### Defined in

[src/lib/data/currencies.ts:20](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/data/currencies.ts#L20)
