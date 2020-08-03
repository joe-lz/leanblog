import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";
import Upload from "src/components/_user/Upload";

function AdminHome() {
  return (
    <Layout>
      <p className="_admin_body_section_title">素材管理</p>

      {/* <div className="_admin_body_section_block">
        <div className={styles.assets_nav}>
          <span className={styles.assets_nav_item_active}>全部</span>
          <span className={styles.assets_nav_item}>回收站</span>
        </div>
      </div>

      <div className="_admin_body_section_block">
        <Upload />
      </div> */}
      <Upload />
    </Layout>
  );
}

export default AdminHome;
