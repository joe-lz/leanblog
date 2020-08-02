import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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

function Components(props) {
  const curUser = AV.User.current();
  const [userinfo, setuserinfo] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>管理后台</title>
      </Head>
      <Nav type="login" curUser={curUser} userinfo={userinfo} />
      {!curUser && <Login />}
      {curUser && (
        <BodyContent
          onGetUserInfo={(e) => {
            setuserinfo(e);
            props.onGetUserInfo && props.onGetUserInfo(e);
          }}
          hideSidebar={props.hideSidebar}
        >
          {props.children}
        </BodyContent>
      )}
    </div>
  );
}

export default Components;
