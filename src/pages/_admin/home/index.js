import Head from "next/head";
import styles from "./index.module.scss";

function About() {
  return (
    <div className="container">
      <Head>
        <title>admin</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <h1 className={styles.title}>mskcjdscmj</h1>
    </div>
  );
}

export default About;
