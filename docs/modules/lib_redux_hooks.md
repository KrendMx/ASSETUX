[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/hooks

# Module: lib/redux/hooks

## Table of contents

### Functions

- [useAppDispatch](lib_redux_hooks.md#useappdispatch)
- [useAppSelector](lib_redux_hooks.md#useappselector)

## Functions

### useAppDispatch

▸ **useAppDispatch**(): `ThunkDispatch`<`Object`, `undefined`, `AnyAction`\> & `Dispatch`<`AnyAction`\>

#### Returns

`ThunkDispatch`<`Object`, `undefined`, `AnyAction`\> & `Dispatch`<`AnyAction`\>

#### Defined in

[src/lib/redux/hooks.ts:5](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/hooks.ts#L5)

___

### useAppSelector

▸ **useAppSelector**<`TSelected`\>(`selector`, `equalityFn?`): `TSelected`

#### Type parameters

| Name |
| :------ |
| `TSelected` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | (`state`: `Object`) => `TSelected` |
| `equalityFn?` | `EqualityFn`<`TSelected`\> |

#### Returns

`TSelected`

#### Defined in

node_modules/react-redux/es/types.d.ts:68
