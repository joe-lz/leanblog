import Head from "next/head";

import styles from "./index.module.scss";
import Nav from "src/components/_admin/Nav";

function AdminHome() {
  return (
    <div className="container">
      <Head>
        <title>管理后台</title>
      </Head>
      <Nav />
      <h1 className={styles.title}>mskcjdscmj</h1>
    </div>
  );
}

export default AdminHome;
