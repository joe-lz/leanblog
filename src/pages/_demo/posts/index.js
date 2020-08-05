import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";

import styles from "./index.module.scss";
import Layout from "src/components/_demo/Layout";

function MyComponent() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <div className={styles.block}></div>
          </div>
          <div className={styles.content}>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
          </div>
          <div className={styles.userinfo}>
            <div className={styles.block}></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyComponent;
