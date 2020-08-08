import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import { getTopicList } from 'src/service/topics'

function MyComponent() {
  const [topiclist, settopiclist] = useState([])
  const router = useRouter()

  const getTopics = async (params = {}) => {
    const res = await getTopicList(params)
    settopiclist(JSON.parse(JSON.stringify(res)))
  }

  // 获取话题
  useEffect(() => {
    getTopics({ status: 2 })
  }, [])
  console.log(router)
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <div className={styles.block}>
              <Link href={`/_demo/posts`}>
                <div
                  className={
                    router.pathname === `/_demo/posts` && Object.keys(router.query).length === 0
                      ? styles.topicItem_active
                      : styles.topicItem
                  }
                >
                  推荐
                </div>
              </Link>
              <Link href={`/_demo/posts?type=follow`}>
                <div className={router.query.type === 'follow' ? styles.topicItem_active : styles.topicItem}>关注</div>
              </Link>
              <div className={styles.divider}></div>
              {topiclist.map((obj, key) => {
                return (
                  <Link href={`/_demo/posts?topic=${obj.objectId}`} key={obj.objectId}>
                    <div className={router.query.topic === obj.objectId ? styles.topicItem_active : styles.topicItem}>{obj.title}</div>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
          </div>
          <div className={styles.userinfo}>
            <div className={styles.block}></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyComponent
