import { createGlobalStyle, keyframes } from 'styled-components'

const overflowAnimation = keyframes`
  to {
    overflow: hidden;
  }
`

const VerticalSliderStyles = createGlobalStyle`
  .slick-slider {
    position: relative;

    display: block;
    box-sizing: border-box;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;

    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    position: relative;

    display: block;
    overflow: hidden;

    margin: 0;
    padding: 0;
  }

  .slick-list:focus {
    outline: none;
  }

  .slick-slider .slick-track,
  .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;

    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .slick-track:after {
    clear: both;
  }

  .slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slide {
    display: none;
    float: left;

    height: 100%;
    min-height: 1px;
    
    padding: 5px;

    filter: blur(2px);
  }

  .slick-slide:not(.slick-center) {
    animation: 0s linear 0.5s ${overflowAnimation};
    animation-fill-mode: forwards;
  }

  .slick-slide.slick-center {
    filter: none;
  }

  .slick-slide > div > div > div {
    transition: transform 0.5s linear;
  }
  
  .slick-slide.slick-center > div > div > div {
    transform: scale(1.4);
    z-index: 1;
  }

  [dir="rtl"] .slick-slide {
    float: right;
  }

  .slick-slide img {
    display: block;
  }

  .slick-slide.slick-loading img {
    display: none;
  }

  .slick-slide.dragging img {
    pointer-events: none;
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-loading .slick-slide {
    visibility: hidden;
  }

  .slick-vertical .slick-slide {
    display: block;

    height: auto;
  }

  .slick-arrow.slick-hidden {
    display: none;
  }

  /* Arrows */
  .slick-prev,
  .slick-next {
    position: absolute;
    z-index: 10;

    display: flex !important;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 28%;

    padding: 0;

    cursor: pointer;

    color: transparent;
    border: none;
    outline: none;
    background: transparent;
  }
  
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: transparent;
    outline: none;
    background: transparent;
  }

  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.25;
  }

  .slick-prev {
    top: 0;
  }

  .slick-next {
    bottom: 0;
  }

`

export default VerticalSliderStyles
