import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Tree, Button, notification, Input, Modal } from "antd";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";
import ArticleItem from "src/components/_user/ArticleItem";

function AdminHome() {
  const [createModalShow, setcreateModalShow] = useState(false);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [articleLists, setarticleLists] = useState([]);

  const handleCreate = () => {
    if (title && author) {
      const articles = new AV.Object("Articles");
      articles.set("title", title);
      articles.set("author", author);
      articles.set("user", AV.User.current());
      // 将对象保存到云端
      articles.save().then(
        (res) => {
          console.log(res);
          setcreateModalShow(false);
        },
        (error) => {
          // 异常处理
        }
      );
    }
  };

  // 获取文章列表
  const getArticleList = () => {
    const query = new AV.Query("Articles");
    query.descending("createdAt");
    query.limit(50);
    query
      .find()
      .then((res) => {
        setarticleLists(res)
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <Layout>
      <p className="_admin_body_section_title">文章管理</p>
      <div className={styles.articles}>
        <div
          className={styles.articles_add}
          onClick={() => {
            setcreateModalShow(true);
          }}
        >
          <div className={styles.articles_add_content}>
            <p className={styles.icon}>+</p>
            <p>新的创作</p>
          </div>
        </div>
        {articleLists.map((obj) => {
          return <ArticleItem key={obj.id} item={obj}/>;
        })}
        <Modal
          title="创建文章"
          width={400}
          visible={createModalShow}
          onCancel={() => {
            setcreateModalShow(false);
          }}
          onOk={() => {
            handleCreate();
          }}
          okText="创建"
          cancelText="取消"
        >
          <Input
            style={{ margin: "15px 0" }}
            placeholder="文章标题"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <Input
            style={{ margin: "15px 0" }}
            placeholder="作者名称"
            onChange={(e) => {
              setauthor(e.target.value);
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminHome;
