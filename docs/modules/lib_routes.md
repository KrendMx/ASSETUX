[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/routes

# Module: lib/routes

## Table of contents

### Type Aliases

- [Route](lib_routes.md#route)

### Variables

- [company](lib_routes.md#company)
- [companyAbsolute](lib_routes.md#companyabsolute)
- [legal](lib_routes.md#legal)

### Functions

- [commerce](lib_routes.md#commerce)
- [popular](lib_routes.md#popular)
- [popularAbsolute](lib_routes.md#popularabsolute)

## Type Aliases

### Route

Ƭ **Route**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `absolute?` | `boolean` |
| `href` | `string` |
| `key` | `string` |

#### Defined in

[src/lib/routes.ts:8](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L8)

## Variables

### company

• `Const` **company**: [`Route`](lib_routes.md#route)[]

#### Defined in

[src/lib/routes.ts:14](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L14)

___

### companyAbsolute

• `Const` **companyAbsolute**: [`Route`](lib_routes.md#route)[]

#### Defined in

[src/lib/routes.ts:25](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L25)

___

### legal

• `Const` **legal**: [`Route`](lib_routes.md#route)[]

#### Defined in

[src/lib/routes.ts:122](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L122)

## Functions

### commerce

▸ **commerce**(`merchantMode`): { `href`: `string` = '/profile'; `key`: `string` = 'profile' }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `merchantMode` | [`MerchantMode`](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) |

#### Returns

{ `href`: `string` = '/profile'; `key`: `string` = 'profile' }[]

#### Defined in

[src/lib/routes.ts:98](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L98)

___

### popular

▸ **popular**(`currency`): [`Route`](lib_routes.md#route)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |

#### Returns

[`Route`](lib_routes.md#route)[]

#### Defined in

[src/lib/routes.ts:38](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L38)

___

### popularAbsolute

▸ **popularAbsolute**(`currency`): [`Route`](lib_routes.md#route)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` |

#### Returns

[`Route`](lib_routes.md#route)[]

#### Defined in

[src/lib/routes.ts:65](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/routes.ts#L65)
