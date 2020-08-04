import Head from "next/head";
import AV from "leancloud-storage";

import "antd/dist/antd.css";
import "../styles/global.scss";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";

AV.init({
  appId: process.env.YOUR_LEANCLOUD_APPID,
  appKey: process.env.YOUR_LEANCLOUD_APPKEY,
  serverURL: process.env.YOUR_LEANCLOUD_SERVER_URL,
});

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>leanblog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
