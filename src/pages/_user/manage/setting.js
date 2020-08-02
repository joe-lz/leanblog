import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Table, Tag, Space, Switch, notification, Radio, Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";
import priorityArr from "src/lib/priority";

function AdminHome(props) {
  const [userlist, setuserlist] = useState([]);
  const [curUserInfo, setcurUserInfo] = useState(null);

  useEffect(() => {
    // 获取我的授权状态
    const query = new AV.Query("UserInfo");
    // query.equalTo("user", curUser);
    query.include("user");
    query.limit(50);
    query.descending("createdAt");
    query
      .find()
      .then((res) => {
        setuserlist(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <Layout
      onGetUserInfo={(e) => {
        setcurUserInfo(e);
      }}
    >
      <p className="_admin_body_section_title">基本设置</p>
      {curUserInfo && curUserInfo.priority === 100 ? (
        <div className={styles.block}>
          
        </div>
      ) : (
        <div className={styles.block}>暂无权限，请联系管理员开通～</div>
      )}
    </Layout>
  );
}

export default AdminHome;
