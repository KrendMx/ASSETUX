[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/store

# Module: lib/redux/store

## Table of contents

### Type Aliases

- [AppDispatch](lib_redux_store.md#appdispatch)
- [RootState](lib_redux_store.md#rootstate)
- [RootStore](lib_redux_store.md#rootstore)

### Variables

- [default](lib_redux_store.md#default)

## Type Aliases

### AppDispatch

Ƭ **AppDispatch**: [`RootStore`](lib_redux_store.md#rootstore)[``"dispatch"``]

#### Defined in

[src/lib/redux/store.ts:17](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/store.ts#L17)

___

### RootState

Ƭ **RootState**: `ReturnType`<[`RootStore`](lib_redux_store.md#rootstore)[``"getState"``]\>

#### Defined in

[src/lib/redux/store.ts:16](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/store.ts#L16)

___

### RootStore

Ƭ **RootStore**: `ReturnType`<typeof `makeStore`\>

#### Defined in

[src/lib/redux/store.ts:15](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/store.ts#L15)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getInitialAppProps` | <P_2\>(`callback`: `AppCallback`<`EnhancedStore`<`Object`, `AnyAction`, [`ThunkMiddleware`<`Object`, `AnyAction`, `undefined`\>]\>, `P_2`\>) => `GetInitialAppProps`<`P_2`\> |
| `getInitialPageProps` | <P_3\>(`callback`: `PageCallback`<`EnhancedStore`<`Object`, `AnyAction`, [`ThunkMiddleware`<`Object`, `AnyAction`, `undefined`\>]\>, `P_3`\>) => `undefined` \| (`context`: `NextPageContext`<`any`\>) => `any` |
| `getServerSideProps` | <P\>(`callback`: `GetServerSidePropsCallback`<`EnhancedStore`<`Object`, `AnyAction`, [`ThunkMiddleware`<`Object`, `AnyAction`, `undefined`\>]\>, `P`\>) => `GetServerSideProps`<`P`, `ParsedUrlQuery`, `PreviewData`\> |
| `getStaticProps` | <P_1\>(`callback`: `GetStaticPropsCallback`<`EnhancedStore`<`Object`, `AnyAction`, [`ThunkMiddleware`<`Object`, `AnyAction`, `undefined`\>]\>, `P_1`\>) => `GetStaticProps`<`P_1`, `ParsedUrlQuery`, `PreviewData`\> |
| `withRedux` | (`Component`: `any`) => (`props`: `any`, `context`: `any`) => { `context`: `any` ; `props`: `Readonly`<`any`\> & `Readonly`<{ `children?`: `ReactNode`  }\> ; `refs`: { `[key: string]`: `React.ReactInstance`;  } ; `state`: `Readonly`<`any`\> ; `store`: `EnhancedStore`<`Object`, `AnyAction`, [`ThunkMiddleware`<`Object`, `AnyAction`, `undefined`\>]\> ; `UNSAFE_componentWillMount?`: () => `void` ; `UNSAFE_componentWillReceiveProps?`: (`nextProps`: `Readonly`<`any`\>, `nextContext`: `any`) => `void` ; `UNSAFE_componentWillUpdate?`: (`nextProps`: `Readonly`<`any`\>, `nextState`: `Readonly`<`any`\>, `nextContext`: `any`) => `void` ; `componentDidCatch?`: (`error`: `Error`, `errorInfo`: `ErrorInfo`) => `void` ; `componentDidMount?`: () => `void` ; `componentDidUpdate?`: (`prevProps`: `Readonly`<`any`\>, `prevState`: `Readonly`<`any`\>, `snapshot?`: `any`) => `void` ; `componentWillMount?`: () => `void` ; `componentWillReceiveProps?`: (`nextProps`: `Readonly`<`any`\>, `nextContext`: `any`) => `void` ; `componentWillUnmount?`: () => `void` ; `componentWillUpdate?`: (`nextProps`: `Readonly`<`any`\>, `nextState`: `Readonly`<`any`\>, `nextContext`: `any`) => `void` ; `forceUpdate`: (`callback?`: () => `void`) => `void` ; `getSnapshotBeforeUpdate?`: (`prevProps`: `Readonly`<`any`\>, `prevState`: `Readonly`<`any`\>) => `any` ; `hydrate`: (`__namedParameters`: `any`, `context`: `any`) => `void` ; `render`: () => `Element` ; `setState`: <K\>(`state`: `any`, `callback?`: () => `void`) => `void` ; `shouldComponentUpdate`: (`nextProps`: `Readonly`<`any`\>, `nextState`: `Readonly`<`any`\>, `nextContext`: `any`) => `boolean`  } |

#### Defined in

[src/lib/redux/store.ts:19](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/store.ts#L19)
