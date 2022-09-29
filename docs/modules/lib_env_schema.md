[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/env/schema

# Module: lib/env/schema

## Table of contents

### Variables

- [clientEnv](lib_env_schema.md#clientenv)
- [clientSchema](lib_env_schema.md#clientschema)
- [serverSchema](lib_env_schema.md#serverschema)

## Variables

### clientEnv

• `Const` **clientEnv**: `Object`

You can't destruct `process.env` as a regular object, so you have to do
it manually here. This is because Next.js evaluates this at build time,
and only used environment variables are included in the build.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `host` | `undefined` \| `string` |
| `hostProtocol` | `undefined` \| `string` |
| `isStage` | `undefined` \| `boolean` |
| `magicKey` | `undefined` \| `string` |

#### Defined in

[src/lib/env/schema.mjs:31](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/env/schema.mjs#L31)

___

### clientSchema

• `Const` **clientSchema**: `ZodObject`<{ `host`: `ZodString` ; `hostProtocol`: `ZodString` ; `isStage`: `ZodBoolean` ; `magicKey`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `host`: `string` ; `hostProtocol`: `string` ; `isStage`: `boolean` ; `magicKey`: `string`  }, { `host`: `string` ; `hostProtocol`: `string` ; `isStage`: `boolean` ; `magicKey`: `string`  }\>

Specify your client-side environment variables schema here.
This way you can ensure the app isn't built with invalid env vars.
To expose them to the client, prefix them with `NEXT_PUBLIC_`.

#### Defined in

[src/lib/env/schema.mjs:18](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/env/schema.mjs#L18)

___

### serverSchema

• `Const` **serverSchema**: `ZodObject`<{ `BUNDLE_ANALYZE`: `ZodOptional`<`ZodString`\> ; `ENABLE_PWA`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `BUNDLE_ANALYZE`: `undefined` \| `string` ; `ENABLE_PWA`: `string`  }, { `BUNDLE_ANALYZE`: `undefined` \| `string` ; `ENABLE_PWA`: `string`  }\>

Specify your server-side environment variables schema here.
This way you can ensure the app isn't built with invalid env vars.

#### Defined in

[src/lib/env/schema.mjs:8](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/env/schema.mjs#L8)
