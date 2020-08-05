import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Table, Tag, Space } from "antd";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

function AdminHome() {
  return (
    <Layout>
      <div className="_admin_body_section_block" style={{ padding: 30 }}>
        <div className={styles.user}>
          <div className={styles.item}>
            <div className={styles.item_title}>昵称</div>
            <div className={styles.item_right}>
              <input
                placeholder="请输入"
                // value={title}
                onChange={(e) => {
                  settitle(e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_title}>Github</div>
            <div className={styles.item_right}>
              <input
                placeholder="请输入"
                // value={title}
                onChange={(e) => {
                  settitle(e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_title}>社交链接</div>
            <div className={styles.item_right}>
              <input
                placeholder="请输入"
                // value={title}
                onChange={(e) => {
                  settitle(e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_title}>公司名称</div>
            <div className={styles.item_right}>
              <input
                placeholder="请输入"
                // value={title}
                onChange={(e) => {
                  settitle(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome;
