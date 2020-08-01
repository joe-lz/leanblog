import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Table, Tag, Space, Switch, notification } from "antd";
import React, { useState, useEffect } from "react";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

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

  const updateUserInfo = ({ userinfo, params }) => {
    Object.keys(params).map((keyname) => {
      userinfo.set(keyname, params[keyname]);
      return keyname;
    });
    userinfo.save().then(
      (todo) => {
        // 成功保存之后，执行其他逻辑
        notification.success({
          message: "操作成功",
          description: "权限更新成功～",
        });
      },
      (error) => {
        // 异常处理
        notification.error({
          message: "操作失败",
          description: "权限更新失败，请稍后重试～",
        });
      }
    );
  };
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (res, item) => {
        return <div>{item.attributes.user.attributes.username}</div>;
      },
    },
    {
      title: "普通权限",
      dataIndex: "isAuthed",
      key: "isAuthed",
      render: (res, item) => (
        <div>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={item.attributes.isAuthed}
            onChange={(e) => {
              updateUserInfo({
                userinfo: item,
                params: {
                  isAuthed: e,
                },
              });
            }}
          />
        </div>
      ),
    },
    {
      title: "管理员权限",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (res, item) => (
        <div>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={item.attributes.isAdmin}
            onChange={(e) => {
              updateUserInfo({
                userinfo: item,
                params: {
                  isAdmin: e,
                },
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout
      onGetUserInfo={(e) => {
        setcurUserInfo(e);
      }}
    >
      {curUserInfo && curUserInfo.isAdmin ? (
        <div className={styles.block}>
          <Table
            columns={columns}
            dataSource={userlist}
            rowKey={(record) => record.id}
            style={{width: '100%'}}
          />
        </div>
      ) : (
        <div className={styles.block}>暂无权限，请联系管理员开通～</div>
      )}
    </Layout>
  );
}

export default AdminHome;
