import Head from "next/head";
import Link from "next/link";
import Particles from "react-particles-js";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import AV from "leancloud-storage";
import { Spin, Alert, notification } from "antd";

import styles from "./index.module.scss";
import leanerrors from "src/lib/leancloud_error_code.json";

function Components(props) {
  const [isFlipped, setisFlipped] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_item}>
          <div className={styles.sidebar_item_level1}>
            <i className="iconfont icon-home"></i>首页
          </div>
        </div>
        <div className={styles.sidebar_item}>
          <div className={styles.sidebar_item_level1}>
            <i className="iconfont icon-gongnengfuwu"></i>
            功能
          </div>
          <div className={styles.sidebar_item_placeholder}></div>
          <div className={styles.sidebar_item_level2}>自定义菜单</div>
          <div className={styles.sidebar_item_level2}>文章管理</div>
          <div className={styles.sidebar_item_level2}>素材管理</div>
        </div>
        <div className={styles.sidebar_item}>
          <div className={styles.sidebar_item_level1}>
            <i className="iconfont icon-shezhi"></i>设置
          </div>
          <div className={styles.sidebar_item_placeholder}></div>
          <div className={styles.sidebar_item_level2}>用户管理</div>
          <div className={styles.sidebar_item_level2}>消息管理</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
      </div>
    </div>
  );
}

export default Components;
