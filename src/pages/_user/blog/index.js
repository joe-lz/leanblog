import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Table, Tag, Space } from "antd";

import styles from "./index.module.scss";
import Layout from "src/components/_user/Layout";

function AdminHome() {
  return (
    <Layout>
      <div className='_admin_body_section_block'>
        {/* <Table columns={columns} dataSource={data} /> */}
        home
      </div>
    </Layout>
  );
}

export default AdminHome;
