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
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./index.module.scss";
import { createAssets, getAssetsList } from "src/service/assets";

function Components(props) {
  const [imageLists, setimageLists] = useState([]);
  const [imageListsTrash, setimageListsTrash] = useState([]);

  const beforeUpload = async (e) => {
    await createAssets({ e });
    const res = await getAssetsList();
    setimageLists(res);
  };

  const handleChange = () => {};
  // 删除图片
  // const handleDel = async (file) => {
  //   file.destroy();
  //   // 获取图片列表
  //   const res = await getAssetsList();
  //   setimageLists(res);
  // };

  useEffect(() => {
    async function fetchData() {
      // 获取图片列表
      const res = await getAssetsList();
      setimageLists(res);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.assets}>
      <div className="_admin_body_section_block">
        <div className={styles.assets_nav}>
          <span className={styles.assets_nav_item_active}>全部</span>
          {/* <span className={styles.assets_nav_item}>回收站</span> */}
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
              accept="image/png, image/jpeg"
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
              >
                <div className={styles.assets_imgitem_content}>
                  <CopyToClipboard
                    text={obj.attributes.url}
                    onCopy={() => {
                      notification.success({
                        message: "复制成功",
                        // description: "请输入用户名、密码",
                      });
                    }}
                  >
                    <Button shape="round">复制图片url</Button>
                  </CopyToClipboard>
                  {props.onChoose && (
                    <Button
                      shape="round"
                      type="primary"
                      onClick={() => {
                        props.onChoose({ url: obj.attributes.url });
                      }}
                    >
                      选择图片
                    </Button>
                  )}
                  {/* <Button
                    shape="round"
                    type="primary"
                    danger
                    onClick={async () => {
                      await handleDel(obj);
                    }}
                  >
                    删除图片
                  </Button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Components;
