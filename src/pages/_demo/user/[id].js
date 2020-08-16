import Head from 'next/head'
import AV from 'leancloud-storage'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import hljs from 'highlight.js'
import { BackTop, Button } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import UserInfoCenter from 'src/components/_demo/UserInfoCenter'
import ArticleList from 'src/components/_demo/ArticleList'
import CollectList from 'src/components/_demo/CollectList'
import PostList from 'src/components/_demo/PostList'
import { getUserInfoById } from 'src/service/user'

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function MyComponent() {
  const router = useRouter()
  const uId = router.query.id
  const [profile, setprofile] = useState(null)
  const [userinfo, setuserinfo] = useState(null)
  const [curUserInfo, setcurUserInfo] = useState(null)
  const [activeNumber, setactiveNumber] = useState(1)

  useEffect(() => {
    async function fetchData() {
      if (uId) {
        const res = await getUserInfoById({ id: uId })
        setcurUserInfo(res)
      }
    }
    fetchData()
  }, [router])

  const curUserInfoJOSN = curUserInfo ? curUserInfo.toJSON() : null
  return (
    <Layout
      onChange={(params) => {
        setprofile(params.profile)
        setuserinfo(params.userinfo)
      }}
    >
      <BackTop />
      {curUserInfoJOSN && profile && (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.left}>
              <UserInfoCenter curUserInfo={curUserInfo} />
            </div>
            <div className={styles.right}>
              <div className={styles.nav}>
                <div
                  className={activeNumber === 1 ? styles.nav_item_active : styles.nav_item}
                  onClick={() => {
                    setactiveNumber(1)
                  }}
                >
                  文章
                </div>
                <div
                  className={activeNumber === 2 ? styles.nav_item_active : styles.nav_item}
                  onClick={() => {
                    setactiveNumber(2)
                  }}
                >
                  收藏
                </div>
                {profile.showBlog && (
                  <div
                    className={activeNumber === 3 ? styles.nav_item_active : styles.nav_item}
                    onClick={() => {
                      setactiveNumber(3)
                    }}
                  >
                    {profile.blogName}
                  </div>
                )}
              </div>
              {activeNumber === 1 && <ArticleList userinfo={curUserInfo} />}
              {activeNumber === 2 && <CollectList userinfo={curUserInfo} />}
              {activeNumber === 3 && <PostList userinfo={curUserInfo} />}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MyComponent
