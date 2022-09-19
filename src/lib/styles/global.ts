import { createGlobalStyle } from "styled-components"
import { mobile, tablet } from "@/lib/data/constants"

export const maxWidth = 1440
export const desktopPaddings = 125
export const tabletPaddings = 18
export const headerHeight = 73
export const mobileHeaderHeight = 63

const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: light;
    --blue: #0066cc;
    --green: #68cc45;
    --red: #ff7979;
    --gray: #989898;
    --lightgray: #f5f5f5;
    --black: #3a3a3a;
    --white: #ffffff;
    --bgColor: #ffffff;
    --opacity: 0.3;
    --max-width: ${maxWidth}px;
    --paddings: ${desktopPaddings}px;
    --header-height: ${headerHeight}px;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 19px;
  }

  body {
    background-color: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  html,
  button,
  input {
    font-family: "SF Pro Display", sans-serif;
  }

  .skeletonFlexContainer {
    flex-grow: 1;
  }

  .skeletonResetLineHeight {
    line-height: normal;
  }

  .skeletonZeroLineHeight {
    line-height: 0;
  }

  #__next {
    /* min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between; */
  }

  @media only screen and (max-width: ${tablet}px) {
    :root {
      --paddings: ${tabletPaddings}px;
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    :root {
      --header-height: ${mobileHeaderHeight}px;
    }

    html {
      font-size: 15px;
    }
  }
`

export default GlobalStyles
