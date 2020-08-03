import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Tree, Button, notification, Input, Modal } from "antd";
import {
  PlusOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";
import defaultMenu, { handleformatData } from "src/lib/defaultMenu";

function AdminHome() {
  const [curMenuObj, setcurMenuObj] = useState(null);
  const [curMenu, setcurMenu] = useState([]);
  const [level1Show, setlevel1Show] = useState(false);
  const [level1Title, setlevel1Title] = useState("");
  const [selectedMenu, setselectedMenu] = useState(null);
  const [updateShow, setupdateShow] = useState(false);

  const getMenuList = () => {
    const query = new AV.Query("CMS_Menus");
    query.descending("createdAt");
    query
      .first()
      .then((res) => {
        if (res) {
          setcurMenu(res.attributes.value);
          setcurMenuObj(res);
        } else {
          // 创建默认菜单
          const menusObject = new AV.Object("CMS_Menus");
          menusObject.set("value", defaultMenu);
          // 将对象保存到云端
          menusObject.save().then(
            (todo) => {
              console.log(todo);
              // 成功保存之后，执行其他逻辑
              setcurMenu(defaultMenu);
              setcurMenuObj(todo);
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
  };

  const onSelect = (select, info) => {
    const obj = {
      title: info.node.title,
      key: info.node.key,
    };
    setselectedMenu(obj);
    setupdateShow(true);
  };

  const updateFunction = (newValue) => {
    if (curMenuObj) {
      curMenuObj.set("value", newValue);
      curMenuObj.save().then(() => {
        setupdateShow(false);
        getMenuList();
        notification.success({
          message: "更新成功",
          // description: "请输入用户名、密码",
        });
      });
    }
  };

  const onDrop = (info) => {
    const result = handleformatData(info, curMenu);
    updateFunction(result);
  };

  const createLevel1 = () => {
    if (!level1Title) {
      notification.error({
        message: "请输入标题",
        // description: "请输入用户名、密码",
      });
      return;
    }
    const newObj = {
      title: level1Title,
      key: uuidv4(),
    };
    curMenu.push(newObj);
    curMenuObj.set("value", curMenu);
    // 将对象保存到云端
    curMenuObj.save().then(
      () => {
        setlevel1Show(false);
        getMenuList();
        notification.success({
          message: "更新成功",
          // description: "请输入用户名、密码",
        });
      },
      (error) => {
        // 异常处理
      }
    );
  };

  const handleUpdate = () => {
    const newcurMenu = curMenu.map((obj1) => {
      if (obj1.key === selectedMenu.key) {
        obj1.title = selectedMenu.title;
      }

      if (obj1.children) {
        obj1.children.map((obj2) => {
          if (obj2.key === selectedMenu.key) {
            obj2.title = selectedMenu.title;
          }
          return obj2;
        });
      }
      return obj1;
    });
    updateFunction(newcurMenu);
  };

  useEffect(() => {
    // 获取菜单
    getMenuList();
  }, []);

  return (
    <Layout>
      <p className="_admin_body_section_title">自定义菜单</p>
      <div className={styles.block} style={{ padding: 30 }}>
        <div className={styles.block_waring}>
          <InfoCircleOutlined
            style={{ color: "RGBA(53, 90, 207, 1.00)", fontSize: 20 }}
          />
          <p>拖拽目录进行排序，和层级管理</p>
        </div>
        <Tree
          showLine
          // switcherIcon={<DownOutlined />}
          defaultExpandAll
          onSelect={onSelect}
          onDrop={onDrop}
          draggable
          // blockNode
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
          onClick={() => {
            setlevel1Show(true);
          }}
        >
          一级目录
        </Button>
        {/* <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={14}
          style={{ marginRight: 15 }}
        >
          二级目录
        </Button> */}
      </div>
      <Modal
        title="一级目录"
        visible={level1Show}
        onCancel={() => {
          setlevel1Show(false);
        }}
        onOk={() => {
          createLevel1();
        }}
      >
        <Input
          placeholder="标题"
          onChange={(e) => {
            setlevel1Title(e.target.value);
          }}
        />
      </Modal>
      <Modal
        title="更新"
        visible={updateShow}
        onCancel={() => {
          setupdateShow(false);
        }}
        onOk={() => {
          handleUpdate();
        }}
        okText="创建"
        cancelText="取消"
      >
        <Input
          placeholder="标题"
          value={selectedMenu ? selectedMenu.title : ""}
          onChange={(e) => {
            setselectedMenu({
              title: e.target.value,
              key: selectedMenu.key,
            });
          }}
        />
      </Modal>
    </Layout>
  );
}

export default AdminHome;
