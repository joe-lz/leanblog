import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Particles from "react-particles-js";
import React, { useState } from "react";
import AV from "leancloud-storage";
import { Spin, Alert, notification } from "antd";

import styles from "./index.module.scss";
import leanerrors from "src/lib/leancloud_error_code.json";
import Item2 from "./Item2";

function Components(props) {
  const [isFlipped, setisFlipped] = useState(false);
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_item}>
        <Link href="/_user/home">
          <div
            className={
              !router.pathname.includes("/_user/home")
                ? styles.sidebar_item_level1
                : styles.sidebar_item_level1_active
            }
          >
            <i className="iconfont icon-home"></i>首页
          </div>
        </Link>
      </div>
      <div className={styles.sidebar_item}>
        <div
          className={
            !router.pathname.includes("/_user/feature")
              ? styles.sidebar_item_level1
              : styles.sidebar_item_level1_active
          }
        >
          <i className="iconfont icon-gongneng"></i>
          功能
        </div>
        <div className={styles.sidebar_item_placeholder}></div>
        <Item2 path="/_user/feature/menus" title="自定义菜单" />
        <Item2 path="/_user/feature/articles" title="文章管理" />
        <Item2 path="/_user/feature/assets" title="素材管理" />
      </div>
      <div className={styles.sidebar_item}>
        <Link href="/_user/home">
          <div
            className={
              !router.pathname.includes("/_user/home")
                ? styles.sidebar_item_level1
                : styles.sidebar_item_level1_active
            }
          >
            <i className="iconfont icon-message"></i>消息管理
          </div>
        </Link>
      </div>
      {props.userinfo && props.userinfo.priority === 100 && (
        <div className={styles.sidebar_item}>
          <div
            className={
              !router.pathname.includes("/_user/manage")
                ? styles.sidebar_item_level1
                : styles.sidebar_item_level1_active
            }
          >
            <i className="iconfont icon-shezhi"></i>设置
          </div>
          <div className={styles.sidebar_item_placeholder}></div>
          <Item2 path="/_user/manage/userlist" title="用户管理" />
          <Item2 path="/_user/manage/message" title="基本设置" />
        </div>
      )}
    </div>
  );
}

export default Components;
