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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-light-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-light-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-light.png" />
        
        <link rel="icon" href="/favicon-light-16x16.png" sizes="16x16" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-light-32x32.png" sizes="32x32" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-light-16x16.png" sizes="16x16" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-light-32x32.png" sizes="32x32" media="(prefers-color-scheme: dark)" />
        
        <link rel="apple-touch-icon" href="/apple-touch-icon-light.png" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-light.png" media="(prefers-color-scheme: dark)" />
        
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
                    var icons = document.querySelectorAll('link[rel*="icon"]:not([media])');
                    icons.forEach(function(icon) {
                      var href = icon.getAttribute('href');
                      if (href && (href.includes('favicon-16x16') || href.includes('favicon-32x32') || href.includes('favicon-light') || href.includes('favicon-dark'))) {
                        // Always use light favicon as requested
                        icon.setAttribute('href', '/favicon-light-' + (href.includes('16x16') ? '16x16' : '32x32') + '.png');
                      }
                    });
                    
                    var touchIcon = document.querySelector('link[rel="apple-touch-icon"]:not([media])');
                    if (touchIcon) {
                      // Always use light touch icon as requested
                      touchIcon.setAttribute('href', '/apple-touch-icon-light.png');
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