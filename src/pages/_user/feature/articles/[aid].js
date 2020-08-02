import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Tree, Button, notification, Input, Modal } from "antd";
import { useRouter } from "next/router";
import { Remarkable } from "remarkable";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

const md = new Remarkable();
const { TextArea } = Input;

function AdminHome() {
  const router = useRouter();
  const { aid } = router.query;

  const [articleItem, setarticleItem] = useState(null);

  const [articleVal, setarticleVal] = useState(`# Remarkable
> Experience real-time editing with Remarkable!

***

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
`);

  const updateArticle = () => {
    console.log(articleItem);
    if (articleItem) {
      articleItem.set("articleVal", articleVal);
      articleItem.save().then(
        (res) => {
          notification.success({
            message: "保存成功",
            // description: "请输入用户名、密码",
          });
        },
        (error) => {
          // 异常处理
        }
      );
    }
  };
  const getArticleById = () => {
    const query = new AV.Query("Articles");
    if (aid) {
      query
        .get(aid)
        .then((res) => {
          try {
            setarticleItem(res);
          } catch (error) {
            console.log(error);
          }
          if (res.attributes.articleVal) {
            setarticleVal(res.attributes.articleVal);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (router && router.query) {
      getArticleById();
    }
  }, [router]);
  return (
    <Layout hideSidebar>
      <div className={styles.articles_detail}>
        <div className={styles.articles_detail_left}>
          <TextArea
            className={styles.articles_detail_left_editor}
            value={articleVal}
            onChange={(e) => {
              setarticleVal(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div className={styles.articles_detail_right}>
          <article
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: md.render(articleVal),
            }}
          ></article>
        </div>
        <div className={styles.articles_detail_bottom}>
          <Button
            size="large"
            onClick={() => {
              updateArticle();
            }}
          >
            保存
          </Button>
          <Button type="primary" size="large" onClick={() => {}}>
            保存并上线
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default AdminHome;
