[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/ui

# Module: lib/redux/ui

## Table of contents

### Properties

- [default](lib_redux_ui.md#default)

### Functions

- [setAppLoaded](lib_redux_ui.md#setapploaded)
- [setBurgerActive](lib_redux_ui.md#setburgeractive)
- [setConfigureActive](lib_redux_ui.md#setconfigureactive)
- [setCurrentCurrency](lib_redux_ui.md#setcurrentcurrency)
- [setDesktop](lib_redux_ui.md#setdesktop)
- [setHideBurgerButton](lib_redux_ui.md#sethideburgerbutton)
- [setMerchantMode](lib_redux_ui.md#setmerchantmode)
- [setMobile](lib_redux_ui.md#setmobile)
- [setMobileLayoutForTablet](lib_redux_ui.md#setmobilelayoutfortablet)
- [setOrdersActive](lib_redux_ui.md#setordersactive)
- [setTablet](lib_redux_ui.md#settablet)

## Properties

### default

• **default**: `Reducer`<[`UiState`](lib_redux_ui_types_ui.md#uistate), `AnyAction`\>

The slice's reducer.

#### Defined in

node_modules/@reduxjs/toolkit/dist/createSlice.d.ts:27

## Functions

### setAppLoaded

▸ **setAppLoaded**(): `Object`

Calling this redux#ActionCreator will
return a PayloadAction of type `T` with a payload of `undefined`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:109

___

### setBurgerActive

▸ **setBurgerActive**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setConfigureActive

▸ **setConfigureActive**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setCurrentCurrency

▸ **setCurrentCurrency**(...`args`): `Object`

Calling this redux#ActionCreator with `Args` will return
an Action with a payload of type `P` and (depending on the `PrepareAction`
method used) a `meta`- and `error` property of types `M` and `E` respectively.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [currency: "RUB" \| "UAH" \| "KZT"] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:80

___

### setDesktop

▸ **setDesktop**(): `Object`

Calling this redux#ActionCreator will
return a PayloadAction of type `T` with a payload of `undefined`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:109

___

### setHideBurgerButton

▸ **setHideBurgerButton**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setMerchantMode

▸ **setMerchantMode**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`MerchantMode`](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | [`MerchantMode`](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setMobile

▸ **setMobile**(): `Object`

Calling this redux#ActionCreator will
return a PayloadAction of type `T` with a payload of `undefined`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:109

___

### setMobileLayoutForTablet

▸ **setMobileLayoutForTablet**(): `Object`

Calling this redux#ActionCreator will
return a PayloadAction of type `T` with a payload of `undefined`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:109

___

### setOrdersActive

▸ **setOrdersActive**(`payload`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `boolean` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:123

___

### setTablet

▸ **setTablet**(): `Object`

Calling this redux#ActionCreator will
return a PayloadAction of type `T` with a payload of `undefined`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` |
| `type` | `string` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:109
