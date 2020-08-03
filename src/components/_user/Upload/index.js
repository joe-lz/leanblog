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
import {
  Tree,
  Button,
  notification,
  Input,
  Modal,
  Upload,
  message,
} from "antd";

import styles from "./index.module.scss";

function Components(props) {
  const [imageLists, setimageLists] = useState([]);
  const [imageListsTrash, setimageListsTrash] = useState([]);

  const beforeUpload = (e) => {
    console.log(e);
    const file = new AV.File("avatar.jpg", e);
    file.save().then(
      (file) => {
        console.log(`文件保存完成。objectId：${file.id}`);
      },
      (error) => {
        // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
      }
    );
  };

  const getFileList = () => {
    const query = new AV.Query("_File");
    query.descending("createdAt");
    query.limit(50);
    query
      .find()
      .then((res) => {
        setimageLists(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleChange = () => {};

  useEffect(() => {
    getFileList();
  }, []);
  console.log({ imageLists });
  return (
    <div className={styles.assets}>
      <div className="_admin_body_section_block">
        <div className={styles.assets_nav}>
          <span className={styles.assets_nav_item_active}>全部</span>
          <span className={styles.assets_nav_item}>回收站</span>
        </div>
      </div>
      <div className="_admin_body_section_block">
        <div className={styles.assets_body}>
          <div className={styles.assets_imgitem}>
            <Upload
              name="avatar"
              listType="picture-card"
              className={styles.uploader}
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <div className={styles.assets_upload}>上传</div>
            </Upload>
          </div>
          {imageLists.map((obj) => {
            return (
              <div
                className={styles.assets_imgitem}
                key={obj.id}
                style={{ backgroundImage: `url(${obj.attributes.url})` }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Components;
