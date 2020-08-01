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

  return (
    <div className={styles.container}>
      <Head>
        <title>管理后台</title>
      </Head>
      <Nav type="login" curUser={curUser} />
      {!curUser && <Login />}
      {curUser && (
        <BodyContent onGetUserInfo={props.onGetUserInfo}>
          {props.children}
        </BodyContent>
      )}
    </div>
  );
}

export default Components;
