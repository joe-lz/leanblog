import Head from "next/head";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Head>
        <title>leanblog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
