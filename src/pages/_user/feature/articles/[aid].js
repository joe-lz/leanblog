import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Tree, Button, notification, Input, Modal } from "antd";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

function AdminHome() {
  const router = useRouter();
  const { aid } = router.query;

  useEffect(() => {}, []);

  return (
    <Layout hideSidebar>
      <div className={styles.articles_detail}></div>
    </Layout>
  );
}

export default AdminHome;
