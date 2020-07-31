import Document, { Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8" />
          <meta name="keywords" content="" />
          <meta name="description" content="" />
          <meta name="renderer" content="webkit" />
          <meta name="author" content="jeodiong@hotmail.com" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, viewport-fit=cover, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
          />
          <meta name="format-detection" content="email=no" />
          <meta name="format-detection" content="address=no" />
          <meta name="format-detection" content="telephone=yes" />
          <meta http-equiv="Cache-Control" content="no-siteapp" />
          <meta http-equiv="Window-target" content="_top" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
