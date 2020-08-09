import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'
import { BackTop } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import Comments from 'src/components/_demo/Comments'
import Ad from 'src/components/_demo/Ad'
import { getArticleById } from 'src/service/article'

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

var md = new Remarkable({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {}

    return '' // use external default escaping
  },
})
function MyComponent() {
  const router = useRouter()
  const aid = router.query.id
  const [articleObj, setarticleObj] = useState(null)
  const [author, setauthor] = useState(null)
  const [profile, setprofile] = useState(null)
  const [userinfo, setuserinfo] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (aid) {
        const res = await getArticleById({ id: aid })
        setarticleObj(res)
        setauthor(res.attributes.author)
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
      <BackTop />
      {/* 文章列表 */}
      {articleObj && (
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.left_content}>
              <p className={styles.title}>{articleObj.attributes.title}</p>
              <article
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: md.render(articleObj.attributes.articleVal),
                }}
              ></article>
            </div>
            <div className={styles.left_content}>
              <Comments type="article" id={articleObj} userinfo={userinfo} />
            </div>
          </div>
          <div className={styles.right}>
            {author && (
              <div className={styles.author}>
                <div className={styles.author_title}>关于作者</div>
                <a href={`/_demo/user/${author.id}`} target="_blank">
                  <div className={styles.author_content}>
                    <div className={styles.author_avatar} style={{ backgroundImage: `url(${author.attributes.avatar})` }}></div>
                    <div className={styles.author_info}>
                      <div className={styles.nickname}>{author.attributes.nickname}</div>
                      <p className={styles.about}>
                        {author.attributes.position}
                        {author.attributes.co_name ? `@${author.attributes.co_name}` : ''}
                        {/* {dayjs(articleObj.createdAt).fromNow()} */}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            )}
            {profile && profile.ads[2].show && <Ad item={profile.ads[2]} />}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MyComponent
