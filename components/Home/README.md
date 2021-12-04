Пока я не придумал, как красиво реализовать адаптивные шрифты, используем следующие
обычные media queries для каждого компонента:

  // Адаптация шрифтов под планшеты
  @media only screen and (max-width: 1340px) {
    font-size: сколько-тоem
  }

  // Адаптация шрифтов под телефон
  @media only screen and (max-width: 495px) {
    font-size: сколько-тоem
  }

Референс подобного поведения можно увидеть в AboutUs/index.tsx и NewsRoom/Element.tsx