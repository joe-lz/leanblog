import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import PostEditor from 'src/components/_demo/PostEditor'
import PostItem from 'src/components/_demo/PostItem'
import Ad from 'src/components/_demo/Ad'
import { getTopicList } from 'src/service/topics'
import { getPostList } from 'src/service/post'
import { userFollow, userUnFollow, userFolloweeList } from 'src/service/user'

function MyComponent() {
  const [topiclist, settopiclist] = useState([])
  const [postlist, setpostlist] = useState([])
  const [userinfo, setuserinfo] = useState(null)
  const [profile, setprofile] = useState(null)
  const [scrollTop, setscrollTop] = useState(10)
  const [followeeList, setfolloweeList] = useState([])
  // 获取我关注的列表
  const fetchFollowee = async () => {
    const list = await userFolloweeList()
    if (list) {
      setfolloweeList(JSON.parse(JSON.stringify(list)))
      localStorage.setItem('My_CMS_FolloweeList', JSON.stringify(list))
      localStorage.setItem('My_CMS_FolloweeList_time', Date.now())
    }
  }

  // 获取话题
  const getTopics = async (params = {}) => {
    const res = await getTopicList(params)
    settopiclist(JSON.parse(JSON.stringify(res)))
  }

  const handleScroll = (event) => {
    setscrollTop(document.documentElement.scrollTop)
  }

  const fetchPosts = async (params = {}) => {
    const res = await getPostList({ status: 1, ...params })
    setpostlist(res)
  }

  useEffect(() => {
    if (
      localStorage.getItem('My_CMS_FolloweeList') &&
      Number(localStorage.getItem('My_CMS_FolloweeList_time')) + 5 * 60 * 1000 > Date.now()
    ) {
      const list = JSON.parse(localStorage.getItem('My_CMS_FolloweeList'))
      setfolloweeList(list)
    } else {
      fetchFollowee()
    }

    // 获取话题
    getTopics({ status: 2 })
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const router = useRouter()
  useEffect(() => {
    const topicid = router.query.topic
    const actionType = router.query.type
    if (topicid) {
      fetchPosts({ topic: AV.Object.createWithoutData('CMS_Topics', topicid) })
    } else if (actionType === 'follow') {
      // 获取我关注的动态
    } else {
      fetchPosts()
    }
  }, [router])

  return (
    <Layout
      onChange={(params) => {
        setprofile(params.profile)
        setuserinfo(params.userinfo)
      }}
    >
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <div className={styles.sidebar_block}>
              {/* <Link href={`/_demo/posts`}>
                <div
                  className={
                    router.pathname === `/_demo/posts` && Object.keys(router.query).length === 0
                      ? styles.topicItem_active
                      : styles.topicItem
                  }
                >
                  推荐
                </div>
              </Link> */}
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
            <PostEditor topiclist={topiclist} userinfo={userinfo} onChange={() => {}} />
            {postlist.map((obj) => {
              return <PostItem key={obj.id} item={obj} userinfo={userinfo} followeeList={followeeList} />
            })}
          </div>
          <div className={styles.userinfo}>
            <div
              style={
                scrollTop > 100
                  ? {
                      position: 'fixed',
                      top: 15,
                    }
                  : {}
              }
            >
              {profile && profile.ads && <Ad item={profile.ads[3]} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyComponent
