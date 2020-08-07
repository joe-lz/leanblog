import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import { Table, Tag, Space } from 'antd'

import styles from './index.module.scss'
import Layout from 'src/components/_user/Layout'

function AdminHome() {
  return (
    <Layout>
      <div className="manage">
        <p className="_admin_body_section_title">动态管理</p>
        <div className="_admin_body_section_block" style={{ padding: 30 }}></div>
      </div>
    </Layout>
  )
}

export default AdminHome
