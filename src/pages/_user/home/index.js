import Head from "next/head";

import styles from "./index.module.scss";
import Nav from "src/components/_user/Nav";
import Login from "src/components/_user/Login";

function AdminHome() {
  return (
    <div className="container">
      <Head>
        <title>管理后台</title>
      </Head>
      <Nav type="login" />
      {/* <div style={{ height: 80 }}></div> */}
      <Login/>
    </div>
  );
}

export default AdminHome;
