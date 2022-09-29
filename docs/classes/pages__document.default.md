[Assetux-Frontend](../README.md) / [Exports](../modules.md) / [pages/\_document](../modules/pages__document.md) / default

# Class: default

[pages/_document](../modules/pages__document.md).default

## Hierarchy

- `default`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](pages__document.default.md#constructor)

### Properties

- [context](pages__document.default.md#context)
- [props](pages__document.default.md#props)
- [refs](pages__document.default.md#refs)
- [state](pages__document.default.md#state)
- [contextType](pages__document.default.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](pages__document.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](pages__document.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](pages__document.default.md#unsafe_componentwillupdate)
- [componentDidCatch](pages__document.default.md#componentdidcatch)
- [componentDidMount](pages__document.default.md#componentdidmount)
- [componentDidUpdate](pages__document.default.md#componentdidupdate)
- [componentWillMount](pages__document.default.md#componentwillmount)
- [componentWillReceiveProps](pages__document.default.md#componentwillreceiveprops)
- [componentWillUnmount](pages__document.default.md#componentwillunmount)
- [componentWillUpdate](pages__document.default.md#componentwillupdate)
- [forceUpdate](pages__document.default.md#forceupdate)
- [getSnapshotBeforeUpdate](pages__document.default.md#getsnapshotbeforeupdate)
- [render](pages__document.default.md#render)
- [setState](pages__document.default.md#setstate)
- [shouldComponentUpdate](pages__document.default.md#shouldcomponentupdate)
- [getInitialProps](pages__document.default.md#getinitialprops)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps` \| `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |

#### Inherited from

Document.constructor

#### Defined in

node_modules/@types/react/index.d.ts:472

• **new default**(`props`, `context`)

**`Deprecated`**

**`See`**

https://reactjs.org/docs/legacy-context.html

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps` |
| `context` | `any` |

#### Inherited from

Document.constructor

#### Defined in

node_modules/@types/react/index.d.ts:477

## Properties

### context

• **context**: `unknown`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`See`**

https://reactjs.org/docs/context.html

#### Inherited from

Document.context

#### Defined in

node_modules/@types/react/index.d.ts:470

___

### props

• `Readonly` **props**: `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\>

#### Inherited from

Document.props

#### Defined in

node_modules/@types/react/index.d.ts:490

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

Document.refs

#### Defined in

node_modules/@types/react/index.d.ts:496

___

### state

• **state**: `Readonly`<{}\>

#### Inherited from

Document.state

#### Defined in

node_modules/@types/react/index.d.ts:491

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`See`**

https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

Document.contextType

#### Defined in

node_modules/@types/react/index.d.ts:453

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use componentDidMount or the constructor instead

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

Document.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:687

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Document.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:719

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Document.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:747

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

Document.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:616

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

Document.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:595

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `prevState` | `Readonly`<{}\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

Document.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:658

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

Document.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:673

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Document.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:702

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

Document.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:611

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Document.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:732

___

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

Document.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:487

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `prevState` | `Readonly`<{}\> |

#### Returns

`any`

#### Inherited from

Document.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:652

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

Document.render

#### Defined in

[src/pages/_document.tsx:34](https://github.com/ASSETUX/frontend/blob/9a68660/src/pages/_document.tsx#L34)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| {} \| (`prevState`: `Readonly`<{}\>, `props`: `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\>) => ``null`` \| {} \| `Pick`<{}, `K`\> \| `Pick`<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

Document.setState

#### Defined in

node_modules/@types/react/index.d.ts:482

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`RenderPageResult` & { `styles?`: `ReactFragment` \| `Element` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>[]  } & `HtmlProps`\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

Document.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:606

___

### getInitialProps

▸ `Static` **getInitialProps**(`ctx`): `Promise`<{ `head?`: (``null`` \| `Element`)[] ; `html`: `string` ; `styles`: `Element`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `DocumentContext` |

#### Returns

`Promise`<{ `head?`: (``null`` \| `Element`)[] ; `html`: `string` ; `styles`: `Element`[]  }\>

#### Overrides

Document.getInitialProps

#### Defined in

[src/pages/_document.tsx:8](https://github.com/ASSETUX/frontend/blob/9a68660/src/pages/_document.tsx#L8)
