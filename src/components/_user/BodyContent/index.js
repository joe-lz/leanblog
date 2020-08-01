import Head from "next/head";
import Link from "next/link";
import Particles from "react-particles-js";
import React, { useState, useEffect } from "react";
import AV from "leancloud-storage";
import { Spin, Alert, notification } from "antd";

import styles from "./index.module.scss";
import leanerrors from "src/lib/leancloud_error_code.json";
import Sidebar from "../Sidebar";

function Components(props) {
  const [isAuthed, setisAuthed] = useState(null);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    // 获取我的授权状态
    const query = new AV.Query("UserInfo");
    const curUser = AV.User.current();
    query.equalTo("user", curUser);
    query
      .first()
      .then((res) => {
        if (res) {
          const userinfo = JSON.parse(JSON.stringify(res));
          props.onGetUserInfo && props.onGetUserInfo(userinfo);
          if (userinfo.isAuthed) {
            setisAuthed(true);
          } else {
            setisAuthed(false);
          }
          if (userinfo.isAdmin) {
            setisAdmin(true);
          }
        } else {
          setisAuthed(false);
          // 创建userinfo
          const userinfo = new AV.Object("UserInfo");
          userinfo.set("user", curUser);
          userinfo.set("isAuthed", false); // 是否授权 默认：false
          userinfo.set("isAdmin", false); // 是否管理员 默认：false
          // 将对象保存到云端
          userinfo.save().then(
            (todo) => {
              // 成功保存之后，执行其他逻辑
            },
            (error) => {
              // 异常处理
            }
          );
        }
      })
      .catch((err) => {
        setisAuthed(false);
        console.log({ err });
      });
  }, []);

  return (
    <div className={styles.container}>
      {isAuthed === true && (
        <>
          <Sidebar></Sidebar>
          <div className={styles.content}>{props.children}</div>
        </>
      )}
      {isAuthed === false && (
        <>
          <div className={styles.notAuthed}>
            <i className="iconfont icon-yonghushouquan"></i>
            <p>当前用户没有授权哦</p>
            <p>快快联系管理员，开通权限吧～</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Components;
