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
        setarticleLists(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleChange = () => {};

  useEffect(() => {
    // getFileList();
  }, []);

  return (
    <div className={styles.articles_item}>
      <div className="_admin_body_section_block">
        <div className={styles.assets_nav}>
          <span className={styles.assets_nav_item_active}>全部</span>
          <span className={styles.assets_nav_item}>回收站</span>
        </div>
      </div>
      <div className="_admin_body_section_block">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <div>
            {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
      </div>
    </div>
  );
}

export default Components;
