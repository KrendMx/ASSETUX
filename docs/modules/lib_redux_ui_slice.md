[Assetux-Frontend](../README.md) / [Exports](../modules.md) / lib/redux/ui/slice

# Module: lib/redux/ui/slice

## Table of contents

### References

- [default](lib_redux_ui_slice.md#default)

### Variables

- [slice](lib_redux_ui_slice.md#slice)

## References

### default

Renames and re-exports [slice](lib_redux_ui_slice.md#slice)

## Variables

### slice

• `Const` **slice**: `Slice`<[`UiState`](lib_redux_ui_types_ui.md#uistate), { `setAppLoaded`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>) => `void` ; `setBurgerActive`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>, `action`: { `payload`: `boolean` ; `type`: `string`  }) => `void` ; `setConfigureActive`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>, `action`: { `payload`: `boolean` ; `type`: `string`  }) => `void` ; `setCurrentCurrency`: { `prepare`: (`currency`: ``"RUB"`` \| ``"UAH"`` \| ``"KZT"``) => { `payload`: ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` = currency } ; `reducer`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>, `action`: { `payload`: ``"RUB"`` \| ``"UAH"`` \| ``"KZT"`` ; `type`: `string`  }) => `void`  } ; `setDesktop`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>) => `void` ; `setHideBurgerButton`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>, `action`: { `payload`: `boolean` ; `type`: `string`  }) => `void` ; `setMerchantMode`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>, `action`: { `payload`: [`MerchantMode`](lib_backend_ecommerce_types_backend_ecommerce.md#merchantmode) ; `type`: `string`  }) => `void` ; `setMobile`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>) => `void` ; `setMobileLayoutForTablet`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>) => `void` ; `setOrdersActive`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>, `action`: { `payload`: `boolean` ; `type`: `string`  }) => `void` ; `setTablet`: (`state`: `WritableDraft`<[`UiState`](lib_redux_ui_types_ui.md#uistate)\>) => `void`  }, ``"ui"``\>

#### Defined in

[src/lib/redux/ui/slice.ts:24](https://github.com/ASSETUX/frontend/blob/9a68660/src/lib/redux/ui/slice.ts#L24)
