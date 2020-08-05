import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'

function MyComponent() {
  return (
    <Layout>
      {/* 文章列表 */}
      <div className={styles.container}>
      
      </div>
    </Layout>
  )
}

export default MyComponent
