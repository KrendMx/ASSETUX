import { env } from "./src/lib/env/server.mjs"

const enablePWA = env.ENABLE_PWA == "true"

const runtimeCaching = [
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-font-assets",
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-image-assets",
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\/_next\/image\?url=.+$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "next-image",
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-js-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-style-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: ({ url }) => {
      const pathname = url.pathname
      const matches = /\/_next\/data\/.+\/.+\.json$/i.test(pathname)

      if (!matches) {
        return false
      }

      if (
        pathname.includes("profile") ||
        pathname.includes("bill") ||
        pathname.includes("history") ||
        pathname.includes("payment")
      ) {
        return false
      }

      return true
    },
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "next-data",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: ({ url }) => {
      const pathname = url.pathname
      const matches = /\/_next\/data\/.+\/.+\.json$/i.test(pathname)

      if (!matches) {
        return false
      }

      return (
        pathname.includes("profile") ||
        pathname.includes("bill") ||
        pathname.includes("history") ||
        pathname.includes("payment")
      )
    },
    handler: "NetworkOnly",
    method: "GET",
    options: {
      cacheName: "next-data-commerce"
    }
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "static-data-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: ({ url }) => {
      const pathname = url.pathname
      return (
        pathname.startsWith("/ecommerce") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/websocket")
      )
    },
    handler: "NetworkOnly",
    method: "GET",
    options: {
      cacheName: "api"
    }
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin
      return isSameOrigin
    },
    handler: "NetworkFirst",
    options: {
      cacheName: "others",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      },
      networkTimeoutSeconds: 10
    }
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin
      return !isSameOrigin
    },
    handler: "NetworkFirst",
    options: {
      cacheName: "cross-origin",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 60 // 1 hour
      },
      networkTimeoutSeconds: 10
    }
  }
]

export const pwa = {
  dest: "public",
  disable: !enablePWA,
  buildExcludes: [
    /chunks\/pages\/profile\/(?!login)/,
    /chunks\/pages\/profile-.*$/
  ],
  runtimeCaching
}
