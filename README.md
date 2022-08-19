# frontend

## Intall dependencies

`yarn install`

## Run development version

`yarn dev`

- requires .env file

## Run production version

`yarn build && yarn start`

- requires .env file

## Scripts used in CI/CD

- `yarn build:stage`
- `yarn build:prod`

## Code style

Husky is used to ensure consistency in code style across a project.

## Debugging

https://nextjs.org/docs/advanced-features/debugging

## Font adaptivity

* Main font-sizes are: 19px for desktop and 15px for mobile
* The ContentManager component sets font-sizes for various screen sizes
* To make a component adaptable:
  * Ensure that there's no parent component that overrides font-size with px or em (only rem)
  * Wrap the styled component in AdaptiveFont and provide mobileFactor and tabletFactor (if not, fonts'll be very small)
  * Inside the wrapped component only use ems (e.g. for title font-size is 1.2em and for text below font-size is 1em)

## Project's tree
<!-- tree generated by markdown-notes-tree starts here -->

- [**public**](public)
    - [**assets**](public/assets)
        - [**investments**](public/assets/investments)
            - [**en**](public/assets/investments/en)
            - [**ru**](public/assets/investments/ru)
    - [**blockchains**](public/blockchains)
    - [**flags**](public/flags)
    - [**fonts**](public/fonts)
    - [**icons**](public/icons)
    - [**locales**](public/locales)
        - [**en**](public/locales/en)
        - [**ru**](public/locales/ru)
    - [**manifests**](public/manifests)
    - [**pablo**](public/pablo)
    - [**social**](public/social)
    - [**sponsors**](public/sponsors)
- [**src**](src)
    - [**components**](src/components)
        - [**about**](src/components/about)
            - [**contacts**](src/components/about/contacts)
            - [**info**](src/components/about/info)
            - [**intro**](src/components/about/intro)
            - [**investments**](src/components/about/investments)
        - [**blog**](src/components/blog)
            - [**article**](src/components/blog/article)
            - [**main-block**](src/components/blog/main-block)
        - [**common**](src/components/common)
            - [**cards**](src/components/common/cards)
            - [**content-manager**](src/components/common/content-manager)
            - [**control-row**](src/components/common/control-row)
            - [**crypto-manager**](src/components/common/crypto-manager)
            - [**exchange-info**](src/components/common/exchange-info)
            - [**footer**](src/components/common/footer)
            - [**header**](src/components/common/header)
                - [**configure**](src/components/common/header/configure)
                    - [**button**](src/components/common/header/configure/button)
                    - [**popup**](src/components/common/header/configure/popup)
                        - [**items**](src/components/common/header/configure/popup/items)
                - [**responsive**](src/components/common/header/responsive)
            - [**input-select**](src/components/common/input-select)
                - [**input**](src/components/common/input-select/input)
                - [**select**](src/components/common/input-select/select)
            - [**modal-components**](src/components/common/modal-components)
            - [**modals**](src/components/common/modals)
            - [**news**](src/components/common/news)
                - [**element**](src/components/common/news/element)
            - [**pagination**](src/components/common/pagination)
            - [**scroll-button**](src/components/common/scroll-button)
            - [**slider**](src/components/common/slider)
            - [**sliders**](src/components/common/sliders)
                - [**investments**](src/components/common/sliders/investments)
            - [**table**](src/components/common/table)
        - [**home**](src/components/home)
            - [**about-us**](src/components/home/about-us)
            - [**crypto-explorer**](src/components/home/crypto-explorer)
            - [**crypto-slide**](src/components/home/crypto-slide)
                - [**element**](src/components/home/crypto-slide/element)
            - [**form-group**](src/components/home/form-group)
                - [**form**](src/components/home/form-group/form)
                    - [**buttons**](src/components/home/form-group/form/buttons)
                    - [**buy-form**](src/components/home/form-group/form/buy-form)
                        - [**select-form**](src/components/home/form-group/form/buy-form/select-form)
                    - [**common**](src/components/home/form-group/form/common)
                    - [**input-select-button**](src/components/home/form-group/form/input-select-button)
                    - [**sell-form**](src/components/home/form-group/form/sell-form)
                        - [**select-form**](src/components/home/form-group/form/sell-form/select-form)
                            - [**modals**](src/components/home/form-group/form/sell-form/select-form/modals)
                                - [**exchange**](src/components/home/form-group/form/sell-form/select-form/modals/exchange)
                                - [**refund**](src/components/home/form-group/form/sell-form/select-form/modals/refund)
                - [**info**](src/components/home/form-group/info)
            - [**investments**](src/components/home/investments)
            - [**orders**](src/components/home/orders)
                - [**modals**](src/components/home/orders/modals)
                - [**order-modal**](src/components/home/orders/order-modal)
            - [**query-controller**](src/components/home/query-controller)
        - [**menus**](src/components/menus)
            - [**burger**](src/components/menus/burger)
            - [**common**](src/components/menus/common)
            - [**configure**](src/components/menus/configure)
                - [**items**](src/components/menus/configure/items)
        - [**profile**](src/components/profile)
            - [**bill**](src/components/profile/bill)
            - [**common**](src/components/profile/common)
                - [**form-components**](src/components/profile/common/form-components)
            - [**history**](src/components/profile/history)
            - [**login**](src/components/profile/login)
            - [**main**](src/components/profile/main)
            - [**payment**](src/components/profile/payment)
    - [**core**](src/core)
        - [**backend**](src/core/backend)
    - [**lib**](src/lib)
        - [**backend**](src/lib/backend)
            - [**ecommerce**](src/lib/backend/ecommerce)
            - [**main**](src/lib/backend/main)
        - [**data**](src/lib/data)
        - [**env**](src/lib/env)
        - [**redux**](src/lib/redux)
            - [**crypto**](src/lib/redux/crypto)
            - [**ui**](src/lib/redux/ui)
        - [**styles**](src/lib/styles)
        - [**utils**](src/lib/utils)
    - [**pages**](src/pages)
        - [**blog**](src/pages/blog)
            - [**article**](src/pages/blog/article)
        - [**payment**](src/pages/payment)
        - [**profile**](src/pages/profile)

<!-- tree generated by markdown-notes-tree ends here -->
