import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Tree, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";
import defaultMenu from "src/lib/defaultMenu";

function AdminHome() {
  const [curMenu, setcurMenu] = useState([]);

  useEffect(() => {
    // 获取菜单
    const query = new AV.Query("Menus");
    query.descending("createdAt");
    query
      .first()
      .then((res) => {
        if (res) {
          setcurMenu(res.attributes.value);
        } else {
          // 创建默认菜单
          const menusObject = new AV.Object("Menus");
          menusObject.set("value", defaultMenu);
          // 将对象保存到云端
          menusObject.save().then(
            (todo) => {
              setcurMenu(defaultMenu);
              // 成功保存之后，执行其他逻辑
            },
            (error) => {
              // 异常处理
            }
          );
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <Layout>
      <p className="_admin_body_section_title">自定义菜单</p>

      <div className={styles.block} style={{ padding: 30 }}>
        <Tree
          defaultExpandAll
          onSelect={onSelect}
          draggable
          blockNode
          treeData={curMenu}
        />
      </div>
      <div>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={14}
          style={{ marginRight: 15 }}
        >
          一级目录
        </Button>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={14}
          style={{ marginRight: 15 }}
        >
          二级目录
        </Button>
      </div>
    </Layout>
  );
}

export default AdminHome;
