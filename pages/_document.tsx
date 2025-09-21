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
        <link rel="icon" type="image/svg+xml" href="/jd-monogram-luxury-dark.svg" />
        <link rel="icon" type="image/png" sizes="512x512" href="/jd-monogram-luxury-dark-512.png" />
        <link rel="apple-touch-icon" href="/jd-monogram-luxury-dark-512.png" />

        <link rel="icon" href="/jd-monogram-luxury-light.svg" type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/jd-monogram-luxury-light-512.png" sizes="512x512" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/jd-monogram-luxury-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/jd-monogram-luxury-dark-512.png" sizes="512x512" media="(prefers-color-scheme: dark)" />

        <link rel="apple-touch-icon" href="/jd-monogram-luxury-light-512.png" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/jd-monogram-luxury-dark-512.png" media="(prefers-color-scheme: dark)" />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Dynamic favicon switching
                  var updateFavicons = function(isDark) {
                    var theme = isDark ? 'dark' : 'light';
                    var suffix = isDark ? 'dark' : 'light';

                    // Update SVG icon
                    var svgIcon = document.querySelector('link[rel="icon"][type="image/svg+xml"]:not([media])');
                    if (svgIcon) {
                      svgIcon.setAttribute('href', '/jd-monogram-luxury-' + suffix + '.svg');
                    }

                    // Update PNG icon
                    var pngIcon = document.querySelector('link[rel="icon"][type="image/png"]:not([media])');
                    if (pngIcon) {
                      pngIcon.setAttribute('href', '/jd-monogram-luxury-' + suffix + '-512.png');
                    }

                    // Update Apple touch icon
                    var touchIcon = document.querySelector('link[rel="apple-touch-icon"]:not([media])');
                    if (touchIcon) {
                      touchIcon.setAttribute('href', '/jd-monogram-luxury-' + suffix + '-512.png');
                    }
                  };
                  
                  updateFavicons(theme === 'dark');
                  
                  // Listen for theme changes
                  window.addEventListener('storage', function(e) {
                    if (e.key === 'theme') {
                      updateFavicons(e.newValue === 'dark');
                    }
                  });
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}