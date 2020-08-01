import Head from "next/head";
import AV from "leancloud-storage";

import "antd/dist/antd.css";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  AV.init({
    appId: process.env.YOUR_LEANCLOUD_APPID,
    appKey: process.env.YOUR_LEANCLOUD_APPKEY,
    serverURL: process.env.YOUR_LEANCLOUD_SERVER_URL,
  });

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
