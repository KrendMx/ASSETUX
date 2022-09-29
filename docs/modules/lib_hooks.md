[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/hooks

# Module: lib/hooks

## Table of contents

### Functions

- [useAppMount](lib_hooks.md#useappmount)
- [useAuthorized](lib_hooks.md#useauthorized)
- [useClickOutside](lib_hooks.md#useclickoutside)
- [useDebounce](lib_hooks.md#usedebounce)
- [useImmediateMobile](lib_hooks.md#useimmediatemobile)
- [useIsomorphicLayoutEffect](lib_hooks.md#useisomorphiclayouteffect)
- [useMount](lib_hooks.md#usemount)
- [usePrevious](lib_hooks.md#useprevious)
- [useSliderConfig](lib_hooks.md#usesliderconfig)
- [useToggle](lib_hooks.md#usetoggle)

## Functions

### useAppMount

▸ **useAppMount**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isCommercePayment` | `boolean` |
| `router` | `NextRouter` |

#### Defined in

[src/lib/hooks.ts:157](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L157)

___

### useAuthorized

▸ **useAuthorized**(): () => ``null`` \| `string`

#### Returns

`fn`

▸ (): ``null`` \| `string`

##### Returns

``null`` \| `string`

#### Defined in

[src/lib/hooks.ts:107](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L107)

___

### useClickOutside

▸ **useClickOutside**(`ref`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `RefObject`<`Node`\> |
| `callback` | () => `void` |

#### Returns

`void`

#### Defined in

[src/lib/hooks.ts:69](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L69)

___

### useDebounce

▸ **useDebounce**<`T`\>(`value`, `delay?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `T` | `undefined` |
| `delay` | `number` | `300` |

#### Returns

`T`

#### Defined in

[src/lib/hooks.ts:91](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L91)

___

### useImmediateMobile

▸ **useImmediateMobile**(`customWidth?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `customWidth?` | `number` |

#### Returns

`boolean`

#### Defined in

[src/lib/hooks.ts:44](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L44)

___

### useIsomorphicLayoutEffect

▸ **useIsomorphicLayoutEffect**(`effect`, `deps?`): `void`

Accepts a function that contains imperative, possibly effectful code.

**`Version`**

16.8.0

**`See`**

https://reactjs.org/docs/hooks-reference.html#useeffect

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `effect` | `EffectCallback` | Imperative function that can return a cleanup function |
| `deps?` | `DependencyList` | If present, effect will only activate if the values in the list change. |

#### Returns

`void`

#### Defined in

node_modules/@types/react/index.d.ts:1059

___

### useMount

▸ **useMount**(`effect`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | `EffectCallback` |

#### Returns

`void`

#### Defined in

[src/lib/hooks.ts:114](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L114)

___

### usePrevious

▸ **usePrevious**<`T`\>(`value`): `undefined` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`undefined` \| `T`

#### Defined in

[src/lib/hooks.ts:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L34)

___

### useSliderConfig

▸ **useSliderConfig**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `gap` | `number` |
| `horizPadding` | `number` |
| `responsive` | { `gap`: `number` = 19; `resolution`: `number` = mobileLayoutForTablet; `toShow`: `number` = 2 }[] |
| `toShow` | `number` |
| `vertPadding` | `number` |

#### Defined in

[src/lib/hooks.ts:129](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L129)

___

### useToggle

▸ **useToggle**(`initialValue?`): [`boolean`, `DispatchWithoutAction`]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `initialValue` | `boolean` | `false` |

#### Returns

[`boolean`, `DispatchWithoutAction`]

#### Defined in

[src/lib/hooks.ts:66](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/hooks.ts#L66)
