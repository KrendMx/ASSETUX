[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/common/control-row/types.control-row

# Module: components/common/control-row/types.control-row

## Table of contents

### Type Aliases

- [ButtonProps](components_common_control_row_types_control_row.md#buttonprops)
- [ButtonStyledProps](components_common_control_row_types_control_row.md#buttonstyledprops)
- [ContainerStyledProps](components_common_control_row_types_control_row.md#containerstyledprops)
- [ControlRowProps](components_common_control_row_types_control_row.md#controlrowprops)

## Type Aliases

### ButtonProps

Ƭ **ButtonProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |
| `link?` | `string` |
| `name` | `string` |
| `onClick?` | () => `void` |

#### Defined in

[src/components/common/control-row/types.control-row.ts:1](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/control-row/types.control-row.ts#L1)

___

### ButtonStyledProps

Ƭ **ButtonStyledProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active?` | `boolean` |
| `spanWidth?` | `boolean` |

#### Defined in

[src/components/common/control-row/types.control-row.ts:18](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/control-row/types.control-row.ts#L18)

___

### ContainerStyledProps

Ƭ **ContainerStyledProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `spaceBetween?` | `boolean` |

#### Defined in

[src/components/common/control-row/types.control-row.ts:15](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/control-row/types.control-row.ts#L15)

___

### ControlRowProps

Ƭ **ControlRowProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buttons?` | [`ButtonProps`](components_common_control_row_types_control_row.md#buttonprops)[] |
| `context` | `string` |
| `onContextChange` | (`context`: `string`) => `void` |
| `searchPlaceholder` | `string` |

#### Defined in

[src/components/common/control-row/types.control-row.ts:8](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/control-row/types.control-row.ts#L8)
