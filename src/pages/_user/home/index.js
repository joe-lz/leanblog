import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

function AdminHome() {
  return (
    <Layout>
      <div className={styles.block}>home</div>
    </Layout>
  );
}

export default AdminHome;
