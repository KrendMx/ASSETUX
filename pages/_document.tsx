import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

import type { DocumentContext } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ]
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/icons/icon.png" type="image/png" />
          <link
            rel="preload"
            as="font"
            href="/fonts/SFProDisplay-Medium.woff2"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/SFProDisplay-Regular.woff2"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/SFProDisplay-Semibold.woff2"
            crossOrigin="anonymous"
            type="font/woff2"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
