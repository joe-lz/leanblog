import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";

import styles from "./index.module.scss";
import Layout from "src/components/_demo/Layout";

function MyComponent() {
  return (
    <Layout>
      <div className={styles.container}>home</div>
    </Layout>
  );
}

export default MyComponent;
