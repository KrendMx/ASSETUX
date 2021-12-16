## App structure

```
Wrapper (provide the redux store)
└── MyApp
    ├── Header
    │
    └── ContentManager (manage whether to hide page content and show mobile menu)
        └── Wrapper (hideable)
        │   └── Component
        ├── Footer (hideable)
        └── Menu
```

## Home page structure

```
Component
└── Container
    ├── FormGroup
    │   ├── Form
    │   └── Info
    ├── CryptoSlide
    ├── CryptoExplorer
    ├── NewsRoom
    └── AboutUs
        ├── AboutContainer
        └── ImageContainer
```

## Font adaptivity

* Main font-sizes are: 19px for desktop and 15px for mobile
* The ContentManager component sets font-sizes for various screen sizes
* To make a component adaptable:
  * Ensure that there's no parent component that overrides font-size with px or em (only rem)
  * Wrap the styled component in AdaptiveFont and provide mobileFactor and tabletFactor (if not, fonts'll be very small)
  * Inside the wrapped component only use ems (e.g. for title font-size is 1.2em and for text below font-size is 1em)
