import styled from "styled-components"
import { mobile } from "@/lib/data/constants"

export const Header = styled.header`
  width: 100%;
  height: 73px;
  display: flex;
  background: var(--white);
  justify-content: center;
  align-items: center;

  & > * + * {
    margin-left: 7px;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: 63px;
  }
`

export const LogoContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;

  @media only screen and (max-width: ${mobile}px) {
    width: 35px;
    height: 35px;
  }
`

export const Name = styled.span`
  font-weight: 300;
  color: #000;
  font-size: 18px;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 13px;
  }
`

export const PoweredBy = () => (
  <svg
    width="107"
    height="29"
    viewBox="0 0 107 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M94.127 15.838H93.9609V23.79C93.9609 24.4505 93.8285 25.0105 93.5639 25.4748C93.316 25.9361 92.9436 26.3155 92.4906 26.5679V26.5679C92.0091 26.8149 91.4775 26.9436 90.9383 26.9436C90.3992 26.9436 89.8675 26.8149 89.386 26.5679V26.5679C88.9367 26.309 88.565 25.9304 88.3107 25.4728C88.056 25.0064 87.9256 24.4458 87.9256 23.788V15.8359H86.8008V23.8352C86.8008 24.7113 86.9794 25.4674 87.3434 26.1049C87.6902 26.7241 88.2038 27.2292 88.8236 27.5606C89.476 27.8982 90.1992 28.0694 90.931 28.0592C91.6582 28.0708 92.3769 27.8992 93.0233 27.5599V27.5599C93.6496 27.2327 94.1692 26.7275 94.5193 26.1056V26.1056C94.8952 25.4681 95.0798 24.7079 95.0798 23.8339V15.838H94.1336H94.127Z"
      fill="#191919"
    />
    <path
      d="M106.832 27.6683L106.694 27.7606L106.832 27.6683L103.055 21.7676L106.622 16.098L106.482 16.007L106.622 16.098L106.785 15.8379H106.482H105.539H105.447L105.398 15.9174L105.539 16.007L105.398 15.9174L102.431 20.7749L99.3225 15.9147L99.2736 15.8379H99.1843H98.1924H97.8867L98.0528 16.0987L101.636 21.7191L97.89 27.669L97.7266 27.9291H98.0296H99.0049H99.0976L99.1459 27.8496L102.275 22.7124L105.546 27.8523L105.685 27.7606H105.686L105.546 27.8523L105.595 27.9291H105.686H106.694H106.999L106.832 27.6683Z"
      fill="#191919"
    />
    <path
      d="M37.7044 15.43L37.6627 15.3242H37.3742L37.3319 15.43L32.4559 27.6971L32.3633 27.929H33.5179L33.5596 27.8232L33.4061 27.7605L33.5596 27.8232L35.0458 24.0392H39.9065L41.3768 27.8225L41.4185 27.929H42.671L42.5791 27.6971L37.7044 15.43ZM37.4999 17.7887L39.485 22.9394H35.4732L37.4999 17.7887Z"
      fill="#444444"
    />
    <path
      d="M66.8977 26.8138V22.4004H72.4208H72.5869V22.2312V21.4529V21.2844H72.4208H66.8977V16.9539H73.0547H73.2208V16.7847V16.007V15.8379H73.0547H65.935H65.7695V16.007V27.7606V27.9291H65.935H73.2823H73.4477V27.7606V26.9823V26.8138H73.2823H66.8977Z"
      fill="#444444"
    />
    <path
      d="M59.9037 26.7441L59.9023 26.7448L59.9672 26.9008L59.9037 26.7441Z"
      fill="#191919"
    />
    <path
      d="M62.182 23.1204C62.006 22.7317 61.7464 22.3883 61.4224 22.1156C61.0992 21.8471 60.7434 21.6221 60.3637 21.4464V21.4464C59.9918 21.2667 59.6142 21.105 59.2309 20.9612C58.758 20.7752 58.3122 20.5838 57.8936 20.3871C57.5303 20.2152 57.2014 19.9761 56.9236 19.6822C56.688 19.407 56.5638 19.051 56.5762 18.6861C56.5762 18.1531 56.78 17.7144 57.1988 17.3592C57.6177 17.0041 58.1821 16.8201 58.9132 16.8201C59.3928 16.8212 59.8698 16.8915 60.3299 17.029C60.7447 17.1457 61.1492 17.2972 61.5395 17.4819L61.6103 17.3309L61.5382 17.4825L61.685 17.5553L61.7585 17.4064L62.0675 16.7776L61.9193 16.7015L61.9967 16.5525C61.5207 16.3053 61.0173 16.1171 60.4973 15.9919C59.9477 15.847 59.3824 15.773 58.8147 15.7715H58.8113L58.8147 15.94L58.8113 15.7715C58.2142 15.7726 57.6247 15.9081 57.085 16.1684V16.1684C56.6009 16.3973 56.1857 16.754 55.8827 17.2015C55.5777 17.6649 55.4201 18.2126 55.4315 18.7704C55.4315 19.3964 55.5916 19.9227 55.9244 20.3345C56.2682 20.7409 56.6897 21.0718 57.1631 21.3069V21.3069C57.6444 21.5415 58.1366 21.7533 58.64 21.9424L58.6975 21.7841L58.6413 21.9397C59.0961 22.1075 59.5403 22.3037 59.9713 22.5274C60.3544 22.7222 60.6907 23.0003 60.9565 23.3421L61.0889 23.2384L60.9565 23.3421C61.1974 23.6468 61.3257 24.0585 61.3257 24.5936C61.3257 25.1489 61.1875 25.5957 60.9215 25.9475L61.0538 26.0485L60.9215 25.9454C60.6572 26.2977 60.3048 26.5709 59.9011 26.7366L59.9673 26.8923L59.9011 26.7373C59.4954 26.9149 59.0584 27.0066 58.6168 27.0068C58.2252 27.0059 57.8359 26.9471 57.4608 26.8323C57.0843 26.7193 56.7181 26.5732 56.3664 26.3956V26.3956C56.0757 26.2483 55.7961 26.0792 55.53 25.8895L55.3812 25.779L55.2892 25.9421L55.4328 26.0256L55.2892 25.9421L54.9153 26.6038L54.8359 26.7447L54.9683 26.831L55.0569 26.6881L54.9683 26.831C55.1774 26.9657 55.4562 27.1329 55.8046 27.3323L55.886 27.1848L55.8046 27.3317C56.2119 27.5414 56.6372 27.7128 57.0751 27.8438L57.1227 27.6841L57.0751 27.8432C57.6032 27.9952 58.1501 28.0692 58.6989 28.0629C59.4347 28.0629 60.0884 27.9207 60.6581 27.6309C61.2071 27.3604 61.6697 26.9373 61.9927 26.4104L61.8518 26.3215L61.9927 26.4104C62.3168 25.8592 62.483 25.2266 62.4724 24.5842C62.4724 24.0161 62.3778 23.5261 62.18 23.1218L62.182 23.1204ZM56.0111 20.2604L56.0521 20.2287L56.0111 20.2604ZM57.2306 21.1722L57.2365 21.1594L57.2306 21.1722Z"
      fill="#444444"
    />
    <path
      d="M83.5956 15.8379H76.0372H75.8711V16.007V16.7847V16.9539H76.0372H79.2358V27.7606V27.9291H79.4018H80.1985H80.3639V27.7606V16.9539H83.5956H83.761V16.7847V16.007V15.8379H83.5956Z"
      fill="#444444"
    />
    <path
      d="M62.0668 16.7787L62.1396 16.6299L61.9954 16.5527L61.918 16.7022L62.0668 16.7787Z"
      fill="#191919"
    />
    <path
      d="M52.0882 23.1192C51.9122 22.7302 51.6524 22.3868 51.3279 22.1144C51.0049 21.8456 50.6491 21.6207 50.2692 21.4452V21.4452C49.8974 21.2655 49.5198 21.1037 49.1364 20.96C48.6636 20.774 48.2178 20.5826 47.7992 20.3858C47.4357 20.2138 47.1066 19.9748 46.8285 19.6809C46.5929 19.4057 46.4687 19.0497 46.4811 18.6848C46.4811 18.1518 46.6856 17.7131 47.1044 17.3579C47.5233 17.0028 48.0877 16.8188 48.8188 16.8188C49.2984 16.8199 49.7753 16.8902 50.2355 17.0277C50.6501 17.1443 51.0545 17.2958 51.4444 17.4806L51.592 17.5534L51.6654 17.4044L51.9737 16.7757L52.0465 16.6274L51.9029 16.5506C51.4269 16.3035 50.9235 16.1152 50.4036 15.9899V15.9899C49.8539 15.845 49.2886 15.771 48.7209 15.7695V15.7695V15.938V15.7695C48.1214 15.7702 47.5295 15.9064 46.9879 16.1685V16.1685C46.5038 16.3973 46.0887 16.7541 45.7857 17.2016C45.4803 17.665 45.3225 18.2131 45.3337 18.7711C45.3337 19.3972 45.4932 19.9235 45.8267 20.3352L45.9544 20.2281L45.8267 20.3352C46.1716 20.7414 46.5942 21.0716 47.0687 21.3057V21.3057C47.5504 21.5402 48.0427 21.752 48.5456 21.9412L48.6018 21.7828L48.5456 21.9412C49.0004 22.1089 49.4446 22.3052 49.8755 22.5288C50.2586 22.7236 50.595 23.0017 50.8608 23.3436V23.3436C51.1023 23.6482 51.2307 24.0599 51.2307 24.595C51.2307 25.1503 51.0924 25.5971 50.8264 25.9489L50.9587 26.052L50.8264 25.9489C50.5621 26.3013 50.2094 26.5746 49.8054 26.7401V26.7401L49.8716 26.895L49.8054 26.7401C49.3999 26.9178 48.9632 27.0095 48.5217 27.0096C48.1302 27.0086 47.7408 26.9498 47.3658 26.8351C46.9892 26.7221 46.623 26.576 46.2713 26.3984V26.3984C45.9809 26.2497 45.7018 26.0792 45.4363 25.8882L45.339 26.023L45.1948 25.9388L44.8209 26.6006L44.7422 26.7414L44.8745 26.8277L44.9632 26.6848L44.8745 26.8277C45.0836 26.9624 45.3624 27.1296 45.7109 27.329L45.7923 27.1815L45.7162 27.3317C46.1218 27.5407 46.5453 27.7117 46.9813 27.8426V27.8426C47.5094 27.9952 48.0562 28.0699 48.6051 28.0643C49.3416 28.0643 49.9946 27.9221 50.565 27.6323C51.1138 27.3616 51.5765 26.9385 51.8996 26.4119L51.7587 26.3229L51.8996 26.4119C52.2235 25.8606 52.3895 25.2279 52.3787 24.5856C52.3787 24.0175 52.2841 23.5275 52.0869 23.1232L52.0882 23.1192ZM50.9859 23.2465L50.9951 23.2391L50.9859 23.2465Z"
      fill="#444444"
    />
    <path
      d="M50.8288 25.9531H50.8281L50.9598 26.0562L50.8288 25.9531Z"
      fill="#191919"
    />
    <path
      d="M45.4329 25.8859L45.2834 25.7754L45.1914 25.9385L45.3357 26.0227L45.4329 25.8859Z"
      fill="#191919"
    />
    <path
      d="M45.7109 27.3302L45.7136 27.3316L45.7162 27.3329L45.7923 27.1816L45.7109 27.3302Z"
      fill="#191919"
    />
    <path
      d="M19.4634 8.8457H19.4391L16.6948 12.4222L12.0469 18.4791L16.5884 22.0819L24.0012 12.4222L19.4634 8.8457Z"
      fill="#444444"
    />
    <path
      d="M19.4625 8.84604L19.447 8.83398L19.4375 8.84604H19.4625Z"
      fill="#444444"
    />
    <path
      d="M7.48662 22.0839L7.47656 22.0922L12.0441 27.9998V22.0839V18.4785L7.48662 22.0839Z"
      fill="#2D2D2D"
    />
    <path
      d="M7.47266 22.084L7.47956 22.0932L7.4906 22.084H7.47266Z"
      fill="#232323"
    />
    <path
      d="M12.0469 3V8.8449V12.4214V18.4783L16.6948 12.4214L19.4391 8.8449L19.4483 8.83319L12.0469 3Z"
      fill="#353535"
    />
    <path
      d="M12.0469 18.4785V22.0839V27.9998L16.5868 22.0839L16.5884 22.0814L12.0469 18.4785Z"
      fill="#4C4C4C"
    />
    <path
      d="M12.0442 3L4.60547 8.81773L4.62683 8.84532L7.38076 12.4218L12.0446 18.4787V12.4218V8.84532V3.00042L12.0442 3Z"
      fill="#191919"
    />
    <path
      d="M7.38178 12.4222L4.62785 8.8457H4.57089L0 12.421L0.000837696 12.4222L7.47183 22.0844H7.48817L12.0457 18.4791L7.38178 12.4222Z"
      fill="#232323"
    />
    <path
      d="M4.60617 8.81836L4.57031 8.84615H4.62768L4.60617 8.81836Z"
      fill="#00028B"
    />
    <path
      d="M63.3027 6.49072H61.5933V5.80078H63.3027C63.6338 5.80078 63.9019 5.74805 64.1069 5.64258C64.312 5.53711 64.4614 5.39062 64.5552 5.20312C64.6519 5.01562 64.7002 4.80176 64.7002 4.56152C64.7002 4.3418 64.6519 4.13525 64.5552 3.94189C64.4614 3.74854 64.312 3.59326 64.1069 3.47607C63.9019 3.35596 63.6338 3.2959 63.3027 3.2959H61.791V9H60.9429V2.60156H63.3027C63.7861 2.60156 64.1948 2.68506 64.5288 2.85205C64.8628 3.01904 65.1162 3.25049 65.2891 3.54639C65.4619 3.83936 65.5483 4.1748 65.5483 4.55273C65.5483 4.96289 65.4619 5.31299 65.2891 5.60303C65.1162 5.89307 64.8628 6.11426 64.5288 6.2666C64.1948 6.41602 63.7861 6.49072 63.3027 6.49072ZM66.2207 6.67529V6.57422C66.2207 6.23145 66.2705 5.91357 66.3701 5.62061C66.4697 5.32471 66.6133 5.06836 66.8008 4.85156C66.9883 4.63184 67.2153 4.46191 67.4819 4.3418C67.7485 4.21875 68.0474 4.15723 68.3784 4.15723C68.7124 4.15723 69.0127 4.21875 69.2793 4.3418C69.5488 4.46191 69.7773 4.63184 69.9648 4.85156C70.1553 5.06836 70.3003 5.32471 70.3999 5.62061C70.4995 5.91357 70.5493 6.23145 70.5493 6.57422V6.67529C70.5493 7.01807 70.4995 7.33594 70.3999 7.62891C70.3003 7.92188 70.1553 8.17822 69.9648 8.39795C69.7773 8.61475 69.5503 8.78467 69.2837 8.90771C69.02 9.02783 68.7212 9.08789 68.3872 9.08789C68.0532 9.08789 67.7529 9.02783 67.4863 8.90771C67.2197 8.78467 66.9912 8.61475 66.8008 8.39795C66.6133 8.17822 66.4697 7.92188 66.3701 7.62891C66.2705 7.33594 66.2207 7.01807 66.2207 6.67529ZM67.0337 6.57422V6.67529C67.0337 6.9126 67.0615 7.13672 67.1172 7.34766C67.1729 7.55566 67.2563 7.74023 67.3677 7.90137C67.4819 8.0625 67.624 8.18994 67.7939 8.28369C67.9639 8.37451 68.1616 8.41992 68.3872 8.41992C68.6099 8.41992 68.8047 8.37451 68.9717 8.28369C69.1416 8.18994 69.2822 8.0625 69.3936 7.90137C69.5049 7.74023 69.5884 7.55566 69.644 7.34766C69.7026 7.13672 69.7319 6.9126 69.7319 6.67529V6.57422C69.7319 6.33984 69.7026 6.11865 69.644 5.91064C69.5884 5.69971 69.5034 5.51367 69.3892 5.35254C69.2778 5.18848 69.1372 5.05957 68.9673 4.96582C68.8003 4.87207 68.604 4.8252 68.3784 4.8252C68.1558 4.8252 67.9595 4.87207 67.7896 4.96582C67.6226 5.05957 67.4819 5.18848 67.3677 5.35254C67.2563 5.51367 67.1729 5.69971 67.1172 5.91064C67.0615 6.11865 67.0337 6.33984 67.0337 6.57422ZM72.7729 8.15625L73.9946 4.24512H74.5308L74.4253 5.02295L73.1816 9H72.6587L72.7729 8.15625ZM71.9512 4.24512L72.9927 8.2002L73.0674 9H72.5181L71.1382 4.24512H71.9512ZM75.6997 8.16943L76.6929 4.24512H77.5015L76.1216 9H75.5767L75.6997 8.16943ZM74.6494 4.24512L75.8447 8.09033L75.981 9H75.4624L74.1836 5.01416L74.0781 4.24512H74.6494ZM80.3096 9.08789C79.9785 9.08789 79.6782 9.03223 79.4087 8.9209C79.1421 8.80664 78.9121 8.64697 78.7188 8.44189C78.5283 8.23682 78.3818 7.99365 78.2793 7.7124C78.1768 7.43115 78.1255 7.12354 78.1255 6.78955V6.60498C78.1255 6.21826 78.1826 5.87402 78.2969 5.57227C78.4111 5.26758 78.5664 5.00977 78.7627 4.79883C78.959 4.58789 79.1816 4.42822 79.4307 4.31982C79.6797 4.21143 79.9375 4.15723 80.2041 4.15723C80.5439 4.15723 80.8369 4.21582 81.083 4.33301C81.332 4.4502 81.5356 4.61426 81.6938 4.8252C81.8521 5.0332 81.9692 5.2793 82.0454 5.56348C82.1216 5.84473 82.1597 6.15234 82.1597 6.48633V6.85107H78.6089V6.1875H81.3467V6.12598C81.335 5.91504 81.291 5.70996 81.2148 5.51074C81.1416 5.31152 81.0244 5.14746 80.8633 5.01855C80.7021 4.88965 80.4824 4.8252 80.2041 4.8252C80.0195 4.8252 79.8496 4.86475 79.6943 4.94385C79.5391 5.02002 79.4058 5.13428 79.2944 5.28662C79.1831 5.43896 79.0967 5.625 79.0352 5.84473C78.9736 6.06445 78.9429 6.31787 78.9429 6.60498V6.78955C78.9429 7.01514 78.9736 7.22754 79.0352 7.42676C79.0996 7.62305 79.1919 7.7959 79.312 7.94531C79.4351 8.09473 79.583 8.21191 79.7559 8.29688C79.9316 8.38184 80.1309 8.42432 80.3535 8.42432C80.6406 8.42432 80.8838 8.36572 81.083 8.24854C81.2822 8.13135 81.4565 7.97461 81.606 7.77832L82.0981 8.16943C81.9956 8.32471 81.8652 8.47266 81.707 8.61328C81.5488 8.75391 81.354 8.86816 81.1226 8.95605C80.894 9.04395 80.623 9.08789 80.3096 9.08789ZM83.9219 4.99219V9H83.1089V4.24512H83.8999L83.9219 4.99219ZM85.4072 4.21875L85.4028 4.97461C85.3354 4.95996 85.271 4.95117 85.2095 4.94824C85.1509 4.94238 85.0835 4.93945 85.0073 4.93945C84.8198 4.93945 84.6543 4.96875 84.5107 5.02734C84.3672 5.08594 84.2456 5.16797 84.146 5.27344C84.0464 5.37891 83.9673 5.50488 83.9087 5.65137C83.853 5.79492 83.8164 5.95312 83.7988 6.12598L83.5703 6.25781C83.5703 5.9707 83.5981 5.70117 83.6538 5.44922C83.7124 5.19727 83.8018 4.97461 83.9219 4.78125C84.042 4.58496 84.1943 4.43262 84.3789 4.32422C84.5664 4.21289 84.7891 4.15723 85.0469 4.15723C85.1055 4.15723 85.1729 4.16455 85.249 4.1792C85.3252 4.19092 85.3779 4.2041 85.4072 4.21875ZM88.0439 9.08789C87.7129 9.08789 87.4126 9.03223 87.1431 8.9209C86.8765 8.80664 86.6465 8.64697 86.4531 8.44189C86.2627 8.23682 86.1162 7.99365 86.0137 7.7124C85.9111 7.43115 85.8599 7.12354 85.8599 6.78955V6.60498C85.8599 6.21826 85.917 5.87402 86.0312 5.57227C86.1455 5.26758 86.3008 5.00977 86.4971 4.79883C86.6934 4.58789 86.916 4.42822 87.165 4.31982C87.4141 4.21143 87.6719 4.15723 87.9385 4.15723C88.2783 4.15723 88.5713 4.21582 88.8174 4.33301C89.0664 4.4502 89.27 4.61426 89.4282 4.8252C89.5864 5.0332 89.7036 5.2793 89.7798 5.56348C89.856 5.84473 89.894 6.15234 89.894 6.48633V6.85107H86.3433V6.1875H89.0811V6.12598C89.0693 5.91504 89.0254 5.70996 88.9492 5.51074C88.876 5.31152 88.7588 5.14746 88.5977 5.01855C88.4365 4.88965 88.2168 4.8252 87.9385 4.8252C87.7539 4.8252 87.584 4.86475 87.4287 4.94385C87.2734 5.02002 87.1401 5.13428 87.0288 5.28662C86.9175 5.43896 86.8311 5.625 86.7695 5.84473C86.708 6.06445 86.6772 6.31787 86.6772 6.60498V6.78955C86.6772 7.01514 86.708 7.22754 86.7695 7.42676C86.834 7.62305 86.9263 7.7959 87.0464 7.94531C87.1694 8.09473 87.3174 8.21191 87.4902 8.29688C87.666 8.38184 87.8652 8.42432 88.0879 8.42432C88.375 8.42432 88.6182 8.36572 88.8174 8.24854C89.0166 8.13135 89.1909 7.97461 89.3403 7.77832L89.8325 8.16943C89.73 8.32471 89.5996 8.47266 89.4414 8.61328C89.2832 8.75391 89.0884 8.86816 88.8569 8.95605C88.6284 9.04395 88.3574 9.08789 88.0439 9.08789ZM93.8403 8.07715V2.25H94.6577V9H93.9106L93.8403 8.07715ZM90.6411 6.67529V6.58301C90.6411 6.21973 90.6851 5.89014 90.7729 5.59424C90.8638 5.29541 90.9912 5.03906 91.1553 4.8252C91.3223 4.61133 91.52 4.44727 91.7485 4.33301C91.98 4.21582 92.2378 4.15723 92.522 4.15723C92.8208 4.15723 93.0815 4.20996 93.3042 4.31543C93.5298 4.41797 93.7202 4.56885 93.8755 4.76807C94.0337 4.96436 94.1582 5.20166 94.249 5.47998C94.3398 5.7583 94.4028 6.07324 94.438 6.4248V6.8291C94.4058 7.17773 94.3428 7.49121 94.249 7.76953C94.1582 8.04785 94.0337 8.28516 93.8755 8.48145C93.7202 8.67773 93.5298 8.82861 93.3042 8.93408C93.0786 9.03662 92.8149 9.08789 92.5132 9.08789C92.2349 9.08789 91.98 9.02783 91.7485 8.90771C91.52 8.7876 91.3223 8.61914 91.1553 8.40234C90.9912 8.18555 90.8638 7.93066 90.7729 7.6377C90.6851 7.3418 90.6411 7.021 90.6411 6.67529ZM91.4585 6.58301V6.67529C91.4585 6.9126 91.4819 7.13525 91.5288 7.34326C91.5786 7.55127 91.6548 7.73438 91.7573 7.89258C91.8599 8.05078 91.9902 8.17529 92.1484 8.26611C92.3066 8.354 92.4956 8.39795 92.7153 8.39795C92.9849 8.39795 93.2061 8.34082 93.3789 8.22656C93.5547 8.1123 93.6953 7.96143 93.8008 7.77393C93.9062 7.58643 93.9883 7.38281 94.0469 7.16309V6.104C94.0117 5.94287 93.9604 5.7876 93.8931 5.63818C93.8286 5.48584 93.7437 5.35107 93.6382 5.23389C93.5356 5.11377 93.4082 5.01855 93.2559 4.94824C93.1064 4.87793 92.9292 4.84277 92.7241 4.84277C92.5015 4.84277 92.3096 4.88965 92.1484 4.9834C91.9902 5.07422 91.8599 5.2002 91.7573 5.36133C91.6548 5.51953 91.5786 5.7041 91.5288 5.91504C91.4819 6.12305 91.4585 6.3457 91.4585 6.58301ZM98.1514 2.25H98.9688V8.07715L98.8984 9H98.1514V2.25ZM102.181 6.58301V6.67529C102.181 7.021 102.14 7.3418 102.058 7.6377C101.976 7.93066 101.856 8.18555 101.698 8.40234C101.54 8.61914 101.346 8.7876 101.118 8.90771C100.889 9.02783 100.627 9.08789 100.331 9.08789C100.029 9.08789 99.7642 9.03662 99.5356 8.93408C99.3101 8.82861 99.1196 8.67773 98.9644 8.48145C98.8091 8.28516 98.6846 8.04785 98.5908 7.76953C98.5 7.49121 98.437 7.17773 98.4019 6.8291V6.4248C98.437 6.07324 98.5 5.7583 98.5908 5.47998C98.6846 5.20166 98.8091 4.96436 98.9644 4.76807C99.1196 4.56885 99.3101 4.41797 99.5356 4.31543C99.7612 4.20996 100.023 4.15723 100.322 4.15723C100.621 4.15723 100.886 4.21582 101.118 4.33301C101.349 4.44727 101.542 4.61133 101.698 4.8252C101.856 5.03906 101.976 5.29541 102.058 5.59424C102.14 5.89014 102.181 6.21973 102.181 6.58301ZM101.364 6.67529V6.58301C101.364 6.3457 101.342 6.12305 101.298 5.91504C101.254 5.7041 101.184 5.51953 101.087 5.36133C100.99 5.2002 100.863 5.07422 100.705 4.9834C100.546 4.88965 100.352 4.84277 100.12 4.84277C99.915 4.84277 99.7363 4.87793 99.584 4.94824C99.4346 5.01855 99.3071 5.11377 99.2017 5.23389C99.0962 5.35107 99.0098 5.48584 98.9424 5.63818C98.8779 5.7876 98.8296 5.94287 98.7974 6.104V7.16309C98.8442 7.36816 98.9204 7.56592 99.0259 7.75635C99.1343 7.94385 99.2778 8.09766 99.4565 8.21777C99.6382 8.33789 99.8623 8.39795 100.129 8.39795C100.349 8.39795 100.536 8.354 100.691 8.26611C100.85 8.17529 100.977 8.05078 101.074 7.89258C101.173 7.73438 101.247 7.55127 101.293 7.34326C101.34 7.13525 101.364 6.9126 101.364 6.67529ZM104.493 8.50781L105.815 4.24512H106.686L104.778 9.73389C104.734 9.85107 104.676 9.97705 104.603 10.1118C104.532 10.2495 104.441 10.3799 104.33 10.5029C104.219 10.626 104.084 10.7256 103.926 10.8018C103.771 10.8809 103.584 10.9204 103.368 10.9204C103.303 10.9204 103.221 10.9116 103.122 10.894C103.022 10.8765 102.952 10.8618 102.911 10.8501L102.906 10.1909C102.93 10.1938 102.966 10.1968 103.016 10.1997C103.069 10.2056 103.105 10.2085 103.126 10.2085C103.311 10.2085 103.467 10.1836 103.596 10.1338C103.725 10.0869 103.833 10.0063 103.921 9.89209C104.012 9.78076 104.09 9.62695 104.154 9.43066L104.493 8.50781ZM103.521 4.24512L104.756 7.93652L104.967 8.79346L104.383 9.09229L102.634 4.24512H103.521Z"
      fill="#3A3A3A"
    />
  </svg>
)

type ContentProps = {
  displayHeader?: boolean
}

export const Content = styled.div<ContentProps>`
  width: 100%;
  min-height: ${(props) =>
    props.displayHeader ? "calc(100vh - 73px - 73px)" : "calc(100vh - 73px)"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17px;

  background-color: var(--white);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media only screen and (max-width: ${mobile}px) {
    min-height: ${(props) =>
      props.displayHeader ? "calc(100vh - 63px - 63px)" : "calc(100vh - 63px)"};
  }
`

export const Form = styled.form`
  max-width: 469px;
  width: 100%;
  min-height: 520px;
  padding: 30px 25px;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  font-size: 1rem;

  & > * + * {
    margin-top: 0.842em;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: 421px;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
    height: 28.2em;
    border-radius: 0.675em;
  }
`

export const Submit = styled.button.attrs({ type: "submit" })`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: var(--blue);
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: var(--white);
  border: none;
  outline: none;
  width: 100%;
  height: 49px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  @media only screen and (max-width: 370px) {
    font-size: 4.325vw;
    height: 3.062em;
    border-radius: 0.624em;
  }
`

export const Footer = styled.div`
  background: var(--white);
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--paddings);
  height: 73px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: ${mobile}px) {
    height: 63px;
  }
`
