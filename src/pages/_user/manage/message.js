import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";

import styles from "./index.module.scss";
const Nav = dynamic(() => import("src/components/_user/Nav"), {
  ssr: false,
});
const Login = dynamic(() => import("src/components/_user/Login"), {
  ssr: false,
});
const BodyContent = dynamic(() => import("src/components/_user/BodyContent"), {
  ssr: false,
});

function AdminHome() {
  const curUser = AV.User.current();
  let content = null;
  return (
    <div className={styles.container}>
      <Head>
        <title>用户列表--管理后台</title>
      </Head>
      <Nav type="login" curUser={curUser} />
      {!curUser && <Login />}
      {curUser && (
        <BodyContent>
          <p>message</p>
        </BodyContent>
      )}
    </div>
  );
}

export default AdminHome;
