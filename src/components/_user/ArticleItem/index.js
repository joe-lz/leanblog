import Head from "next/head";
import Link from "next/link";
import AV from "leancloud-storage";
import dayjs from "dayjs";
import {
  FileImageOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Tree, Button, notification, Input, Modal, message } from "antd";

import styles from "./index.module.scss";
import Upload from "src/components/_user/Upload";
import { getArticleById, updateArticle } from "src/service/article";
import articleStatus from "src/lib/articleStatus";

function Components(props) {
  const [modalShow, setmodalShow] = useState(false);
  const [posterUrl, setposterUrl] = useState("");

  useEffect(() => {}, []);

  let curStatus = null;
  articleStatus.map((obj) => {
    if (obj.value === props.item.attributes.status) {
      curStatus = obj;
    }
    return obj;
  });
  return (
    <div className={styles.articles_item}>
      <div
        className={styles.articles_item_poster}
        style={{ backgroundImage: `url(${props.item.attributes.poster})` }}
      >
        {!props.item.attributes.poster && (
          <FileImageOutlined
            className={styles.articles_item_poster_placeholder}
          />
        )}
        <div className={styles.articles_item_operation}>
          <div
            className={styles.articles_item_operation_btn}
            onClick={() => {
              setmodalShow(true);
            }}
          >
            上传封面
          </div>
          {/* <a
            className={styles.articles_item_operation_btn}
            target="_blank"
            href={`/_user/feature/articles/${props.item.id}`}
          >
            编辑
          </a> */}
        </div>
        <div className={styles.articles_item_operation2}>
          {curStatus &&
            curStatus.btns.map((obj) => {
              return (
                <div
                  className={
                    obj.status === 5
                      ? styles.articles_item_operation_btn_danger
                      : styles.articles_item_operation_btn
                  }
                  key={obj.label}
                  onClick={async () => {
                    let comfirmText = "";
                    if (obj.status === 5) {
                      comfirmText = `确认删除文章【${props.item.attributes.title}】吗？\n删除后可在【回收站】栏目恢复。`;
                    }
                    if (obj.status === 4) {
                      comfirmText = `确认下线文章【${props.item.attributes.title}】吗？`;
                    }
                    if (obj.status === 3) {
                      console.log("cd");
                      comfirmText = `确认上线文章【${props.item.attributes.title}】吗？`;
                    }
                    if (confirm(comfirmText)) {
                      await updateArticle({
                        articleItem: props.item,
                        params: {
                          status: obj.status,
                        },
                      });
                      props.onChange && (await props.onChange());
                    }
                  }}
                >
                  {obj.label}
                </div>
              );
            })}
        </div>
      </div>
      <a
        className={styles.articles_item_content}
        target="_blank"
        href={`/_user/feature/articles/${props.item.id}`}
      >
        <p className={styles.articles_item_title}>
          {props.item.attributes.title}
        </p>
        <div className={styles.articles_item_bottom}>
          <p className={styles.articles_item_author}>
            {props.item.attributes.author}
          </p>
          <p className={styles.articles_item_updateAt}>
            {dayjs(props.item.attributes.updatedAt).format("YYYY/MM/DD")}更新
          </p>
        </div>
      </a>
      <Modal
        // title="上传封面"
        // closable={false}
        width={900}
        visible={modalShow}
        onCancel={() => {
          setmodalShow(false);
        }}
        onOk={() => {
          handleCreate();
        }}
        okText="保存"
        cancelText="取消"
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        {modalShow && (
          <Upload
            onChoose={async ({ url }) => {
              await updateArticle({
                articleItem: props.item,
                params: {
                  poster: url,
                },
              });
              props.onChange && (await props.onChange());
              setmodalShow(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default Components;
