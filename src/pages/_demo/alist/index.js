import Head from 'next/head'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import ArticleItem from 'src/components/_demo/ArticleItem'
import Ad from 'src/components/_demo/Ad'
import { getArticleList } from 'src/service/article'

function MyComponent() {
  const [articleLists, setarticleLists] = useState(null)
  const [profile, setprofile] = useState(null)
  const [userinfo, setuserinfo] = useState(null)
  const [scrollTop, setscrollTop] = useState(10)

  const getlist = async (params = {}) => {
    const resList = await getArticleList({ status: 3, ...params })
    setarticleLists(resList)
  }
  const router = useRouter()
  const { cate1, cate2 } = router.query

  const handleScroll = (event) => {
    setscrollTop(document.documentElement.scrollTop)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (cate1) {
        await getlist(Object.assign({ category_1_key: cate1 }, cate2 ? { category_2_key: cate2 } : {}))
      }
    }
    fetchData()
  }, [router])

  return (
    <Layout
      onChange={(params) => {
        setprofile(params.profile)
        setuserinfo(params.userinfo)
      }}
    >
      {/* 文章列表 */}
      <div className={styles.container}>
        <div className={styles.list}>
          {articleLists &&
            articleLists.length > 0 &&
            articleLists.map((obj) => {
              return <ArticleItem key={obj.id} data={obj} />
            })}
          {articleLists && articleLists.length === 0 && (
            <div className={styles.nodata}>
              <img src="/nodata.png"></img>
              <p>暂无文章～</p>
            </div>
          )}
          {/* <div className={styles.articleItem}></div>
          <div className={styles.articleItem}></div>
          <div className={styles.articleItem}></div>
          <div className={styles.articleItem}></div> */}
        </div>
        <div className={styles.rightAside}>
          <div
            className={styles.content}
            style={
              scrollTop > 160
                ? {
                    position: 'fixed',
                    top: 15,
                  }
                : {}
            }
          >
            <div className={styles.rightAside_guanggao}>{profile && profile.ads && <Ad item={profile.ads[0]} />}</div>
            <div className={styles.rightAside_guanggao}>{profile && profile.ads && <Ad item={profile.ads[1]} />}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyComponent
