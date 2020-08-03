import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Tree, Button, notification, Input, Modal } from "antd";
import { useRouter } from "next/router";
import { Remarkable } from "remarkable";
import hljs from "highlight.js";
import { getArticleById, updateArticle } from "src/service/article";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

const { TextArea } = Input;

function AdminHome() {
  // const md = new Remarkable();
  var md = new Remarkable({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ""; // use external default escaping
    },
  });
  const router = useRouter();
  const { aid } = router.query;

  const [articleItem, setarticleItem] = useState(null);

  const [articleTitle, setarticleTitle] = useState("");
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (router && router.query) {
      if (aid) {
        async function fetchData() {
          // 获取文章
          const res = await getArticleById({ id: aid });
          try {
            setarticleItem(res);
            setarticleTitle(res.attributes.title);
          } catch (error) {
            console.log(error);
          }
          if (res.attributes.articleVal) {
            setarticleVal(res.attributes.articleVal);
          }
        }
        fetchData();
      }
    }
  }, [router]);

  return (
    <Layout hideSidebar>
      {articleItem && (
        <div className={styles.articles_detail}>
          <div className={styles.articles_detail_title}>
            <div className={styles.articles_detail_title_body}>
              <p className={styles.articles_detail_title_label}>标题：</p>
              <input
                className={styles.articles_detail_title_input}
                placeholder="请输入文章标题"
                value={articleTitle}
                onChange={(e) => {
                  setarticleTitle(e.target.value);
                }}
              />
              <div className={styles.articles_detail_operation}>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  onClick={async () => {
                    await updateArticle({
                      articleItem,
                      params: {
                        articleVal,
                        title: articleTitle,
                      },
                    });
                    notification.success({
                      message: "保存成功",
                      // description: "请输入用户名、密码",
                    });
                  }}
                >
                  保存
                </Button>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  danger
                  onClick={() => {}}
                >
                  保存并上线
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.articles_detail_body}>
            <div className={styles.articles_detail_left}>
              <TextArea
                autoSize
                className={styles.articles_detail_left_editor}
                value={articleVal}
                onChange={(e) => {
                  setarticleVal(e.target.value);
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
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminHome;
