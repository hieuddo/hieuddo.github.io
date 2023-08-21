import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../lib/theme';
import config from '../config.json';

export default class Document extends NextDocument {
  render() {
    const trackingId = config.trackingId;

    return (
      <Html lang="en">
        <Head>
          {trackingId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${trackingId}');
                `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
