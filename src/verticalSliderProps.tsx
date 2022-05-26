type ArrowProps = {
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
}

const PrevArrow = ({ style, className, onClick }: ArrowProps) => (
  <button className={className} style={style} onClick={onClick}>
    <svg
      width="17"
      height="19"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5497 8.2687L8.63908 1.99976M8.63908 1.99976L1.72846 8.2687M8.63908 1.99976V9.83594V17.6721"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </button>
)

const NextArrow = ({ style, className, onClick }: ArrowProps) => (
  <button className={className} style={style} onClick={onClick}>
    <svg
      width="17"
      height="19"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.45031 10.7313L8.36092 17.0002M8.36092 17.0002L15.2715 10.7313M8.36092 17.0002V9.16406V1.32789"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </button>
)

const verticalSliderProps = {
  infinite: true,
  vertical: true,
  verticalSwiping: false,
  touchMove: false,
  centerMode: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500,
  centerPadding: "0px",
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: false,
  swipe: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
}

export default verticalSliderProps
