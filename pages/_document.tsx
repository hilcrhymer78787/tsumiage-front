import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" sizes="32x32" href="/icon-32x32.png" />

          {/* PWA Manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Apple */}
          <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="tsumiage" />

          {/* Theme */}
          <meta name="theme-color" content="#000" />
          <meta name="description" content="this is tsumiage" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
