import { Html, Head, Main, NextScript } from 'next/document';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';

import { GOOGLE_ANALYTICS_ID } from 'lib/constants';

export default function Document() {
  return (
    <Html lang="en">
        <DefaultSeo {...SEO} />
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}/>
        <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}