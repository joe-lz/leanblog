import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import ArticleItem from 'src/components/_demo/ArticleItem'
import { getArticleList } from 'src/service/article'

function MyComponent() {
  const [articleLists, setarticleLists] = useState([])
  const getlist = async () => {
    const resList = await getArticleList({ status: 3 })
    setarticleLists(resList)
  }

  useEffect(() => {
    getlist()
  }, [])

  return (
    <Layout>
      {/* 文章列表 */}
      <div className={styles.container}>
        <div className={styles.list}>
          {articleLists.map((obj) => {
            return <ArticleItem key={obj.id} data={obj} />
          })}
          <div className={styles.articleItem}></div>
          <div className={styles.articleItem}></div>
          <div className={styles.articleItem}></div>
          <div className={styles.articleItem}></div>
        </div>
      </div>
    </Layout>
  )
}

export default MyComponent
