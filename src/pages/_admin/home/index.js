import Head from "next/head";
import styles from "./index.module.scss";

function About() {
  return (
    <div className="container">
      <Head>
        <title>管理后台</title>
      </Head>
      <h1 className={styles.title}>mskcjdscmj</h1>
    </div>
  );
}

export default About;
