[Assetux-Frontend](../README.md) / [Exports](../modules.md) / components/common/table/types.table

# Module: components/common/table/types.table

## Table of contents

### Type Aliases

- [ArrowContainerProps](components_common_table_types_table.md#arrowcontainerprops)
- [ContainerProps](components_common_table_types_table.md#containerprops)
- [ElementProps](components_common_table_types_table.md#elementprops)
- [RowData](components_common_table_types_table.md#rowdata)
- [RowProps](components_common_table_types_table.md#rowprops)
- [SortInfo](components_common_table_types_table.md#sortinfo)
- [TableHeading](components_common_table_types_table.md#tableheading)
- [TableProps](components_common_table_types_table.md#tableprops)

## Type Aliases

### ArrowContainerProps

Ƭ **ArrowContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `shouldRotate?` | `boolean` |

#### Defined in

[src/components/common/table/types.table.tsx:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L34)

___

### ContainerProps

Ƭ **ContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customPaddings?` | `string` |
| `withShadow?` | `boolean` |

#### Defined in

[src/components/common/table/types.table.tsx:30](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L30)

___

### ElementProps

Ƭ **ElementProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `paddings?` | `string` |

#### Defined in

[src/components/common/table/types.table.tsx:41](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L41)

___

### RowData

Ƭ **RowData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sortValue?` | `any` |
| `value` | `string` \| `number` \| `JSX.Element` \| `undefined` \| ``null`` |

#### Defined in

[src/components/common/table/types.table.tsx:20](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L20)

___

### RowProps

Ƭ **RowProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collapseCols?` | `number`[] |
| `nRows?` | `number` |

#### Defined in

[src/components/common/table/types.table.tsx:37](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L37)

___

### SortInfo

Ƭ **SortInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ascending` | `boolean` |
| `nColumn` | `number` |

#### Defined in

[src/components/common/table/types.table.tsx:25](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L25)

___

### TableHeading

Ƭ **TableHeading**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sortFn?` | (`a`: `any`, `b`: `any`) => `number` |
| `value` | `string` |

#### Defined in

[src/components/common/table/types.table.tsx:15](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L15)

___

### TableProps

Ƭ **TableProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collapseCols?` | `number`[] |
| `collapseLastCols?` | `number` |
| `currentPage?` | `number` |
| `customHeadings` | [`TableHeading`](components_common_table_types_table.md#tableheading)[] |
| `customPaddings?` | `string` |
| `data?` | [`RowData`](components_common_table_types_table.md#rowdata)[][] |
| `displayIndexes?` | `boolean` |
| `displayPerPage?` | `number` |
| `tablePaddings?` | `string` |
| `withPagination?` | `boolean` |
| `withoutShadow?` | `boolean` |

#### Defined in

[src/components/common/table/types.table.tsx:1](https://github.com/ASSETUX/frontend/blob/9a68660/src/components/common/table/types.table.tsx#L1)
