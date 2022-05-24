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
