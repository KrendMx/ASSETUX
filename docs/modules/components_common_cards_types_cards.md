[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/common/cards/types.cards

# Module: components/common/cards/types.cards

## Table of contents

### Type Aliases

- [ActionElement](components_common_cards_types_cards.md#actionelement)
- [CardData](components_common_cards_types_cards.md#carddata)
- [CardsProps](components_common_cards_types_cards.md#cardsprops)

## Type Aliases

### ActionElement

Ƭ **ActionElement**: (`dataIndex`: `number`) => `JSX.Element` \| ``null``

#### Type declaration

▸ (`dataIndex`): `JSX.Element` \| ``null``

##### Parameters

| Name | Type |
| :------ | :------ |
| `dataIndex` | `number` |

##### Returns

`JSX.Element` \| ``null``

#### Defined in

[src/components/common/cards/types.cards.ts:14](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/cards/types.cards.ts#L14)

___

### CardData

Ƭ **CardData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `JSX.Element` \| `undefined` \| ``null`` |

#### Defined in

[src/components/common/cards/types.cards.ts:10](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/cards/types.cards.ts#L10)

___

### CardsProps

Ƭ **CardsProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buttons?` | [`ActionElement`](components_common_cards_types_cards.md#actionelement)[] |
| `currentPage?` | `number` |
| `data?` | [`CardData`](components_common_cards_types_cards.md#carddata)[][] |
| `mobile?` | `boolean` |
| `rowNames?` | `string`[] |
| `withPagination?` | `boolean` |

#### Defined in

[src/components/common/cards/types.cards.ts:1](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/cards/types.cards.ts#L1)
