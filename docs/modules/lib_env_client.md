[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/env/client

# Module: lib/env/client

## Table of contents

### Variables

- [env](lib_env_client.md#env)

### Functions

- [formatErrors](lib_env_client.md#formaterrors)

## Variables

### env

• `Const` **env**: `Object` = `_clientEnv.data`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `host` | `string` |
| `hostProtocol` | `string` |
| `isStage` | `boolean` |
| `magicKey` | `string` |

#### Defined in

[src/lib/env/client.mjs:25](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/env/client.mjs#L25)

## Functions

### formatErrors

▸ **formatErrors**(`errors`): (`undefined` \| `string`)[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errors` | `ZodFormattedError`<`Map`<`string`, `string`\>, `string`\> | **`Type`** |

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[src/lib/env/client.mjs:6](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/env/client.mjs#L6)
