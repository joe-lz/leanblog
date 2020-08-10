import Head from 'next/head'
import Link from 'next/link'
import AV from 'leancloud-storage'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const marked = require('marked')
import hljs from 'highlight.js'
import { BackTop } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import Layout from 'src/components/_demo/Layout'
import Comments from 'src/components/_demo/Comments'
import CategoryList from 'src/components/_demo/CategoryList'
import Ad from 'src/components/_demo/Ad'
import UserInfo from 'src/components/_demo/UserInfo'
import { getArticleById } from 'src/service/article'

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const nav = []
const renderer = new marked.Renderer()
renderer.heading = function heading(text, level, raw, slugger) {
  nav.push({ text, level, raw, slugger })
  if (this.options.headerIds) {
    return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n'
  } // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n'
}

marked.setOptions({
  renderer,
  highlight: function (code, language) {
    const hljs = require('highlight.js')
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    return hljs.highlight(validLanguage, code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})
function MyComponent() {
  const router = useRouter()
  const aid = router.query.id
  const [articleObj, setarticleObj] = useState(null)
  const [author, setauthor] = useState(null)
  const [profile, setprofile] = useState(null)
  const [userinfo, setuserinfo] = useState(null)
  const [html, sethtml] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (aid) {
        const res = await getArticleById({ id: aid })
        setarticleObj(res)
        setauthor(res.attributes.author)
        sethtml(marked(res.attributes.articleVal))
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
              <UserInfo userinfo={author} time={dayjs(articleObj.createdAt).format('YYYY/MM/DD')} />
              <p className={styles.title}>{articleObj.attributes.title}</p>
              <article
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              ></article>
            </div>
            <div className={styles.left_content}>
              <Comments type="article" id={articleObj} userinfo={userinfo} />
            </div>
          </div>
          <div className={styles.right}>
            {/* {author && (
              <div className={styles.author}>
                <div className={styles.author_title}>关于作者</div>
                <div className={styles.author_content}>
                  <UserInfo userinfo={userinfo} />
                </div>
              </div>
            )} */}
            {profile && profile.ads[2].show && <Ad item={profile.ads[2]} />}
            <CategoryList nav={nav}/>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MyComponent
