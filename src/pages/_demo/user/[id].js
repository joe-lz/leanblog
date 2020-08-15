import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import hljs from 'highlight.js'
import { BackTop } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
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

  useEffect(() => {
    async function fetchData() {
      if (uId) {
        const res = await getUserInfoById({ id: uId })
        console.log(res)
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
              <div className={styles.avatar} style={{ backgroundImage: `url(${curUserInfoJOSN.avatar})` }}></div>
              <div className={styles.nickname}>{curUserInfoJOSN.nickname}</div>
              {curUserInfoJOSN.position && <p className={styles.position}>{curUserInfoJOSN.position}</p>}
              {curUserInfoJOSN.desc && <div className={styles.desc}>{curUserInfoJOSN.desc}</div>}
              {curUserInfoJOSN.co_name && (
                <div className={styles.item}>
                  <i className="iconfont icon-company"></i>
                  {curUserInfoJOSN.co_name}
                </div>
              )}
              {curUserInfoJOSN.city && (
                <div className={styles.item}>
                  <i className="iconfont icon-location"></i>
                  {curUserInfoJOSN.city}
                </div>
              )}
              {curUserInfoJOSN.email && (
                <div className={styles.item}>
                  <i className="iconfont icon-email"></i>
                  <a href={`mailto:${curUserInfoJOSN.email}`} className="link">
                    {curUserInfoJOSN.email}
                  </a>
                </div>
              )}
              {curUserInfoJOSN.github && (
                <div className={styles.item}>
                  <i className="iconfont icon-github-line"></i>
                  <a target="_blank" href={curUserInfoJOSN.github} className="link">
                    {curUserInfoJOSN.github}
                  </a>
                </div>
              )}
              {curUserInfoJOSN.social_link && (
                <div className={styles.item}>
                  <i className="iconfont icon-link"></i>
                  <a target="_blank" href={curUserInfoJOSN.social_link} className="link">
                    {curUserInfoJOSN.social_link}
                  </a>
                </div>
              )}
            </div>
            <div className={styles.right}>
              <div className={styles.nav}>
                <div className={styles.nav_item}>文章</div>
                {profile.showBlog && <div className={styles.nav_item}>{profile.blogName}</div>}
                <div className={styles.nav_item}>收藏</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MyComponent
